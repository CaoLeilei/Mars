import { Test, TestingModule } from '@nestjs/testing'
import { AppConfigsController } from './app_configs.controller'

describe('AppConfigsController', () => {
  let controller: AppConfigsController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppConfigsController],
    }).compile()

    controller = module.get<AppConfigsController>(AppConfigsController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
