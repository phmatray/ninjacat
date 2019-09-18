import { GluegunToolbox, GluegunCommand } from 'gluegun'

const command: GluegunCommand = {
  run: async (toolbox: GluegunToolbox) => {
    toolbox.services.dotnet.createReadme()
  }
}

export default command
