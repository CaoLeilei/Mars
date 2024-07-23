import { Module } from '@nestjs/common'
import { UsersService } from '@modules/users/users.service'
import { AppsController } from './apps.controller'
import { AppsService } from './apps.service'

@Module({
  controllers: [AppsController],
  providers: [AppsService, AppsService],
})
export class AppsModule {}
