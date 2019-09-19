import { Questions } from '../questions/questions'
import { createDefaultSolution } from '../utils/solutionHelper'
import { dotnetCommands } from '../utils/external/dotnet-commands'
import { CreateDotnetSVC } from '../typing/common'

export const createDotnetService: CreateDotnetSVC = (toolbox, configService) => {
  // pick tools from toolbox
  const { system, print, prompt, strings, template } = toolbox

  const checkDotnetCli = async (): Promise<boolean> => {
    // Check if the dotnet CLI tool is installed
    try {
      const { versionCmd } = dotnetCommands
      const cmd = versionCmd()
      const version = await system.run(cmd)

      // if its version is greater than 2.2.x
      if (version < '2.2') {
        throw new Error('The dotnet CLI tools version is lower than 2.2')
      }

      return true
    } catch (error) {
      return false
    }
  }

  const createClasslibProject = async (name: string): Promise<string> => {
    const solutionDir = `solutions/${name}`
    const { newClasslibCmd } = dotnetCommands
    const result = await system.run(newClasslibCmd(name, solutionDir))

    return result
  }

  const createProject = async (): Promise<void> => {
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

  const createSolution = async (): Promise<void> => {
    // create the questions
    const questions = [Questions.getAskSolutionName(toolbox), Questions.getAskOrganization(toolbox)]

    // ask the questions
    const { solutionName, organization } = await prompt.ask(questions)

    // use the result to create a new solution with a clean name
    const solutionPath = `${organization}.${solutionName}`
    const solutionDir = `solutions/${solutionPath}`
    const { newSlnCmd } = dotnetCommands
    const result = await system.run(newSlnCmd(solutionName, solutionDir))

    // save the solution path into a configuration file
    const solution = createDefaultSolution(solutionName, solutionPath, organization)
    await configService.addSolution(solution)

    // print result
    print.newline()
    print.info(result)
    print.info(`Created solution "${solutionPath}" into the solutions folder.`)
  }

  const createReadme = async (): Promise<void> => {
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

  const service = {
    checkDotnetCli,
    createClasslibProject,
    createProject,
    createSolution,
    createReadme
  }

  return Object.freeze(service)
}
