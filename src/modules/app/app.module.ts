import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from '../../configuration';
import { TokenModule } from '../token/token.module';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';
import { CryptomusModule } from '../cryptomus/cryptomus.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TokenModule,
    AuthModule,
    UserModule,
    CryptomusModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
