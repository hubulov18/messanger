import { IsIn, IsInt, IsOptional, IsString, MaxLength, Min } from 'class-validator';

export class CreateUploadSessionDto {
  @IsIn(['image', 'video', 'audio', 'file', 'avatar'])
  mediaType!: 'image' | 'video' | 'audio' | 'file' | 'avatar';

  @IsString()
  @MaxLength(255)
  fileName!: string;

  @IsString()
  @MaxLength(255)
  mimeType!: string;

  @IsInt()
  @Min(1)
  sizeBytes!: number;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  checksum?: string;
}
