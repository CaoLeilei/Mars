import { Controller, Post, Body, Get } from '@nestjs/common'
import { Auth, GenericController, LoggedInUser } from '@common/decorators'
import { TokenService } from '@libs/token/token.service'
import { UserLoginDto } from './dtos/user-login.dto'
import { RefreshTokenDto } from './dtos/refresh-token.dto'
import { AuthService } from './auth.service'

@GenericController('auth', false)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly tokenService: TokenService,
  ) {}

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
    return 'hello world' // Observable.fron
  }

  /**
   * 重新生成
   */
  @Post('token/refresh')
  async refresh(@Body() body: RefreshTokenDto): Promise<any> {
    const token = await this.tokenService.createAccessTokenFromRefreshToken(body.refreshToken)
    return { token }
  }
}
