# Proton Web SDK

Installation
```
npm i @protonprotocol/proton-web-sdk
yarn add @protonprotocol/proton-web-sdk
```

Usage
```javascript
import { ConnectWallet } from '@protonprotocol/proton-web-sdk'

// Constants
const appIdentifier = 'taskly'

// Pop up modal
const link = await ConnectWallet({
    linkOptions: {
        endpoints: ['https://proton.greymass.com']
    },
    transportOptions: {
        requestAccount: 'myprotonacc', // Your proton account
        appName: 'Taskly',
        appLogo: 'https://protondemos.com/static/media/taskly-logo.ad0bfb0f.svg',
        // walletType: 'proton' // Optional: set if you want a specific wallet (e.g. 'proton', 'anchor')
    },
    // showSelector: false // Optional: Reconnect without modal (must provide walletType)
})

// Login
const { session } = await this.link.login(appIdentifier)
console.log('User authorization:', session.auth) // { actor: 'fred', permission: 'active }

// Save auth for reconnection on refresh
localStorage.setItem('savedUserAuth', JSON.stringify(session.auth))

// Send Transaction
const result = await this.session.transact({
    transaction: {
        actions: [{
            // Token contract for XUSDT
            account: 'xtokens',
            // Action name
            name: 'transfer',
            // Action parameters
            data: {
                from: this.session.auth.actor,
                to: 'eosio',
                quantity: '0.000001 XUSDT',
                memo: 'Tip!'
            },
            authorization: [this.session.auth]
        }]
    },
    broadcast: true
})
console.log('Transaction ID', result.processed.id)

// Restore session after refresh (must recreate link first with showSelector as false and walletType as 'proton' or 'anchor)
const savedUserAuth = JSON.parse(localstorage.getItem('savedUserAuth'))
const session = await link.restoreSession(appIdentifier, savedUserAuth)

// Logout
await link.removeSession(appIdentifier, session.auth)
```