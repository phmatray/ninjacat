import * as importedColors from 'colors'
import * as ora from 'ora'
import { injectable } from 'inversify'
import { NinjacatPrintColors } from '../typing/print-types'

@injectable()
export class Print {
  constructor(private colors = importedColors as NinjacatPrintColors) {
    // We're extending `colors` with a few more attributes
    colors.setTheme({
      highlight: 'cyan',
      info: 'reset',
      warning: 'yellow',
      success: 'green',
      error: 'red',
      line: 'grey',
      muted: 'grey',
    })
  }

  /**
   * Print a blank line.
   */
  newline(): void {
    console.log('')
  }

  /**
   * Prints a divider line
   */
  divider(): void {
    console.log(this.colors.line('---------------------------------------------------------------'))
  }

  /**
   * Prints text without theming.
   *
   * Use this when you're writing stuff outside the toolbox of our
   * printing scheme.  hint: rarely.
   *
   * @param message The message to write.
   */
  fancy(message: string): void {
    console.log(message)
  }

  /**
   * Writes a normal information message.
   *
   * This is the default type you should use.
   *
   * @param message The message to show.
   */
  info(message: string): void {
    console.log(this.colors.info(message))
  }

  /**
   * Writes an error message.
   *
   * This is when something horribly goes wrong.
   *
   * @param message The message to show.
   */
  error(message: string): void {
    console.log(this.colors.error(message))
  }

  /**
   * Writes a warning message.
   *
   * This is when the user might not be getting what they're expecting.
   *
   * @param message The message to show.
   */
  warning(message: string): void {
    console.log(this.colors.warning(message))
  }

  /**
   * Writes a debug message.
   *
   * This is for devs only.
   *
   * @param message The message to show.
   */
  debug(message: string, title = 'DEBUG'): void {
    const topLine = `vvv -----[ ${title} ]----- vvv`
    const botLine = `^^^ -----[ ${title} ]----- ^^^`

    console.log(this.colors.rainbow(topLine))
    console.log(message)
    console.log(this.colors.rainbow(botLine))
  }

  /**
   * Writes a success message.
   *
   * When something is successful.  Use sparingly.
   *
   * @param message The message to show.
   */
  success(message: string): void {
    console.log(this.colors.success(message))
  }

  /**
   * Creates a spinner and starts it up.
   *
   * @param config The text for the spinner or an ora configuration object.
   * @returns The spinner.
   */
  spin(config?: string | object): any {
    return ora(config || '').start()
  }

  public get checkmark(): string {
    return this.colors.success('✔︎')
  }

  public get xmark(): string {
    return this.colors.error('ⅹ')
  }
}
