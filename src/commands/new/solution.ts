import { GluegunToolbox, GluegunCommand } from 'gluegun'

const command: GluegunCommand = {
  run: async (toolbox: GluegunToolbox) => {
    toolbox.dotnet.createSolution()
  }
}

export default command
