import { Type } from 'class-transformer';
import { ArrayMaxSize, IsArray, IsIn, IsOptional, IsString, ValidateNested } from 'class-validator';

const messageTypes = ['text', 'image', 'video', 'audio', 'file', 'system'] as const;

class MessageAttachmentDto {
  @IsString()
  mediaId!: string;

  @IsString()
  attachmentType!: string;
}

export class SendMessageDto {
  @IsString()
  chatId!: string;

  @IsString()
  clientMessageId!: string;

  @IsString()
  @IsIn(messageTypes)
  type!: (typeof messageTypes)[number];

  @IsOptional()
  @IsString()
  text?: string;

  @IsOptional()
  @IsString()
  replyToMessageId?: string;

  @IsOptional()
  @IsString()
  forwardedFromMessageId?: string;

  @IsArray()
  @ArrayMaxSize(10)
  @ValidateNested({ each: true })
  @Type(() => MessageAttachmentDto)
  attachments!: MessageAttachmentDto[];
}
