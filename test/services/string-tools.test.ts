import * as expect from 'expect'
import { Strings } from '../../src/services/string-tools'
import container from '../../src/di-container'
import { TYPES } from '../../src/constants/types'

let strings: Strings

describe('string-tools', () => {
  beforeAll(() => {
    strings = container.get<Strings>(TYPES.Strings)
  })

  it('should load dependency', () => {
    expect(strings === null).toBeFalsy()
  })

  it('isBlank', () => {
    expect(strings.isBlank(null)).toBe(true)
    expect(strings.isBlank('')).toBe(true)
    expect(strings.isBlank(' ')).toBe(true)
    expect(strings.isBlank('s')).toBe(false)
  })

  it('isNotString', () => {
    expect(strings.isNotString('')).toBe(false)
    expect(strings.isNotString(2)).toBe(true)
    expect(strings.isNotString(null)).toBe(true)
    expect(strings.isNotString(undefined)).toBe(true)
    expect(strings.isNotString([])).toBe(true)
    expect(strings.isNotString({})).toBe(true)
  })

  it('camelCase', () => {
    expect(strings.camelCase('this here')).toBe('thisHere')
  })

  it('kebabCase', () => {
    expect(strings.kebabCase('fun times')).toBe('fun-times')
    expect(strings.kebabCase('FunTimes')).toBe('fun-times')
  })

  it('snakeCase', () => {
    expect(strings.snakeCase('a b c')).toBe('a_b_c')
    expect(strings.snakeCase('AlwaysBeClosing')).toBe('always_be_closing')
  })

  it('upperCase', () => {
    expect(strings.upperCase('lol')).toBe('LOL')
  })

  it('lowerCase', () => {
    expect(strings.lowerCase('ROFL')).toBe('rofl')
  })

  it('startCase', () => {
    expect(strings.startCase('hello there')).toBe('Hello There')
  })

  it('upperFirst', () => {
    expect(strings.upperFirst('hello world')).toBe('Hello world')
  })

  it('lowerFirst', () => {
    expect(strings.lowerFirst('BOOM')).toBe('bOOM')
  })

  it('pascalCase', () => {
    expect(strings.pascalCase('check it out')).toBe('CheckItOut')
    expect(strings.pascalCase('checkIt-out')).toBe('CheckItOut')
  })

  it('pad', () => {
    expect(strings.pad('a', 3)).toBe(' a ')
  })

  it('padStart', () => {
    expect(strings.padStart('a', 3)).toBe('  a')
  })

  it('padEnd', () => {
    expect(strings.padEnd('a', 3)).toBe('a  ')
  })

  it('trim', () => {
    expect(strings.trim('   sloppy   ')).toBe('sloppy')
    expect(strings.trim('sloppy   ')).toBe('sloppy')
    expect(strings.trim('   sloppy')).toBe('sloppy')
  })

  it('trimStart', () => {
    expect(strings.trimStart('   ! ')).toBe('! ')
  })

  it('trimEnd', () => {
    expect(strings.trimEnd('  !  ')).toBe('  !')
  })

  it('repeat', () => {
    expect(strings.repeat('a', 4)).toBe('aaaa')
  })

  it('identity', () => {
    expect(strings.identity('x')).toBe('x')
  })

  it('pluralize', () => {
    expect(strings.pluralize('test', 1, true)).toBe('1 test')
    expect(strings.pluralize('test', 5, true)).toBe('5 tests')
  })

  it('plural', () => {
    expect(strings.plural('bug')).toBe('bugs')
  })

  it('singular', () => {
    expect(strings.singular('bugs')).toBe('bug')
  })

  it('addPluralRule', () => {
    strings.addPluralRule(/gex$/i, 'gexii')
    expect(strings.plural('regex')).toBe('regexii')
  })

  it('addSingularRule', () => {
    strings.addSingularRule(/bugs$/i, 'bugger')
    expect(strings.singular('bugs')).toBe('bugger')
  })

  it('addIrregularRule', () => {
    strings.addIrregularRule('octopus', 'octopodes')
    expect(strings.plural('octopus')).toBe('octopodes')
  })

  it('addUncountableRule', () => {
    strings.addUncountableRule('paper')
    expect(strings.plural('paper')).toBe('paper')
  })

  it('isPlural', () => {
    expect(strings.isPlural('bug')).toBe(false)
    expect(strings.isPlural('bugs')).toBe(true)
  })

  it('isSingular', () => {
    expect(strings.isSingular('bug')).toBe(true)
    expect(strings.isSingular('bugs')).toBe(false)
  })
})
