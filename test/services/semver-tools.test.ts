import * as expect from 'expect'
import container from '../../src/di-container'
import { Semver } from '../../src/services/semver-tools'
import { TYPES } from '../../src/constants/types'

let semver: Semver

describe('semver-tools', () => {
  beforeAll(() => {
    semver = container.get<Semver>(TYPES.Semver)
  })

  it('should load dependency', () => {
    expect(semver === null).toBeFalsy()
  })
})
