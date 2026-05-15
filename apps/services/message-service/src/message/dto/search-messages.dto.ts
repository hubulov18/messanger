import { Transform } from 'class-transformer';
import { IsOptional, IsString, Max, Min } from 'class-validator';

export class SearchMessagesDto {
  @IsString()
  query!: string;

  @IsOptional()
  @Transform(({ value }) => Number.parseInt(value, 10))
  @Min(1)
  @Max(50)
  limit?: number = 20;
}
