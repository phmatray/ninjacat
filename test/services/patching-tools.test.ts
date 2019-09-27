import * as expect from 'expect'
import container from '../../src/di-container'
import { Patching } from '../../src/services/patching-tools'
import { TYPES } from '../../src/constants/types'

let patching: Patching

describe('patching-tools', () => {
  beforeAll(() => {
    patching = container.get<Patching>(TYPES.Patching)
  })

  it('should load dependency', () => {
    expect(patching === null).toBeFalsy()
  })
})
