import process from 'node:process'
import type { INestApplication, ValidationPipeOptions } from '@nestjs/common'
import { Logger } from '@nestjs/common'
import type { ConfigService } from '@nestjs/config'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { i18nValidationErrorFactory } from 'nestjs-i18n'
import { isArray } from 'helper-fns'

import { IS_PUBLIC_KEY_META } from '@common/constant'
import { HelperService } from './helpers.utils'

const logger = new Logger('App:Utils')

export const AppUtils = {
  validationPipeOptions(): ValidationPipeOptions {
    return {
      whitelist: true,
      transform: true,
      forbidUnknownValues: false,
      validateCustomDecorators: true,
      enableDebugMessages: HelperService.isDev(),
      exceptionFactory: i18nValidationErrorFactory,
    }
  },

  async gracefulShutdown(app: INestApplication, code: string) {
    setTimeout(() => process.exit(1), 5000)
    logger.verbose(`Signal received with code ${code} ⚡.`)
    logger.log('❗Closing http server with grace.')

    try {
      await app.close()
      logger.log('✅ Http server closed.')
      process.exit(0)
    } catch (error: any) {
      logger.error(`❌ Http server closed with error: ${error}`)
      process.exit(1)
    }
  },

  killAppWithGrace(app: INestApplication) {
    process.on('SIGINT', async () => {
      await AppUtils.gracefulShutdown(app, 'SIGINT')
    })

    process.on('SIGTERM', async () => {
      await AppUtils.gracefulShutdown(app, 'SIGTERM')
    })
  },
}
