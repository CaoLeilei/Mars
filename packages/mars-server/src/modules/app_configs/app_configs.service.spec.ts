import { Test, TestingModule } from '@nestjs/testing'
import { AppConfigsService } from './app_configs.service'

describe('AppConfigsService', () => {
  let service: AppConfigsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppConfigsService],
    }).compile()

    service = module.get<AppConfigsService>(AppConfigsService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
