import type { CreateEntityType, Crud, PaginationRequest, PaginationResponse, UpdateEntityType } from '@common/@types'
import type { BaseEntity } from '@common/database'
import { ApiPaginatedResponse, LoggedInUser } from '@common/decorators'
import { AppUtils } from '@common/helpers'
import { User } from '@entities'
import type { ArgumentMetadata, Type } from '@nestjs/common'
import { Body, Delete, Get, Injectable, Param, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common'
import type { BaseService } from './crud.service'

@Injectable()
export class AbstractValidationPipe extends ValidationPipe {
  constructor(
    private readonly targetTypes: { body?: Type<any>; query?: Type<any>; param?: Type<any>; custom?: Type<any> },
  ) {
    super(AppUtils.validationPipeOptions())
  }

  async transform(value: any, metadata: ArgumentMetadata) {
    const targetType = this.targetTypes[metadata.type] as Type<any>

    if (!targetType) return super.transform(value, metadata)

    return super.transform(value, { ...metadata, metatype: targetType })
  }
}

/**
 * Factory function that creates a controller class that implements the Crud interface
 * @param queryDto - The query dto type
 * @param createDto - The create dto type
 * @param updateDto - The update dto type
 * @returns A controller class that implements the Crud interface
 */
export function ControllerFactory<
  T extends BaseEntity,
  Q extends PaginationRequest,
  C extends CreateEntityType<T>,
  U extends UpdateEntityType<T>,
>(queryDto: Type<Q>, createDto: Type<C>, updateDto: Type<U>): Type<Crud<T, Q, C, U>> {
  const createPipe = new AbstractValidationPipe({
    body: createDto,
  })
  const updatePipe = new AbstractValidationPipe({
    body: updateDto,
  })

  const queryPipe = new AbstractValidationPipe({ query: queryDto })

  class CrudController<
    T extends BaseEntity,
    Q extends PaginationRequest,
    C extends CreateEntityType<T>,
    U extends UpdateEntityType<T>,
  > implements Crud<T, Q, C, U>
  {
    protected service!: BaseService<T, Q, C, U>

    @Get(':idx')
    async findOne(@Param('idx') index: string): Promise<T> {
      return this.service.findOne(index)
    }

    @ApiPaginatedResponse(updateDto)
    @UsePipes(queryPipe)
    @Get()
    async findAll(@Query() query: Q): Promise<PaginationResponse<T>> {
      return this.service.findAll(query)
    }

    @UsePipes(createPipe)
    @Post()
    async create(@Body() body: C, @LoggedInUser() user?: User): Promise<T> {
      return this.service.create(body, user)
    }

    @UsePipes(updatePipe)
    @Patch(':idx')
    async update(@Param('idx') index: string, @Body() body: U): Promise<T> {
      return this.service.update(index, body)
    }

    @Delete(':idx')
    async remove(@Param('idx') index: string): Promise<T> {
      return this.service.remove(index)
    }
  }

  return CrudController
}
