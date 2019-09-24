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
  getPackageJSON(): PackageJSON {
    let directory = '.'
    if (!directory) throw new Error('getVersion: Unknown CLI version (no src folder found)')

    // go at most 5 directories up to find the package.json
    for (let i = 0; i < 5; i += 1) {
      const pkg = this.fileSystem.path(directory, 'package.json')

      // if we find a package.json, we're done -- read the version and return it
      if (this.fileSystem.exists(pkg) === 'file') {
        return this.fileSystem.read(pkg, 'json') as PackageJSON
      }

      // if we reach the git repo or root, we can't determine the version -- this is where we bail
      const git = this.fileSystem.path(directory, '.git')
      const root = this.fileSystem.path('/')
      if (directory === root || this.fileSystem.exists(git) === 'dir') {
        break
      }

      // go up another directory
      directory = this.fileSystem.path(directory, '..')
    }

    throw new Error(`getPackageJSON: No package.json found in ${directory}`)
  }

  /**
   * Finds the version for the currently running CLI.
   *
   * @returns Version as a string.
   */
  getVersion(): string {
    return this.getPackageJSON().version
  }

  async checkForUpdate(): Promise<false | string> {
    const packageJSON = this.getPackageJSON()
    const myVersion = packageJSON.version
    const packageName = packageJSON.name
    const latestVersion = await this.system.run(`npm info ${packageName} dist-tags.latest`)

    if (this.semver.gt(latestVersion, myVersion)) {
      return latestVersion
    }

    return false
  }
}
