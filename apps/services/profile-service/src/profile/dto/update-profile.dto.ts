import { Transform } from 'class-transformer';
import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  @MinLength(4)
  @MaxLength(32)
  @Transform(({ value }) => (typeof value === 'string' ? value.trim().toLowerCase() : value))
  username?: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(80)
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  displayName?: string;

  @IsOptional()
  @IsString()
  @MaxLength(160)
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  bio?: string | null;

  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(128)
  avatarMediaId?: string | null;
}
