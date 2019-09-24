import { EntityItem } from './entityItem'
import { EntityCollection } from './entityCollection'
import * as lowdb from 'lowdb'
import * as FileSync from 'lowdb/adapters/FileSync'

type schemaType = {
  entities: { id: number; name: string; timestamp: boolean }[]
}

export class JsonEntityCollection extends EntityCollection {
  private database: lowdb.LowdbSync<schemaType>

  constructor(public solutionName: string, public entityItems: EntityItem[] = []) {
    super(solutionName, [])

    this.database = lowdb(new FileSync('Entities.json'))

    if (this.database.has('entities').value()) {
      const dbItems = this.database.get('entities').value()
      dbItems.forEach(item => this.itemMap.set(item.id, new EntityItem(item.id, item.name, item.timestamp)))
    } else {
      this.database.set('entities', entityItems).write()
      entityItems.forEach(item => this.itemMap.set(item.id, item))
    }
  }

  addEntity(entity: string): number {
    const result = super.addEntity(entity)
    this.storeEntities()
    return result
  }

  setTimestamp(id: number, timestamp: boolean): void {
    super.setTimestamp(id, timestamp)
    this.storeEntities()
  }

  removeTimestamp(): void {
    super.removeTimestamp()
    this.storeEntities()
  }

  private storeEntities(): void {
    this.database.set('entities', [...this.itemMap.values()]).write()
  }
}
