import { Logger } from '@nestjs/common'
import { I18nContext, i18nValidationMessage } from 'nestjs-i18n'
import type { Path } from 'nestjs-i18n'
import type { TranslateOptions } from 'nestjs-i18n/dist/services/i18n.service'
import type { I18nTranslations } from '../../generated'

export const itemDoesNotExistKey: Path<I18nTranslations> = 'exception.itemDoesNotExist'

const logger = new Logger('translate')
const env = process.env.NODE_ENV
export function translate(key: Path<I18nTranslations>, options: TranslateOptions = {}) {
  const i18nContext = I18nContext.current<I18nTranslations>()

  const transOptions = {
    ...options,
    debugger: env?.startsWith('dev') ? true : false,
  }
  if (i18nContext) return i18nContext.t(key, transOptions)

  // Handle the case when i18nContext is undefined
  return '' // or throw an error, return a default value, etc.
}

export function validationI18nMessage(key: Path<I18nTranslations>, arguments_?: any) {
  return i18nValidationMessage(key, arguments_)
}
