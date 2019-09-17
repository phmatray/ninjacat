import { GluegunToolbox } from 'gluegun'
import { GluegunQuestionType } from 'gluegun/build/types/toolbox/prompt-types'

type GetQuestion = (toolbox: GluegunToolbox) => GluegunQuestionType

const getAskSolutionName: GetQuestion = ({ strings }) => ({
  type: 'input',
  name: 'solutionName',
  message: 'What is the name of the solution?',
  required: true,
  format: value => strings.pascalCase(value),
  result: value => strings.pascalCase(value)
})

const getAskProjectName: GetQuestion = ({ strings }) => ({
  type: 'input',
  name: 'name',
  message: 'What is the name of the project?',
  format: value => strings.pascalCase(value),
  result: value => strings.pascalCase(value)
})

const getAskOrganization: GetQuestion = ({ strings }) => ({
  type: 'input',
  name: 'organization',
  message: 'What is the name of your organization?',
  required: true,
  format: value => strings.pascalCase(value),
  result: value => strings.pascalCase(value)
})

const getAskAuthorName: GetQuestion = ({ strings, system }) => ({
  type: 'input',
  name: 'name',
  message: 'What is your name?',
  initial: (async () => strings.trim(await system.run('whoami')))()
})

const Questions = {
  getAskSolutionName,
  getAskProjectName,
  getAskOrganization,
  getAskAuthorName
}

export { Questions }
