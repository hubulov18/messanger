import { IsOptional, IsString, MaxLength } from 'class-validator';

export class FinalizeUploadDto {
  @IsString()
  @MaxLength(128)
  uploadId!: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  checksum?: string;
}
