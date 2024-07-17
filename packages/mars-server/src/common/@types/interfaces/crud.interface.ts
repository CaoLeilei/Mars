import type { Observable } from 'rxjs'

import type { BaseEntity } from '@common/database'
import type { User } from '@entities'
import type { CreateEntityType, UpdateEntityType } from '../types/common.types'
import type { PaginationResponse, PaginationRequest as TPaginationRequest } from './pagination.interface'

/**
 * common interface that enforces common methods for controller and service
 */
export interface Crud<
  Entity extends BaseEntity,
  PaginationRequest extends TPaginationRequest,
  CreateDto extends CreateEntityType<Entity> = CreateEntityType<Entity>,
  UpdateDto extends UpdateEntityType<Entity> = UpdateEntityType<Entity>,
> {
  findAll(query: PaginationRequest): Promise<PaginationResponse<Entity>>

  findOne(index: string): Promise<Entity>

  create(body: CreateDto, user?: User): Promise<Entity>

  update(index: string, body: UpdateDto): Promise<Entity>

  remove(index: string): Promise<Entity>
}
