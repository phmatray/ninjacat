import { createConfigurationService } from './configurationService'
import { createDotnetService } from './dotnetService'
import { ConfigureServices } from '../typing/common'

export const configureServices: ConfigureServices = toolbox => {
  const config = createConfigurationService(toolbox)
  const dotnet = createDotnetService(toolbox, config)

  return { config, dotnet }
}
