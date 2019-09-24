export class EntityItem {
  constructor(
    public id: number,
    public name: string,
    public timestamp: boolean = false,
    public attributes: string[] = [],
  ) {
    // no statements required
  }

  printDetails(): void {
    console.log(`${this.id}\t${this.attributes.length} attrs\t${this.name} ${this.timestamp ? '\t(timestamp)' : ''}`)
  }
}
