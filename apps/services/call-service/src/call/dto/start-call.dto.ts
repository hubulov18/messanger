import { IsEnum, IsOptional, IsString } from 'class-validator';

export type CallType = 'audio' | 'video';

export class StartCallDto {
  @IsString()
  chatId!: string;

  @IsEnum(['audio', 'video'])
  @IsOptional()
  callType?: CallType;
}
