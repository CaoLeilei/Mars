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
   * 根据索引异步查找一个实体。
   *
   * 此方法通过指定的索引值查询实体仓库中的一个实体。如果找不到对应的实体，则抛出一个表示实体不存在的异常。
   * 这是对数据库操作的封装，旨在提供一种简洁的获取单个实体的方式。
   *
   * @param index - 实体的索引值，用于查询实体。
   * @returns 返回查询到的实体。
   * @throws NotFoundException - 如果找不到实体，则抛出此异常。
   */
  async findOne(index: string): Promise<Entity> {
    // 根据索引查询实体。
    const entity = await this.repository.findOne({ idx: index } as FilterQuery<Entity>)

    // 如果查询结果为空，则抛出实体不存在的异常。
    if (!entity) {
      throw new NotFoundException(
        translate(itemDoesNotExistKey, {
          args: { item: this.repository.getEntityName() },
        }),
      )
    }

    // 返回查询到的实体。
    return entity
  }

  /**
   * 异步更新实体数据。
   *
   * 此方法通过提供的索引和数据传输对象（DTO）来更新实体。它首先根据索引查找实体，
   * 然后将DTO的数据分配给找到的实体，最后提交更改。
   *
   * @param index - 实体的唯一索引，用于查找需要更新的实体。
   * @param dto - 数据传输对象，包含用于更新实体的新数据。
   * @returns 返回更新后的实体。
   */
  async update(index: string, dto: UpdateDto): Promise<Entity> {
    // 根据索引查找实体。
    const item = await this.findOne(index)
    // 将DTO的数据赋值给找到的实体。
    this.repository.assign(item, dto as EntityData<FromEntityType<Entity>>)
    // 提交更改，使实体更新生效。
    await this.repository.getEntityManager().flush()
    // 返回更新后的实体。
    return item
  }

  /**
   * 异步删除指定索引的实体。
   *
   * 此方法首先根据索引查找实体，然后使用仓库中的软删除功能删除该实体，并立即刷新仓库，
   * 以确保数据库中的实体也被删除。删除操作完成后，返回被删除的实体。
   *
   * @param index - 要删除的实体的id。
   * @returns 被删除的实体。
   */
  async remove(index: string): Promise<Entity> {
    // 通过实体的ID
    const item = await this.findOne(index)
    // 对找到的实体执行软删除操作，并立即刷新仓库。
    await this.repository.softRemoveAndFlush(item)
    // 返回被删除的实体。
    return item
  }
}
