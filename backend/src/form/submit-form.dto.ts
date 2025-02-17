import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SubmitFormDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  cep: string;
}
