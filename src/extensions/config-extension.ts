import { GluegunToolbox } from 'gluegun'
import { Questions } from '../questions/questions'
import { Config, Solution } from '../typing/configuration'
import { Extension } from '../typing/common'
import { createDefaultConfig } from '../utils/solutionHelper'

const configExtension: Extension = async (toolbox: GluegunToolbox) => {
  const { filesystem } = toolbox

  // location of the ninjacat config files
  const NINJACAT_CONFIG_DIR = `${filesystem.homedir()}/ninjacat/`
  const NINJACAT_CONFIG_FILENAME = `${NINJACAT_CONFIG_DIR}config.json`

  // memoize the config once we retrieve it
  let config: Config | false = false

  // get the config
  async function getConfig(): Promise<Config | false> {
    // if we've already retrieved it, return that
    if (config) {
      return config
    }

    // get it from the config file?
    config = await readConfig()

    // return the config
    return config
  }

  // read an existing config from the `NINJACAT_CONFIG` file, defined above
  async function readConfig(): Promise<Config | false> {
    if (filesystem.exists(NINJACAT_CONFIG_FILENAME)) {
      const config = await filesystem.readAsync(NINJACAT_CONFIG_FILENAME)
      return JSON.parse(config)
    } else {
      return false
    }
  }

  // save a new config to the `NINJACAT_CONFIG` file
  async function saveConfig(config: Config): Promise<void> {
    return filesystem.writeAsync(NINJACAT_CONFIG_FILENAME, config)
  }

  async function addSolution(solution: Solution): Promise<void> {
    await checkConfig()

    if (config) {
      const solutionExists = config.solutions.find(s => s.name === solution.name)
      if (!solutionExists) {
        config.solutions.push(solution)
        return saveConfig(config)
      }

      throw new Error('this solution already exists')
    }

    throw new Error('no config file found')
  }

  async function checkConfig(): Promise<boolean> {
    // check if we have a config
    if ((await getConfig()) === false) {
      // didn't find a config. let's ask the user for one
      const { prompt } = toolbox

      const askAuthorName = Questions.getAskAuthorName(toolbox)
      const { authorName } = await prompt.ask([askAuthorName])

      // if we received one, save it
      if (authorName) {
        const config = createDefaultConfig(authorName)
        await saveConfig(config)
      } else {
        // no config, exit
        return
      }
    }
  }

  toolbox.config = {
    getConfig,
    saveConfig,
    checkConfig,
    addSolution
  }
}

export default configExtension
