#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(VideoPlaybackModule, NSObject)

RCT_EXTERN_METHOD(present:(NSString *)urlString title:(NSString * _Nullable)title resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(dismiss:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)

@end
