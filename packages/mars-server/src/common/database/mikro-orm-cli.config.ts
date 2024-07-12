import { join } from 'path'
import { Logger } from '@nestjs/common'
import { Options } from '@mikro-orm/core'
import { defineConfig } from '@mikro-orm/better-sqlite'
import { config as environmentConfig } from 'dotenv'
import dotEnvExpand from 'dotenv-expand'
import { baseOptions } from './orm.config'

const logger = new Logger('MikroORM')

logger.log('hello world')

const environment = environmentConfig({
  path: `${process.cwd()}/env/.env.${process.env.NODE_ENV}`,
})

dotEnvExpand.expand(environment)

const config: Options = defineConfig({
  ...baseOptions,
  dbName: join(process.cwd(), 'data/test.db'),
})

logger.log(config)

console.log('config:', config)

export default config
