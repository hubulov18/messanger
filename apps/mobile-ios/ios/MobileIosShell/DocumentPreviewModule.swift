import Foundation
import QuickLook
import React
import UIKit
import UniformTypeIdentifiers

@objc(DocumentPreviewModule)
class DocumentPreviewModule: NSObject, QLPreviewControllerDataSource, QLPreviewControllerDelegate {
  private weak var activeNavigationController: UINavigationController?
  private weak var activePreviewController: QLPreviewController?
  private var previewItemUrl: URL?
  private var previewTitle: String?

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
    let trimmed = urlString.trimmingCharacters(in: .whitespacesAndNewlines)
    guard !trimmed.isEmpty else {
      reject("invalid_document_url", "Unable to preview this file.", nil)
      return
    }

    if let localUrl = Self.localFileUrl(from: trimmed) {
      DispatchQueue.main.async { [weak self] in
        self?.presentPreview(for: localUrl, title: title, resolver: resolve, rejecter: reject)
      }
      return
    }

    guard let remoteUrl = URL(string: trimmed) else {
      reject("invalid_document_url", "Unable to preview this file.", nil)
      return
    }

    downloadRemoteFile(remoteUrl, title: title, resolver: resolve, rejecter: reject)
  }

  @objc(dismiss:rejecter:)
  func dismiss(
    _ resolve: @escaping RCTPromiseResolveBlock,
    rejecter _reject: @escaping RCTPromiseRejectBlock
  ) {
    DispatchQueue.main.async { [weak self] in
      self?.dismissCurrentPreviewIfNeeded {
        resolve(nil)
      }
    }
  }

  @objc
  private func handleCloseButton() {
    dismissCurrentPreviewIfNeeded()
  }

  private func downloadRemoteFile(
    _ remoteUrl: URL,
    title: String?,
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    let task = URLSession.shared.downloadTask(with: remoteUrl) { [weak self] temporaryUrl, response, error in
      if let error {
        reject("document_download_failed", "Unable to download this file: \(error.localizedDescription)", error)
        return
      }

      guard let temporaryUrl else {
        reject("document_download_failed", "Unable to download this file.", nil)
        return
      }

      let preparedTitle = Self.normalizedTitle(title, fallbackUrl: remoteUrl)
      let fileExtension = Self.resolveFileExtension(
        remoteUrl: remoteUrl,
        temporaryUrl: temporaryUrl,
        response: response,
        title: preparedTitle
      )
      let destinationUrl = FileManager.default.temporaryDirectory
        .appendingPathComponent(UUID().uuidString)
        .appendingPathExtension(fileExtension.isEmpty ? "tmp" : fileExtension)

      do {
        if FileManager.default.fileExists(atPath: destinationUrl.path) {
          try FileManager.default.removeItem(at: destinationUrl)
        }
        try FileManager.default.moveItem(at: temporaryUrl, to: destinationUrl)
      } catch {
        reject("document_prepare_failed", "Unable to prepare this file for preview.", error)
        return
      }

      DispatchQueue.main.async { [weak self] in
        self?.presentPreview(for: destinationUrl, title: preparedTitle, resolver: resolve, rejecter: reject)
      }
    }

    task.resume()
  }

  private func presentPreview(
    for url: URL,
    title: String?,
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    dismissCurrentPreviewIfNeeded(animated: false) { [weak self] in
      guard let self else { return }
      guard let presenter = Self.topViewController() else {
        reject("missing_presenter", "Unable to present the document preview.", nil)
        return
      }

      self.previewItemUrl = url
      self.previewTitle = Self.normalizedTitle(title, fallbackUrl: url)

      let previewController = QLPreviewController()
      previewController.dataSource = self
      previewController.delegate = self
      previewController.currentPreviewItemIndex = 0
      previewController.navigationItem.title = self.previewTitle
      previewController.navigationItem.leftBarButtonItem = UIBarButtonItem(
        barButtonSystemItem: .done,
        target: self,
        action: #selector(DocumentPreviewModule.handleCloseButton)
      )

      let navigationController = UINavigationController(rootViewController: previewController)
      navigationController.modalPresentationStyle = .fullScreen

      self.activePreviewController = previewController
      self.activeNavigationController = navigationController

      presenter.present(navigationController, animated: true) {
        resolve(nil)
      }
    }
  }

  private func dismissCurrentPreviewIfNeeded(animated: Bool = true, completion: (() -> Void)? = nil) {
    let cleanup = { [weak self] in
      self?.activePreviewController = nil
      self?.activeNavigationController = nil
      self?.previewItemUrl = nil
      self?.previewTitle = nil
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

  func numberOfPreviewItems(in controller: QLPreviewController) -> Int {
    return previewItemUrl == nil ? 0 : 1
  }

  func previewController(_ controller: QLPreviewController, previewItemAt index: Int) -> QLPreviewItem {
    let item = PreviewItem()
    item.previewItemURL = previewItemUrl
    item.previewItemTitle = previewTitle
    return item
  }

  private static func normalizedTitle(_ title: String?, fallbackUrl: URL) -> String {
    let trimmed = title?.trimmingCharacters(in: .whitespacesAndNewlines) ?? ""
    if !trimmed.isEmpty {
      return trimmed
    }

    let fallback = fallbackUrl.deletingPathExtension().lastPathComponent
    return fallback.isEmpty ? "Document" : fallback
  }

  private static func resolveFileExtension(
    remoteUrl: URL,
    temporaryUrl: URL,
    response: URLResponse?,
    title: String
  ) -> String {
    if !remoteUrl.pathExtension.isEmpty {
      return remoteUrl.pathExtension
    }

    if !temporaryUrl.pathExtension.isEmpty {
      return temporaryUrl.pathExtension
    }

    if let suggestedFilename = response?.suggestedFilename {
      let ext = URL(fileURLWithPath: suggestedFilename).pathExtension
      if !ext.isEmpty {
        return ext
      }
    }

    if let mimeType = response?.mimeType,
       let type = UTType(mimeType: mimeType),
       let ext = type.preferredFilenameExtension,
       !ext.isEmpty {
      return ext
    }

    let titleExtension = URL(fileURLWithPath: title).pathExtension
    return titleExtension
  }

  private static func localFileUrl(from urlString: String) -> URL? {
    guard let parsed = URL(string: urlString), parsed.isFileURL else {
      return nil
    }
    return parsed
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

private final class PreviewItem: NSObject, QLPreviewItem {
  var previewItemURL: URL?
  var previewItemTitle: String?
}
