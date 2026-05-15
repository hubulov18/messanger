import { IsString } from 'class-validator';

export class CreateDirectChatDto {
  @IsString()
  participantUserId!: string;
}
