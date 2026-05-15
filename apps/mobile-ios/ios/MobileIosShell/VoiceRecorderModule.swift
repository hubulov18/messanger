import AVFoundation
import Foundation
import React

@objc(VoiceRecorderModule)
class VoiceRecorderModule: NSObject {
  private var recorder: AVAudioRecorder?
  private var recordingURL: URL?

  @objc
  static func requiresMainQueueSetup() -> Bool {
    return false
  }

  @objc(startRecording:rejecter:)
  func startRecording(
    _ resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    if recorder?.isRecording == true {
      reject("recording_in_progress", "A voice recording is already in progress.", nil)
      return
    }

    AVAudioSession.sharedInstance().requestRecordPermission { [weak self] granted in
      guard let self else {
        return
      }

      guard granted else {
        reject("microphone_permission_denied", "Allow microphone access to record voice messages.", nil)
        return
      }

      do {
        let session = AVAudioSession.sharedInstance()
        try session.setCategory(.playAndRecord, mode: .spokenAudio, options: [.defaultToSpeaker, .allowBluetooth])
        try session.setActive(true)

        let url = self.makeRecordingURL()
        let settings: [String: Any] = [
          AVFormatIDKey: Int(kAudioFormatMPEG4AAC),
          AVSampleRateKey: 44_100,
          AVNumberOfChannelsKey: 1,
          AVEncoderAudioQualityKey: AVAudioQuality.high.rawValue,
        ]

        let recorder = try AVAudioRecorder(url: url, settings: settings)
        recorder.prepareToRecord()

        guard recorder.record() else {
          reject("recording_start_failed", "Unable to start voice recording.", nil)
          return
        }

        self.recorder = recorder
        self.recordingURL = url
        resolve(nil)
      } catch {
        reject("recording_start_failed", "Unable to start voice recording.", error)
      }
    }
  }

  @objc(stopRecording:rejecter:)
  func stopRecording(
    _ resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    guard let recorder, let recordingURL else {
      reject("recording_not_started", "No voice recording is in progress.", nil)
      return
    }

    let durationMs = Int(recorder.currentTime * 1000)
    recorder.stop()
    self.recorder = nil
    self.recordingURL = nil

    do {
      let attributes = try FileManager.default.attributesOfItem(atPath: recordingURL.path)
      let fileSize = (attributes[.size] as? NSNumber)?.intValue ?? 0

      try AVAudioSession.sharedInstance().setActive(false, options: .notifyOthersOnDeactivation)

      resolve([
        "localId": "audio_\(Int(Date().timeIntervalSince1970 * 1000))",
        "kind": "audio",
        "uri": recordingURL.absoluteString,
        "fileName": "Voice message.m4a",
        "mimeType": "audio/mp4",
        "fileSizeBytes": fileSize,
        "durationMs": durationMs,
      ])
    } catch {
      reject("recording_finalize_failed", "Unable to finalize voice recording.", error)
    }
  }

  @objc(cancelRecording:rejecter:)
  func cancelRecording(
    _ resolve: @escaping RCTPromiseResolveBlock,
    rejecter _reject: @escaping RCTPromiseRejectBlock
  ) {
    if let recorder {
      recorder.stop()
    }

    if let recordingURL {
      try? FileManager.default.removeItem(at: recordingURL)
    }

    self.recorder = nil
    self.recordingURL = nil
    try? AVAudioSession.sharedInstance().setActive(false, options: .notifyOthersOnDeactivation)
    resolve(nil)
  }

  private func makeRecordingURL() -> URL {
    let fileName = "voice_\(UUID().uuidString).m4a"
    return FileManager.default.temporaryDirectory.appendingPathComponent(fileName)
  }
}
