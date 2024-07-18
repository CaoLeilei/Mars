import { Entity, Property, Unique } from '@mikro-orm/core'
import { BaseEntity } from '@common/database'

@Entity({ tableName: 'app_environments' })
@Unique({ properties: ['app'] })
export class AppEnvironment extends BaseEntity {
  @Property({
    comment: '环境名称',
  })
  name!: string

  @Property({ comment: '环境简介' })
  desc?: string

  @Property({ comment: '是否为默认环境', default: false })
  isDefault: boolean = false

  @Property({ comment: '环境的优先级' })
  priority: number = 0

  @Property({ comment: '环境是否可用' })
  enabled: boolean = true
}
