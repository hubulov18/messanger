import Foundation
import UIKit
import UserNotifications
import React

/// Native module that bridges standard (alert) push notifications to React Native.
///
/// Emitted events:
///   - pushTokenRegistered   { token: String }
///   - notificationTapped    { chatId: String, messageId: String? }
@objc(PushNotificationModule)
class PushNotificationModule: RCTEventEmitter {
  private static weak var activeEmitter: PushNotificationModule?
  private static var pendingToken: String?
  private static var pendingTap: [String: Any]?
  private var hasListeners = false

  // MARK: - RCTEventEmitter

  override func supportedEvents() -> [String] {
    return ["pushTokenRegistered", "notificationTapped"]
  }

  override static func requiresMainQueueSetup() -> Bool { true }

  override func startObserving() {
    PushNotificationModule.activeEmitter = self
    hasListeners = true

    // Flush any events buffered before JS was ready
    if let token = PushNotificationModule.pendingToken {
      sendEvent(withName: "pushTokenRegistered", body: ["token": token])
      PushNotificationModule.pendingToken = nil
    }
    if let tap = PushNotificationModule.pendingTap {
      sendEvent(withName: "notificationTapped", body: tap)
      PushNotificationModule.pendingTap = nil
    }
  }

  override func stopObserving() {
    hasListeners = false
    if PushNotificationModule.activeEmitter === self {
      PushNotificationModule.activeEmitter = nil
    }
  }

  // MARK: - Called from AppDelegate

  @objc static func handleDeviceToken(_ deviceToken: Data) {
    let tokenString = deviceToken.map { String(format: "%02.2hhx", $0) }.joined()
    if let emitter = activeEmitter, emitter.hasListeners {
      emitter.sendEvent(withName: "pushTokenRegistered", body: ["token": tokenString])
    } else {
      pendingToken = tokenString
    }
  }

  @objc static func handleNotificationTap(userInfo: [AnyHashable: Any]) {
    var body: [String: Any] = [:]
    if let chatId = userInfo["chatId"] as? String {
      body["chatId"] = chatId
    }
    if let messageId = userInfo["messageId"] as? String {
      body["messageId"] = messageId
    }
    guard !body.isEmpty else { return }

    if let emitter = activeEmitter, emitter.hasListeners {
      emitter.sendEvent(withName: "notificationTapped", body: body)
    } else {
      pendingTap = body
    }
  }

  // MARK: - JS API

  @objc func requestPermissions(_ resolve: @escaping RCTPromiseResolveBlock,
                                rejecter reject: @escaping RCTPromiseRejectBlock) {
    UNUserNotificationCenter.current().requestAuthorization(options: [.alert, .sound, .badge]) { granted, error in
      if let error = error {
        reject("PUSH_PERMISSION_ERROR", error.localizedDescription, error)
        return
      }
      if granted {
        DispatchQueue.main.async {
          UIApplication.shared.registerForRemoteNotifications()
        }
      }
      resolve(["granted": granted])
    }
  }

  @objc func getPermissionStatus(_ resolve: @escaping RCTPromiseResolveBlock,
                                 rejecter reject: @escaping RCTPromiseRejectBlock) {
    UNUserNotificationCenter.current().getNotificationSettings { settings in
      let status: String
      switch settings.authorizationStatus {
      case .authorized: status = "authorized"
      case .denied: status = "denied"
      case .notDetermined: status = "not_determined"
      case .provisional: status = "provisional"
      case .ephemeral: status = "ephemeral"
      @unknown default: status = "unknown"
      }
      resolve(["status": status])
    }
  }

  @objc func setApplicationBadgeCount(_ count: NSNumber,
                                      resolver resolve: @escaping RCTPromiseResolveBlock,
                                      rejecter reject: @escaping RCTPromiseRejectBlock) {
    DispatchQueue.main.async {
      UIApplication.shared.applicationIconBadgeNumber = max(0, count.intValue)
      resolve(nil)
    }
  }
}
