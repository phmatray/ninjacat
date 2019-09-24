import { SolutionConfig } from '../typing'

function createDefaultSolution(solutionName: string, organization: string, authorName: string): SolutionConfig {
  return {
    name: solutionName,
    version: '0.0.1',
    meta: {
      organization,
      createdBy: authorName,
      createdAt: new Date(),
    },
    entities: [],
  }
}

export { createDefaultSolution }
