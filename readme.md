# Proton Web SDK

Installation
```
npm i @protonprotocol/proton-web-sdk
```

Usage
```javascript
import { ConnectProton } from '@protonprotocol/proton-web-sdk'

// Initialize
const chainId = '384da888112027f0321850a169f737c33e53b388aad48b5adace4bab97f437e0' // Proton Mainnet
const endpoints = ['https://proton.greymass.com'] // Multiple for fault tolerance
const appName = 'my-app-1' // Set your own
const requestAccount = 'myprotonacc' // optional

// Create Link
const link = ConnectProton({ chainId, endpoints }, { requestAccount })

// Login
const { session } = await link.login(appName)
console.log(session.auth) // { actor: 'fred', permission: 'active' }

// Save auth for reconnection on refresh
localStorage.setItem('savedUserAuth', JSON.stringify(session.auth));

// Send Transaction
const result = await session.transact({
    {
        actions: [{
            // Token contract for XUSDT
            account: 'xtokens',
            // Action name
            name: 'transfer',
            // Action parameters
            data: {
                from: 'usera',
                to: 'userb',
                quantity: '4.0000 XUSDT',
                memo: 'Tip!'
            }
        }]
    },
    broadcast: true
})
console.log(result.processed.id) // Transaction ID

// Restore session after refresh
const savedUserAuth = JSON.parse(localstorage.getItem('savedUserAuth'))
const session = await link.restoreSession(appName, savedUserAuth)

// Logout
await link.removeSession(appName, session.auth)
```