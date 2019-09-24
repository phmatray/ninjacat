type AttributeType = 'int' | 'string' | 'date'

export interface EntityAttribute {
  name: string
  type: AttributeType
  required: true
}

export interface Entity {
  info: {
    name: string
    description: string
  }
  options: {
    timestamps: true
  }
  attributes: EntityAttribute[]
}

export interface SolutionConfig {
  name: string
  version: string
  meta: {
    organization: string
    createdBy: string
    createdAt: Date
  }
  entities: []
}
