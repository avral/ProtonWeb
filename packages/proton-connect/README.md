# Proton Connect

Installation
```
npm i @protonprotocol/proton-connect
```

Usage
```
import { ProtonConnect } from '@protonprotocol/proton-connect'

// Initialize
const chainId = '384da888112027f0321850a169f737c33e53b388aad48b5adace4bab97f437e0'
const endpoints = ['https://proton.greymass.com'] // Multiple for fault tolerance
const appName = 'my-app-1'
const requestAccount = 'myprotonacc' // optional

// Create Link
const link = ProtonConnect({ chainId, endpoints }, { requestAccount })

// Get Sessions
const { session } = await link.login(appName)
console.log(session.auth)

// Send Transaction
const result = await session.transact({
    { actions: [] },
    broadcast: true
})
console.log(result.processed.id) // TX ID

// Restore session after refresh
const session = await link.restoreSession(appName, { actor: 'fred', permission: 'active' })

// Remove session
await link.removeSession(appName, session.auth)
```