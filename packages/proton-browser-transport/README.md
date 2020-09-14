# Proton Browser Transport [![Package Version](https://img.shields.io/npm/v/@protonprotocol/proton-link-browser-transport.svg?style=flat-square)](https://www.npmjs.com/package/@protonprotocol/proton-link-browser-transport) ![License](https://img.shields.io/npm/l/@protonprotocol/proton-link-browser-transport.svg?style=flat-square)

A transport library for usage of [Anchor Link](https://github.com/greymass/@protonprotocol/proton-link) within a web browser environment.

## Basic usage

A transport is required for Anchor Link to communicate with clients. In most examples we use the browser transport with no configuration, like so:

```ts
const transport = new ProtonLinkBrowserTransport()
const link = new AnchorLink({transport})
```

Parameters can be passed to the transport during construction as an object, allowing for the following optional changes:

```ts
const transport = new ProtonLinkBrowserTransport({
    /** CSS class prefix, defaults to `@protonprotocol/proton-link` */
    classPrefix: 'my-css-prefix',
    /** Whether to inject CSS styles in the page header, defaults to true. */
    injectStyles: true,
    /** Whether to display request success and error messages, defaults to true */
    requestStatus: false,
    /** Local storage prefix, defaults to `@protonprotocol/proton-link`. */
    storagePrefix: 'my-localstorage-prefix',
    /** Requesting account of the dapp (optional) */
    requestAccount: 'taskly'
})
const link = new AnchorLink({transport})
```

## Developing

You need [Make](https://www.gnu.org/software/make/), [node.js](https://nodejs.org/en/) and [yarn](https://classic.yarnpkg.com/en/docs/install) installed.

Clone the repository and run `make` to checkout all dependencies and build the project. See the [Makefile](./Makefile) for other useful targets. Before submitting a pull request make sure to run `make lint`.

## License

[MIT](./LICENSE.md)

---

Made with ☕️ & ❤️ by [Greymass](https://greymass.com), if you find this useful please consider [supporting us](https://greymass.com/support-us).
