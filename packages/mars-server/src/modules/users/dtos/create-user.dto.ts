import { Type } from 'class-transformer'
import { IsNotEmpty, IsUrl, ValidateNested } from 'class-validator'
import { Roles } from '@common/@types'
import {
  IsEmailField,
  IsEnumField,
  IsPasswordField,
  IsStringField,
  IsUnique,
  IsUsernameField,
} from '@common/decorators'
import { User } from '@entities'
import { validationI18nMessage } from '@libs/i18n'

export class CreateUserDto {
  /**
   * Username of user
   * @example rubiin
   */

  @IsUsernameField()
  @IsUnique(() => User, 'username')
  username!: string

  /**
   * Email of user
   * @example someemail@gmail.com
   */
  @IsUnique(() => User, 'email')
  @IsEmailField()
  email!: string

  /**
   * Password of user
   * @example SomePassword@123
   */

  @IsPasswordField({ message: validationI18nMessage('validation.isPassword') })
  password!: string

  /**
   * Roles of user
   * @example ["ADMIN"]
   */
  @IsEnumField(Roles, { each: true })
  roles!: Roles[]
}
