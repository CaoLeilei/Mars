import type { Response, Request } from 'express'
import type { ArgumentsHost, ExceptionFilter } from '@nestjs/common'
import { Catch, HttpException, ForbiddenException } from '@nestjs/common'
import { I18nContext } from 'nestjs-i18n'

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  /**
   * 异常捕获处理器，专门处理Http异常。
   * 当发生HttpException时，此函数将被调用，用于统一格式化错误响应。
   *
   * @param exception HttpException实例，包含错误的具体信息。
   * @param host ArgumentsHost实例，用于获取当前的请求和响应对象。
   */
  async catch(exception: HttpException, host: ArgumentsHost) {
    // 切换到HTTP上下文，以便获取请求和响应对象
    const context = host.switchToHttp()
    // 获取响应对象
    const response = context.getResponse<Response>()
    // 获取请求对象
    const request = context.getRequest<Request>()

    // 获取异常状态码，若未提供则默认为500
    const statusCode = exception.getStatus()
    console.log('exception.stack:', exception.stack)
    console.log(exception instanceof ForbiddenException)
    // 日志记录异常状态码
    console.log('🚀 ~ HttpExceptionFilter ~ statusCode:', statusCode)

    const exceptionMessage = exception.message || 'server error'
    // 获取异常消息
    // const message = exception.getResponse()
    const message = exception.getResponse() as {
      key: string
      args: Record<string, any>
    }

    const msg = exception.message

    console.log('host.switchToHttp().getRequest().i18nLang', host.switchToHttp().getRequest().i18nLang)
    console.log(message)

    // message = I18nContext.current()!.t(message.key, {
    //   lang: host.switchToHttp().getRequest().i18nLang,
    //   args: message.args,
    // })

    // TODO: 此处原本可能涉及国际化处理，但当前代码已被注释掉
    // const transRes = translate('exception.unauthorized', {
    //   args: { error: 'expired' },
    // })

    // 根据状态码和消息内容格式化响应
    response.status(statusCode).json({ code: statusCode, message: exception.message, data: null })
  }
}
