import AVFoundation
import AudioToolbox
import CallKit
import Foundation
import PushKit
import React
import WebRTC

final class CallManager: NSObject, CXProviderDelegate, PKPushRegistryDelegate {
  static let shared = CallManager()
  #if targetEnvironment(simulator)
    private let supportsSystemCallUi = false
  #else
    private let supportsSystemCallUi = true
  #endif

  private lazy var provider: CXProvider = {
    let configuration = CXProviderConfiguration(localizedName: "TelegramMessenger")
    configuration.supportsVideo = true
    configuration.maximumCallsPerCallGroup = 1
    configuration.maximumCallGroups = 1
    configuration.supportedHandleTypes = [.generic, .phoneNumber]
    configuration.includesCallsInRecents = false
    return CXProvider(configuration: configuration)
  }()

  private let callController = CXCallController()
  private var pushRegistry: PKPushRegistry?
  private var voipPushToken: String?
  private var eventSink: ((String, [String: Any]) -> Void)?
  private var pendingEvents: [(String, [String: Any])] = []
  private var uuidByCallId: [String: UUID] = [:]
  private var callIdByUuid: [UUID: String] = [:]
  private var isBootstrapped = false
  private var isVoipPushEnabled = false
  private var ringtoneTimer: Timer?
  private var activeRingtoneMode: String?

  private override init() {
    super.init()
  }

