import { join } from 'node:path'

import { Module } from '@nestjs/common'
import { ServeStaticModule } from '@nestjs/serve-static'

// yong 用来进行校验测试的相关的东西
console.log('__dirname', __dirname)

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'resources'),
      serveStaticOptions: {
        maxAge: 86_400, // 1 day
      },
      exclude: ['/v1*', '/api*', '/graphql', '/docs*', '/health*', '/swagger*'],
    }),
  ],
  exports: [ServeStaticModule],
})
export class NestServeStaticModule {}
