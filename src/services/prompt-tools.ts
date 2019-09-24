import * as inquirer from 'inquirer'
import { injectable } from 'inversify'

@injectable()
export class Prompt {
  /**
   * A yes/no question.
   *
   * @param message The message to display to the user.
   * @returns The true/false answer.
   */
  async confirm(message: string, initial?: boolean): Promise<boolean> {
    return await inquirer.prompt<boolean>({
      name: 'yesno',
      type: 'confirm',
      message,
      default: initial,
    })
  }

  /**
   * Prompts the questions to the user.
   *
   * @param questions The questions to ask
   * @returnss The answers
   */
  async ask<T>(questions: inquirer.QuestionCollection<T>): Promise<T> {
    return inquirer.prompt(questions)
  }
}
