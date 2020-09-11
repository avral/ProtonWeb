# Proton Connect

Usage
```
import { ProtonConnect } from '@protonprotocol/proton-connect'
import { JsonRpc } from 'eosjs'

// Initialize
const chainId = '384da888112027f0321850a169f737c33e53b388aad48b5adace4bab97f437e0'
const rpc = new JsonRpc('https://proton.greymass.com')
const APP_NAME = 'my-app-1'

// Create Link
const link = ProtonConnect({ chainId, rpc })

// Get Sessions
const { session } = await this.link.login(APP_NAME, { chainId })
console.log(this.session.auth)

// Transact
const result = await session.transact({
    { actions: [] },
    broadcast: true
})
console.log(result.processed.id) // TX ID

// Restore session (after refresh)
const session = await this.link.restoreSession(APP_NAME, user)

// Remove session
await this.link.removeSession(APP_NAME, session.auth)
```