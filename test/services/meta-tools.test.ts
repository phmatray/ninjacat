import * as expect from 'expect'
import { test } from '@oclif/test'
import { Meta } from '../../src/services/meta-tools'
import container from '../../src/di-container'
import { TYPES } from '../../src/constants/types'

const meta = container.get<Meta>(TYPES.Meta)

describe('meta-tools', () => {
  test.it('returns the version number', () => {
    const version = meta.getVersion()
    expect(version).not.toBeNull()
  })

  // TODO: uncomment this after the first publish on npm registry
  // test.it('checks for update', async () => {
  //   const result = await Meta.checkForUpdate()
  //   console.warn(result)
  // })
})
