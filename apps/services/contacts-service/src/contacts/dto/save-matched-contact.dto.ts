import { IsString } from 'class-validator';

export class SaveMatchedContactDto {
  @IsString()
  userId!: string;
}
