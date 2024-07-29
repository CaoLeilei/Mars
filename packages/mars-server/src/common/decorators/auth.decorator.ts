import type { CanActivate, Type } from '@nestjs/common'
import { UseGuards, applyDecorators } from '@nestjs/common'
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger'
import { API_UNAUTHORISED_RESPONSE } from '@common/constant'
// import { AuthGuard } from '@common/guards'
import { JwtAuthGuard } from '../guards/jwt.guard'
import { PoliciesGuard } from '@libs/casl/policies.guard'

interface IAuthGuard {
  guards?: Type<CanActivate>[]
  unauthorizedResponse?: string
}

export function Auth(options_?: IAuthGuard) {
  const options = {
    guards: [JwtAuthGuard, PoliciesGuard],
    unauthorizedResponse: API_UNAUTHORISED_RESPONSE,
    ...options_,
  } satisfies IAuthGuard

  return applyDecorators(
    UseGuards(...options.guards),
    // ApiBearerAuth(),
    // ApiUnauthorizedResponse({ description: options.unauthorizedResponse }),
  )
}
