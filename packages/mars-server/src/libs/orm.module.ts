import { join } from 'path'
import { Module, Global } from '@nestjs/common'
import { MikroOrmModule } from '@mikro-orm/nestjs'
import { defineConfig } from '@mikro-orm/better-sqlite'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { baseOptions } from '@common/database/orm.config'
import * as Entities from '@entities'

console.log('process.env.NODE_ENV:', process.env.NODE_ENV)

@Global()
@Module({
  imports: [
    MikroOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService<any, true>) => {
        return defineConfig({
          ...baseOptions,
          dbName: join(process.cwd(), 'data/test.db'),
        })
      },
    }),
    MikroOrmModule.forFeature({
      entities: Object.values(Entities),
    }),
  ],
  exports: [MikroOrmModule],
})
export class NestOrmModule {}
