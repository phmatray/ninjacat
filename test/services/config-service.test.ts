import * as expect from 'expect'
import container from '../../src/di-container'
import { Configuration } from '../../src/services/config-service'
import { TYPES } from '../../src/constants/types'

let config: Configuration

describe('config-service', () => {
  beforeAll(() => {
    config = container.get<Configuration>(TYPES.Configuration)
  })

  it('should load dependency', () => {
    expect(config === null).toBeFalsy()
  })
})
