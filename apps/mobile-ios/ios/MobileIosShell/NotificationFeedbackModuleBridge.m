#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(NotificationFeedbackModule, NSObject)

RCT_EXTERN_METHOD(playNotificationSound:(NSString *)sound resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)

@end
