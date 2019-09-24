import * as childProcess from 'child_process'

/**
 * Returns the number of milliseconds from when the timer started.
 */
export type NinjacatTimer = () => number

export type StringOrBuffer = string | Buffer

export interface NinjacatError extends Error {
  stderr?: StringOrBuffer
}

export type Options = {
  [key: string]: any
} & childProcess.ExecOptions