  func bootstrap(enableVoipPush: Bool = false) {
    DispatchQueue.main.async {
      if #available(iOS 16.0, *) {
        if
          let optionsClass = NSClassFromString("WebRTCModuleOptions") as? NSObject.Type,
          let sharedInstance = optionsClass.perform(NSSelectorFromString("sharedInstance"))?.takeUnretainedValue()
            as? NSObject
        {
          sharedInstance.setValue(true, forKey: "enableMultitaskingCameraAccess")
        }
      }

      guard !self.isBootstrapped else {
        if enableVoipPush && !self.isVoipPushEnabled {
          self.enableVoipPushRegistration()
        }
        return
      }

      self.provider.setDelegate(self, queue: nil)
      if enableVoipPush {
        self.enableVoipPushRegistration()
      }
      self.isBootstrapped = true
    }
  }

  func setEventSink(_ sink: ((String, [String: Any]) -> Void)?) {
    eventSink = sink
    flushPendingEvents()
  }

  func currentVoipPushToken() -> String? {
    return voipPushToken
  }

  func reportIncomingCall(callId: String, handle: String, displayName: String?, hasVideo: Bool) {
    DispatchQueue.main.async {
      guard self.supportsSystemCallUi else {
        self.emit(
          name: "incomingCallDisplayed",
          body: [
            "callId": callId,
            "handle": handle,
            "displayName": displayName as Any,
          ]
        )
        return
      }

      if self.uuidByCallId[callId] != nil {
        return
      }

      let uuid = self.registerCall(callId: callId)
      let update = CXCallUpdate()
      update.localizedCallerName = displayName
      update.hasVideo = hasVideo
      update.remoteHandle = CXHandle(type: .generic, value: handle)
      update.supportsHolding = false
      update.supportsGrouping = false
      update.supportsUngrouping = false
      update.supportsDTMF = false

      self.provider.reportNewIncomingCall(with: uuid, update: update) { error in
        if let error {
          self.emit(
            name: "callManagerError",
            body: [
              "callId": callId,
              "code": "incoming_call_failed",
              "message": error.localizedDescription,
            ]
          )
          return
        }

        self.emit(
          name: "incomingCallDisplayed",
          body: [
            "callId": callId,
            "handle": handle,
            "displayName": displayName as Any,
          ]
        )
      }
    }
  }

  func startOutgoingCall(callId: String, handle: String, displayName: String?, hasVideo: Bool) {
    DispatchQueue.main.async {
      guard self.supportsSystemCallUi else {
        self.registerCall(callId: callId)
        return
      }

      let uuid = self.registerCall(callId: callId)
      let action = CXStartCallAction(call: uuid, handle: CXHandle(type: .generic, value: handle))
      let transaction = CXTransaction(action: action)

      self.callController.request(transaction) { error in
        if let error {
          self.emit(
            name: "callManagerError",
            body: [
              "callId": callId,
              "code": "outgoing_call_failed",
              "message": error.localizedDescription,
            ]
          )
          return
        }

        let update = CXCallUpdate()
        update.localizedCallerName = displayName
        update.remoteHandle = CXHandle(type: .generic, value: handle)
        update.hasVideo = hasVideo
        self.provider.reportCall(with: uuid, updated: update)
        self.provider.reportOutgoingCall(with: uuid, startedConnectingAt: nil)
      }
    }
  }

  func markCallConnected(callId: String) {
    DispatchQueue.main.async {
      guard self.supportsSystemCallUi else {
        return
      }

      guard let uuid = self.uuidByCallId[callId] else {
        return
      }

      self.provider.reportOutgoingCall(with: uuid, connectedAt: nil)
    }
  }

  func endCall(callId: String) {
    DispatchQueue.main.async {
      self.stopRingtone()
      guard self.supportsSystemCallUi else {
        self.unregisterCall(callId: callId)
        return
      }

      guard let uuid = self.uuidByCallId[callId] else {
        return
      }

      let action = CXEndCallAction(call: uuid)
      let transaction = CXTransaction(action: action)
      self.callController.request(transaction) { error in
        if let error {
          self.emit(
            name: "callManagerError",
            body: [
              "callId": callId,
              "code": "end_call_failed",
              "message": error.localizedDescription,
            ]
          )
        }
      }
    }
  }

  func setMuted(callId: String, isMuted: Bool) {
    DispatchQueue.main.async {
      guard self.supportsSystemCallUi else {
        self.emit(
          name: "callMuted",
          body: [
            "callId": callId,
            "isMuted": isMuted,
          ]
        )
        return
      }

      guard let uuid = self.uuidByCallId[callId] else {
        return
      }

      let action = CXSetMutedCallAction(call: uuid, muted: isMuted)
      let transaction = CXTransaction(action: action)
      self.callController.request(transaction) { error in
        if let error {
          self.emit(
            name: "callManagerError",
            body: [
              "callId": callId,
              "code": "mute_call_failed",
              "message": error.localizedDescription,
            ]
          )
        }
      }
    }
  }

  func setSpeakerEnabled(_ enabled: Bool) throws {
    try configureAudioSession(speakerEnabled: enabled, hasVideo: false)
  }

  func ensureCallAudioSession(speakerEnabled: Bool, hasVideo: Bool) throws {
    try configureAudioSession(speakerEnabled: speakerEnabled, hasVideo: hasVideo)
  }

  func startRingtone(mode: String) {
    DispatchQueue.main.async {
      let normalizedMode = mode == "incoming" ? "incoming" : "outgoing"
      if self.activeRingtoneMode == normalizedMode, self.ringtoneTimer != nil {
        return
      }

      self.stopRingtone()
      self.activeRingtoneMode = normalizedMode
      self.playRingtonePulse(for: normalizedMode)
      let interval: TimeInterval = normalizedMode == "incoming" ? 2.8 : 2.2
      self.ringtoneTimer = Timer.scheduledTimer(withTimeInterval: interval, repeats: true) { [weak self] _ in
        self?.playRingtonePulse(for: normalizedMode)
      }
    }
  }

  func stopRingtone() {
    DispatchQueue.main.async {
      self.ringtoneTimer?.invalidate()
      self.ringtoneTimer = nil
      self.activeRingtoneMode = nil
    }
  }

  private func playRingtonePulse(for mode: String) {
    AudioServicesPlayAlertSound(1003)
    if mode == "incoming" {
      AudioServicesPlaySystemSound(kSystemSoundID_Vibrate)
    }
  }

  private func configureAudioSession(speakerEnabled: Bool, hasVideo: Bool) throws {
    let session = AVAudioSession.sharedInstance()
    var options: AVAudioSession.CategoryOptions = [.allowBluetooth, .allowBluetoothA2DP]
    if speakerEnabled {
      options.insert(.defaultToSpeaker)
    }

    try session.setCategory(.playAndRecord, mode: hasVideo ? .videoChat : .voiceChat, options: options)
    try session.setActive(true)
    try session.overrideOutputAudioPort(speakerEnabled ? .speaker : .none)
  }

  func providerDidReset(_ provider: CXProvider) {
    stopRingtone()
    let activeCallIds = Array(uuidByCallId.keys)
    uuidByCallId.removeAll()
    callIdByUuid.removeAll()

    for callId in activeCallIds {
      emit(name: "callEnded", body: ["callId": callId, "reason": "provider_reset"])
    }
  }

  func provider(_ provider: CXProvider, perform action: CXStartCallAction) {
    action.fulfill()
  }

  func provider(_ provider: CXProvider, perform action: CXAnswerCallAction) {
    stopRingtone()
    let callId = callIdByUuid[action.callUUID]
    emit(name: "callAnswered", body: ["callId": callId as Any])
    action.fulfill()
  }

  func provider(_ provider: CXProvider, perform action: CXEndCallAction) {
    stopRingtone()
    let callId = callIdByUuid[action.callUUID]
    if let callId {
      unregisterCall(callId: callId)
      emit(name: "callEnded", body: ["callId": callId, "reason": "local_end"])
    }
    action.fulfill()
  }

  func provider(_ provider: CXProvider, perform action: CXSetMutedCallAction) {
    let callId = callIdByUuid[action.callUUID]
    emit(
      name: "callMuted",
      body: [
        "callId": callId as Any,
        "isMuted": action.isMuted,
      ]
    )
    action.fulfill()
  }

  func provider(_ provider: CXProvider, didActivate audioSession: AVAudioSession) {
    RTCAudioSession.sharedInstance().audioSessionDidActivate(audioSession)
  }

  func provider(_ provider: CXProvider, didDeactivate audioSession: AVAudioSession) {
    RTCAudioSession.sharedInstance().audioSessionDidDeactivate(audioSession)
  }

  func pushRegistry(_ registry: PKPushRegistry, didUpdate pushCredentials: PKPushCredentials, for type: PKPushType) {
    guard type == .voIP else {
      return
    }

    voipPushToken = pushCredentials.token.map { String(format: "%02x", $0) }.joined()
    emit(name: "voipPushRegistered", body: ["token": voipPushToken as Any])
  }

  func pushRegistry(_ registry: PKPushRegistry, didInvalidatePushTokenFor type: PKPushType) {
    guard type == .voIP else {
      return
    }

    voipPushToken = nil
    emit(name: "voipPushRegistered", body: ["token": NSNull()])
  }

  func pushRegistry(
    _ registry: PKPushRegistry,
    didReceiveIncomingPushWith payload: PKPushPayload,
    for type: PKPushType,
    completion: @escaping () -> Void
  ) {
    guard type == .voIP else {
      completion()
      return
    }

    let dictionary = payload.dictionaryPayload
    let callPayload = dictionary["call"] as? [String: Any]
    let callId =
      (dictionary["callId"] as? String)
      ?? (callPayload?["id"] as? String)
      ?? UUID().uuidString
    let chatId =
      (dictionary["chatId"] as? String)
      ?? (callPayload?["chatId"] as? String)
    let callerUserId =
      (dictionary["callerUserId"] as? String)
      ?? (callPayload?["callerUserId"] as? String)
    let displayName =
      (dictionary["displayName"] as? String)
      ?? (callPayload?["callerDisplayName"] as? String)
      ?? ((dictionary["aps"] as? [String: Any])?["alert"] as? [String: Any])?["title"] as? String
    let callType =
      (dictionary["callType"] as? String)
      ?? (callPayload?["callType"] as? String) 
      ?? "audio"
    let hasVideo = callType == "video"
    let handle = displayName ?? callerUserId ?? "Voice call"

    reportIncomingCall(callId: callId, handle: handle, displayName: displayName, hasVideo: hasVideo)
    emit(
      name: "incomingVoipPushReceived",
      body: [
        "callId": callId,
        "chatId": chatId as Any,
        "callerUserId": callerUserId as Any,
        "displayName": displayName as Any,
        "callType": callType,
      ]
    )
    completion()
  }

  private func registerCall(callId: String) -> UUID {
    if let existingUUID = uuidByCallId[callId] {
      return existingUUID
    }

    let uuid = UUID()
    uuidByCallId[callId] = uuid
    callIdByUuid[uuid] = callId
    return uuid
  }

  private func unregisterCall(callId: String) {
    guard let uuid = uuidByCallId.removeValue(forKey: callId) else {
      return
    }

    callIdByUuid.removeValue(forKey: uuid)
  }

  private func emit(name: String, body: [String: Any]) {
    if let eventSink {
      eventSink(name, body)
      return
    }

    pendingEvents.append((name, body))
  }

  private func flushPendingEvents() {
    guard let eventSink else {
      return
    }

    while !pendingEvents.isEmpty {
      let pending = pendingEvents.removeFirst()
      eventSink(pending.0, pending.1)
    }
  }

  private func enableVoipPushRegistration() {
    guard !isVoipPushEnabled else {
      return
    }

    let registry = PKPushRegistry(queue: DispatchQueue.main)
    registry.delegate = self
    registry.desiredPushTypes = [.voIP]
    pushRegistry = registry
    isVoipPushEnabled = true
  }
}

