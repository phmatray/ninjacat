import chalk from 'chalk'
import figlet from 'figlet'

export const logBuildMode = async (dev: boolean): Promise<void> => {
  if (!dev) {
    console.log(chalk.red(await new Promise((resolve): void => figlet('Ninjacat', (e, data): void => resolve(data)))))
  }

  console.log(`\n${chalk.underline('MODE')}: ${dev ? chalk.red('DEVELOPMENT') : chalk.green('PRODUCTION')}`)
}
