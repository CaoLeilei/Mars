import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@mikro-orm/nestjs'
import { EntityManager } from '@mikro-orm/better-sqlite'
import { BaseRepository } from '@common/database'
// import { itemDoesNotExistKey, translate } from '@libs/i18n'
import { itemDoesNotExistKey, translate } from '@libs/i18n/translate'
import type { CursorPaginationDto } from '@common/dtos'
import { User } from '@entities'
import { BaseService } from '@libs/crud/crud.service'

import { CreateUserDto } from './dtos/create-user.dto'

@Injectable()
export class UsersService extends BaseService<User, CursorPaginationDto, CreateUserDto> {
  protected readonly queryName: string = 't'

  constructor(
    @InjectRepository(User) private userRepository: BaseRepository<User>,
    private readonly em: EntityManager,
  ) {
    super(userRepository)
  }
}
