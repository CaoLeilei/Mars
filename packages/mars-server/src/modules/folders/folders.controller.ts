import { Controller, Get, Post } from '@nestjs/common'

@Controller('folders')
export class FoldersController {
  @Get()
  GetFolderList() {
    return []
  }

  @Post()
  CreateFolder() {
    // 进行请求创建文件夹，
    return {}
  }
}
