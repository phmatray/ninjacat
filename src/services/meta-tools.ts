import * as fse from 'fs-extra'
import { injectable, inject } from 'inversify'
import { TYPES } from '../constants/types'
import { PackageJSON } from '../typing/meta-types'
import { FileSystem } from './filesystem-tools'
import { System } from './system-tools'
import { Semver } from './semver-tools'

@injectable()
export class Meta {
  constructor(
    @inject(TYPES.FileSystem) private fileSystem: FileSystem,
    @inject(TYPES.Semver) private semver: Semver,
    @inject(TYPES.System) private system: System,
  ) {}

  /**
   * Finds the currently running CLI package.json
   *
   * @returns Package.json contents as an object.
   */
  async getPackageJSON(): Promise<PackageJSON> {
    let directory = this.fileSystem.cwd()

    // go at most 5 directories up to find the package.json
    for (let i = 0; i < 5; i++) {
      const pkgPath = `${directory}/package.json`

      // if we find a package.json, we're done
      if (await fse.pathExists(pkgPath)) {
        const json: PackageJSON = await fse.readJSON(pkgPath)
        return json
      }

      // if we reach the git repo or root, we can't determine the version -- this is where we bail
      const git = `${directory}/.git`
      const root = '/'
      if (directory === root || fse.pathExists(git)) {
        break
      }

      // go up another directory
      directory += '/..'
    }

    throw new Error(`getPackageJSON: No package.json found in ${directory}`)
  }

  /**
   * Finds the version for the currently running CLI.
   *
   * @returns Version as a string.
   */
  async getVersion(): Promise<string> {
    const pkg = await this.getPackageJSON()
    return pkg.version
  }

  async checkForUpdate(): Promise<false | string> {
    const pkg = await this.getPackageJSON()
    const myVersion = pkg.version
    const packageName = pkg.name
    const latestVersion = await this.system.run(`npm info ${packageName} dist-tags.latest`)

    if (this.semver.gt(latestVersion, myVersion)) {
      return latestVersion
    }

    return false
  }
}
