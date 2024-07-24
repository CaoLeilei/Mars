import { IsNotEmpty } from 'class-validator'

export class UserRegisterDto {
  @IsNotEmpty()
  username!: string

  @IsNotEmpty()
  password!: string
}
