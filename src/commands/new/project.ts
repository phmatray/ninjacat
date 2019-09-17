import { GluegunToolbox, GluegunCommand } from 'gluegun'

const command: GluegunCommand = {
  run: async (toolbox: GluegunToolbox) => {
    toolbox.dotnet.createProject()
  }
}

export default command
