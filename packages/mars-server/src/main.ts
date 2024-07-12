import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { ConfigService } from '@nestjs/config'
import { LoggerErrorInterceptor } from 'nestjs-pino'
import { I18nValidationExceptionFilter } from 'nestjs-i18n'
import { HttpExceptionFilter } from '@common/filters/index'
import { TransformInterceptor } from '@common/interceptors/index'
import { translate } from '@libs/i18n/translate'
import { AppModule } from './app.module'

// 这个方法是函数的初始话相关的东西
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
    abortOnError: false,
    snapshot: true,
  })

  const configService = app.get<ConfigService>(ConfigService)

  const tol = configService.get('TOOLJET_HOST')
  const transRes = translate('exception.unauthorized', {
    // args: { error: "expired" },
  })

  console.log('transRes:', transRes)

  app.useGlobalFilters(new I18nValidationExceptionFilter({ detailedErrors: false }))

  // 应用全局的错误日志
  app.useGlobalFilters(new HttpExceptionFilter())
  app.useGlobalInterceptors(new LoggerErrorInterceptor())
  app.useGlobalInterceptors(new TransformInterceptor())

  console.log('hello world')
  await app.listen(3000)
}

bootstrap()
