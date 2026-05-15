import { IsString } from 'class-validator';

export class DeleteDirectChatDto {
  @IsString()
  chatId!: string;
}
