import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDTO } from '../../common/dto/user';
import { AppErrors } from '../../common/errors';
import * as bcrypt from 'bcrypt';
import {
  APP_SELECT_FIELDS,
  USER_SELECT_FIELDS,
} from '../../common/prisma-select-fields/user';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  public async createUser(dto: CreateUserDTO) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (user) {
      throw new BadRequestException(AppErrors.USER_EXIST);
    }
    dto.password = await this.hashPassword(dto.password, 10);
    return this.prisma.user.create({
      data: {
        name: dto.name,
        email: dto.email,
        password: dto.password,
      },
      select: USER_SELECT_FIELDS,
    });
  }
  getPublicUser(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
      select: USER_SELECT_FIELDS,
    });
  }
  getUserByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
      select: APP_SELECT_FIELDS,
    });
  }
  private async hashPassword(password: string, salt: number) {
    return bcrypt.hash(password, salt);
  }
}
