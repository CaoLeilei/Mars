import { Injectable, Logger, UnauthorizedException } from '@nestjs/common'
import { EntityRepository } from '@mikro-orm/core'
import { InjectRepository } from '@mikro-orm/nestjs'

import type { JwtSignOptions } from '@nestjs/jwt'
import { JwtService } from '@nestjs/jwt'
import { TokenExpiredError } from 'jsonwebtoken'

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
    loggerService.log(options)

    try {
      const token: string = await this.jwt.signAsync({ ...pick(user, ['roles', 'isTwoFactorEnabled']) }, options)
      return token
    } catch (err) {
      console.log(err)
      throw err
    }
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

  /**
   * It takes a refresh token payload, extracts the token ID from it, and then uses that token ID to
   * find the corresponding refresh token in the database
   * @param payload - IJwtPayload
   * @returns Observable<RefreshToken | null>
   */
  async getStoredTokenFromRefreshTokenPayload(payload: JwtPayload): Promise<RefreshToken | null> {
    const tokenId = payload.jti

    if (!tokenId) {
      throw new UnauthorizedException(
        translate('exception.refreshToken', {
          args: { error: 'malformed' },
        }),
      )
    }

    return await this.refreshTokenRepository.findTokenById(tokenId)
  }

  /**
   * It takes a refresh token payload, extracts the user ID from it, and then returns an observable of
   * the user with that ID
   * @param payload - IJwtPayload
   * @returns A user object
   */
  async getUserFromRefreshTokenPayload(payload: JwtPayload): Promise<User> {
    const subId = payload.sub

    if (!subId) {
      throw new UnauthorizedException(
        translate('exception.refreshToken', {
          args: { error: 'malformed' },
        }),
      )
    }

    return await this.userRepository.findOneOrFail({
      id: subId,
    })
  }

  /**
   * It takes an encoded refresh token, decodes it, finds the user and token in the database, and
   * returns them
   * @param encoded - string - The encoded refresh token
   * @returns An object with a user and a token.
   */
  async resolveRefreshToken(encoded: string): Promise<{ user: User; token: RefreshToken }> {
    const payload = await this.decodeRefreshToken(encoded)
    const token = await this.getStoredTokenFromRefreshTokenPayload(payload)
    if (!token) {
      throw new UnauthorizedException(
        translate('exception.refreshToken', {
          args: { error: 'not found' },
        }),
      )
    }
    if (token.isRevoked) {
      throw new UnauthorizedException(
        translate('exception.refreshToken', {
          args: { error: 'revoked' },
        }),
      )
    }

    const user = await this.getUserFromRefreshTokenPayload(payload)
    if (!user) {
      throw new UnauthorizedException(
        translate('exception.refreshToken', {
          args: { error: 'malformed' },
        }),
      )
    }
    return { user, token }
  }

  async createAccessTokenFromRefreshToken(refresh: string): Promise<{ token: string; user: User }> {
    const { user } = await this.resolveRefreshToken(refresh)
    const token = await this.generateAccessToken(user)
    return { token, user }
  }
}
