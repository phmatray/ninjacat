import { GluegunToolbox } from 'gluegun'

module.exports = {
  run: async (toolbox: GluegunToolbox) => {
    toolbox.dotnet.createProject()
  }
}
