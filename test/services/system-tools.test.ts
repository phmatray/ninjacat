import * as expect from 'expect'
import { System } from '../../src/services/system-tools'
import container from '../../src/di-container'
import { TYPES } from '../../src/constants/types'

let system: System

describe('system-tools', () => {
  beforeAll(() => {
    system = container.get<System>(TYPES.System)
  })

  it('should load dependency', () => {
    expect(system === null).toBeFalsy()
  })

  describe('which', () => {
    it('should not returns a non-existing package', () => {
      const result = system.which('non-existing-package')
      expect(result).toBe(null)
    })

    it('should returns the existing package', () => {
      const result = system.which('node')
      expect(result).not.toBe(null)
    })
  })

  describe('run', () => {
    it('should reject if the command does not exist', async () => {
      const result = system.run('non-existing-command')
      await expect(result).rejects.toThrowError()
    })

    it('should resolve if the command exists', async () => {
      // `echo` should be a general command for both *nix and windows
      const result = system.run('echo ninjacat', { trim: true })
      await expect(result).resolves.toBe('ninjacat')
    })
  })
})
