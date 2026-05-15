import { IsBoolean, IsOptional, IsString, MaxLength } from 'class-validator';

export class BanMemberDto {
  @IsOptional()
  @IsString()
  @MaxLength(255)
  reason?: string;

  @IsOptional()
  @IsBoolean()
  deleteRecentMessages?: boolean;
}
