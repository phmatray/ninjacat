import { injectable, inject } from 'inversify'
import { TYPES } from '../constants/types'
import { NinjacatPatchingPatchOptions } from '../typing/patching-types'
import { FileSystem } from './filesystem-tools'
import { Utils } from './utils'

@injectable()
export class Patching {
  constructor(@inject(TYPES.FileSystem) private fileSystem: FileSystem, @inject(TYPES.Utils) private utils: Utils) {}

  /**
   * Identifies if something exists in a file. Async.
   *
   * @param filename The path to the file we'll be scanning.
   * @param findPattern The case sensitive string or RegExp that identifies existence.
   * @return Boolean of success that findPattern was in file.
   */
  async exists(filename: string, findPattern: string | RegExp): Promise<boolean> {
    // sanity check the filename
    if (!this.utils.is(String, filename) || this.fileSystem.isNotFile(filename)) return false

    // sanity check the findPattern
    const patternIsString = typeof findPattern === 'string'
    if (!(findPattern instanceof RegExp) && !patternIsString) return false

    // read from jetpack -- they guard against a lot of the edge
    // cases and return nil if problematic
    const contents = await this.fileSystem.read(filename, 'utf8')

    // only let the strings pass
    if (!this.utils.is(String, contents)) return false

    // do the appropriate check
    return this.isPatternIncluded(contents, findPattern)
  }

  /**
   * Updates a text file or json config file. Async.
   *
   * @param filename File to be modified.
   * @param callback Callback function for modifying the contents of the file.
   */
  async update(
    filename: string,
    callback: (contents: string | object) => string | object | false,
  ): Promise<string | object | false> {
    const contents = await this.readFile(filename)

    // let the caller mutate the contents in memory
    const mutatedContents = callback(contents)

    // only write if they actually sent back something to write
    if (mutatedContents !== false) {
      await this.fileSystem.write(filename, mutatedContents, { encoding: 'utf8' })
    }

    return mutatedContents
  }

  /**
   * Convenience function for prepending a string to a given file. Async.
   *
   * @param filename       File to be prepended to
   * @param prependedData  String to prepend
   */
  async prepend(filename: string, prependedData: string): Promise<string | false> {
    return this.update(filename, data => prependedData + data) as Promise<string | false>
  }

  /**
   * Convenience function for appending a string to a given file. Async.
   *
   * @param filename       File to be appended to
   * @param appendedData  String to append
   */
  async append(filename: string, appendedData: string): Promise<string | false> {
    return this.update(filename, data => data + appendedData) as Promise<string | false>
  }

  /**
   * Convenience function for replacing a string in a given file. Async.
   *
   * @param filename       File to be prepended to
   * @param oldContent     String to replace
   * @param newContent     String to write
   */
  async replace(filename: string, oldContent: string, newContent: string): Promise<string | false> {
    return this.update(filename, data => (data as string).replace(oldContent, newContent)) as Promise<string | false>
  }

  /**
   * Conditionally places a string into a file before or after another string,
   * or replacing another string, or deletes a string. Async.
   *
   * @param filename        File to be patched
   * @param opts            Options
   * @param opts.insert     String to be inserted
   * @param opts.before     Insert before this string
   * @param opts.after      Insert after this string
   * @param opts.replace    Replace this string
   * @param opts.delete     Delete this string
   * @param opts.force      Write even if it already exists
   *
   * @example
   *   await toolbox.patching.patch('thing.js', { before: 'bar', insert: 'foo' })
   *
   */
  async patch(filename: string, opts: NinjacatPatchingPatchOptions = {}): Promise<string | false> {
    return this.update(filename, data => this.patchString(data as string, opts)) as Promise<string | false>
  }

  async readFile(filename: string): Promise<string> {
    // bomb if the file doesn't exist
    if (!this.fileSystem.isFile(filename)) throw new Error(`file not found ${filename}`)

    // check type of file (JSON or not)
    const filePromise = filename.endsWith('.json')
      ? this.fileSystem.readJson(filename)
      : this.fileSystem.read(filename, 'utf8')

    return await filePromise
  }

  patchString(data: string, opts: NinjacatPatchingPatchOptions = {}): string | false {
    // Already includes string, and not forcing it
    if (this.isPatternIncluded(data, opts.insert) && !opts.force) return false

    // delete <string> is the same as replace <string> + insert ''
    const replaceString = opts.delete || opts.replace

    if (replaceString) {
      if (!this.isPatternIncluded(data, replaceString)) return false

      // Replace matching string with new string or nothing if nothing provided
      return data.replace(replaceString, `${opts.insert || ''}`)
    } else {
      return this.insertNextToPattern(data, opts)
    }
  }

  insertNextToPattern(data: string, opts: NinjacatPatchingPatchOptions): string | false {
    // Insert before/after a particular string
    const findPattern: string | RegExp = opts.before || opts.after

    // sanity check the findPattern
    const patternIsString = typeof findPattern === 'string'
    if (!(findPattern instanceof RegExp) && !patternIsString) return false

    const isPatternFound = this.isPatternIncluded(data, findPattern)
    if (!isPatternFound) return false

    const originalString = patternIsString ? findPattern : data.match(findPattern)[0]
    const newContents = opts.after ? `${originalString}${opts.insert || ''}` : `${opts.insert || ''}${originalString}`
    return data.replace(findPattern, newContents)
  }

  isPatternIncluded(data: string, findPattern: string | RegExp): boolean {
    if (!findPattern) return false
    return typeof findPattern === 'string' ? data.includes(findPattern) : findPattern.test(data)
  }
}
