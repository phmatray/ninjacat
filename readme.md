# ninjacat

a netcore rest api generator written with typescript

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/ninjacat.svg)](https://npmjs.org/package/ninjacat)
[![Codecov](https://codecov.io/gh/phmatray/ninjacat/branch/master/graph/badge.svg)](https://codecov.io/gh/phmatray/ninjacat)
[![Downloads/week](https://img.shields.io/npm/dw/ninjacat.svg)](https://npmjs.org/package/ninjacat)
[![License](https://img.shields.io/npm/l/ninjacat.svg)](https://github.com/phmatray/ninjacat/blob/master/package.json)

<!-- toc -->

- [Usage](#usage)
- [Commands](#commands)
  <!-- tocstop -->

# Usage

<!-- usage -->

```sh-session
$ npm install -g ninjacat
$ ninjacat COMMAND
running command...
$ ninjacat (-v|--version|version)
ninjacat/0.0.0 darwin-x64 node-v10.15.2
$ ninjacat --help [COMMAND]
USAGE
  $ ninjacat COMMAND
...
```

<!-- usagestop -->

# Commands

<!-- commands -->

- [ninjacat](#ninjacat)
- [Usage](#usage)
- [Commands](#commands)
  - [`ninjacat autocomplete [SHELL]`](#ninjacat-autocomplete-shell)
  - [`ninjacat cli`](#ninjacat-cli)
  - [`ninjacat goodbye`](#ninjacat-goodbye)
  - [`ninjacat hello [FILE]`](#ninjacat-hello-file)
  - [`ninjacat help [COMMAND]`](#ninjacat-help-command)
  - [`ninjacat init`](#ninjacat-init)
  - [`ninjacat new:solution`](#ninjacat-newsolution)
  - [`ninjacat update [CHANNEL]`](#ninjacat-update-channel)
- [Prior art](#prior-art)
- [License](#license)

## `ninjacat autocomplete [SHELL]`

display autocomplete installation instructions

```
USAGE
  $ ninjacat autocomplete [SHELL]

ARGUMENTS
  SHELL  shell type

OPTIONS
  -r, --refresh-cache  Refresh cache (ignores displaying instructions)

EXAMPLES
  $ ninjacat autocomplete
  $ ninjacat autocomplete bash
  $ ninjacat autocomplete zsh
  $ ninjacat autocomplete --refresh-cache
```

_See code: [@oclif/plugin-autocomplete](https://github.com/oclif/plugin-autocomplete/blob/v0.1.4/src/commands/autocomplete/index.ts)_

## `ninjacat cli`

Open the ninjacat CLI

```
USAGE
  $ ninjacat cli

OPTIONS
  -h, --help  show CLI help

EXAMPLE
  $ ninjacat cli
  ==placeholder==
```

_See code: [src/commands/cli.ts](https://github.com/phmatray/ninjacat/blob/v0.0.0/src/commands/cli.ts)_

## `ninjacat goodbye`

```
USAGE
  $ ninjacat goodbye
```

_See code: [src/commands/goodbye.ts](https://github.com/phmatray/ninjacat/blob/v0.0.0/src/commands/goodbye.ts)_

## `ninjacat hello [FILE]`

describe the command here

```
USAGE
  $ ninjacat hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ ninjacat hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/phmatray/ninjacat/blob/v0.0.0/src/commands/hello.ts)_

## `ninjacat help [COMMAND]`

display help for ninjacat

```
USAGE
  $ ninjacat help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.2.1/src/commands/help.ts)_

## `ninjacat init`

Initialize a new ninjacat project

```
USAGE
  $ ninjacat init

OPTIONS
  -h, --help  show CLI help

EXAMPLE
  $ ninjacat init
  initializing a new ninjacat project
```

_See code: [src/commands/init.ts](https://github.com/phmatray/ninjacat/blob/v0.0.0/src/commands/init.ts)_

## `ninjacat new:solution`

```
USAGE
  $ ninjacat new:solution
```

_See code: [src/commands/new/solution.ts](https://github.com/phmatray/ninjacat/blob/v0.0.0/src/commands/new/solution.ts)_

## `ninjacat update [CHANNEL]`

update the ninjacat CLI

```
USAGE
  $ ninjacat update [CHANNEL]
```

_See code: [@oclif/plugin-update](https://github.com/oclif/plugin-update/blob/v1.3.9/src/commands/update.ts)_

<!-- commandsstop -->

# Prior art

- Gluegun
- Strapi

# License

MIT
