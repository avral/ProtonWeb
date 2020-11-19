# Proton Web SDK

**Installation**
```
npm i @protonprotocol/proton-web-sdk
```
```
yarn add @protonprotocol/proton-web-sdk
```

**Full Documentation:**

https://docs.protonchain.com/sdk/proton-web-sdk


**Token Transfer Example**
```javascript
import { ConnectWallet } from '@protonprotocol/proton-web-sdk'

const appIdentifier = 'taskly' // Proton account name

class ProtonWallet {
    link = undefined
    session = undefined
    
    async login ({ restoreSession } = {}) {
      // Pop up modal
      const { link, session } = await ConnectWallet({
        linkOptions: {
          endpoints: ['https://proton.greymass.com'],
          restoreSession
          // rpc: rpc /* Optional: if you wish to provide rpc directly instead of endpoints */
        },
        transportOptions: {
          requestAccount: appIdentifier, /* Optional: Your proton account */
          requestStatus: true /* Optional: Display request success and error messages, Default true */
        },
        selectorOptions: {
          appName: 'Taskly', /* Optional: Name to show in modal, Default 'app' */
          appLogo: 'https://protondemos.com/static/media/taskly-logo.ad0bfb0f.svg' /* Optional: Logo to show in modal */
          // walletType: 'proton' /* Optional: Connect to only specified wallet (e.g. 'proton', 'anchor') */
        }
      })
      this.link = link
      this.session = session
    }

    async transact (actions) {
      return this.session.transact({
        transaction: {
          actions
        }
      })
    }

    async logout () {
      await this.link.removeSession(appIdentifier, this.session.auth)
      this.session = undefined
    }
}

/**
 * USAGE
 */
async function main () {
  // Create Wallet Class
  const wallet = new ProtonWallet()
  
  // Login
  await wallet.login()
  
  // Transact
  const result = await wallet.transact([{
    account: 'xtokens', // Contract name
    name: 'transfer', // Action name
    data: {
      from: this.session.auth.actor,
      to: 'syed',
      quantity: '0.000001 XUSDT',
      memo: 'Tip!'
    },
    authorization: this.session.auth
  }])
  console.log('Transaction ID', result.processed.id)
  
  // Reconnect on refresh
  // await wallet.login({ restoreSession: true })
  
  // Logout
  // await wallet.logout()
}

main()
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