@objc(CallManagerModule)
class CallManagerModule: RCTEventEmitter {
  private let eventNames = [
    "voipPushRegistered",
    "incomingVoipPushReceived",
    "incomingCallDisplayed",
    "callAnswered",
    "callEnded",
    "callMuted",
    "callManagerError",
  ]
  private var hasListeners = false
  private var bufferedEvents: [(String, [String: Any])] = []

  override init() {
    super.init()
    CallManager.shared.setEventSink { [weak self] eventName, body in
      guard let self else {
        return
      }

      guard self.hasListeners else {
        self.bufferedEvents.append((eventName, body))
        return
      }

      self.sendEvent(withName: eventName, body: body)
    }
    CallManager.shared.bootstrap()
  }

  @objc
  override static func requiresMainQueueSetup() -> Bool {
    return true
  }

  override func supportedEvents() -> [String]! {
    return eventNames
  }

  override func startObserving() {
    hasListeners = true

    while !bufferedEvents.isEmpty {
      let bufferedEvent = bufferedEvents.removeFirst()
      sendEvent(withName: bufferedEvent.0, body: bufferedEvent.1)
    }
  }

  override func stopObserving() {
    hasListeners = false
  }

  @objc(configure:)
  func configure(_ enableVoipPush: Bool) {
    CallManager.shared.bootstrap(enableVoipPush: enableVoipPush)
  }

