export type AuthContextDto = {
  userId: string;
  deviceId: string;
  sessionId?: string | null;
  clientType?: 'ios' | 'android' | 'web' | 'desktop' | 'unknown' | null;
};
