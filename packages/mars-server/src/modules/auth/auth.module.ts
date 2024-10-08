import { Module, Post } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { UsersModule } from '@modules/users/users.module'
import { TokenService } from '@libs/token/token.service'
import { RefreshTokensRepository } from '@libs/token/refresh-tokens.repository'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { JwtStrategy } from './strategies'

@Module({
  imports: [PassportModule, UsersModule],
  controllers: [AuthController],
  providers: [AuthService, TokenService, RefreshTokensRepository, JwtStrategy],
  exports: [AuthService, JwtStrategy, TokenService, RefreshTokensRepository],
})
export class AuthModule {}
