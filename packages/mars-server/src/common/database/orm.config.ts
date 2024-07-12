import { LoadStrategy } from '@mikro-orm/core'
import { TsMorphMetadataProvider } from '@mikro-orm/reflection'
import { SqlHighlighter } from '@mikro-orm/sql-highlighter'
// import { SqliteDriver } from '@mikro-orm/better-sqlite';
import { Logger, NotFoundException } from '@nestjs/common'
import { Migrator } from '@mikro-orm/migrations'

const logger = new Logger('MikroORM')

export const baseOptions = {
  entities: ['dist/entities/*.entity.js'],
  entitiesTs: ['src/entities/*.entity.ts'],
  findOneOrFailHandler: (entityName: string, key: any) => {
    return new NotFoundException(`${entityName} not found for ${key}`)
  },
  migrations: {
    migrations: {
      fileName: (timestamp: string, name?: string) => {
        if (!name) return `Migration${timestamp}`

        return `Migration${timestamp}_${name}`
      },
    },
    tableName: 'migrations', // name of database table with log of executed transactions
    path: './migrations', // path to the folder with migrations
    pathTs: undefined, // path to the folder with TS migrations (if used, we should put path to compiled files in `path`)
    glob: '!(*.d).{js,ts}', // how to match migration files (all .js and .ts files, but not .d.ts)
    transactional: true, // wrap each migration in a transaction
    allOrNothing: true, // wrap all migrations in master transaction
    snapshot: true, // save snapshot when creating new migrations
  },
  logger: logger.log.bind(logger),
  metadataProvider: TsMorphMetadataProvider,
  highlighter: new SqlHighlighter(),
  debug: true,
  loadStrategy: LoadStrategy.JOINED,
  extensions: [Migrator],
  // entityRepository: BaseRepository,
  forceUtcTimezone: true,
  registerRequestContext: true,
  pool: { min: 2, max: 10 },
}
