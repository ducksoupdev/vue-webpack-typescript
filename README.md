# webpack-typescript

> A Vue 2.5, Webpack 3.10, Typescript 2.7, Bootstrap 4.0 setup with hot reload, dynamic imports, unit testing, code coverage, sass and bundling/minification.

> See the [changelog](CHANGELOG.md) for updates.

### Usage

This is a project template for [vue-cli < 3.x](https://github.com/vuejs/vue-cli).

```bash
# Using npm
$ npm install -g vue-cli
$ vue init ducksoupdev/vue-webpack-typescript my-project
$ cd my-project
$ npm install
$ npm run dev

# Using yarn
$ yarn global add vue-cli
$ vue init ducksoupdev/vue-webpack-typescript my-project
$ cd my-project
$ yarn
$ yarn dev
```

### What's Included

| npm                   | yarn               | description                                                             |
| --------------------- | ------------------ | ----------------------------------------------------------------------- |
| `npm run dev`         | `yarn dev`         | Webpack + Typescript with config for source maps & hot-reload           |
| `npm test`            | `yarn test`        | Mocha unit tests                                                        |
| `npm run test:debug`  | `yarn test:debug`  | Debug Mocha unit tests in Chrome                                        |
| `npm run test:watch`  | `yarn test:watch`  | Fast feedback Mocha unit tests with hot-reload                          |
| `npm run coverage`    | `yarn coverage`    | Karma coverage reporter                                                 |
| `npm run lint`        | `yarn lint`        | Lint all Typescript files                                               |
| `npm run build`       | `yarn build`       | Build with HTML/CSS/JS minification, code splitting and icon generation |
| `npm run ci:teamcity` | `yarn ci:teamcity` | Teamcity CI integration                                                 |
| `npm run ci:jenkins`  | `yarn ci:jenkins`  | Jenkins CI integration                                                  |
