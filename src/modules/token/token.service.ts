import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TokenFields } from '../../common/interfaces/auth';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  public async generateJwtToken(payloadUser: TokenFields): Promise<string> {
    return this.jwtService.sign(payloadUser, {
      secret: this.configService.get<string>('secret'),
      expiresIn: this.configService.get<string>('expireJwt'),
    });
  }
}
