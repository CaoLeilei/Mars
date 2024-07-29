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
   * 根据刷新令牌负载异步获取存储的令牌。
   *
   * 此方法旨在通过刷新令牌的唯一标识符（jti）从数据库中检索对应的刷新令牌。
   * 如果找不到有效的令牌标识符，则抛出未授权异常。
   *
   * @param payload JwtPayload 类型的参数，包含刷新令牌的唯一标识符（jti）。
   * @returns 返回 RefreshToken 类型的对象，表示找到的刷新令牌；如果没有找到，则返回 null。
   * @throws 如果 tokenId 不存在，则抛出 UnauthorizedException 异常。
   */
  async getStoredTokenFromRefreshTokenPayload(payload: JwtPayload): Promise<RefreshToken | null> {
    const tokenId = payload.jti

    // 检查 tokenId 是否存在，如果不存在则抛出未授权异常
    if (!tokenId) {
      throw new UnauthorizedException(
        translate('exception.refreshToken', {
          args: { error: 'malformed' },
        }),
      )
    }

    // 通过 tokenId 从 refreshTokenRepository 中查找并返回对应的刷新令牌
    return await this.refreshTokenRepository.findTokenById(tokenId)
  }

  /**
   * 根据刷新令牌的有效载荷异步获取用户信息。
   *
   * @param payload JwtPayload 类型的参数，代表令牌的有效载荷。
   * @returns 返回一个 Promise，解析为 User 类型的实例，代表获取到的用户信息。
   * @throws 如果有效载荷中没有 sub 字段，抛出 UnauthorizedException 异常，提示令牌格式错误。
   */
  async getUserFromRefreshTokenPayload(payload: JwtPayload): Promise<User> {
    // 从令牌有效载荷中提取用户ID
    const subId = payload.sub

    // 检查 subId 是否存在，如果不存在则抛出未授权异常
    if (!subId) {
      throw new UnauthorizedException(
        translate('exception.refreshToken', {
          args: { error: 'malformed' },
        }),
      )
    }

    // 根据用户ID从数据库中查找并返回用户信息
    return await this.userRepository.findOneOrFail({
      id: subId,
    })
  }

  /**
   * 使用刷新令牌解析用户信息和新的访问令牌。
   *
   * @param encoded 刷新令牌的编码字符串。
   * @returns 返回包含用户信息和刷新令牌的对象。
   *
   * 此函数首先解码刷新令牌，然后验证令牌的有效性。
   * 如果令牌无效或已被吊销，则抛出未授权异常。
   * 如果令牌有效，则获取关联的用户信息。
   * 最后，返回包含用户信息和刷新令牌的对象。
   */
  async resolveRefreshToken(encoded: string): Promise<{ user: User; token: RefreshToken }> {
    // 解码刷新令牌以获取载荷信息。
    const payload = await this.decodeRefreshToken(encoded)
    // 根据刷新令牌载荷获取存储的令牌对象。
    const token = await this.getStoredTokenFromRefreshTokenPayload(payload)
    // 如果存储的令牌不存在，则抛出未授权异常。
    if (!token) {
      throw new UnauthorizedException(
        translate('exception.refreshToken', {
          args: { error: 'not found' },
        }),
      )
    }
    // 如果存储的令牌已被吊销，则抛出未授权异常。
    if (token.isRevoked) {
      throw new UnauthorizedException(
        translate('exception.refreshToken', {
          args: { error: 'revoked' },
        }),
      )
    }

    // 根据刷新令牌载荷获取用户信息。
    const user = await this.getUserFromRefreshTokenPayload(payload)
    // 如果无法获取有效的用户信息，则抛出未授权异常。
    if (!user) {
      throw new UnauthorizedException(
        translate('exception.refreshToken', {
          args: { error: 'malformed' },
        }),
      )
    }
    // 返回包含用户信息和刷新令牌的对象。
    return { user, token }
  }

  /**
   * 使用刷新令牌生成访问令牌。
   *
   * 此异步函数接收一个刷新令牌作为参数，通过解析刷新令牌来获取用户信息，
   * 然后使用这些用户信息生成一个新的访问令牌。最后，它返回包含新生成的访问令牌和用户信息的对象。
   *
   * @param refresh 刷新令牌，用于获取用户信息。
   * @returns 返回一个Promise，解析为一个包含访问令牌和用户的对象。
   */
  async createAccessTokenFromRefreshToken(refresh: string): Promise<{ token: string; user: User }> {
    // 解析刷新令牌以获取用户信息。
    const { user } = await this.resolveRefreshToken(refresh)
    // 使用获取的用户信息生成新的访问令牌。
    const token = await this.generateAccessToken(user)
    // 返回新的访问令牌和用户信息。
    return { token, user }
  }
}
