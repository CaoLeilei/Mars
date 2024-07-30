import { Module } from '@nestjs/common'

import {
  NestConfigModule,
  NestServeStaticModule,
  NestI18nModule,
  NestOrmModule,
  NestCaslModule,
  NestJwtModule,
  NestPinoModule,
} from '@libs/index'

import { AuthModule } from '@modules/auth/auth.module'
import { AppsModule } from '@modules/apps/apps.module'
import { UsersModule } from '@modules/users/users.module'

@Module({
  imports: [
    NestConfigModule,
    NestServeStaticModule,
    NestI18nModule,
    NestOrmModule,
    NestCaslModule,
    NestJwtModule,
    NestPinoModule,
    UsersModule,
    AuthModule,
    AppsModule,
  ],
})
export class SharedModule {}
