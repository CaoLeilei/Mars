import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@mikro-orm/nestjs'
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
    const user = new User({ ...dto, idx: undefined })
    const dbUser = await this.userRepository.create(user)
    console.log(dbUser)
    return 'createUser'
  }
}
