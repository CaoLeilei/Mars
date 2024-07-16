import { Controller, Post, Body, Get, Injectable } from '@nestjs/common'
import { UserLoginDto } from './dtos/user-login.dto'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  public async Login(@Body() userLoginDto: UserLoginDto): Promise<any> {
    return this.authService.login(userLoginDto)
  }

  @Post('register')
  public async Register(userLoginDto: UserLoginDto): Promise<any> {
    return 'hello world' // Observable.fron
  }
}
