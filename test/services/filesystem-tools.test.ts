import * as expect from 'expect'
import container from '../../src/di-container'
import { TYPES } from '../../src/constants/types'
import { FileSystem } from '../../src/services/filesystem-tools'

let fileSystem: FileSystem

describe('filesystem-tools', () => {
  beforeAll(() => {
    fileSystem = container.get<FileSystem>(TYPES.FileSystem)
  })

  it('should load dependency', () => {
    expect(fileSystem === null).toBeFalsy()
  })

  it('isFile', async () => {
    expect(await fileSystem.isFile(__filename)).toBe(true)
    expect(await fileSystem.isFile(__dirname)).toBe(false)
  })

  it('isNotFile', async () => {
    expect(await fileSystem.isNotFile(__filename)).toBe(false)
    expect(await fileSystem.isNotFile(__dirname)).toBe(true)
  })

  it('isDirectory', async () => {
    expect(await fileSystem.isDirectory(__dirname)).toBe(true)
    expect(await fileSystem.isDirectory(__filename)).toBe(false)
  })

  it('isNotDirectory', async () => {
    expect(await fileSystem.isNotDirectory(__dirname)).toBe(false)
    expect(await fileSystem.isNotDirectory(__filename)).toBe(true)
  })

  it('subdirectories', async () => {
    const dirs = await fileSystem.subdirectories(`${__dirname}/..`)
    expect(dirs.length).toBe(2)
    expect(dirs).toEqual(['./commands', './services'])
  })

  it('blank subdirectories', async () => {
    expect(await fileSystem.subdirectories('')).toEqual([])
    expect(await fileSystem.subdirectories(__filename)).toEqual([])
  })

  it('relative subdirectories', async () => {
    const dirs = await fileSystem.subdirectories(`${__dirname}/..`, true)
    expect(dirs.length).toBe(2)
    expect(dirs).toContain(`services`)
  })

  it('path separator', () => {
    const sep = fileSystem.separator
    expect(sep).toBe(require('path').sep)
    expect(['/', '\\']).toContain(sep)
  })
})
