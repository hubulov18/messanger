import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateChatPermissionsDto {
  @IsOptional()
  @IsBoolean()
  canSendMessages?: boolean;

  @IsOptional()
  @IsBoolean()
  canAddMembers?: boolean;
}
