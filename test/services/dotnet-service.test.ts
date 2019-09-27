import * as expect from 'expect'
import container from '../../src/di-container'
import { Dotnet } from '../../src/services/dotnet-service'
import { TYPES } from '../../src/constants/types'

let dotnet: Dotnet

describe('dotnet-service', () => {
  beforeAll(() => {
    dotnet = container.get<Dotnet>(TYPES.Dotnet)
  })

  it('should load dependency', () => {
    expect(dotnet === null).toBeFalsy()
  })
})
