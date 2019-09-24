import * as expect from 'expect'
import { test } from '@oclif/test'
import { Strings } from '../../src/services/string-tools'
import container from '../../src/di-container'
import { TYPES } from '../../src/constants/types'

const strings = container.get<Strings>(TYPES.Strings)

describe('string-tools', () => {
  test.it('isBlank', () => {
    expect(strings.isBlank(null)).toBe(true)
    expect(strings.isBlank('')).toBe(true)
    expect(strings.isBlank(' ')).toBe(true)
    expect(strings.isBlank('s')).toBe(false)
  })

  test.it('isNotString', () => {
    expect(strings.isNotString('')).toBe(false)
    expect(strings.isNotString(2)).toBe(true)
    expect(strings.isNotString(null)).toBe(true)
    expect(strings.isNotString(undefined)).toBe(true)
    expect(strings.isNotString([])).toBe(true)
    expect(strings.isNotString({})).toBe(true)
  })

  test.it('camelCase', () => {
    expect(strings.camelCase('this here')).toBe('thisHere')
  })

  test.it('kebabCase', () => {
    expect(strings.kebabCase('fun times')).toBe('fun-times')
    expect(strings.kebabCase('FunTimes')).toBe('fun-times')
  })

  test.it('snakeCase', () => {
    expect(strings.snakeCase('a b c')).toBe('a_b_c')
    expect(strings.snakeCase('AlwaysBeClosing')).toBe('always_be_closing')
  })

  test.it('upperCase', () => {
    expect(strings.upperCase('lol')).toBe('LOL')
  })

  test.it('lowerCase', () => {
    expect(strings.lowerCase('ROFL')).toBe('rofl')
  })

  test.it('startCase', () => {
    expect(strings.startCase('hello there')).toBe('Hello There')
  })

  test.it('upperFirst', () => {
    expect(strings.upperFirst('hello world')).toBe('Hello world')
  })

  test.it('lowerFirst', () => {
    expect(strings.lowerFirst('BOOM')).toBe('bOOM')
  })

  test.it('pascalCase', () => {
    expect(strings.pascalCase('check it out')).toBe('CheckItOut')
    expect(strings.pascalCase('checkIt-out')).toBe('CheckItOut')
  })

  test.it('pad', () => {
    expect(strings.pad('a', 3)).toBe(' a ')
  })

  test.it('padStart', () => {
    expect(strings.padStart('a', 3)).toBe('  a')
  })

  test.it('padEnd', () => {
    expect(strings.padEnd('a', 3)).toBe('a  ')
  })

  test.it('trim', () => {
    expect(strings.trim('   sloppy   ')).toBe('sloppy')
  })

  test.it('trimStart', () => {
    expect(strings.trimStart('   ! ')).toBe('! ')
  })

  test.it('trimEnd', () => {
    expect(strings.trimEnd('  !  ')).toBe('  !')
  })

  test.it('repeat', () => {
    expect(strings.repeat('a', 4)).toBe('aaaa')
  })

  test.it('identity', () => {
    expect(strings.identity('x')).toBe('x')
  })

  test.it('pluralize', () => {
    expect(strings.pluralize('test', 1, true)).toBe('1 test')
    expect(strings.pluralize('test', 5, true)).toBe('5 tests')
  })

  test.it('plural', () => {
    expect(strings.plural('bug')).toBe('bugs')
  })

  test.it('singular', () => {
    expect(strings.singular('bugs')).toBe('bug')
  })

  test.it('addPluralRule', () => {
    strings.addPluralRule(/gex$/i, 'gexii')
    expect(strings.plural('regex')).toBe('regexii')
  })

  test.it('addSingularRule', () => {
    strings.addSingularRule(/bugs$/i, 'bugger')
    expect(strings.singular('bugs')).toBe('bugger')
  })

  test.it('addIrregularRule', () => {
    strings.addIrregularRule('octopus', 'octopodes')
    expect(strings.plural('octopus')).toBe('octopodes')
  })

  test.it('addUncountableRule', () => {
    strings.addUncountableRule('paper')
    expect(strings.plural('paper')).toBe('paper')
  })

  test.it('isPlural', () => {
    expect(strings.isPlural('bug')).toBe(false)
    expect(strings.isPlural('bugs')).toBe(true)
  })

  test.it('isSingular', () => {
    expect(strings.isSingular('bug')).toBe(true)
    expect(strings.isSingular('bugs')).toBe(false)
  })
})
