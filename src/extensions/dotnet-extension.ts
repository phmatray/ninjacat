import { GluegunToolbox } from 'gluegun'
import Questions from '../questions/questions'

interface Config {
  solutionPath: string
}

module.exports = async (toolbox: GluegunToolbox) => {
  const { filesystem } = toolbox

  // location of the ninjacat config file
  const NINJACAT_CONFIG = `${filesystem.homedir()}/.ninjacat`

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
    if (filesystem.exists(NINJACAT_CONFIG)) {
      const config = await filesystem.readAsync(NINJACAT_CONFIG)
      return JSON.parse(config)
    } else {
      return false
    }
  }

  // save a new config to the `NINJACAT_CONFIG` file
  async function saveConfig(config: Config): Promise<void> {
    return filesystem.writeAsync(NINJACAT_CONFIG, config)
  }

  async function checkConfig(): Promise<boolean> {
    // check if we have a config
    if ((await getConfig()) === false) {
      // didn't find a config. let's ask the user for one
      const { prompt } = toolbox
      const result = await prompt.ask(Questions.getAskSolutionName(toolbox))

      // if we received one, save it
      if (result && result.solutionName) {
        saveConfig({ solutionPath: result.solutionName })
      } else {
        // no config, exit
        return
      }
    }
  }

  async function createClasslibProject(name: string): Promise<string> {
    const { system } = toolbox

    const solutionDir = `build/${name}`
    const result = await system.run(`dotnet new classlib --name ${name} --output ${solutionDir}`)

    return result
  }

  async function createProject(): Promise<void> {
    // pick tools from toolbox
    const { print, prompt } = toolbox

    // create the questions
    const questions = [Questions.getAskProjectName(toolbox)]

    // ask the questions
    const { name } = await prompt.ask(questions)

    // use the result to create a new classlib project
    const result = await createClasslibProject(name)

    // print result
    print.newline()
    print.info(result)
    print.success(`Project "${name}" created into the build folder.`)
  }

  async function createSolution(): Promise<void> {
    // pick tools from toolbox
    const { print, prompt, system } = toolbox

    // create the questions
    const questions = [Questions.getAskSolutionName(toolbox), Questions.getAskOrganization(toolbox)]

    // ask the questions
    const { name, organization } = await prompt.ask(questions)

    // use the result to create a new solution with a clean name
    const solutionPath = `${organization}.${name}`
    const solutionDir = `build/${solutionPath}`
    const result = await system.run(`dotnet new sln --name ${name} --output ${solutionDir}`)

    // save the solution path into a configuration file
    saveConfig({ solutionPath })

    // print result
    print.newline()
    print.info(result)
    print.info(`Created solution "${solutionPath}" into the build folder.`)
  }

  async function createReadme(): Promise<void> {
    // pick tools from toolbox
    const { print, strings, template, prompt } = toolbox

    // create the questions
    const questions = [Questions.getAskName(toolbox)]

    // ask the questions
    const { name } = await prompt.ask(questions)

    // use the result to fill the readme
    const moreAwesome = strings.kebabCase(`${name} and a keyboard`)
    const contents = `🚨 Warning! ${moreAwesome} coming thru! 🚨`

    print.info(contents)

    await template.generate({
      template: 'README.md.ejs',
      target: 'build/README.md',
      props: { name, contents }
    })

    print.info('readme.md created into the build folder.')
  }

  toolbox.dotnet = {
    checkConfig,
    createProject,
    createSolution,
    createReadme
  }
}
