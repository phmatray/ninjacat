import { NinjacatCommand } from '../../typing/common'

const command: NinjacatCommand = {
  run: async toolbox => {
    toolbox.services.dotnet.createReadme()
  }
}

export default command
