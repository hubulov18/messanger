import AVFoundation
import AVKit
import Foundation
import React
import UIKit

@objc(VideoPlaybackModule)
class VideoPlaybackModule: NSObject {
  private weak var activeNavigationController: UINavigationController?
  private weak var activePlayerViewController: AVPlayerViewController?
  private var activePlayer: AVPlayer?

  @objc
  static func requiresMainQueueSetup() -> Bool {
    return true
  }

  @objc(present:title:resolver:rejecter:)
  func present(
    _ urlString: String,
    title: String?,
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    DispatchQueue.main.async { [weak self] in
      guard let self else { return }
      guard let url = URL(string: urlString) else {
        reject("invalid_video_url", "Unable to play this video.", nil)
        return
      }

      self.dismissCurrentPlayerIfNeeded(animated: false) { [weak self] in
        guard let self else { return }
        guard let presenter = Self.topViewController() else {
          reject("missing_presenter", "Unable to present the video player.", nil)
          return
        }

        do {
          try self.configurePlaybackSession()
        } catch {
          reject("audio_session_failed", "Unable to prepare video playback: \(error.localizedDescription)", error)
          return
        }

        let player = AVPlayer(url: url)
        player.isMuted = false
        player.volume = 1.0
        let playerViewController = AVPlayerViewController()
        playerViewController.player = player
        playerViewController.showsPlaybackControls = true
        playerViewController.allowsPictureInPicturePlayback = true
        playerViewController.canStartPictureInPictureAutomaticallyFromInline = true
        playerViewController.exitsFullScreenWhenPlaybackEnds = false
        playerViewController.navigationItem.title = Self.normalizedTitle(title)
        playerViewController.navigationItem.leftBarButtonItem = UIBarButtonItem(
          barButtonSystemItem: .done,
          target: self,
          action: #selector(VideoPlaybackModule.handleCloseButton)
        )

        let navigationController = UINavigationController(rootViewController: playerViewController)
        navigationController.modalPresentationStyle = .fullScreen

        self.activePlayer = player
        self.activePlayerViewController = playerViewController
        self.activeNavigationController = navigationController

        presenter.present(navigationController, animated: true) {
          player.play()
          resolve(nil)
        }
      }
    }
  }

  @objc(dismiss:rejecter:)
  func dismiss(
    _ resolve: @escaping RCTPromiseResolveBlock,
    rejecter _reject: @escaping RCTPromiseRejectBlock
  ) {
    DispatchQueue.main.async { [weak self] in
      self?.dismissCurrentPlayerIfNeeded {
        resolve(nil)
      }
    }
  }

  @objc
  private func handleCloseButton() {
    dismissCurrentPlayerIfNeeded()
  }

  private func dismissCurrentPlayerIfNeeded(animated: Bool = true, completion: (() -> Void)? = nil) {
    let cleanup = { [weak self] in
      self?.activePlayer?.pause()
      self?.activePlayerViewController?.player = nil
      self?.activePlayer = nil
      self?.activePlayerViewController = nil
      self?.activeNavigationController = nil
      try? AVAudioSession.sharedInstance().setActive(false, options: .notifyOthersOnDeactivation)
      completion?()
    }

    guard let navigationController = activeNavigationController,
          navigationController.presentingViewController != nil else {
      cleanup()
      return
    }

    navigationController.dismiss(animated: animated) {
      cleanup()
    }
  }

  private static func normalizedTitle(_ title: String?) -> String {
    let trimmed = title?.trimmingCharacters(in: .whitespacesAndNewlines) ?? ""
    return trimmed.isEmpty ? "Video" : trimmed
  }

  private func configurePlaybackSession() throws {
    let session = AVAudioSession.sharedInstance()

    do {
      try session.setCategory(.playback, mode: .moviePlayback, options: [])
      try session.setActive(true)
    } catch {
      try session.setCategory(.playAndRecord, mode: .moviePlayback, options: [.defaultToSpeaker, .allowBluetooth])
      try session.setActive(true)
    }
  }

  private static func topViewController(base: UIViewController? = nil) -> UIViewController? {
    let baseController: UIViewController?
    if let base {
      baseController = base
    } else {
      baseController = UIApplication.shared.connectedScenes
        .compactMap { $0 as? UIWindowScene }
        .flatMap { $0.windows }
        .first(where: \.isKeyWindow)?
        .rootViewController
    }

    if let navigationController = baseController as? UINavigationController {
      return topViewController(base: navigationController.visibleViewController)
    }

    if let tabBarController = baseController as? UITabBarController {
      return topViewController(base: tabBarController.selectedViewController)
    }

    if let presentedViewController = baseController?.presentedViewController {
      return topViewController(base: presentedViewController)
    }

    return baseController
  }
}
