import { GluegunToolbox } from 'gluegun'
import { Choice } from 'gluegun/build/types/toolbox/prompt-enquirer-types'

module.exports = {
  name: 'ninjacat',
  run: async (toolbox: GluegunToolbox) => {
    const { prompt, print, welcome, dotnet } = toolbox

    welcome()

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
