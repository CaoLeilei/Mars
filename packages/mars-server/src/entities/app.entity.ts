import { Entity, Property } from '@mikro-orm/core'
import { BaseEntity } from '@common/database'

@Entity()
export class Project extends BaseEntity {
  @Property({
    comment: '项目的名字~',
  })
  name!: string

  @Property({
    comment: '当前项目的描述~',
  })
  desc!: string
}
