import type { JwtPayload } from '@common/@types'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
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
   *
   * Validate the token and return the user
   * @param payload string
   * @returns The user object
   */

  async validate(req: Request, payload: JwtPayload) {
    const { sub: id } = payload
    return await this.authService.findUser(id)
  }
}
