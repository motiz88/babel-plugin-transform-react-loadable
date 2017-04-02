# babel-plugin-transform-react-loadable

[![Greenkeeper badge](https://badges.greenkeeper.io/motiz88/babel-plugin-transform-react-loadable.svg)](https://greenkeeper.io/)
[![circle][circle-image]][circle-url]
[![npm][npm-image]][npm-url]
[![coverage][coverage-image]][coverage-url]

[![semantic release][semantic-release-image]][semantic-release-url]
[![js-semistandard-style][semistandard-image]][semistandard-url]
[![MIT License][license-image]][license-url]

Babel plugin to make advanced usage of [`react-loadable`](https://github.com/thejameskyle/react-loadable) easier.

## Examples

Please see the [main `react-loadable` example](https://github.com/thejameskyle/react-loadable#example) as a reference.

### Example 1 - server side rendering

**In**

```js
let LoadableMyComponent = Loadable({
  loader: () => import('./MyComponent'),
  LoadingComponent: MyLoadingComponent,
});
```

**Out**

```js
let LoadableMyComponent = Loadable({
  loader: () => import('./MyComponent'),
  LoadingComponent: MyLoadingComponent,
  serverSideRequirePath: path.join(__dirname, './MyComponent'),
});
```

### Example 2 - Webpack synchronous loading support

To enable this transformation, pass the `webpack: true` option to the plugin (see below).

**In**

```js
let LoadableMyComponent = Loadable({
  loader: () => import('./MyComponent'),
  LoadingComponent: MyLoadingComponent,
});
```

**Out**

```js
let LoadableMyComponent = Loadable({
  loader: () => import('./MyComponent'),
  LoadingComponent: MyLoadingComponent,
  serverSideRequirePath: path.join(__dirname, './MyComponent'),
  webpackRequireWeakId: () => require.resolveWeak('./MyComponent'),
});
```

## Installation

```sh
$ npm install --save-dev babel-plugin-transform-react-loadable
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```js
// without options
{
  "plugins": ["transform-react-loadable"]
}

// with options
{
  "plugins": [
    ["transform-react-loadable", {
      "server": true, // default
      "webpack": true
    }]
  ]
}
```

### Via CLI

```sh
$ babel --plugins transform-react-loadable script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-react-loadable"]
});
```

## Development

Use npm v3: `npm install -g npm@3`

```sh
git clone https://github.com/motiz88/babel-plugin-transform-react-loadable
cd babel-plugin-transform-react-loadable
npm install
# ... hackity hack hack ...
npm run test:local # Including tests (mocha), code coverage (nyc), code style (eslint),
                   # and type checks (flow).
```

See package.json for more dev scripts you can use.

## Contributing

PRs are very welcome. Please make sure that `test:local` passes on your branch.

[circle-image]: https://img.shields.io/circleci/project/motiz88/babel-plugin-transform-react-loadable/master.svg?style=flat-square
[circle-url]: https://circleci.com/gh/motiz88/babel-plugin-transform-react-loadable
[npm-image]: https://img.shields.io/npm/v/babel-plugin-transform-react-loadable.svg?style=flat-square
[npm-url]: https://npmjs.org/package/babel-plugin-transform-react-loadable
[semantic-release-image]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square
[semantic-release-url]: https://github.com/semantic-release/semantic-release
[license-image]: http://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square
[license-url]: http://motiz88.mit-license.org/
[semistandard-image]: https://img.shields.io/badge/code%20style-semistandard-brightgreen.svg?style=flat-square
[semistandard-url]: https://github.com/Flet/semistandard
[coverage-image]: https://img.shields.io/codecov/c/github/motiz88/babel-plugin-transform-react-loadable.svg
[coverage-url]: https://codecov.io/gh/motiz88/babel-plugin-transform-react-loadable
