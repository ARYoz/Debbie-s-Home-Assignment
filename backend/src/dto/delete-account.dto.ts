import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class DeleteAccountDto {
  @IsString()
  @IsNotEmpty({ message: 'email is required' })
  @IsEmail({}, { message: 'email must be a valid email address' })
  email: string;
}
