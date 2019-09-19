import { createConfigService } from './configService'
import { createDotnetService } from './dotnetService'
import { ConfigureServices } from '../typing/common'

export const configureServices: ConfigureServices = toolbox => {
  const config = createConfigService(toolbox)
  const dotnet = createDotnetService(toolbox, config)

  return { config, dotnet }
}
