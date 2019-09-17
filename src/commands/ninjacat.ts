import { GluegunToolbox, GluegunCommand } from 'gluegun'
import { Choice } from '../typing/common'

const command: GluegunCommand = {
  name: 'ninjacat',
  run: async (toolbox: GluegunToolbox) => {
    const { prompt, print, cli, dotnet } = toolbox

    cli.welcome()

    const choices: Choice[] = [
      {
        name: 'new-solution',
        message: 'Create a new solution'
      },
      {
        name: 'help',
        message: 'See the help'
      }
    ]

    const { choice } = await prompt.ask({
      type: 'select',
      name: 'choice',
      message: 'What do you want to do?',
      choices
    })

    switch (choice) {
      case 'new-solution':
        dotnet.createSolution()
        break

      default:
        print.printHelp(toolbox)
        break
    }
  }
}

export default command
