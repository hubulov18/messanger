import { IsIn, IsString, Length } from 'class-validator';

const clientTypes = ['ios', 'android', 'web', 'desktop'] as const;

export class VerifyOtpDto {
  @IsString()
  challengeId!: string;

  @IsString()
  @Length(4, 8)
  code!: string;

  @IsString()
  deviceId!: string;

  @IsString()
  @IsIn(clientTypes)
  clientType!: (typeof clientTypes)[number];
}
