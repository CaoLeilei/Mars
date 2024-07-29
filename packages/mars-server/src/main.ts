import { NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'
import { LoggerErrorInterceptor } from 'nestjs-pino'
import { Logger, ValidationPipe } from '@nestjs/common'
import { I18nValidationExceptionFilter } from 'nestjs-i18n'
import { NestExpressApplication, ExpressAdapter } from '@nestjs/platform-express'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import { TransformInterceptor } from '@common/interceptors/index'
import { HttpExceptionFilter } from '@common/filters'
import { HelperService, AppUtils } from '@common/helpers'
import { translate } from '@libs/i18n/translate'
import { AppModule } from './app.module'

// 这个方法是函数的初始话相关的东西
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, new ExpressAdapter(), {
    bufferLogs: true,
    abortOnError: false,
    snapshot: true,
    // bufferLogs: true,
    // abortOnError: false,
  })

  // 读取项目相关的配置项的内容
  const configService = app.get<ConfigService>(ConfigService)
  // 读取配置中的端口号，然后进行启动监听
  const port = configService.get('APP_PORT')
  const urlPrefix = configService.get('app.prefix')
  // const appUrl = `http://localhost:${port}/${globalPrefix}`


  app.enable('trust proxy')
  app.set('etag', 'strong')

  app.useGlobalFilters(new I18nValidationExceptionFilter({ detailedErrors: false }))
  app.useGlobalFilters(new HttpExceptionFilter())
  app.useGlobalPipes(new ValidationPipe(AppUtils.validationPipeOptions()))

  app.use(cookieParser())

  // app.use(bodyParser.json({ limit: '10mb' }), bodyParser.urlencoded({ limit: '10mb', extended: true }))

  // 设置全局前缀
  const globalPrefix = configService.get('app.prefix', { infer: true }) || ''
  console.log('globalPrefix:', globalPrefix)
  app.setGlobalPrefix(globalPrefix)

  // 使用全局的登录鉴权守卫
  // app.useGlobalGuards()

  const transRes = translate('exception.unauthorized', {
    // args: { error: "expired" },
  })

  console.log('transRes:', transRes)

  // 应用全局的错误日志
  app.useGlobalInterceptors(new LoggerErrorInterceptor())
  app.useGlobalInterceptors(new TransformInterceptor())

  await app.listen(port)
}

bootstrap()
