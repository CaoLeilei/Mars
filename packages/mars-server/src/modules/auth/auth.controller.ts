import { Controller, Post, Body, Get } from '@nestjs/common'
import { Auth } from '@common/decorators/auth.decorator'
import { UserLoginDto } from './dtos/user-login.dto'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Auth()
  @Get('hello')
  public async Hello(): Promise<any> {
    return 'hello world'
  }

  @Post('login')
  public async Login(@Body() userLoginDto: UserLoginDto): Promise<any> {
    return this.authService.login(userLoginDto)
  }

  @Post('register')
  public async Register(userLoginDto: UserLoginDto): Promise<any> {
    console.log(userLoginDto)
    return 'hello world' // Observable.fron
  }
}
