import { ApiHideProperty } from '@nestjs/swagger'
import { Allow } from 'class-validator'

import { IsEnumField, IsNumberField, IsStringField } from '@common/decorators'
import { PaginationType, QueryOrder } from '@common/@types'
import { PaginationDto } from './pagination.dto'

export class OffsetPaginationDto extends PaginationDto {
  @ApiHideProperty()
  @Allow()
  type: PaginationType.OFFSET = PaginationType.OFFSET

  /**
   * 请求页码
   */
  @IsNumberField({ required: false })
  readonly page = 1

  /**
   * 每页次数
   */
  @IsNumberField({ required: false, max: 50 })
  readonly limit = 10

  /**
   * 排序方式
   */
  @IsEnumField(QueryOrder, { required: false })
  readonly order: QueryOrder = QueryOrder.DESC

  /**
   * 排序字段
   */
  @IsStringField({ required: false, maxLength: 50 })
  readonly sort = 'createdAt'

  get offset(): number {
    return (this.page - 1) * this.limit
  }
}
