import chalk from 'chalk'
import * as figlet from 'figlet'
import { Command, flags } from '@oclif/command'
import container from '../di-container'
import { Print } from '../services/print-tools'
import { TYPES } from '../constants/types'

export default class HelloCommand extends Command {
  static description = 'describe the command here'

  static examples = [
    `$ ninjacat hello
hello world from ./src/hello.ts!
`,
  ]

  static flags = {
    help: flags.help({ char: 'h' }),
    // flag with a value (-n, --name=VALUE)
    name: flags.string({ char: 'n', description: 'name to print' }),
    // flag with no value (-f, --force)
    force: flags.boolean({ char: 'f' }),
  }

  static args = [{ name: 'file' }]

  async run(): Promise<void> {
    this.parse(HelloCommand)
    // const { args, flags } = this.parse(HelloCommand)

    // const name = flags.name || 'world'
    // this.log(`hello ${name} from ./src/commands/hello.ts`)
    // if (args.file && flags.force) {
    //   this.log(`you input --force and --file: ${args.file}`)
    // }

    const ninjacatText = figlet.textSync('ninjacat', { horizontalLayout: 'full' })
    const title = chalk.blueBright(ninjacatText)

    const print = container.get<Print>(TYPES.Print)

    print.info(title)
    print.info('A .NET Core REST API generator by @phmatray')
    print.info('')
  }
}
