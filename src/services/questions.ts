import { InputQuestion } from 'inquirer'
import { injectable, inject } from 'inversify'
import { TYPES } from '../constants/types'
import { System } from './system-tools'
import { Strings } from './string-tools'

@injectable()
export class Questions {
  constructor(@inject(TYPES.Strings) private strings: Strings, @inject(TYPES.System) private system: System) {}

  get projectName(): InputQuestion {
    return {
      type: 'input',
      name: 'projectName',
      message: 'What is the name of the project?',
      transformer: (input: string): string => this.strings.pascalCase(input),
      filter: (input: string): string => this.strings.pascalCase(input),
    }
  }

  get authorName(): InputQuestion {
    return {
      type: 'input',
      name: 'authorName',
      message: 'What is your name?',
      default: (async (): Promise<string> => this.strings.trim(await this.system.run('whoami')))(),
    }
  }

  get organization(): InputQuestion {
    return {
      type: 'input',
      name: 'organization',
      message: 'What is the name of your organization?',
      transformer: (input: string): string => this.strings.pascalCase(input),
      filter: (input: string): string => this.strings.pascalCase(input),
    }
  }

  get solutionName(): InputQuestion {
    return {
      type: 'input',
      name: 'solutionName',
      message: 'What is the name of the solution?',
      transformer: (input: string): string => this.strings.pascalCase(input),
      filter: (input: string): string => this.strings.pascalCase(input),
    }
  }
}
