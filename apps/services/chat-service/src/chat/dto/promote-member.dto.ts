import { IsBoolean, IsOptional, IsString, MaxLength } from 'class-validator';

export class PromoteMemberDto {
  // AdminPermissions flags — actor's own flags act as ceiling (no escalation)
  @IsOptional()
  @IsBoolean()
  canChangeInfo?: boolean;

  @IsOptional()
  @IsBoolean()
  canDeleteMessages?: boolean;

  @IsOptional()
  @IsBoolean()
  canBanUsers?: boolean;

  @IsOptional()
  @IsBoolean()
  canInviteUsers?: boolean;

  @IsOptional()
  @IsBoolean()
  canPinMessages?: boolean;

  @IsOptional()
  @IsBoolean()
  canManageAdmins?: boolean;

  @IsOptional()
  @IsBoolean()
  canPostMessages?: boolean;

  @IsOptional()
  @IsBoolean()
  canEditMessages?: boolean;

  @IsOptional()
  @IsBoolean()
  canManageVoiceChats?: boolean;

  @IsOptional()
  @IsBoolean()
  isAnonymous?: boolean;

  @IsOptional()
  @IsString()
  @MaxLength(16)
  customTitle?: string;
}
