import { Injectable, Logger, UnauthorizedException } from '@nestjs/common'
import { EntityRepository } from '@mikro-orm/core'
import { InjectRepository } from '@mikro-orm/nestjs'

import type { JwtSignOptions } from '@nestjs/jwt'
import { JwtService } from '@nestjs/jwt'
import { TokenExpiredError } from 'jsonwebtoken'

import { Observable, from, map, switchMap, catchError } from 'rxjs'
import { pick } from 'helper-fns'

import { User, RefreshToken } from '@entities'
import { translate } from '@libs/i18n/translate'
import type { JwtPayload } from '@common/@types/interfaces/authentication.interface'
import { RefreshTokensRepository } from './refresh-tokens.repository'

const loggerService = new Logger('TokenService')

@Injectable()
export class TokenService {
  private readonly BASE_OPTIONS: JwtSignOptions = {
    issuer: 'nestify',
    audience: 'nestify',
  }
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
    private readonly refreshTokenRepository: RefreshTokensRepository,
    private readonly jwt: JwtService,
  ) {}

  /**
   *
   * @param user 当期那用户相关的信息
   * @returns
   */
  async generateAccessToken(user: Omit<User, 'password'>): Promise<string> {
    const options: JwtSignOptions = {
      ...this.BASE_OPTIONS,
      subject: String(user.id),
    }

    // 输出当前用户的基本信息
    loggerService.log(user)
    loggerService.log(pick(user, ['roles', 'isTwoFactorEnabled']))
    loggerService.log(options)
    const token: string = await this.jwt.signAsync({ ...pick(user, ['roles', 'isTwoFactorEnabled']) }, options)
    return token
  }

  /**
   * 根据当前用户进行生成相对应的刷新TOKEN
   * @param user
   * @param expiresIn
   */
  async generateRefreshToken(user: User, expiresIn: number): Promise<string> {
    const token = await this.refreshTokenRepository.createRefreshToken(user, expiresIn)

    const options: JwtSignOptions = {
      ...this.BASE_OPTIONS,
      expiresIn,
      subject: String(user.id),
      jwtid: String(token.id),
    }
    return await this.jwt.signAsync({}, options)
  }

  // resolveRefreshToken(encoded: string):  Observable<{ user: User; token: RefreshToken }> {
  //   // return from({user: new User(), })
  // }

  /**
   * It decodes the refresh token and throws an error if the token is expired or malformed
   * @param token - The refresh token to decode.
   * @returns The payload of the token.
   */
  async decodeRefreshToken(token: string): Promise<JwtPayload> {
    try {
      const payload = await this.jwt.verifyAsync(token)
      return payload
    } catch (err) {
      if (err instanceof TokenExpiredError) {
        throw new UnauthorizedException(
          translate('exception.refreshToken', {
            args: { error: 'expired' },
          }),
        )
      } else {
        throw new UnauthorizedException(
          translate('exception.refreshToken', {
            args: { error: 'malformed' },
          }),
        )
      }
    }
  }
}
