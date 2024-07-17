import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@mikro-orm/nestjs'
import { EntityManager } from '@mikro-orm/better-sqlite'
import { BaseRepository } from '@common/database'
// import { itemDoesNotExistKey, translate } from '@libs/i18n'
import { itemDoesNotExistKey, translate } from '@libs/i18n/translate'
import { User } from '@entities'
import { CreateUserDto } from './dtos/create-user.dto'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: BaseRepository<User>,
    private readonly em: EntityManager,
  ) {}

  async findOne(idx: string): Promise<User> {
    const user = await this.userRepository.findOne({ idx })
    if (!user) {
      throw new NotFoundException(
        translate(itemDoesNotExistKey, {
          args: { item: 'User' },
        }),
      )
    }
    return user
  }

  /**
   * 创建当前的用户以及用户的相关信息
   * @param dto
   * @returns
   */
  public async create(dto: CreateUserDto) {
    const user = await this.userRepository.create({ ...dto })
    this.em.persistAndFlush(user)
    return user
  }
}