  @objc(getVoipPushToken:rejecter:)
  func getVoipPushToken(
    _ resolve: @escaping RCTPromiseResolveBlock,
    rejecter _reject: @escaping RCTPromiseRejectBlock
  ) {
    resolve(CallManager.shared.currentVoipPushToken())
  }

  @objc(reportIncomingCall:handle:displayName:hasVideo:resolver:rejecter:)
  func reportIncomingCall(
    _ callId: String,
    handle: String,
    displayName: String?,
    hasVideo: Bool,
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter _reject: @escaping RCTPromiseRejectBlock
  ) {
    CallManager.shared.reportIncomingCall(callId: callId, handle: handle, displayName: displayName, hasVideo: hasVideo)
    resolve(nil)
  }

  @objc(startOutgoingCall:handle:displayName:hasVideo:resolver:rejecter:)
  func startOutgoingCall(
    _ callId: String,
    handle: String,
    displayName: String?,
    hasVideo: Bool,
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter _reject: @escaping RCTPromiseRejectBlock
  ) {
    CallManager.shared.startOutgoingCall(callId: callId, handle: handle, displayName: displayName, hasVideo: hasVideo)
    resolve(nil)
  }

  @objc(markCallConnected:resolver:rejecter:)
  func markCallConnected(
    _ callId: String,
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter _reject: @escaping RCTPromiseRejectBlock
  ) {
    CallManager.shared.stopRingtone()
    CallManager.shared.markCallConnected(callId: callId)
    resolve(nil)
  }

  @objc(endCall:resolver:rejecter:)
  func endCall(
    _ callId: String,
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter _reject: @escaping RCTPromiseRejectBlock
  ) {
    CallManager.shared.endCall(callId: callId)
    resolve(nil)
  }

  @objc(startRingtone:resolver:rejecter:)
  func startRingtone(
    _ mode: String,
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter _reject: @escaping RCTPromiseRejectBlock
  ) {
    CallManager.shared.startRingtone(mode: mode)
    resolve(nil)
  }

  @objc(stopRingtone:rejecter:)
  func stopRingtone(
    _ resolve: @escaping RCTPromiseResolveBlock,
    rejecter _reject: @escaping RCTPromiseRejectBlock
  ) {
    CallManager.shared.stopRingtone()
    resolve(nil)
  }

  @objc(setMuted:isMuted:resolver:rejecter:)
  func setMuted(
    _ callId: String,
    isMuted: Bool,
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter _reject: @escaping RCTPromiseRejectBlock
  ) {
    CallManager.shared.setMuted(callId: callId, isMuted: isMuted)
    resolve(nil)
  }

  @objc(setSpeakerEnabled:resolver:rejecter:)
  func setSpeakerEnabled(
    _ enabled: Bool,
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    do {
      try CallManager.shared.setSpeakerEnabled(enabled)
      resolve(nil)
    } catch {
      reject("speaker_toggle_failed", error.localizedDescription, error)
    }
  }

  @objc(ensureCallAudioSession:hasVideo:resolver:rejecter:)
  func ensureCallAudioSession(
    _ speakerEnabled: Bool,
    hasVideo: Bool,
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    do {
      try CallManager.shared.ensureCallAudioSession(speakerEnabled: speakerEnabled, hasVideo: hasVideo)
      resolve(nil)
    } catch {
      reject("ensure_call_audio_session_failed", error.localizedDescription, error)
    }
  }
}
