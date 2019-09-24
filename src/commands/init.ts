import { Command, flags } from '@oclif/command'

export default class InitCommand extends Command {
  static description = 'Initialize a new ninjacat project'

  static examples = [
    `$ ninjacat init
initializing a new ninjacat project
`,
  ]

  static flags = {
    help: flags.help({ char: 'h' }),
  }

  async run(): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
