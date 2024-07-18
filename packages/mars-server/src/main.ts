import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { ConfigService } from '@nestjs/config'
import { LoggerErrorInterceptor } from 'nestjs-pino'
import { I18nValidationExceptionFilter } from 'nestjs-i18n'
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

  app.useGlobalFilters(new I18nValidationExceptionFilter({ detailedErrors: false }))
  const transRes = translate('exception.unauthorized', {
    // args: { error: "expired" },
  })

  console.log('transRes:', transRes)

  // 应用全局的错误日志
  app.useGlobalInterceptors(new LoggerErrorInterceptor())
  app.useGlobalInterceptors(new TransformInterceptor())

  // 读取配置中的端口号，然后进行启动监听
  const port = configService.get('APP_PORT')
  await app.listen(port)
}

bootstrap()
