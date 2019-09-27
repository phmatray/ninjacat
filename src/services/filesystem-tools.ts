import * as fse from 'fs-extra'
import * as path from 'path'
import * as os from 'os'
import { injectable, inject } from 'inversify'
import { TYPES } from '../constants/types'
import { Strings } from './string-tools'

@injectable()
export class FileSystem {
  constructor(@inject(TYPES.Strings) private strings: Strings) {}

  eol = os.EOL
  homedir = os.homedir

  separator = path.sep
  resolve = path.resolve

  // chmodSync = fse.chmodSync
  // createWriteStream = fse.createWriteStream
  // createReadStream = fse.createReadStream

  // cwd = fse.cwd
  // path = fse.path
  // append = fse.append
  // appendAsync = fse.appendAsync
  // copy = fse.copy
  // copyAsync = fse.copyAsync
  // dir = fse.dir
  // dirAsync = fse.dirAsync
  // exists = fse.exists
  // existsAsync = fse.existsAsync
  // file = fse.file
  // fileAsync = fse.fileAsync
  // find = fse.find
  // findAsync = fse.findAsync
  // inspect = fse.inspect
  // inspectAsync = fse.inspectAsync
  // inspectTree = fse.inspectTree
  // inspectTreeAsync = fse.inspectTreeAsync
  // list = fse.list
  // listAsync = fse.listAsync
  // move = fse.move
  // moveAsync = fse.moveAsync
  // read = fse.read
  // readAsync = fse.readAsync
  // remove = fse.remove
  // removeAsync = fse.removeAsync
  // rename = fse.rename
  // renameAsync = fse.renameAsync
  // symlink = fse.symlink
  // symlinkAsync = fse.symlinkAsync
  // write = fse.write
  // writeAsync = fse.writeAsync
  cwd = process.cwd
  read = fse.readFile
  readJson = fse.readJson
  write = fse.writeFile
  writeJson = fse.writeJson

  /**
   * Gets the immediate subdirectories.
   *
   * @param path Path to a directory to check.
   * @param isRelative Return back the relative directory
   * @return A list of directories
   */
  subdirectories(path: string, isRelative = false): string[] {
    let dirs

    try {
      dirs = fse
        .readdirSync(path, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name)
    } catch (error) {
      return []
    }

    return isRelative ? dirs : dirs.map(dir => `./${dir}`)
  }

  /**
   * Is this a file?
   *
   * @param path The filename to check.
   * @returns `true` if the file exists and is a file, otherwise `false`.
   */
  async isFile(path: string): Promise<boolean> {
    return (await fse.stat(path)).isFile()
  }

  /**
   * Is this not a file?
   *
   * @param path The filename to check
   * @return `true` if the file doesn't exist.
   */
  async isNotFile(path: string): Promise<boolean> {
    return !(await this.isFile(path))
  }

  /**
   * Is this a directory?
   *
   * @param path The directory to check.
   * @returns True/false -- does the directory exist?
   */
  async isDirectory(path: string): Promise<boolean> {
    return (await fse.stat(path)).isDirectory()
  }

  /**
   * Is this not a directory?
   *
   * @param path The directory to check.
   * @return `true` if the directory does not exist, otherwise false.
   */
  async isNotDirectory(path: string): Promise<boolean> {
    return !(await this.isDirectory(path))
  }
}
