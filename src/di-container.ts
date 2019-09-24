import 'reflect-metadata'
import { Container } from 'inversify'
import { TYPES } from './constants/types'

import { Utils } from './services/utils'
import { Questions } from './services/questions'
import { Semver } from './services/semver-tools'
import { FileSystem } from './services/filesystem-tools'
import { System } from './services/system-tools'
import { Strings } from './services/string-tools'
import { Meta } from './services/meta-tools'
import { Print } from './services/print-tools'
import { Prompt } from './services/prompt-tools'
import { Template } from './services/template-tools'
import { Dotnet } from './services/dotnet-service'

const container = new Container()

container.bind<Utils>(TYPES.Utils).to(Utils)
container.bind<Questions>(TYPES.Questions).to(Questions)
container.bind<Semver>(TYPES.Semver).to(Semver)
container.bind<FileSystem>(TYPES.FileSystem).to(FileSystem)
container.bind<System>(TYPES.System).to(System)
container.bind<Strings>(TYPES.Strings).to(Strings)
container.bind<Meta>(TYPES.Meta).to(Meta)
container.bind<Print>(TYPES.Print).to(Print)
container.bind<Prompt>(TYPES.Prompt).to(Prompt)
container.bind<Template>(TYPES.Template).to(Template)
container.bind<Dotnet>(TYPES.Dotnet).to(Dotnet)

export default container
