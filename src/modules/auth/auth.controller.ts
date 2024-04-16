import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDTO, LoginUserDTO } from '../../common/dto/user';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  public async registerUser(@Body() dto: CreateUserDTO) {
    return await this.authService.registerUser(dto);
  }
  @Get('login')
  loginUser(@Body() dto: LoginUserDTO) {
    return this.authService.loginUser(dto);
  }
}
