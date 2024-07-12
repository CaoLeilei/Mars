import { Module, Global } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import Joi from 'joi'
import {
  app,
  database,
  sqlite,
  appConfigValidationSchema,
  databaseConfigValidationSchema,
  sqliteConfigValidationSchema,
} from './configs/index'

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`${process.cwd()}/env/.env.${process.env.NODE_ENV}`],
      load: [app, database, sqlite],
      cache: true,
      expandVariables: true,
      validationSchema: Joi.object({
        ...appConfigValidationSchema,
        ...databaseConfigValidationSchema,
        ...sqliteConfigValidationSchema,
      }),
    }),
  ],
})
export class NestConfigModule {}
