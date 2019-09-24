import * as fs from 'fs'
import * as path from 'path'
import * as os from 'os'
import * as pathlib from 'path'
import * as jetpack from 'fs-jetpack'
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

  chmodSync = fs.chmodSync
  createWriteStream = fs.createWriteStream
  createReadStream = fs.createReadStream

  cwd = jetpack.cwd
  path = jetpack.path
  append = jetpack.append
  appendAsync = jetpack.appendAsync
  copy = jetpack.copy
  copyAsync = jetpack.copyAsync
  dir = jetpack.dir
  dirAsync = jetpack.dirAsync
  exists = jetpack.exists
  existsAsync = jetpack.existsAsync
  file = jetpack.file
  fileAsync = jetpack.fileAsync
  find = jetpack.find
  findAsync = jetpack.findAsync
  inspect = jetpack.inspect
  inspectAsync = jetpack.inspectAsync
  inspectTree = jetpack.inspectTree
  inspectTreeAsync = jetpack.inspectTreeAsync
  list = jetpack.list
  listAsync = jetpack.listAsync
  move = jetpack.move
  moveAsync = jetpack.moveAsync
  read = jetpack.read
  readAsync = jetpack.readAsync
  remove = jetpack.remove
  removeAsync = jetpack.removeAsync
  rename = jetpack.rename
  renameAsync = jetpack.renameAsync
  symlink = jetpack.symlink
  symlinkAsync = jetpack.symlinkAsync
  write = jetpack.write
  writeAsync = jetpack.writeAsync

  /**
   * Gets the immediate subdirectories.
   *
   * @param path Path to a directory to check.
   * @param isRelative Return back the relative directory?
   * @param matching   A jetpack matching filter
   * @return A list of directories
   */
  subdirectories(path: string, isRelative = false, matching = '*'): string[] {
    if (this.strings.isBlank(path) || !this.isDirectory(path)) {
      return []
    }

    const dirs = jetpack.cwd(path).find({
      matching,
      directories: true,
      recursive: false,
      files: false,
    })
    if (isRelative) {
      return dirs
    } else {
      return dirs.map(dir => pathlib.join(path, dir))
    }
  }

  /**
   * Is this a file?
   *
   * @param path The filename to check.
   * @returns `true` if the file exists and is a file, otherwise `false`.
   */
  isFile(path: string): boolean {
    return jetpack.exists(path) === 'file'
  }

  /**
   * Is this not a file?
   *
   * @param path The filename to check
   * @return `true` if the file doesn't exist.
   */
  isNotFile(path: string): boolean {
    return !this.isFile(path)
  }

  /**
   * Is this a directory?
   *
   * @param path The directory to check.
   * @returns True/false -- does the directory exist?
   */
  isDirectory(path: string): boolean {
    return jetpack.exists(path) === 'dir'
  }

  /**
   * Is this not a directory?
   *
   * @param path The directory to check.
   * @return `true` if the directory does not exist, otherwise false.
   */
  isNotDirectory(path: string): boolean {
    return !this.isDirectory(path)
  }
}
