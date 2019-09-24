import { injectable } from 'inversify'
import * as semver from 'semver'

@injectable()
export class Semver {
  valid = semver.valid
  clean = semver.clean
  satisfies = semver.satisfies
  gt = semver.gt
  lt = semver.lt
  validRange = semver.validRange
}
