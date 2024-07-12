import { join } from 'path'
import { registerAs } from '@nestjs/config'
import Joi, { string } from 'joi'

export const sqliteConfigValidationSchema = {
  SQLITE_DB_NAME: Joi.string().required(),
}

export const sqlite = registerAs('sqlite', () => {
  const configDbName = process.env.SQLITE_DB_NAME || ''
  const dbName = join(process.cwd(), '/data/', configDbName)

  return {
    dbName,
    readonly: false,
    fileMustExist: false, // 项目文件必须存在么
    timeout: 5000,
    verbose: function () {},
  }
})
