import { GluegunToolbox } from 'gluegun'
import { GluegunQuestionType } from 'gluegun/build/types/toolbox/prompt-types'
import { Choice as EnquirerChoice } from 'gluegun/build/types/toolbox/prompt-enquirer-types'
import { Config, Solution } from './config'

// Extensions
export type Extension = (toolbox: GluegunToolbox) => Promise<void>

// Questions
export type GetQuestion = (toolbox: GluegunToolbox) => GluegunQuestionType
export type QuestionsArray = { [key: string]: GetQuestion }
export type Choice = EnquirerChoice

// Services
export type ConfigService = Readonly<{
  readConfig: () => Promise<Config | false>
  getConfig: () => Promise<Config | false>
  saveConfig: (config: Config) => Promise<void>
  checkConfig: () => Promise<void>
  addSolution: (solution: Solution) => Promise<void>
}>

export type DotnetService = Readonly<{
  checkDotnetCli: () => Promise<boolean>
  createClasslibProject: (name: string) => Promise<string>
  createProject: () => Promise<void>
  createSolution: () => Promise<void>
  createReadme: () => Promise<void>
}>

export interface Services {
  config: ConfigService
  dotnet: DotnetService
}

export type ConfigureServices = (toolbox: GluegunToolbox) => Services

// Create Services Functions
export type CreateConfigSVC = (toolbox: GluegunToolbox) => ConfigService

export type CreateDotnetSVC = (
  toolbox: GluegunToolbox,
  configService: ConfigService
) => DotnetService
