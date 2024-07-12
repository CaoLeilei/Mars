import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): any {
    const res = 1 / 0
    // const number = 123
    // if (number > 0) {
    //   throw new Error('hhhhhh');
    // }

    this.appService.getHello().toString()
    return { a: this.appService.getHello(), res }
  }
}
