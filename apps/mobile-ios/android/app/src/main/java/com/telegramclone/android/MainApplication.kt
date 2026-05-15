package com.telegramclone.android

import android.app.Application
import android.app.NotificationChannel
import android.app.NotificationManager
import android.os.Build
import android.media.AudioAttributes
import com.facebook.react.PackageList
import com.facebook.react.ReactApplication
import com.facebook.react.ReactHost
import com.facebook.react.ReactNativeApplicationEntryPoint.loadReactNative
import com.facebook.react.defaults.DefaultReactHost.getDefaultReactHost

class MainApplication : Application(), ReactApplication {

  override val reactHost: ReactHost by lazy {
    getDefaultReactHost(
      context = applicationContext,
      packageList =
        PackageList(this).packages.apply {
          // Packages that cannot be autolinked yet can be added manually here, for example:
          // add(MyReactNativePackage())
        },
    )
  }

  override fun onCreate() {
    super.onCreate()
    createNotificationChannels()
    loadReactNative(this)
  }

  private fun createNotificationChannels() {
    if (Build.VERSION.SDK_INT < Build.VERSION_CODES.O) {
      return
    }

    val notificationManager = getSystemService(NotificationManager::class.java) ?: return
    val messageChannel = NotificationChannel(
      "messages",
      "Messages",
      NotificationManager.IMPORTANCE_HIGH,
    ).apply {
      description = "Chat message notifications"
      enableVibration(true)
    }

    val incomingCallChannel = NotificationChannel(
      "incoming_calls",
      "Incoming calls",
      NotificationManager.IMPORTANCE_HIGH,
    ).apply {
      description = "Incoming call alerts"
      lockscreenVisibility = android.app.Notification.VISIBILITY_PUBLIC
      enableVibration(true)
      setSound(
        android.provider.Settings.System.DEFAULT_RINGTONE_URI,
        AudioAttributes.Builder()
          .setContentType(AudioAttributes.CONTENT_TYPE_SONIFICATION)
          .setUsage(AudioAttributes.USAGE_NOTIFICATION_RINGTONE)
          .build(),
      )
    }

    notificationManager.createNotificationChannels(listOf(messageChannel, incomingCallChannel))
  }
}
