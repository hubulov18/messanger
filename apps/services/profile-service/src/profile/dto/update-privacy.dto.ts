import { IsEnum, IsOptional } from 'class-validator';

export enum VisibilityDto {
  everyone = 'everyone',
  contacts = 'contacts',
  nobody = 'nobody',
}

export class UpdatePrivacyDto {
  @IsOptional()
  @IsEnum(VisibilityDto)
  lastSeenVisibility?: VisibilityDto;

  @IsOptional()
  @IsEnum(VisibilityDto)
  phoneVisibility?: VisibilityDto;

  @IsOptional()
  @IsEnum(VisibilityDto)
  profilePhotoVisibility?: VisibilityDto;
}
