#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(VoicePlaybackModule, NSObject)

RCT_EXTERN_METHOD(play:(NSString *)urlString resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(stop:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(getPlaybackState:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)

@end
