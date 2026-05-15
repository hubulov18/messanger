import { IsIn, IsString } from 'class-validator';

const scopes = ['for_me', 'for_everyone'] as const;

export class DeleteMessageDto {
  @IsString()
  @IsIn(scopes)
  scope!: (typeof scopes)[number];
}
