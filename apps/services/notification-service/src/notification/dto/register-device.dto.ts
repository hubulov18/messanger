import { IsIn, IsOptional, IsString } from 'class-validator';

const platforms = ['ios', 'android', 'web'] as const;

export class RegisterDeviceDto {
  @IsString()
  @IsIn(platforms)
  platform!: (typeof platforms)[number];

  @IsString()
  deviceId!: string;

  @IsOptional()
  @IsString()
  pushToken?: string | null;

  @IsOptional()
  @IsString()
  voipPushToken?: string | null;

  @IsOptional()
  @IsString()
  appVersion?: string;
}
