import { IsJWT, IsNotEmpty } from 'class-validator'
import { validationI18nMessage } from '@libs/i18n'

export class RefreshTokenDto {
  /**
   * Refresh token of user
   * @example "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
   */

  @IsNotEmpty({ message: validationI18nMessage('validation.isNotEmpty') })
  @IsJWT({
    message: validationI18nMessage('validation.isDataType', {
      type: 'jwt',
    }),
  })
  refreshToken!: string
}
