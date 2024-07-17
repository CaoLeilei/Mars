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
      useFactory: (configService: ConfigService<Configs, true>) => ({
        fallbackLanguage: 'zh',
        fallbacks: {
          'zh-*': 'zh',
          'zh_*': 'zh',
          'en-*': 'en',
          'en_*': 'en',
          en: 'en',
          zh: 'zh',
        },
        logging: true,
        loaderOptions: {
          path: path.join(__dirname, '../../resources/i18n/'),
          watch: true,
          includeSubfolders: true,
        },
        typesOutputPath: configService.get('app.env', { infer: true }).startsWith('prod')
          ? undefined
          : path.join(`${process.cwd()}/src/generated/i18n-generated.ts`),
      }),
      resolvers: [{ use: QueryResolver, options: ['lang'] }, AcceptLanguageResolver, new HeaderResolver(['x-lang'])],
    }),
  ],
  exports: [I18nModule],
})
export class NestI18nModule {}
