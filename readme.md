# Proton Web SDK

Installation
```
npm i @protonprotocol/proton-web-sdk
yarn add @protonprotocol/proton-web-sdk
```

Full Documentation:
https://docs.protonchain.com/sdk/proton-web-sdk

Usage
```javascript
import { ConnectWallet } from '@protonprotocol/proton-web-sdk'

// Constants
const appIdentifier = 'taskly'

// Example wallet connector
class ProtonWallet {
    // Connect
    async function connect ({ restoreSession }) {
      // Pop up modal
      const { link, session } = await ConnectWallet({
        linkOptions: {
            endpoints: ['https://proton.greymass.com'],
            restoreSession,
            // rpc: rpc /* Optional: if you wish to provide rpc directly instead of endpoints */
        },
        transportOptions: {
            requestAccount: 'myprotonacc', /* Optional: Your proton account */
            requestStatus: true, /* Optional: Display request success and error messages, Default true */
        },
        selectorOptions: {
            appName: 'Taskly', /* Optional: Name to show in modal, Default 'app' */
            appLogo: 'https://protondemos.com/static/media/taskly-logo.ad0bfb0f.svg', /* Optional: Logo to show in modal */
            // walletType: 'proton' /* Optional: Connect to only specified wallet (e.g. 'proton', 'anchor') */
        }
      })
      this.link = link;
      this.session = session;
    }

    // Login
    async function login () {
      await this.connect()

      return {
        auth: this.session.auth,
        accountData: this.session.accountData[0]
      };
    }

    // Send Transaction (e.g. actions)
    /*
    [{
       account: 'xtokens', // Contract name
       name: 'transfer', // Action name
       data: {
         from: this.session.auth.actor,
         to: 'syed',
         quantity: '0.000001 XUSDT',
         memo: 'Tip!'
       },
       authorization: this.session.auth
    }]
    */
    async function transact (actions) {
        const result = await this.session.transact({ transaction: { actions } })
        console.log('Transaction ID', result.processed.id)
        return result
    }

    // Restore session after refresh (must recreate link first with showSelector as false)
    async function reconnect () {
      await this.connect({ restoreSession: true })
    }

    // Logout
    async function logout () {
      await this.link.removeSession(appIdentifier, this.session.auth)
      this.session = undefined
    }
}

const wallet = new ProtonWallet()
```

#### Directory
- proton-browser-transport: Shows Modal
- proton-link: Creates link with backend
- proton-signing-request: Creates signing request
- proton-test-app: Minimal test example
- proton-transit-provider: Provider for transit
- proton-web-sdk: Full wrapper over packages

#### Developer Notes
Must use yarn

Bootstrap
```
yarn && lerna bootstrap
```

Hot-reload Changes
```
yarn watch
```

Run minimal test app
```
yarn start
```
