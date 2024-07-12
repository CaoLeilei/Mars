import { Injectable, NestInterceptor, ExecutionContext, CallHandler, HttpException } from '@nestjs/common'
import { Observable, throwError } from 'rxjs'
import { map, catchError } from 'rxjs/operators'

// 统一成功响应的数据结构
export interface SuccessResponse<T> {
  code: number
  message: string
  data: T
}

// 统一错误响应的数据结构
export interface ErrorResponse {
  code: number
  message: string
}

// 统一分页响应的数据结构
export interface PaginatedResponse<T> {
  code: number
  message: string
  data: T[]
  total: number
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, SuccessResponse<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log(context)
    return next.handle().pipe(
      catchError((error: Error) => {
        const message: string = error?.message || '服务器有误~'
        return throwError(() => new HttpException(message, 500))
      }),
      map((data) => {
        return {
          code: 0, // 自定义成功响应的状态码
          message: '请求成功', // 自定义成功响应的消息
          data,
        }
      }),
    )
  }
}
