# ninjacat CLI

A CLI for ninjacat: a .NET Core REST API generator.

## Customizing your CLI

This CLI is built with **Gluegun**

You can check out the documentation at https://github.com/infinitered/gluegun/tree/master/docs.

## Publishing to NPM

To package your CLI up for NPM, do this:

```shell
$ npm login
$ npm whoami
$ npm lint
$ npm test
(if typescript, run `npm run build` here)
$ npm publish
```

## The road to V1

- [x] Generate empty solution
- [ ] Generate additional files
  - [ ] Readme
- [ ] Generate **DTOs**
  - [ ] Set identity
    - [ ] Simple key
    - [ ] Composite keys
  - [ ] Set attributes
    - [ ] Constraints (isRequired, notNull, maxLength...)
  - [ ] Set computed properties
- [ ] Generate **Data Access Layer**
  - [ ] Use Entity Framework Core in Code First
- [ ] Generate **Business Layer**
- [ ] Generate **REST API**
  - [ ] Use Auth
  - [ ] Use Swashbuckle

# License

MIT - see LICENSE
