import { IsString } from 'class-validator';

export class CreateUserDTO {
  @IsString()
  email: string;
  @IsString()
  name: string;
  @IsString()
  password: string;
}
export class LoginUserDTO {
  @IsString()
  password: string;
  @IsString()
  email: string;
}
