import type { CreateEntityType, Crud, PaginationRequest, PaginationResponse, UpdateEntityType } from '@common/@types'
import { CursorType, PaginationType, QueryOrder } from '@common/@types'
import type { BaseEntity, BaseRepository } from '@common/database'
import type { User } from '@entities'
import { itemDoesNotExistKey, translate } from '@libs/i18n'
import type { EntityData, EntityKey, FilterQuery, FromEntityType } from '@mikro-orm/better-sqlite'
import { NotFoundException } from '@nestjs/common'

export abstract class BaseService<
  Entity extends BaseEntity,
  PRequest extends PaginationRequest,
  CreateDto extends CreateEntityType<Entity> = CreateEntityType<Entity>,
  UpdateDto extends UpdateEntityType<Entity> = UpdateEntityType<Entity>,
> implements Crud<Entity, PRequest>
{
  protected searchField!: EntityKey<Entity>
  protected queryName = 'entity'

  protected constructor(private readonly repository: BaseRepository<Entity>) {}
  async create(dto: CreateDto, _user?: User): Promise<Entity> {
    const entity = this.repository.create(dto)
    await this.repository.getEntityManager().persistAndFlush(entity)
    // return await this.repository.getEntityManager().persistAndFlush(entity)
    return entity
  }

  /**
   * It takes in a SearchOptionsDto object, and returns an Observable of a Pagination object
   * @param dto - The DTO that will be used to search for the entities.
   * @returns An observable of a pagination object.
   */
  async findAll(dto: PaginationRequest): Promise<PaginationResponse<Entity>> {
    const qb = this.repository.createQueryBuilder(this.queryName)

    if (dto.type === PaginationType.CURSOR) {
      // by default, the id is used as cursor

      return await this.repository.qbCursorPagination({
        qb,
        pageOptionsDto: {
          alias: this.queryName,
          cursor: 'id',
          cursorType: CursorType.NUMBER,
          order: QueryOrder.ASC,
          searchField: this.searchField,
          ...dto,
        },
      })
    }

    return await this.repository.qbOffsetPagination({
      pageOptionsDto: {
        ...dto,
        alias: this.queryName,
        order: QueryOrder.ASC,
        offset: dto.offset,
        searchField: this.searchField,
      },
      qb,
    })
  }

  /**
   * It returns an observable of type Entity.
   * @param index - The name of the index to search.
   * @returns An observable of type Entity.
   */
  async findOne(index: string): Promise<Entity> {
    const entity = await this.repository.findOne({ idx: index } as FilterQuery<Entity>)
    if (!entity) {
      throw new NotFoundException(
        translate(itemDoesNotExistKey, {
          args: { item: this.repository.getEntityName() },
        }),
      )
    }
    return entity
  }

  /**
   * It updates an entity.
   * @param index - The name of the index you want to update.
   * @param dto - The data transfer object that will be used to update the entity.
   * @returns An observable of the entity that was updated.
   */
  async update(index: string, dto: UpdateDto): Promise<Entity> {
    const item = await this.findOne(index)
    this.repository.assign(item, dto as EntityData<FromEntityType<Entity>>)
    await this.repository.getEntityManager().flush()
    return item
  }

  /**
   * It removes an entity from the database
   * @param index - string - The index of the entity to remove.
   * @returns An observable of the entity that was removed.
   */
  async remove(index: string): Promise<Entity> {
    const item = await this.findOne(index)
    await this.repository.softRemoveAndFlush(item)
    return item
  }
}
