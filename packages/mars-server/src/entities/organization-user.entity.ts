import { Entity, Property, PrimaryKey, ForeignKey } from '@mikro-orm/core'
import { BaseEntity } from '@common/database/base.entity'
import { User } from './user.entity'
import { Organization } from './organization.entity'

@Entity({ tableName: 'organization_user' })
export class OrganizationUser extends BaseEntity {
  @PrimaryKey({ name: 'organization_id' })
  // @ForeignKey(() => Organization, { action: 'cascade' })
  organizationId!: string

  @PrimaryKey({ name: 'user_id' })
  // @ForeignKey(() => User, { action: 'cascade' })
  userId!: string

  // @Property()
  // role!: string

  // @Property()
  // status!: string
}
