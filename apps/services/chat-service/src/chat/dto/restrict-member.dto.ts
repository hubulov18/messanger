import { IsBoolean, IsIn, IsInt, IsOptional, Min } from 'class-validator';

export class RestrictMemberDto {
  /** Apply a named preset instead of individual flags */
  @IsOptional()
  @IsIn(['mute', 'no_media'])
  preset?: 'mute' | 'no_media';

  // Individual restriction flags (ignored when preset is set)
  @IsOptional()
  @IsBoolean()
  canSendMessages?: boolean;

  @IsOptional()
  @IsBoolean()
  canSendMedia?: boolean;

  @IsOptional()
  @IsBoolean()
  canSendStickersAndGifs?: boolean;

  @IsOptional()
  @IsBoolean()
  canSendPolls?: boolean;

  @IsOptional()
  @IsBoolean()
  canAddLinkPreviews?: boolean;

  @IsOptional()
  @IsBoolean()
  canInviteUsers?: boolean;

  /** Duration in seconds. Omit for permanent restriction. */
  @IsOptional()
  @IsInt()
  @Min(60)
  durationSeconds?: number;
}
