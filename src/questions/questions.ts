import { QuestionsArray } from '../typing/common'

const Questions: QuestionsArray = {
  getAskSolutionName: ({ strings }) => ({
    type: 'input',
    name: 'solutionName',
    message: 'What is the name of the solution?',
    required: true,
    format: value => strings.pascalCase(value),
    result: value => strings.pascalCase(value)
  }),

  getAskProjectName: ({ strings }) => ({
    type: 'input',
    name: 'name',
    message: 'What is the name of the project?',
    required: true,
    format: value => strings.pascalCase(value),
    result: value => strings.pascalCase(value)
  }),

  getAskOrganization: ({ strings }) => ({
    type: 'input',
    name: 'organization',
    message: 'What is the name of your organization?',
    required: true,
    format: value => strings.pascalCase(value),
    result: value => strings.pascalCase(value)
  }),

  getAskAuthorName: ({ strings, system }) => ({
    type: 'input',
    name: 'authorName',
    message: 'What is your name?',
    initial: (async () => strings.trim(await system.run('whoami')))()
  })
}

export { Questions }
