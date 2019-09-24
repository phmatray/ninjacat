import * as expect from 'expect'
import { test } from '@oclif/test'
import { System } from '../../src/services/system-tools'
import container from '../../src/di-container'
import { TYPES } from '../../src/constants/types'

const system = container.get<System>(TYPES.System)

describe('system-tools', () => {
  test.it('which - existing package', () => {
    const result = system.which('node')
    expect(result).not.toBe(null)
  })

  test.it('which - non-existing package', () => {
    const result = system.which('non-existing-package')
    expect(result).toBe(null)
  })

  test.it('run - should reject if the command does not exist', async () => {
    await expect(system.run('non-existing-command')).rejects.toThrowError()
  })

  test.it('run - should resolve if the command exists', async () => {
    // `echo` should be a general command for both *nix and windows
    await expect(system.run('echo ninjacat', { trim: true })).resolves.toBe('ninjacat')
  })
})
