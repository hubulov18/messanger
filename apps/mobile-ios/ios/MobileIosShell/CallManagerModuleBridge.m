#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface RCT_EXTERN_MODULE(CallManagerModule, RCTEventEmitter)

RCT_EXTERN_METHOD(configure:(BOOL)enableVoipPush)
RCT_EXTERN_METHOD(getVoipPushToken:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(reportIncomingCall:(NSString *)callId handle:(NSString *)handle displayName:(NSString * _Nullable)displayName hasVideo:(BOOL)hasVideo resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(startOutgoingCall:(NSString *)callId handle:(NSString *)handle displayName:(NSString * _Nullable)displayName hasVideo:(BOOL)hasVideo resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(markCallConnected:(NSString *)callId resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(endCall:(NSString *)callId resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(setMuted:(NSString *)callId isMuted:(BOOL)isMuted resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(setSpeakerEnabled:(BOOL)enabled resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(ensureCallAudioSession:(BOOL)speakerEnabled hasVideo:(BOOL)hasVideo resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)

@end
