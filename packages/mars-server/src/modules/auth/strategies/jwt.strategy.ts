import type { JwtPayload } from '@common/@types'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { User } from '@entities'
import { AuthService } from '../auth.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    configService: ConfigService<any, true>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('jwt.secret', { infer: true }),
      ignoreExpiration: false,
      passReqToCallback: true,
    })
  }

  /**
   * 验证当前用户的token,并且返回当前的用户
   * @param payload string
   * @returns 返回当前用户的基本信息的内容
   */

  async validate(req: Request, payload: JwtPayload): Promise<User> {
    const { sub: id } = payload
    console.log('JwtStrategy', payload)
    return await this.authService.findUser(id)
  }
}
