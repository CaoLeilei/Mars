import { Entity, Property } from '@mikro-orm/core'
import { BaseEntity } from '@common/database'

@Entity({ tableName: 'organizations' })
export class Organization extends BaseEntity {
  @Property({ name: 'name', unique: true })
  name!: string

  @Property({ name: 'slug' })
  desc?: string

  @Property({ name: 'domain' })
  domain?: string

  @Property({ name: 'enable_sign_up' })
  enableSignUp: boolean = false

  // @OneToMany(() => GroupPermission, (groupPermission) => groupPermission.organization, { onDelete: 'CASCADE' })
  // @JoinProperty({ name: 'organization_id' })
  // groupPermissions: GroupPermission[]

  // @OneToMany(() => OrganizationUser, (organizationUser) => organizationUser.organization)
  // organizationUsers: OrganizationUser[]

  // @OneToMany(() => AppEnvironment, (appEnvironment) => appEnvironment.organization, { onDelete: 'CASCADE' })
  // @JoinProperty({ name: 'organization_id' })
  // appEnvironments: AppEnvironment[]

  // @OneToMany(() => InternalTable, (internalTable) => internalTable.organization)
  // internalTable: InternalTable[]
}
