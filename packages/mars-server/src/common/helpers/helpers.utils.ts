import type { Options as ArgonOptions } from 'argon2'
import { argon2id, hash, verify } from 'argon2'
import { Observable, from } from 'rxjs'
import dayjs from 'dayjs'

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
  isDev() {
    const nodeEnv = process?.env?.NODE_ENV

    if (typeof nodeEnv === 'string') {
      return nodeEnv.startsWith('dev')
    }
    return false
  },

  /* The `getTimeInUtc` function takes a `Date` object or a string representation of a date as input and
  returns a new `Date` object representing the same date and time in UTC timezone. */
  // getTimeInUtc(date: Date | string): Date {
  //   const thatDate = date instanceof Date ? date : new Date(date);
  //   const currentUtcTime = zonedTimeToUtc(thatDate, "UTC");

  //   return new Date(format(currentUtcTime, "yyyy-MM-dd HH:mm:ss"));
  // },
  /**
   *
   * @param date 需要进行转换的时间类型
   * @returns
   */
  getTimeInUtc(date: Date | string): Date {
    const thatDate = date instanceof Date ? date : new Date(date)
    const currentUtcTime = dayjs(thatDate, 'UTC')
    return new Date(currentUtcTime.format('YYYY-MM-DD HH:mm:ss'))
    // return new Date(dayjscurrentUtcTime, "yyyy-MM-dd HH:mm:ss"));
  },

  /* 对字符串进行hash编码 */
  hashString(str: string): Promise<string> {
    const hasResult = hash(str, argon2Options)
    console.log(hasResult)
    return hasResult
  },

  /* 验证加密后的数据是否正确 */
  verifyHash(beforStr: string, afterStr: string): Observable<boolean> {
    return from(verify(beforStr, afterStr, argon2Options))
  },
}
