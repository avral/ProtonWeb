# Proton Browser Transport [![Package Version](https://img.shields.io/npm/v/@proton/link-browser-transport.svg?style=flat-square)](https://www.npmjs.com/package/@proton/link-browser-transport) ![License](https://img.shields.io/npm/l/@proton/link-browser-transport.svg?style=flat-square)

A transport library for usage of [Proton Link](https://www.npmjs.com/package/@proton/link) within a web browser environment.

## Basic usage

A transport is required for Proton Link to communicate with clients. In most examples we use the browser transport with no configuration, like so:

```ts
const transport = new ProtonLinkBrowserTransport()
const link = new ProtonLink({transport})
```

Parameters can be passed to the transport during construction as an object, allowing for the following optional changes:

```ts
const transport = new ProtonLinkBrowserTransport({
    /** CSS class prefix, defaults to `@proton/link` */
    classPrefix: 'my-css-prefix',
    /** Whether to inject CSS styles in the page header, defaults to true. */
    injectStyles: true,
    /** Whether to display request success and error messages, defaults to true */
    requestStatus: false,
    /** Local storage prefix, defaults to `@proton/link`. */
    storagePrefix: 'my-localstorage-prefix',
    /** Requesting account of the dapp (optional) */
    requestAccount: 'taskly',
    /** Wallet name e.g. proton, anchor, etc */
    walletType: 'proton'
})
const link = new ProtonLink({transport})
```

## Developing

You need [Make](https://www.gnu.org/software/make/), [node.js](https://nodejs.org/en/) and [yarn](https://classic.yarnpkg.com/en/docs/install) installed.

Clone the repository and run `make` to checkout all dependencies and build the project. See the [Makefile](./Makefile) for other useful targets. Before submitting a pull request make sure to run `make lint`.

## Implementation Details

Proton Web SDK is a cross-device authentication and signing protocol built on top of ESR (EOSIO Signing Requests / EEP-7).

More information in the [Proton Web SDK](https://github.com/ProtonProtocol/ProtonWeb)

## License

[MIT](./LICENSE.md)

---

Made with ☕️ & ❤️ by [Greymass](https://greymass.com) and [Proton](https://protonchain.com).