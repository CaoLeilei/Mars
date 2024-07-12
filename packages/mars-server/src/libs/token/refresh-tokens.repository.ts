import { Injectable } from '@nestjs/common'
import { EntityRepository } from '@mikro-orm/core'
import { InjectRepository } from '@mikro-orm/nestjs'
import { EntityManager } from '@mikro-orm/better-sqlite'

import { Observable, from, map } from 'rxjs'

import type { User } from '@entities'
import { RefreshToken } from '@entities'

@Injectable()
export class RefreshTokensRepository {
  constructor(
    private readonly em: EntityManager,
    @InjectRepository(RefreshToken)
    private readonly refreshTokenRepository: EntityRepository<RefreshToken>,
  ) {}

  createRefreshToken(user: User, ttl: number): Observable<RefreshToken> {
    const expiration = new Date()

    // the input is treated as millis so *1000 is necessary
    const ttlSeconds = ttl * 1000 // seconds

    expiration.setTime(expiration.getTime() + ttlSeconds)

    const token = this.refreshTokenRepository.create({
      user: user.id,
      expiresIn: expiration,
    })

    return from(this.em.persistAndFlush(token)).pipe(
      map(() => {
        console.log('create refresh token :', token)
        return token
      }),
    )
  }

  /**
   * 通过ID来进行查找对应的refreshToken，
   * @param tokenId - 我们要进行查找的RefreshToken的id
   * @returns Observable<RefreshToken>
   */
  findTokenById(tokenId: number): Observable<RefreshToken> {
    return from(
      this.refreshTokenRepository.findOneOrFail({
        id: tokenId,
        isRevoked: false,
      }),
    )
  }

  deleteTokenForUser(user: User): Observable<boolean> {
    return from(this.refreshTokenRepository.nativeUpdate({ user }, { isRevoked: true })).pipe(map(() => true))
  }

  /**
   * 删除refreshToken通过设置isRevoked为true，来进行实现
   * @param user - User - 当前登录的用户以及用户对象
   * @param tokenId - 所需要进行删除的refreshToken的tokenId，.
   * @returns 删除结果，如果删除成功，则返回true否则，返回为false.
   */
  deleteToken(user: User, tokenId: number): Observable<boolean> {
    return from(this.refreshTokenRepository.nativeUpdate({ user, id: tokenId }, { isRevoked: true })).pipe(
      map(() => true),
    )
  }
}
