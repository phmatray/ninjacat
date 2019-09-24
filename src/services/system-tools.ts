import * as childProcess from 'child_process'
import * as execa from 'execa'
import * as crossSpawn from 'cross-spawn'
import * as which from 'which'
import { injectable, inject } from 'inversify'
import { TYPES } from '../constants/types'
import { NinjacatError, NinjacatTimer, Options } from '../typing/system-types'
import { Utils } from './utils'

@injectable()
export class System {
  constructor(@inject(TYPES.Utils) private utils: Utils) {}

  /**
   * Executes a commandline program asynchronously.
   *
   * @param commandLine The command line to execute.
   * @param options Additional child_process options for node.
   * @returns Promise with result.
   */
  async run(commandLine: string, options: Options = {}): Promise<string> {
    const trimmer = options && options.trim ? (s: string): string => s.trim() : (s: string): string => s

    return new Promise((resolve, reject): any => {
      const { exec } = childProcess
      exec(commandLine, options, (error: NinjacatError, stdout: string, stderr: string) => {
        if (error) {
          error.stderr = stderr
          return reject(error)
        }
        resolve(trimmer(stdout || ''))
      })
    })
  }

  /**
   * Executes a commandline via execa.
   *
   * @param commandLine The command line to execute.
   * @param options Additional child_process options for node.
   * @returns Promise with result.
   */
  async exec(commandLine: string, options: Options = {}): Promise<any> {
    return new Promise((resolve, reject): any => {
      const args = commandLine.split(' ')
      execa(this.utils.head(args), this.utils.tail(args), options)
        .then(result => resolve(result.stdout))
        .catch(error => reject(error))
    })
  }

  /**
   * Uses cross-spawn to run a process.
   *
   * @param commandLine The command line to execute.
   * @param options Additional child_process options for node.
   * @returns The response code.
   */
  async spawn(commandLine: string, options: Options = {}): Promise<any> {
    return new Promise((resolve): any => {
      const args = commandLine.split(' ')
      const spawned = crossSpawn(this.utils.head(args), this.utils.tail(args), options)
      const result: { stdout: string; status: number; error: Error } = {
        stdout: null,
        status: null,
        error: null,
      }

      if (spawned.stdout) {
        spawned.stdout.on('data', (data: string): void => {
          if (this.utils.isNil(result.stdout)) {
            result.stdout = data
          } else {
            result.stdout += data
          }
        })
      }

      spawned.on('close', (code: number): void => {
        result.status = code
        resolve(result)
      })

      spawned.on('error', (err: Error): void => {
        result.error = err
        resolve(result)
      })
    })
  }

  /**
   * Finds the location of the path.
   *
   * @param command The name of program you're looking for.
   * @return The full path or null.
   */
  which(command: string): string | void {
    return which.sync(command, { nothrow: true })
  }

  /**
   * Starts a timer used for measuring durations.
   *
   * @return A function that when called will return the elapsed duration in milliseconds.
   */
  startTimer(): NinjacatTimer {
    const started = process.uptime()
    return (): number => Math.floor((process.uptime() - started) * 1000) // uptime gives us seconds
  }
}
