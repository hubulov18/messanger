import Foundation
import AudioToolbox
import React

@objc(NotificationFeedbackModule)
class NotificationFeedbackModule: NSObject {
  @objc static func requiresMainQueueSetup() -> Bool { false }

  @objc(playNotificationSound:resolver:rejecter:)
  func playNotificationSound(_ sound: String,
                             resolver resolve: @escaping RCTPromiseResolveBlock,
                             rejecter reject: @escaping RCTPromiseRejectBlock) {
    let systemSoundId = mapSystemSoundId(for: sound)
    guard let soundId = systemSoundId else {
      resolve(false)
      return
    }

    AudioServicesPlaySystemSound(soundId)
    resolve(true)
  }

  private func mapSystemSoundId(for sound: String) -> SystemSoundID? {
    switch sound {
    case "Default":
      return 1007
    case "Chime":
      return 1013
    case "Aurora":
      return 1027
    case "None":
      return nil
    default:
      return 1007
    }
  }
}
