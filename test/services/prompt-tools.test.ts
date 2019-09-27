import * as expect from 'expect'
import container from '../../src/di-container'
import { Prompt } from '../../src/services/prompt-tools'
import { TYPES } from '../../src/constants/types'

let prompt: Prompt

describe('prompt-tools', () => {
  beforeAll(() => {
    prompt = container.get<Prompt>(TYPES.Prompt)
  })

  it('should load dependency', () => {
    expect(prompt === null).toBeFalsy()
  })
})
