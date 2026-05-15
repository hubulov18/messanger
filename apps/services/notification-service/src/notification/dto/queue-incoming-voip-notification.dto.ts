import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class QueueIncomingVoipNotificationDto {
  @IsString()
  callId!: string;

  @IsString()
  chatId!: string;

  @IsString()
  targetUserId!: string;

  @IsString()
  callerUserId!: string;

  @IsString()
  callerDisplayName!: string;

  @IsOptional()
  @IsString()
  callerUsername?: string;

  @IsString()
  callType!: 'audio' | 'video';

  @IsString()
  startedAt!: string;

  @IsInt()
  @Min(1)
  ringTimeoutMs!: number;
}
