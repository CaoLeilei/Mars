import { Module, Global } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import Joi from 'joi'
import {
  app,
  database,
  sqlite,
  jwt,
  appConfigValidationSchema,
  databaseConfigValidationSchema,
  sqliteConfigValidationSchema,
  jwtConfigValidationSchema,
} from './configs/index'

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`${process.cwd()}/env/.env.${process.env.NODE_ENV}`],
      load: [app, database, sqlite, jwt],
      cache: true,
      expandVariables: true,
      validationSchema: Joi.object({
        ...appConfigValidationSchema,
        ...databaseConfigValidationSchema,
        ...sqliteConfigValidationSchema,
        ...jwtConfigValidationSchema,
      }),
    }),
  ],
})
export class NestConfigModule {}
