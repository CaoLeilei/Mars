import { Entity, Property, ManyToOne, Rel, Ref } from '@mikro-orm/core'
import { BaseEntity } from '@common/database'
import { User } from './user.entity'

@Entity({ tableName: 'apps' })
export class AppBase extends BaseEntity {
  @Property({
    comment: '项目的名字~',
  })
  name!: string

  @Property({
    comment: '当前项目的描述~',
  })
  desc!: string

  @Property({ comment: '是否为是为通用项目', default: false })
  isPublic: boolean = false

  @Property({ comment: '项目图标', default: false })
  icon?: string

  @Property({ comment: '当前版本', default: '0.0.0' })
  currentVersionId: string = '0.0.0'

  @Property({ comment: '所关联的组织的', name: 'organization_id' })
  organizationId!: string

  // @Property({ comment: '创建人的id', name: 'creator_id' })
  @ManyToOne({
    comment: '创建人的id',
    name: 'creator_id',
    eager: false,
    index: true,
  })
  creator!: Rel<Ref<User>>
}
