import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDTO, LoginUserDTO } from '../../common/dto/user';
import { TokenService } from '../token/token.service';
import { AppErrors } from '../../common/errors';
import * as bcrypt from 'bcrypt';
import { use } from 'passport';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {}

  public async registerUser(dto: CreateUserDTO) {
    const newUser = await this.userService.createUser(dto);
    const token = await this.tokenService.generateJwtToken({
      email: dto.email,
    });
    return { ...newUser, token };
  }
  public async loginUser(dto: LoginUserDTO) {
    const user = await this.userService.getUserByEmail(dto.email);
    if (!user) {
      throw new BadRequestException(AppErrors.USER_NOT_EXIST);
    }
    const comparePassword: boolean = await bcrypt.compare(
      dto.password,
      user.password,
    );
    if (!comparePassword) {
      throw new BadRequestException(AppErrors.INVALID_PASSWORD);
    }
    const token = await this.tokenService.generateJwtToken({
      email: dto.email,
    });
    delete user.password;
    return { ...user, token };
  }
}
