import { Body, Controller, Post, UploadedFile } from '@nestjs/common'
import { fileValidatorPipe } from '@common/misc'
import { UsersService } from './users.service'
import { CreateUserDto } from './dtos/create-user.dto'
import { UserRegistrationDto } from './dtos/user-registration.dto'

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('create')
  async createUser(@Body() dto: CreateUserDto) {
    const user = await this.userService.create(dto)
    return 'user create'
  }

  // 用户自己注册账号
  @Post('register')
  publicRegistration(@Body() dto: UserRegistrationDto, @UploadedFile(fileValidatorPipe({})) imgage: File) {
    return ''
  }

  @Post('update')
  async UpdateUser() {
    return 'success'
  }
}
