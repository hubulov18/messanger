import { IsPhoneNumber } from 'class-validator';

export class StartRegistrationDto {
  @IsPhoneNumber()
  phoneNumber!: string;
}
