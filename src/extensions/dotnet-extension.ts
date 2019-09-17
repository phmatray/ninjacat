import { GluegunToolbox } from 'gluegun'
import { Questions } from '../questions/questions'
import { Solution } from '../typing/configuration'

module.exports = async (toolbox: GluegunToolbox) => {
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
    const { print, prompt, system, config } = toolbox

    // create the questions
    const questions = [Questions.getAskSolutionName(toolbox), Questions.getAskOrganization(toolbox)]

    // ask the questions
    const { name, organization } = await prompt.ask(questions)

    // use the result to create a new solution with a clean name
    const solutionPath = `${organization}.${name}`
    const solutionDir = `build/${solutionPath}`
    const result = await system.run(`dotnet new sln --name ${name} --output ${solutionDir}`)

    // save the solution path into a configuration file
    const solution: Solution = {
      name,
      path: solutionPath,
      version: '0.0.1',
      meta: { organization }
    }
    await config.addSolution(solution)

    // print result
    print.newline()
    print.info(result)
    print.info(`Created solution "${solutionPath}" into the build folder.`)
  }

  async function createReadme(): Promise<void> {
    // pick tools from toolbox
    const { print, strings, template, prompt } = toolbox

    // create the questions
    const questions = [Questions.getAskAuthorName(toolbox)]

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
    createProject,
    createSolution,
    createReadme
  }
}
