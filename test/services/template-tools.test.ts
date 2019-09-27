import * as expect from 'expect'
import container from '../../src/di-container'
import { Template } from '../../src/services/template-tools'
import { TYPES } from '../../src/constants/types'

let template: Template

describe('template-tools', () => {
  beforeAll(() => {
    template = container.get<Template>(TYPES.Template)
  })

  it('should load dependency', () => {
    expect(template === null).toBeFalsy()
  })
})
