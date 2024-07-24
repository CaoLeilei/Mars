import { Module } from '@nestjs/common'
import { MailerService } from './mailer.service'

@Module({
  controllers: [],
  providers: [MailerService],
})
export class NestMailerModule {}
