import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateChatDto {
  @IsOptional()
  @IsString()
  @MaxLength(80)
  title?: string;

  @IsOptional()
  @IsString()
  @MaxLength(160)
  description?: string;

  @IsOptional()
  @IsString()
  photoMediaId?: string | null;
}
