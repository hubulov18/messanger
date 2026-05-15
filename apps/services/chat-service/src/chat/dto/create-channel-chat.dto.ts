import { IsOptional, IsString } from 'class-validator';

export class CreateChannelChatDto {
  @IsString()
  title!: string;

  @IsOptional()
  @IsString()
  description?: string;
}
