import { IsNotEmpty } from 'class-validator'

export class UserRegiterDto {
  @IsNotEmpty()
  username!: string

  @IsNotEmpty()
  password!: string
}
