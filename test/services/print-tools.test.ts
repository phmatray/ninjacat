import * as expect from 'expect'
import container from '../../src/di-container'
import { Print } from '../../src/services/print-tools'
import { TYPES } from '../../src/constants/types'

let print: Print

describe('print-tools', () => {
  beforeAll(() => {
    print = container.get<Print>(TYPES.Print)
  })

  it('should load dependency', () => {
    expect(print === null).toBeFalsy()
  })
})
