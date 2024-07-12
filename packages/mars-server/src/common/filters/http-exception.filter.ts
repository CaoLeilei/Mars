import type { Response, Request } from 'express'
import type { ArgumentsHost, ExceptionFilter } from '@nestjs/common'
import { Catch, HttpException } from '@nestjs/common'

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  async catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp()
    const response = context.getResponse<Response>()
    const request = context.getRequest<Request>()
    const statusCode = exception.getStatus() || 500
    console.log('🚀 ~ HttpExceptionFilter ~ statusCode:', statusCode)

    const message = exception.getResponse()
    console.log('message,', message)

    // let message = exception.getResponse() as {
    //   key: string
    //   args: Record<string, any>
    // };

    // message = I18nContext.current()!.t(message.key, {
    //   lang: host.switchToHttp().getRequest().i18nLang,
    //   args: message.args,
    // });

    response.status(statusCode).json({ statusCode, message })
  }
}
