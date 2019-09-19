import { Questions } from '../questions/questions'
import { createDefaultConfig } from '../utils/solutionHelper'
import { CreateConfigSVC } from '../typing/common'
import { Config, Solution } from '../typing/config'

export const createConfigService: CreateConfigSVC = toolbox => {
  // pick tools from toolbox
  const { filesystem, prompt } = toolbox

  // location of the ninjacat config files
  const NINJACAT_CONFIG_DIR = `${filesystem.homedir()}/ninjacat/`
  const NINJACAT_CONFIG_FILENAME = `${NINJACAT_CONFIG_DIR}config.json`

  // memoize the config once we retrieve it
  let config: Config | false = false

  // read an existing config from the `NINJACAT_CONFIG` file, defined above
  const readConfig = async (): Promise<Config | false> => {
    if (!filesystem.exists(NINJACAT_CONFIG_FILENAME)) {
      return false
    }

    const fileContent = await filesystem.readAsync(NINJACAT_CONFIG_FILENAME)
    const config = fileContent !== undefined ? JSON.parse(fileContent) : false

    return config
  }

  const getConfig = async (): Promise<Config | false> => {
    // if we've already retrieved it, return that
    if (config) {
      return config
    }

    // get it from the config file? So we memoize it.
    config = await readConfig()

    // return the config
    return config
  }

  const saveConfig = async (config: Config): Promise<void> => {
    // save a new config to the `NINJACAT_CONFIG` file
    return filesystem.writeAsync(NINJACAT_CONFIG_FILENAME, config)
  }

  const checkConfig = async (): Promise<void> => {
    // check if we have a config
    if ((await getConfig()) === false) {
      // didn't find a config. let's ask the user for one
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

  const addSolution = async (solution: Solution): Promise<void> => {
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

  const service = {
    readConfig,
    getConfig,
    saveConfig,
    checkConfig,
    addSolution
  }

  return Object.freeze(service)
}
