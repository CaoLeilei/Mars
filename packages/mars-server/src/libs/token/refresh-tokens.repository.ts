import { Injectable } from '@nestjs/common'
import { EntityRepository } from '@mikro-orm/core'
import { InjectRepository } from '@mikro-orm/nestjs'
import { EntityManager } from '@mikro-orm/better-sqlite'

import type { User } from '@entities'
import { RefreshToken } from '@entities'

@Injectable()
export class RefreshTokensRepository {
  constructor(
    private readonly em: EntityManager,
    @InjectRepository(RefreshToken)
    private readonly refreshTokenRepository: EntityRepository<RefreshToken>,
  ) {}

  async createRefreshToken(user: User, ttl: number): Promise<RefreshToken> {
    const expiration = new Date()

    // the input is treated as millis so *1000 is necessary
    const ttlSeconds = ttl * 1000 // seconds

    expiration.setTime(expiration.getTime() + ttlSeconds)

    const token = this.refreshTokenRepository.create({
      user: user.id,
      expiresIn: expiration,
    })

    await this.em.persistAndFlush(token)

    return token
  }

  /**
   * 通过ID来进行查找对应的refreshToken，
   * @param tokenId - 我们要进行查找的RefreshToken的id
   * @returns Promise<RefreshToken>
   */
  async findTokenById(tokenId: number): Promise<RefreshToken> {
    const token = await this.refreshTokenRepository.findOneOrFail({
      id: tokenId,
      isRevoked: false,
    })
    return token
  }

  async deleteTokenForUser(user: User): Promise<boolean> {
    await this.refreshTokenRepository.nativeUpdate({ user }, { isRevoked: true })
    return true
  }

  /**
   * 删除refreshToken通过设置isRevoked为true，来进行实现
   * @param user - User - 当前登录的用户以及用户对象
   * @param tokenId - 所需要进行删除的refreshToken的tokenId，.
   * @returns 删除结果，如果删除成功，则返回true否则，返回为false.
   */
  async deleteToken(user: User, tokenId: number): Promise<boolean> {
    await this.refreshTokenRepository.nativeUpdate({ user, id: tokenId }, { isRevoked: true })
    return true
  }
}
