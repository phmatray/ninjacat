import * as expect from 'expect'
import container from '../../src/di-container'
import { TYPES } from '../../src/constants/types'
import { Meta } from '../../src/services/meta-tools'

let meta: Meta

describe('meta-tools', () => {
  beforeAll(() => {
    meta = container.get<Meta>(TYPES.Meta)
  })

  it('should load dependency', () => {
    expect(meta === null).toBeFalsy()
  })

  describe('getVersion', () => {
    it('should returns the version number', async () => {
      const version = await meta.getVersion()
      expect(version).not.toBeNull()
    })
  })

  describe('checkForUpdate', () => {
    it('should checks for update', async () => {
      const result = await meta.checkForUpdate()
      expect(result).not.toBeNull()
    })
  })
})
