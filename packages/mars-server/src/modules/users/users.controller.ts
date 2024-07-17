import { Body, Controller, Post } from '@nestjs/common'
import { User } from '@entities'
import { UsersService } from './users.service'
import { CreateUserDto } from './dtos/create-user.dto'

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('create')
  async createUser(@Body() dto: CreateUserDto): Promise<User> {
    const user = await this.userService.create(dto)
    return user
  }
}
