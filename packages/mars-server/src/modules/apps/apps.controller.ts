import { Controller, Post, Get } from '@nestjs/common'

@Controller('apps')
export class AppsController {
  @Get('/list')
  public async getApps() {
    return 'get apps'
  }

  @Post('/create')
  public async createApps() {
    return 'post apps'
  }

  @Post('update')
  public async updateApps() {
    return 'update apps'
  }
}
