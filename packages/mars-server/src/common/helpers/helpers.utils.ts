import { existsSync } from 'node:fs'
import { join } from 'node:path'
import process from 'node:process'

import type { Buffer } from 'node:buffer'

import type { Options as ArgonOptions } from 'argon2'
import { argon2id, hash, verify } from 'argon2'
// import sharp from 'sharp'
import { pick } from 'helper-fns'
import { format, fromZonedTime } from 'date-fns-tz'

import type { AuthenticationResponse } from '@common/@types'
import { User } from '@entities'

// import { format, zonedTimeToUtc } from "date-fns";
// import { zonedTimeToUtc, format } from 'date-fns-tz'
// import { format, zonedTimeToUtc } from "date-fns-tz";

const argon2Options: ArgonOptions & { raw?: false } = {
  type: argon2id,
  hashLength: 50,
  // saltLength: 32,
  timeCost: 4,
}

export const HelperService = {
  /**
   * 构建认证响应对象。
   *
   * 此函数用于根据用户信息和令牌生成一个认证响应对象，该对象包含用户的基本信息、访问令牌和可能的刷新令牌。
   * 主要用于在用户成功登录后，服务器返回给客户端的信息，以便客户端可以保存令牌并使用它们来进行后续的API请求。
   *
   * @param user 用户对象，包含用户的信息。
   * @param accessToken 访问令牌，用于客户端进行API请求的身份验证。
   * @param refreshToken 刷新令牌，可选参数，用于客户端在访问令牌过期后获取新的访问令牌。
   * @returns 返回一个包含用户信息、访问令牌和可能的刷新令牌的认证响应对象。
   */
  buildPayloadResponse(user: User, accessToken: string, refreshToken?: string): AuthenticationResponse {
    return {
      user: {
        ...pick(user, ['id', 'idx']),
      },
      accessToken,
      ...(refreshToken ? { refresh_token: refreshToken } : {}),
    }
  },

  isProd(): boolean {
    return process.env.NODE_ENV.startsWith('prod')
  },

  isDev(): boolean {
    return process.env.NODE_ENV.startsWith('dev')
  },
  getAppRootDir() {
    let currentDirectory = __dirname

    while (!existsSync(join(currentDirectory, 'resources'))) currentDirectory = join(currentDirectory, '..')

    return process.env.NODE_ENV === 'prod' ? join(currentDirectory, 'dist') : currentDirectory
  },

  /**
   *
   * @param date 需要进行转换的时间类型
   * @returns
   */
  getTimeInUtc(date: Date | string): Date {
    const thatDate = date instanceof Date ? date : new Date(date)
    const currentUtcTime = fromZonedTime(thatDate, 'UTC')

    return new Date(format(currentUtcTime, 'yyyy-MM-dd HH:mm:ss'))
  },
  // async generateThumb(input: Buffer, config: { height: number; width: number }): Promise<Buffer> {
  //   return await sharp(input).resize(config).toFormat('png').toBuffer()
  // },

  /* 对字符串进行hash编码 */
  hashString(str: string): Promise<string> {
    const hasResult = hash(str, argon2Options)
    return hasResult
  },

  /* 验证加密后的数据是否正确 */
  async verifyHash(beforStr: string, afterStr: string): Promise<boolean> {
    return await verify(beforStr, afterStr, argon2Options)
  },
}
