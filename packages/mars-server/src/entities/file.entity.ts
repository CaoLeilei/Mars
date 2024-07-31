import { Entity, Property, ManyToOne, Enum, Rel, Ref } from '@mikro-orm/core'
import { BaseEntity } from '@common/database'

@Entity({ tableName: 'files' })
export class Files extends BaseEntity {
  @Property({ comment: '文件名称' })
  name!: string

  @Property({ comment: '文件大小' })
  size!: number

  @Property({ comment: '文件类型' })
  type!: string

  @Property({ comment: '文件路径' })
  path!: string

  @Property({ comment: '文件的来源类型' })
  source!: string

  @Property({ comment: '文件md5' })
  md5!: string

  @Property({ comment: '文件预览图' })
  preview?: string
}
