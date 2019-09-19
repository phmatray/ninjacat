import chalk from 'chalk'
import * as figlet from 'figlet'
import { Extension } from '../typing/common'

// add your CLI-specific functionality here, which will then be accessible
// to your commands
const cliExtension: Extension = async toolbox => {
  const { print } = toolbox

  toolbox.cli = {
    welcome: () => {
      const ninjacatText = figlet.textSync('ninjacat', { horizontalLayout: 'full' })
      const title = chalk.blueBright(ninjacatText)

      print.info(title)
      print.info('A .NET Core REST API generator')
      print.info('by @phmatray')
      print.info('')
    }
  }

  // enable this if you want to read configuration in from
  // the current folder's package.json (in a "ninjacat" property),
  // ninjacat.config.json, etc.
  // toolbox.config = {
  //   ...toolbox.config,
  //   ...toolbox.config.loadConfig(process.cwd(), "ninjacat")
  // }
}

export default cliExtension
