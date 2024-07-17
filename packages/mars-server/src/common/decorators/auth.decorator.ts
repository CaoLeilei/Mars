import type { CanActivate, Type } from '@nestjs/common'
import { UseGuards, applyDecorators } from '@nestjs/common'
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger'
import { JwtAuthGuard } from '../guards/jwt.guard'
import { AuthGuard } from '@nestjs/passport'
import { PoliciesGuard } from '@libs/casl/policies.guard'

const API_UNAUTHORISED_RESPONSE = '1111'

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
    ApiBearerAuth(),
    ApiUnauthorizedResponse({ description: options.unauthorizedResponse }),
  )
}
