import type { CanActivate, Type } from '@nestjs/common'
import { UseGuards, applyDecorators } from '@nestjs/common'
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger'
import { JwtAuthGuard } from '../guards/jwt.guard'
import { PoliciesGuard } from '@libs/casl/policies.guard'

const API_UNAUTHORISED_RESPONSE = ''

interface AuthGuard {
  guards?: Type<CanActivate>[]
  unauthorizedResponse?: string
}

export function Auth(options_: AuthGuard) {
  const options = {
    guards: [JwtAuthGuard, PoliciesGuard],
    unauthorizedResponse: API_UNAUTHORISED_RESPONSE,
    ...options_,
  } satisfies AuthGuard

  return applyDecorators(
    UseGuards(...options.guards),
    ApiBearerAuth(),
    ApiUnauthorizedResponse({ description: options.unauthorizedResponse }),
  )
}
