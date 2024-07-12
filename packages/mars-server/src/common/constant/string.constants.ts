import { capitalize, getPackageJson } from 'helper-fns'

const packageJson = getPackageJson()

export const APP_NAME = packageJson.name

console.log(capitalize(APP_NAME))
export const VERSION_VALIDATION_MESSAGE = 'Version must start with "v" followed by a number.'

export const APP_ENVIRONMENTS = ['dev', 'development', 'stage', 'staging', 'test', 'testing', 'prod', 'production']
