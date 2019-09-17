import { GluegunToolbox } from 'gluegun'
import { Extension } from '../typing/common'

// add your CLI-specific functionality here, which will then be accessible
// to your commands
const cliExtension: Extension = async (toolbox: GluegunToolbox) => {
  toolbox.cli = {
    welcome: () => {
      const chalk = require('chalk')
      const figlet = require('figlet')

      const { print } = toolbox

      const title = chalk.red(figlet.textSync('ninjacat', { horizontalLayout: 'full' }))

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
