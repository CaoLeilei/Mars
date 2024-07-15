import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@mikro-orm/nestjs'
import { EntityManager } from '@mikro-orm/core'
import { BaseRepository } from '@common/database'
import { User } from '@entities'
import { CreateUserDto } from './dtos/create-user.dto'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: BaseRepository<User>,
    private readonly em: EntityManager,
  ) {}

  public async create(dto: CreateUserDto) {
    const { ...rest } = dto
    // const user = new User({ ...dto, idx: undefined })
    const user = await this.userRepository.create({...dto})
    console.log(user)
    // 调用数据的相关的内容进行保存数据
    await this.em.persistAndFlush(user)
    return 'createUser'
  }
}
