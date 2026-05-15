import AVFoundation
import Foundation
import React

@objc(VoicePlaybackModule)
class VoicePlaybackModule: NSObject {
  private var player: AVPlayer?
  private var currentURLString: String?
  private var playbackObserver: NSObjectProtocol?

  @objc
  static func requiresMainQueueSetup() -> Bool {
    return false
  }

  @objc(play:resolver:rejecter:)
  func play(
    _ urlString: String,
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    guard let url = URL(string: urlString) else {
      reject("invalid_audio_url", "Unable to play this voice message.", nil)
      return
    }

    stopCurrentPlayback(shouldDeactivateSession: false)

    do {
      try configurePlaybackSession()
    } catch {
      reject("audio_session_failed", "Unable to prepare audio playback: \(error.localizedDescription)", error)
      return
    }

    let player = AVPlayer(url: url)

    playbackObserver = NotificationCenter.default.addObserver(
      forName: .AVPlayerItemDidPlayToEndTime,
      object: player.currentItem,
      queue: OperationQueue.main
    ) { [weak self] _ in
      self?.stopCurrentPlayback()
    }

    self.player = player
    self.currentURLString = urlString
    player.play()
    resolve(nil)
  }

  @objc(stop:rejecter:)
  func stop(
    _ resolve: @escaping RCTPromiseResolveBlock,
    rejecter _reject: @escaping RCTPromiseRejectBlock
  ) {
    stopCurrentPlayback()
    resolve(nil)
  }

  @objc(getPlaybackState:rejecter:)
  func getPlaybackState(
    _ resolve: @escaping RCTPromiseResolveBlock,
    rejecter _reject: @escaping RCTPromiseRejectBlock
  ) {
    let state: [String: Any] = [
      "isPlaying": (player?.rate ?? 0) > 0,
      "url": currentURLString as Any,
    ]

    resolve(state)
  }

  private func stopCurrentPlayback(shouldDeactivateSession: Bool = true) {
    player?.pause()
    player?.replaceCurrentItem(with: nil)
    player = nil
    currentURLString = nil

    if let observer = playbackObserver {
      NotificationCenter.default.removeObserver(observer)
      self.playbackObserver = nil
    }

    if shouldDeactivateSession {
      try? AVAudioSession.sharedInstance().setActive(false, options: .notifyOthersOnDeactivation)
    }
  }

  private func configurePlaybackSession() throws {
    let session = AVAudioSession.sharedInstance()

    do {
      try session.setCategory(.playback, mode: .spokenAudio, options: [])
      try session.setActive(true)
    } catch {
      try session.setCategory(.playAndRecord, mode: .spokenAudio, options: [.defaultToSpeaker, .allowBluetooth])
      try session.setActive(true)
    }
  }
}
