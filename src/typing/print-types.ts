import * as importedColors from 'colors'

export type NinjacatPrintColors = typeof importedColors & {
  highlight: (t: string) => string
  info: (t: string) => string
  warning: (t: string) => string
  success: (t: string) => string
  error: (t: string) => string
  line: (t: string) => string
  muted: (t: string) => string
}
