import type { File } from '@common/@types'

export type Optional<T> = T | undefined
export type Nullable<T> = T | null

// This type represents a dto that contains a file or files
export type RecordWithFile<T, K = File> = T & {
  files: K
}
