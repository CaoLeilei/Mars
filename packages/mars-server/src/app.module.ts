import { Module } from '@nestjs/common'
import { SharedModule } from '@modules/shared/shared.module'
import { AppController } from './app.controller'
import { AppService } from './app.service'

console.log('process.env.NODE_ENV:', process.env.NODE_ENV)

@Module({
  imports: [SharedModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}