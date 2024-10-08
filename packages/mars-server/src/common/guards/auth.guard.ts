import { TokenExpiredError } from 'jsonwebtoken'
import type { CanActivate, ExecutionContext } from '@nestjs/common'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { translate } from '@libs/i18n'

/**
 *
 * The purpose of this guard is to provide a layer for extracting idx from jwt
 *
 */

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwt: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest()

    const token: string = request.headers.authorization

    if (!token) throw new UnauthorizedException(translate('exception.apiUnauthorizedResponse'))

    try {
      const tokenValue = token.split(' ')[1]

      if (!tokenValue) return false

      const decoded: { idx: string } = this.jwt.verify(tokenValue)

      request.idx = decoded.idx

      return true
    } catch (error_) {
      if (error_ instanceof TokenExpiredError) {
        throw new UnauthorizedException(
          translate('exception.token', {
            args: { error: 'expired' },
          }),
        )
      } else {
        new UnauthorizedException(
          translate('exception.token', {
            args: { error: 'malformed' },
          }),
        )
      }
    }
    return false
  }
}
