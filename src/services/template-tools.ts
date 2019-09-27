import * as ejs from 'ejs'
import { injectable, inject } from 'inversify'
import { TYPES } from '../constants/types'
import { Strings } from './string-tools'
import { Utils } from './utils'
import { FileSystem } from './filesystem-tools'

@injectable()
export class Template {
  constructor(
    @inject(TYPES.Utils) private utils: Utils,
    @inject(TYPES.Strings) private strings: Strings,
    @inject(TYPES.FileSystem) private filesystem: FileSystem,
  ) {}

  /**
   * Generates a file from a template.
   *
   * @param opts Generation options.
   * @return The generated string.
   */
  // async generate(templateName: string, target: string = '', templateDirectory = './templates'): Promise<string> {
  async generate(opts: { template: string; target?: string; templateDirectory?: string; props?: {} }): Promise<string> {
    const pathToTemplate = `${opts.templateDirectory}/${opts.template}`

    // add some goodies to the environment so templates can read them
    const ejsData = {
      filename: pathToTemplate,
      ...this.strings, // add our string tools to the filters available
    }

    // bomb if the template doesn't exist
    if (!this.filesystem.isFile(pathToTemplate)) {
      throw new Error(`template not found ${pathToTemplate}`)
    }

    // read the template
    const templateContent = await this.filesystem.read(pathToTemplate, 'utf8')

    // render the template
    const content = ejs.render(templateContent, ejsData)

    // save it to the file system
    if (!this.strings.isBlank(opts.target)) {
      // prep the destination directory
      const dir = this.utils.replace(/$(\/)*/g, '', opts.target)
      const dest = dir

      this.filesystem.write(dest, content)
    }

    // send back the rendered string
    return content
  }
}
