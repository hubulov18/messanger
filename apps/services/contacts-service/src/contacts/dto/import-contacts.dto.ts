import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, IsString, ValidateNested } from 'class-validator';

export class ImportedContactDto {
  @IsString()
  normalizedHash!: string;

  @IsString()
  phoneNumber!: string;

  @IsString()
  displayName!: string;
}

export class ImportContactsDto {
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => ImportedContactDto)
  contacts!: ImportedContactDto[];
}
