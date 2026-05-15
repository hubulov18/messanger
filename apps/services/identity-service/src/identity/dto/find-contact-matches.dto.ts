import { ArrayMinSize, IsArray, IsString } from 'class-validator';

export class FindContactMatchesDto {
  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  hashes!: string[];
}
