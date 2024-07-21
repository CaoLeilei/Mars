import { Entity, Property, OneToMany, ManyToMany, Collection } from '@mikro-orm/core'
import { BaseEntity } from '@common/database'
import { User } from './user.entity'

@Entity({ tableName: 'organizations' })
export class Organization extends BaseEntity {
  @Property({ name: 'name', comment: '组织的名称', unique: true })
  name!: string

  @Property({ name: 'desc', comment: '组织的描述内容' })
  desc?: string

  @Property({ name: 'slug', unique: true })
  slug!: string

  @Property({ name: 'domain' })
  domain?: string

  @Property({ name: 'enable_sign_up' })
  enableSignUp!: boolean

  // @OneToMany(() => GroupPermission, (groupPermission) => groupPermission.organization, { onDelete: 'CASCADE' })
  // @JoinProperty({ name: 'organization_id' })
  // groupPermissions: GroupPermission[]

  @ManyToMany({ entity: 'User', pivotTable: 'organization_user' })
  organizationUsers = new Collection<User>(this)

  // @OneToMany(() => AppEnvironment, (appEnvironment) => appEnvironment.organization, { onDelete: 'CASCADE' })
  // @JoinProperty({ name: 'organization_id' })
  // appEnvironments: AppEnvironment[]

  // @OneToMany(() => InternalTable, (internalTable) => internalTable.organization)
  // internalTable: InternalTable[]
}
