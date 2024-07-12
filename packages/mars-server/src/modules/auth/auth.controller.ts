import { Controller, Post, Injectable } from '@nestjs/common'
import { Observable } from 'rxjs'
import { UserLoginDto } from './dtos/user-login.dto'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  public Login(userLoginDto: UserLoginDto): Observable<any> {
    console.log(userLoginDto)
    return this.authService.login(userLoginDto)
  }
}
