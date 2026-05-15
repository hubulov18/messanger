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

  static let shared = PushNotificationModule()

  @objc static func handleDeviceToken(_ deviceToken: Data) {
    shared.handleDeviceToken(deviceToken)
  }

  @objc static func handleNotificationTap(userInfo: [AnyHashable: Any]) {
    shared.handleNotificationTap(userInfo: userInfo)
  }

  private var currentToken: String?
  private var pendingToken: String?
  private var pendingTap: [String: Any]?
  private var hasListeners = false

  // MARK: - RCTEventEmitter

  override func supportedEvents() -> [String] {
    return ["pushTokenRegistered", "notificationTapped"]
  }

  override static func requiresMainQueueSetup() -> Bool { true }

  override func startObserving() {
    hasListeners = true
    // Flush any events buffered before JS was ready
    if let token = pendingToken {
      sendEvent(withName: "pushTokenRegistered", body: ["token": token])
      pendingToken = nil
    }
    if let tap = pendingTap {
      sendEvent(withName: "notificationTapped", body: tap)
      pendingTap = nil
    }
  }

  override func stopObserving() {
    hasListeners = false
  }

  // MARK: - Called from AppDelegate

  func handleDeviceToken(_ deviceToken: Data) {
    let tokenString = deviceToken.map { String(format: "%02.2hhx", $0) }.joined()
    currentToken = tokenString
    if hasListeners {
      sendEvent(withName: "pushTokenRegistered", body: ["token": tokenString])
    } else {
      pendingToken = tokenString
    }
  }

  func handleNotificationTap(userInfo: [AnyHashable: Any]) {
    var body: [String: Any] = [:]
    if let chatId = userInfo["chatId"] as? String {
      body["chatId"] = chatId
    }
    if let messageId = userInfo["messageId"] as? String {
      body["messageId"] = messageId
    }
    guard !body.isEmpty else { return }

    if hasListeners {
      sendEvent(withName: "notificationTapped", body: body)
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

  @objc func getCurrentPushToken(_ resolve: @escaping RCTPromiseResolveBlock,
                                 rejecter reject: @escaping RCTPromiseRejectBlock) {
    resolve(currentToken)
  }
}
