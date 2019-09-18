import { GluegunToolbox } from 'gluegun'
import { createConfigurationService } from './configurationService'
import { createDotnetService } from './dotnetService'

export const configureServices = (toolbox: GluegunToolbox) => {
  const config = createConfigurationService(toolbox)
  const dotnet = createDotnetService(toolbox, config)

  return { config, dotnet }
}
