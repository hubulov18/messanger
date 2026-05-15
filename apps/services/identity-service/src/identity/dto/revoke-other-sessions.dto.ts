import { IsOptional, IsString } from 'class-validator';

export class RevokeOtherSessionsDto {
  @IsOptional()
  @IsString()
  keepSessionId?: string;
}
