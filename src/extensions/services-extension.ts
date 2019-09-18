import { configureServices } from '../services/index'
import { Extension } from '../typing/common'

const servicesExtension: Extension = async toolbox => {
  toolbox.services = configureServices(toolbox)
}

export default servicesExtension
