import { Injectable, ForbiddenException, UnauthorizedException } from '@nestjs/common'
import type { FilterQuery } from '@mikro-orm/core'
import { InjectRepository } from '@mikro-orm/nestjs'
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
    @InjectRepository(User)
    private readonly userRepository: BaseRepository<User>,
    private readonly tokenService: TokenService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * 验证用户的账号密码是否有效
   * @param username 当前的用户名
   * @param password 前的用户密码
   * @returns 如果用户登录成功，则返回当前用户的基本信息
   */
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userRepository.findOne({ username })
    if (!user) {
      throw new ForbiddenException(
        translate(itemDoesNotExistKey, {
          args: { item: 'Account' },
        }),
      )
    }
    if (!user.isActive) {
      throw new ForbiddenException('用户未激活~')
    }

    const isValid = await HelperService.verifyHash(user.password, password)
    if (isValid) {
      return omit(user, ['password', 'lastLogin', 'updatedAt', 'createdAt', 'deletedAt', 'isDeleted'])
    } else {
      throw new ForbiddenException('用户的账号密码不正确~')
    }
  }

  /**
   * 根据条件进行查询当前用户的相关信息的内容
   * @param condition
   * @returns
   */
  async findUser(condition: FilterQuery<User>): Promise<User> {
    const user = await this.userRepository.findOne(condition)

    if (!user) throw new UnauthorizedException()

    return user
  }

  async login(loginDot: UserLoginDto): Promise<AuthenticationResponse> {
    const user = await this.validateUser(loginDot.username, loginDot.password)
    let jwtRefreshTokenExp: number | undefined = this.configService.get('jwt.refreshExpiry', { infer: true })
    if (jwtRefreshTokenExp === undefined) {
      jwtRefreshTokenExp = 60
    }
    this.userRepository.nativeUpdate({ id: user.id }, { lastLogin: new Date() })
    const accessToken = await this.tokenService.generateAccessToken(user)
    const refreshToken = await this.tokenService.generateRefreshToken(user, jwtRefreshTokenExp)
    return {
      user,
      accessToken,
      refreshToken,
    }
  }
}
