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
  generateAccessToken(user: Omit<User, 'password'>): Observable<string> {
    const options: JwtSignOptions = {
      ...this.BASE_OPTIONS,
      subject: String(user?.id),
    }

    // 输出当前用户的基本信息
    loggerService.log(user)

    return from(this.jwt.signAsync({ ...pick(user, ['roles', 'isTwoFactorEnabled']) }, options))
  }

  /**
   * 根据当前用户进行生成相对应的刷新TOKEN
   * @param user
   * @param expiresIn
   */
  generateRefreshToken(user: User, expiresIn: number): Observable<string> {
    return this.refreshTokenRepository.createRefreshToken(user, expiresIn).pipe(
      switchMap((token) => {
        const options: JwtSignOptions = {
          ...this.BASE_OPTIONS,
          expiresIn,
          subject: String(user.id),
          jwtid: String(token.id),
        }

        return from(this.jwt.signAsync({}, options))
      }),
    )
  }

  // resolveRefreshToken(encoded: string):  Observable<{ user: User; token: RefreshToken }> {
  //   // return from({user: new User(), })
  // }

  /**
   * It decodes the refresh token and throws an error if the token is expired or malformed
   * @param token - The refresh token to decode.
   * @returns The payload of the token.
   */
  decodeRefreshToken(token: string): Observable<JwtPayload> {
    return from(this.jwt.verifyAsync(token)).pipe(
      map((payload: JwtPayload) => payload),
      catchError((error_) => {
        throw error_ instanceof TokenExpiredError
          ? new UnauthorizedException(
              translate('exception.refreshToken', {
                args: { error: 'expired' },
              }),
            )
          : new UnauthorizedException(
              translate('exception.refreshToken', {
                args: { error: 'malformed' },
              }),
            )
      }),
    )
  }
}
