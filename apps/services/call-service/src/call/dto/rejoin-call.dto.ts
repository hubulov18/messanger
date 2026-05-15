import { IsBoolean, IsOptional } from 'class-validator';

export class RejoinCallDto {
  @IsBoolean()
  @IsOptional()
  restartMedia?: boolean;
}
