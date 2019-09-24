import * as path from 'path'
import * as expect from 'expect'
import { test } from '@oclif/test'
import { FileSystem } from '../../src/services/filesystem-tools'
import container from '../../src/di-container'
import { TYPES } from '../../src/constants/types'

const fileSystem = container.get<FileSystem>(TYPES.FileSystem)

describe('filesystem-tools', () => {
  test.it('isFile', () => {
    expect(fileSystem.isFile(__filename)).toBe(true)
    expect(fileSystem.isFile(__dirname)).toBe(false)
  })

  test.it('isNotFile', () => {
    expect(fileSystem.isNotFile(__filename)).toBe(false)
    expect(fileSystem.isNotFile(__dirname)).toBe(true)
  })

  test.it('isDirectory', () => {
    expect(fileSystem.isDirectory(__dirname)).toBe(true)
    expect(fileSystem.isDirectory(__filename)).toBe(false)
  })

  test.it('isNotDirectory', () => {
    expect(fileSystem.isNotDirectory(__dirname)).toBe(false)
    expect(fileSystem.isNotDirectory(__filename)).toBe(true)
  })

  test.it('subdirectories', () => {
    const dirs = fileSystem.subdirectories(`${__dirname}/..`)
    expect(dirs.length).toBe(2)
    expect(dirs).toContain(path.join(__dirname, '..', 'toolbox'))
  })

  test.it('blank subdirectories', () => {
    expect(fileSystem.subdirectories('')).toEqual([])
    expect(fileSystem.subdirectories(__filename)).toEqual([])
  })

  test.it('relative subdirectories', () => {
    const dirs = fileSystem.subdirectories(`${__dirname}/..`, true)
    expect(dirs.length).toBe(2)
    expect(dirs).toContain(`toolbox`)
  })

  test.it('filtered subdirectories', () => {
    const dirs = fileSystem.subdirectories(`${__dirname}/..`, true, 'to*')
    expect(1).toBe(dirs.length)
    expect(dirs).toContain(`toolbox`)
  })

  test.it('path separator', () => {
    const sep = fileSystem.separator
    expect(sep).toBe(require('path').sep)
    expect(['/', '\\']).toContain(sep)
  })
})
