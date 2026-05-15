import { IsString } from 'class-validator';

export class EditMessageDto {
  @IsString()
  text!: string;
}
