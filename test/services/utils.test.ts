import * as expect from 'expect'
import container from '../../src/di-container'
import { TYPES } from '../../src/constants/types'
import { Utils } from '../../src/services/utils'

let utils: Utils

describe('utils', () => {
  beforeAll(() => {
    utils = container.get<Utils>(TYPES.Utils)
  })

  it('should load dependency', () => {
    expect(utils === null).toBeFalsy()
  })

  describe('head', () => {
    it('should returns undefined when the array is empty', () => {
      const array: number[] = []
      const firstElement = utils.head(array)
      expect(firstElement).toBe(undefined)
    })

    it('should returns the first element', () => {
      const array = [1, 2, 3]
      const firstElement = utils.head(array)
      expect(firstElement).toBe(1)
    })
  })

  describe('tail', () => {
    it('should returns an empty array when the array is empty', () => {
      const array: number[] = []
      const firstElement = utils.tail(array)
      expect(firstElement).toStrictEqual([])
    })

    it('should returns the last element', () => {
      const array = [1, 2, 3]
      const firstElement = utils.tail(array)
      expect(firstElement).toStrictEqual([2, 3])
    })
  })

  describe('isNil', () => {
    it('should returns false when parameter is not nil', () => {
      const s = 'azerty'
      const result = utils.isNil(s)
      expect(result).toBeFalsy()
    })

    it('should returns true when parameter is null', () => {
      const s: string = null
      const result = utils.isNil(s)
      expect(result).toBeTruthy()
    })

    it('should returns true when parameter is undefined', () => {
      const s: string = undefined
      const result = utils.isNil(s)
      expect(result).toBeTruthy()
    })
  })

  describe('split', () => {
    it('should not split when separator is not found in the string', () => {
      const s = 'Azerty.Uiop'
      const separator = '-'
      const result = utils.split(separator, s)
      result
      expect(result).toStrictEqual(['Azerty.Uiop'])
    })

    it('should split', () => {
      const s = 'Azerty.Uiop'
      const separator = '.'
      const result = utils.split(separator, s)
      expect(result).toStrictEqual(['Azerty', 'Uiop'])
    })
  })

  describe('trim', () => {
    it('should have the right length when the string has no blank spaces', () => {
      const s = 'azerty'
      const result = utils.trim(s)
      expect(result).not.toBeNull()
      expect(result).toHaveLength(6)
    })

    it('should have the right length', () => {
      const s = 'azerty '
      const result = utils.trim(s)
      expect(result).not.toBeNull()
      expect(result).toHaveLength(6)
    })
  })

  describe('forEach', () => {
    it('should execute', () => {
      const array = [1, 2, 3]
      const fn = (): void => {}
      utils.forEach(fn, array)
    })
  })

  describe('keys', () => {
    it('should returns an empty array when the record is empty', () => {
      const record = {}
      const result: string[] = utils.keys(record)
      expect(result).toStrictEqual([])
    })

    it('should returns keys', () => {
      const record = { key: 'value', key2: 'value2' }
      const result: string[] = utils.keys(record)
      expect(result).toStrictEqual(['key', 'key2'])
    })
  })

  describe('last', () => {
    it('should returns undefined when the array is empty', () => {
      const array: number[] = []
      const firstElement = utils.last(array)
      expect(firstElement).toBe(undefined)
    })

    it('should returns the last element', () => {
      const array = [1, 2, 3]
      const firstElement = utils.last(array)
      expect(firstElement).toBe(3)
    })
  })

  describe('equals', () => {
    it('should returns false when the two arrays have a different length', () => {
      const array1 = ['1', '2', '3']
      const array2 = ['1', '2', '3', '4']
      const result = utils.equals(array1, array2)
      expect(result).toBeFalsy()
    })

    it('should returns false when the two arrays have the same length but different values', () => {
      const array1 = ['1', '2', '3']
      const array2 = ['1', '2', '4']
      const result = utils.equals(array1, array2)
      expect(result).toBeFalsy()
    })

    it('should returns true when the two arrays are the same', () => {
      const array1 = ['1', '2', '3']
      const array2 = ['1', '2', '3']
      const result = utils.equals(array1, array2)
      expect(result).toBeTruthy()
    })
  })
})
