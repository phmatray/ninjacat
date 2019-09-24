import { EntityItem } from './entityItem'

type ItemCounts = {
  total: number
  timestamped: number
}

export class EntityCollection {
  private nextId = 1
  protected itemMap = new Map<number, EntityItem>()

  constructor(public solutionName: string, public entityItems: EntityItem[] = []) {
    entityItems.forEach(item => this.itemMap.set(item.id, item))
  }

  addEntity(entity: string): number {
    while (this.getEntityById(this.nextId)) {
      this.nextId++
    }
    this.itemMap.set(this.nextId, new EntityItem(this.nextId, entity))
    return this.nextId
  }

  getEntityById(id: number): EntityItem {
    return this.itemMap.get(id)
  }

  getEntityItems(includeTimestamp: boolean): EntityItem[] {
    return [...this.itemMap.values()].filter(item => includeTimestamp || !item.timestamp)
  }

  setTimestamp(id: number, timestamp: boolean): void {
    const entityItem = this.getEntityById(id)
    if (entityItem) {
      entityItem.timestamp = timestamp
    }
  }

  removeTimestamp(): void {
    this.itemMap.forEach(item => {
      if (item.timestamp) {
        this.itemMap.delete(item.id)
      }
    })
  }

  getItemCounts(): ItemCounts {
    return {
      total: this.itemMap.size,
      timestamped: this.getEntityItems(false).length,
    }
  }
}
