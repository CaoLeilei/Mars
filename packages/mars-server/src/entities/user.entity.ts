import {
  BeforeCreate,
  BeforeUpdate,
  BeforeUpsert,
  Collection,
  Embeddable,
  Embedded,
  Entity,
  // Enum,
  EventArgs,
  Property,
  OneToMany,
  wrap,
  ManyToMany,
} from '@mikro-orm/core'
// import { Roles } from '@common/@types/enums/permission.enum'
import { BaseEntity } from '@common/database/base.entity'
import { HelperService } from '@common/helpers/helpers.utils'
import { AppBase } from './app.entity'
import { Organization } from './organization.entity'

@Embeddable()
export class Social {
  @Property()
  wechart?: string

  @Property()
  qq?: string

  @Property()
  weibo?: string
}

@Entity()
export class User extends BaseEntity {
  @Property({ index: true, unique: true })
  username!: string

  // 用户的登录密码
  // { hidden: true, columnType: 'text', lazy: true }
  @Property({ hidden: true, columnType: 'text' })
  password!: string

  // 用户的点子邮箱
  @Property({ index: true, unique: true })
  email!: string

  // 用户的真实姓名
  @Property()
  truename?: string = ''

  // 用户的昵称
  @Property()
  nickname?: string = ''

  @Property({ columnType: 'text' })
  bio?: string = ''

  // 用户的头像相关的信息
  @Property({ columnType: 'text' })
  avatar?: string = ''

  @Property()
  twoFactorSecret?: string

  @Property()
  isTwoFactorEnabled? = false

  // @Enum({ items: () => Roles, array: true })
  // roles?: Roles[] = [Roles.AUTHOR]

  @Property({ index: true, unique: true })
  mobileNumber?: string

  @Property()
  isVerified? = false

  @Embedded(() => Social, { object: true, nullable: true })
  social?: Social

  @Property()
  lastLogin? = new Date()

  // @ManyToOne

  @ManyToMany({ entity: 'Organization', pivotTable: 'organization_user' })
  organization = new Collection<Organization>(this)

  @OneToMany(() => AppBase, (app) => app.creator, {
    orphanRemoval: true,
    eager: false,
    nullable: true,
  })
  apps = new Collection<AppBase>(this)

  constructor(data?: Pick<User, 'idx'>) {
    super()
    Object.assign(this, data)
  }

  toJSON() {
    const o = wrap<User>(this).toObject()
    o.avatar = this.avatar || `https://ui-avatars.com/api/?name=${this.username}&background=0D8ABC&color=fff`

    return o
  }

  @BeforeCreate()
  @BeforeUpdate()
  @BeforeUpsert()
  async hashPassword(arguments_: EventArgs<this>) {
    if (arguments_.changeSet?.payload?.password) this.password = await HelperService.hashString(this.password)
  }
}
