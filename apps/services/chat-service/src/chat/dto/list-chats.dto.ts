import { Transform } from 'class-transformer';
import { IsOptional, IsString, Max, Min } from 'class-validator';

export class ListChatsDto {
  @IsOptional()
  @IsString()
  cursor?: string;

  @IsOptional()
  @Transform(({ value }) => Number.parseInt(value, 10))
  @Min(1)
  @Max(100)
  limit?: number = 20;
}
