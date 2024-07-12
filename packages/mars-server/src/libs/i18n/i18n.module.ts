import path from 'node:path'

import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { AcceptLanguageResolver, HeaderResolver, I18nModule, QueryResolver } from 'nestjs-i18n'
import type { Configs } from '@libs/config'

@Module({
  imports: [
    I18nModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService<Configs, true>) => {
        let appEnvStr = configService.get('app.env', { infer: true }) || ''

        if (typeof appEnvStr === 'string') {
          appEnvStr = ''
        }

        console.log('i18n file path:', path.join(__dirname, '../../resources/i18n/'))

        return {
          fallbackLanguage: 'en',
          fallbacks: {
            'zh-*': 'cn', // 对应中文相关的内容
            'np-*': 'np',
            'en-*': 'en',
            'np_*': 'np',
            'en_*': 'en',
            en: 'en',
            np: 'np',
          },
          logging: true,
          loaderOptions: {
            path: path.join(__dirname, '../../resources/i18n/'),
            watch: true,
            includeSubfolders: true,
          },
          typesOutputPath: appEnvStr.startsWith('prod')
            ? undefined
            : path.join(`${process.cwd()}/src/generated/i18n-generated.ts`),
        }
      },
      resolvers: [{ use: QueryResolver, options: ['lang'] }, AcceptLanguageResolver, new HeaderResolver(['x-lang'])],
    }),
  ],
  exports: [I18nModule],
})
export class NestI18nModule {}
