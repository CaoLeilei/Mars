import { Controller, Post, Get, Injectable } from '@nestjs/common'
import { UserLoginDto } from './dtos/user-login.dto'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
    console.log('AuthController')
  }

  @Get('test')
  public async Test(): Promise<any> {
    return 'hello world'
  }

  @Post('login')
  public async Login(userLoginDto: UserLoginDto): Promise<any> {
    console.log(userLoginDto)
    return this.authService.login(userLoginDto)
  }

  @Post('register')
  public async Register(userLoginDto: UserLoginDto): Promise<any> {
    console.log(userLoginDto)
    return 'hello world' // Observable.fron
  }
}
