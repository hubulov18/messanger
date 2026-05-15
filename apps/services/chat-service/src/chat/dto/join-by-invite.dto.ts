import { IsString, MinLength } from 'class-validator';

export class JoinByInviteDto {
  @IsString()
  @MinLength(6)
  token!: string;
}
