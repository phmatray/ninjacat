import * as _ from 'lodash'
import * as pluralizeModule from 'pluralize'
import { inject, injectable } from 'inversify'
import { TYPES } from '../constants/types'
import { Utils } from './utils'

@injectable()
export class Strings {
  constructor(@inject(TYPES.Utils) private utils: Utils) {}

  /**
   * Returns itself.
   *
   * @param value
   * @returns the value.
   */
  identity(value: string): string {
    return value
  }

  /**
   * Is this string blank, null, or otherwise empty?
   *
   * @param value The value to check.
   * @returns True if it was, otherwise false.
   */
  isBlank(value: string): boolean {
    return this.isNotString(value) || this.utils.trim(value) === ''
  }

  /**
   * Is this not a string?
   *
   * @param value The value to check
   * @return True if it is not a string, otherwise false
   */
  isNotString(value: any): boolean {
    return !this.utils.is(String, value)
  }

  /**
   * Converts the value ToPascalCase.
   *
   * @param value The string to convert
   * @returns PascalCase string.
   */
  pascalCase(value: string): string {
    return this.upperFirst(this.camelCase(value))
  }

  camelCase = _.camelCase
  kebabCase = _.kebabCase
  snakeCase = _.snakeCase

  upperCase = _.upperCase
  lowerCase = _.lowerCase
  startCase = _.startCase

  upperFirst = _.upperFirst
  lowerFirst = _.lowerFirst

  pad = _.pad
  padStart = _.padStart
  padEnd = _.padEnd

  trim = _.trim
  trimStart = _.trimStart
  trimEnd = _.trimEnd

  repeat = _.repeat

  pluralize = pluralizeModule

  plural = pluralizeModule.plural
  singular = pluralizeModule.singular

  addPluralRule = pluralizeModule.addPluralRule
  addSingularRule = pluralizeModule.addSingularRule
  addIrregularRule = pluralizeModule.addIrregularRule
  addUncountableRule = pluralizeModule.addUncountableRule

  isPlural = pluralizeModule.isPlural
  isSingular = pluralizeModule.isSingular
}
