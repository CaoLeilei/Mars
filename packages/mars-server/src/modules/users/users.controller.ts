import { Body, Controller, Post, Get } from '@nestjs/common'
import { User } from '@entities'
import { GenericController } from '@common/decorators'
import { UsersService } from './users.service'
import { CreateUserDto } from './dtos/create-user.dto'

@GenericController('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('create')
  async createUser(@Body() dto: CreateUserDto): Promise<User> {
    const user = await this.userService.create(dto)
    return user
  }

  @Get()
  async getUsers(): Promise<User[]> {
    // const users = await this.userService.findAll()
    // return users
    return []
  }
}
