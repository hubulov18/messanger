import { IsOptional, IsString } from 'class-validator';

export class QueueMessageNotificationDto {
  @IsString()
  messageId!: string;

  @IsString()
  chatId!: string;

  @IsString()
  senderUserId!: string;

  @IsString()
  senderDisplayName!: string;

  @IsOptional()
  @IsString()
  messagePreview?: string;
}
