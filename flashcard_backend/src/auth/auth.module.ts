import { Module } from '@nestjs/common';

import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
//import { JwtStrategy } from './jwt.strategy';
//mport { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    PassportModule,

  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
