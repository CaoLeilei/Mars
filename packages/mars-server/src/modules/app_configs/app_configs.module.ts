import { Module } from '@nestjs/common'
import { AppConfigsService } from './app_configs.service'
import { AppConfigsController } from './app_configs.controller'

@Module({
  providers: [AppConfigsService],
  controllers: [AppConfigsController],
})
export class AppConfigsModule {}
