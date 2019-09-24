import * as inquirer from 'inquirer'
import { Command, flags } from '@oclif/command'
import { EntityItem } from '../models/entityItem'
import { EntityCollection } from '../models/entityCollection'
import { JsonEntityCollection } from '../models/jsonEntityCollection'

enum Commands {
  Add = 'Add New Entity',
  Timestamp = 'Timestamp Entity',
  Toggle = 'Show/Hide Timestamped',
  Purge = 'Remove Timestamped Entities',
  Quit = 'Quit',
}

export default class CliCommand extends Command {
  static description = 'Open the ninjacat CLI'

  static examples = [
    `$ ninjacat cli
==placeholder==
`,
  ]

  static flags = {
    help: flags.help({ char: 'h' }),
  }

  private entities: EntityItem[] = [
    new EntityItem(1, 'Pokemon'),
    new EntityItem(2, 'Type'),
    new EntityItem(3, 'Version'),
    new EntityItem(4, 'Generation', true),
  ]
  private collection: EntityCollection = new JsonEntityCollection('Pokedex', this.entities)
  private showTimestamped: boolean = true

  displayTodoList(): void {
    const timestamped = this.collection.getItemCounts().timestamped
    console.log(`${this.collection.solutionName}'s Entities ` + `(${timestamped} items with timestamp property)`)
    this.collection.getEntityItems(this.showTimestamped).forEach(item => item.printDetails())
  }

  promptUser(): void {
    console.clear()
    this.displayTodoList()
    inquirer
      .prompt({
        type: 'list',
        name: 'command',
        message: 'Choose option',
        choices: Object.values(Commands),
      })
      .then(answers => {
        switch (answers['command']) {
          case Commands.Toggle:
            this.showTimestamped = !this.showTimestamped
            this.promptUser()
            break
          case Commands.Add:
            this.promptAdd()
            break
          case Commands.Timestamp:
            if (this.collection.getItemCounts().timestamped > 0) {
              this.promptTimestamp()
            } else {
              this.promptUser()
            }
            break
          case Commands.Purge:
            this.collection.removeTimestamp()
            this.promptUser()
            break
        }
      })
  }

  promptAdd(): void {
    console.clear()
    inquirer
      .prompt({
        type: 'input',
        name: 'add',
        message: 'Enter entity:',
      })
      .then(answers => {
        if (answers['add'] !== '') {
          this.collection.addEntity(answers['add'])
        }
        this.promptUser()
      })
  }

  promptTimestamp(): void {
    console.clear()
    inquirer
      .prompt({
        type: 'checkbox',
        name: 'timestamp',
        message: 'Mark Entities Timestamp',
        choices: this.collection.getEntityItems(this.showTimestamped).map(item => ({
          name: item.name,
          value: item.id,
          checked: item.timestamp,
        })),
      })
      .then(answers => {
        const timestampedEntities = answers['timestamp'] as number[]
        this.collection
          .getEntityItems(true)
          .forEach(item =>
            this.collection.setTimestamp(item.id, timestampedEntities.find(id => id === item.id) != undefined),
          )
        this.promptUser()
      })
  }

  async run(): Promise<void> {
    // const { args, flags } = this.parse(CliCommand)
    this.parse(CliCommand)

    this.promptUser()
  }
}
