import { GluegunToolbox } from 'gluegun'
import { GluegunQuestionType } from 'gluegun/build/types/toolbox/prompt-types'
import { Choice as EnquirerChoice } from 'gluegun/build/types/toolbox/prompt-enquirer-types'

// Extensions
export type Extension = (toolbox: GluegunToolbox) => Promise<void>

// Questions
export type GetQuestion = (toolbox: GluegunToolbox) => GluegunQuestionType
export type QuestionsArray = { [key: string]: GetQuestion }
export type Choice = EnquirerChoice
