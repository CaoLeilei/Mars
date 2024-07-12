import { Injectable, ForbiddenException, UnauthorizedException } from '@nestjs/common'
import type { FilterQuery } from '@mikro-orm/core'
import { InjectRepository } from '@mikro-orm/nestjs'
import { from, Observable, switchMap, map, throwError, zip } from 'rxjs'
import { omit } from 'helper-fns'
import { BaseRepository } from '@common/database'
import { HelperService } from '@common/helpers'
import { AuthenticationResponse } from '@common/@types'
import { itemDoesNotExistKey, translate } from '@libs/i18n'
import { User } from '@entities'
import { UserLoginDto } from './dtos/user-login.dto'
import { TokenService } from '@libs/token/token.service'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: BaseRepository<User>,
    private readonly tokenService: TokenService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * 验证用户的账号密码是否有效
   * @param username 当前的用户名
   * @param password 前的用户密码
   * @returns 如果用户登录成功，则返回当前用户的基本信息
   */
  validateUser(username: string, password: string): Observable<any> {
    return from(this.userRepository.findOne({ username })).pipe(
      switchMap((user) => {
        if (!user) {
          return throwError(() => {
            return new ForbiddenException(
              translate(itemDoesNotExistKey, {
                args: { item: 'Account' },
              }),
            )
          })
        }
        if (!user.isActive) {
          return throwError(() => {
            return new ForbiddenException('用户未激活~')
          })
        }

        return HelperService.verifyHash(user.password, password).pipe(
          map((isValid) => {
            if (isValid) return omit(user, ['password'])

            return throwError(() => {
              return new ForbiddenException('用户的账号密码不正确~')
            })
          }),
        )
      }),
    )
  }

  async findUser(condition: FilterQuery<User>): Promise<User> {
    const user = await this.userRepository.findOne(condition)

    if (!user) throw new UnauthorizedException()
    return user
  }

  login(loginDot: UserLoginDto): Observable<AuthenticationResponse> {
    return this.validateUser(loginDot.username, loginDot.password).pipe(
      switchMap((user) => {
        if (!user) {
          return throwError(() => {})
        }
        let jwtRefreshTokenExp: number | undefined = this.configService.get('jwt.refreshExpiry', { infer: true })
        console.log('jwtRefreshTokenExp:', jwtRefreshTokenExp)
        if (jwtRefreshTokenExp === undefined) {
          jwtRefreshTokenExp = 60
        }
        return zip(
          this.userRepository.nativeUpdate({ id: user.id }, { lastLogin: new Date() }),
          this.tokenService.generateAccessToken(user),
          this.tokenService.generateRefreshToken(user, jwtRefreshTokenExp),
        ).pipe(
          map(([_, accessToken, refreshToken]) => {
            return {
              user,
              accessToken,
              refreshToken,
            }
          }),
        )
      }),
    )
  }
}
