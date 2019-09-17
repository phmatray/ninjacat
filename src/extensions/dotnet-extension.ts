import { GluegunToolbox } from 'gluegun'
import { Questions } from '../questions/questions'
import { Extension } from '../typing/common'
import { createDefaultSolution } from '../utils/solutionHelper'

const dotnetExtension: Extension = async (toolbox: GluegunToolbox) => {
  async function createClasslibProject(name: string): Promise<string> {
    const { system } = toolbox

    const solutionDir = `solutions/${name}`
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
    print.success(`Project "${name}" created into the solutions folder.`)
  }

  async function createSolution(): Promise<void> {
    // pick tools from toolbox
    const { print, prompt, system, config } = toolbox

    // create the questions
    const questions = [Questions.getAskSolutionName(toolbox), Questions.getAskOrganization(toolbox)]

    // ask the questions
    const { solutionName, organization } = await prompt.ask(questions)

    // use the result to create a new solution with a clean name
    const solutionPath = `${organization}.${solutionName}`
    const solutionDir = `solutions/${solutionPath}`
    const result = await system.run(`dotnet new sln --name ${solutionName} --output ${solutionDir}`)

    // save the solution path into a configuration file
    const solution = createDefaultSolution(solutionName, solutionPath, organization)
    await config.addSolution(solution)

    // print result
    print.newline()
    print.info(result)
    print.info(`Created solution "${solutionPath}" into the solutions folder.`)
  }

  async function createReadme(): Promise<void> {
    // pick tools from toolbox
    const { print, strings, template, prompt } = toolbox

    // create the questions
    const questions = [Questions.getAskAuthorName(toolbox)]

    // ask the questions
    const { authorName } = await prompt.ask(questions)

    // use the result to fill the readme
    const moreAwesome = strings.kebabCase(`${authorName} and a keyboard`)
    const contents = `🚨 Warning! ${moreAwesome} coming thru! 🚨`

    print.info(contents)

    await template.generate({
      template: 'README.md.ejs',
      target: 'solutions/README.md',
      props: { authorName, contents }
    })

    print.info('readme.md created into the solutions folder.')
  }

  toolbox.dotnet = {
    createProject,
    createSolution,
    createReadme
  }
}

export default dotnetExtension
