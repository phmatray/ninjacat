import { Choice, NinjacatCommand } from '../typing/common'

const command: NinjacatCommand = {
  name: 'ninjacat',
  run: async toolbox => {
    const { prompt, print, cli, services } = toolbox

    cli.welcome()

    const choices: Choice[] = [
      {
        name: 'new-solution',
        message: 'Create a new solution'
      },
      {
        name: 'doctor',
        message: 'Check if the kids are alright'
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
        await services.dotnet.createSolution()
        break

      case 'doctor':
        ;(await services.dotnet.checkDotnetCli())
          ? print.success('The dotnet CLI tool is correctly installed')
          : print.error('NotImplementedException ;-)')
        break

      default:
        print.printHelp(toolbox)
        break
    }
  }
}

export default command
