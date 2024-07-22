import { NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'
import { LoggerErrorInterceptor } from 'nestjs-pino'
import { Logger, ValidationPipe } from '@nestjs/common'
import { I18nValidationExceptionFilter } from 'nestjs-i18n'
import { NestExpressApplication, ExpressAdapter } from '@nestjs/platform-express'
import bodyParser from 'body-parser'
import { TransformInterceptor } from '@common/interceptors/index'
import { HelperService, AppUtils } from '@common/helpers'
import { translate } from '@libs/i18n/translate'
import { AppModule } from './app.module'

// 这个方法是函数的初始话相关的东西
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, new ExpressAdapter(), {
    bufferLogs: true,
    abortOnError: false,
    snapshot: true,
  })

  const configService = app.get<ConfigService>(ConfigService)

  app.enable('trust proxy')
  app.set('etag', 'strong')
  app.use(bodyParser.json({ limit: '10mb' }), bodyParser.urlencoded({ limit: '10mb', extended: true }))

  // 设置全局前缀
  const globalPrefix = configService.get('app.prefix', { infer: true }) || ''
  console.log('globalPrefix:', globalPrefix)
  app.setGlobalPrefix(globalPrefix)

  app.useGlobalPipes(new ValidationPipe(AppUtils.validationPipeOptions()))

  // 使用全局的登录鉴权守卫
  // app.useGlobalGuards()

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
  const appUrl = `http://localhost:${port}/${globalPrefix}`

  await app.listen(port)
}

bootstrap()
