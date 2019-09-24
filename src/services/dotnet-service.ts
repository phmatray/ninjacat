import { injectable, inject } from 'inversify'
import { TYPES } from '../constants/types'
import { createDefaultSolution } from '../helpers/solutionHelper'
import { dotnetCommands } from '../helpers/external/dotnet-commands'
import { System } from './system-tools'
import { Strings } from './string-tools'
import { Prompt } from './prompt-tools'
import { Print } from './print-tools'
import { Template } from './template-tools'
import { Questions } from './questions'

@injectable()
export class Dotnet {
  constructor(
    @inject(TYPES.System) private system: System,
    @inject(TYPES.Strings) private strings: Strings,
    @inject(TYPES.Prompt) private prompt: Prompt,
    @inject(TYPES.Print) private print: Print,
    @inject(TYPES.Template) private template: Template,
    @inject(TYPES.Questions) private questions: Questions,
  ) {}

  async checkDotnetCli(): Promise<boolean> {
    // Check if the dotnet CLI tool is installed
    try {
      const { versionCmd } = dotnetCommands
      const cmd = versionCmd()
      const version = await this.system.run(cmd)

      // if its version is greater than 2.2.x
      if (version < '2.2') {
        throw new Error('The dotnet CLI tools version is lower than 2.2')
      }

      return true
    } catch (error) {
      return false
    }
  }

  async createClasslibProject(name: string): Promise<string> {
    const solutionDir = `solutions/${name}`
    const { newClasslibCmd } = dotnetCommands
    const result = await this.system.run(newClasslibCmd(name, solutionDir))

    return result
  }

  async createProject(): Promise<void> {
    // create the questions
    const questions = [this.questions.projectName]

    // ask the questions
    const { name } = await this.prompt.ask(questions)

    // use the result to create a new classlib project
    const result = await this.createClasslibProject(name)

    // print result
    this.print.newline()
    this.print.info(result)
    this.print.success(`Project "${name}" created into the solutions folder.`)
  }

  async createSolution(): Promise<void> {
    // create the questions
    const questions = [this.questions.solutionName, this.questions.organization, this.questions.authorName]

    // ask the questions
    const { solutionName, organization, authorName } = await this.prompt.ask(questions)

    // use the result to create a new solution with a clean name
    const solutionPath = `${organization}.${solutionName}`
    const solutionDir = `solutions/${solutionPath}`
    const { newSlnCmd } = dotnetCommands
    const result = await this.system.run(newSlnCmd(solutionName, solutionDir))

    // save the solution path into a configuration file
    createDefaultSolution(solutionName, organization, authorName)
    // const solution = createDefaultSolution(solutionName, organization, authorName)
    // // await configService.addSolution(solution)

    // print result
    this.print.newline()
    this.print.info(result)
    this.print.info(`Created solution "${solutionPath}" into the solutions folder.`)
  }

  async createReadme(): Promise<void> {
    // create the questions
    const questions = [this.questions.authorName]

    // ask the questions
    const { authorName } = await this.prompt.ask<{ authorName: string }>(questions)

    // use the result to fill the readme
    const moreAwesome = this.strings.kebabCase(`${authorName} and a keyboard`)
    const contents = `🚨 Warning! ${moreAwesome} coming thru! 🚨`

    this.print.info(contents)

    await this.template.generate({
      template: 'README.md.ejs',
      target: 'solutions/README.md',
      props: { authorName, contents },
    })

    this.print.info('readme.md created into the solutions folder.')
  }
}
