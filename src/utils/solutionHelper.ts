import { Config, Solution } from '../typing/config'

function createDefaultConfig(authorName: string): Config {
  return {
    author: {
      name: authorName
    },
    solutions: []
  }
}

function createDefaultSolution(
  solutionName: string,
  solutionPath: string,
  organization: string
): Solution {
  return {
    name: solutionName,
    path: solutionPath,
    version: '0.0.1',
    meta: { organization, createdAt: new Date() },
    entities: []
  }
}

function getSolutions(config: Config): Solution[] {
  return config.solutions
}

function isSolutionExists(config: Config, solutionPath: string): boolean {
  const solution = config.solutions.find(solution => (solution.path = solutionPath))
  return solution !== undefined
}

export { createDefaultConfig, createDefaultSolution, getSolutions, isSolutionExists }
