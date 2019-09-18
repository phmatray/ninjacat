import { GluegunToolbox } from 'gluegun'
import { Questions } from '../questions/questions'
import { createDefaultSolution } from '../utils/solutionHelper'
import { dotnetCommands } from '../utils/external/dotnet-commands'

export const createDotnetService = (toolbox: GluegunToolbox, configurationService) => {
  // pick tools from toolbox
  const { system, print, prompt, strings, template } = toolbox

  const createClasslibProject = async (name: string): Promise<string> => {
    const solutionDir = `solutions/${name}`
    const { newClasslib } = dotnetCommands
    const result = await system.run(newClasslib(name, solutionDir))

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
    const { newSln } = dotnetCommands
    const result = await system.run(newSln(solutionName, solutionDir))

    // save the solution path into a configuration file
    const solution = createDefaultSolution(solutionName, solutionPath, organization)
    await configurationService.addSolution(solution)

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
    createClasslibProject,
    createProject,
    createSolution,
    createReadme
  }

  return Object.freeze(service)
}
