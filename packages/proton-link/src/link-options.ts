import {ChainName} from '@proton/signing-request'
import {JsonRpc} from '@proton/js'
import {LinkStorage} from './link-storage'
import {LinkTransport} from './link-transport'

/**
 * Available options when creating a new [[Link]] instance.
 */
export interface LinkOptions {
    /**
     * Link transport responsible for presenting signing requests to user, required.
     */
    transport: LinkTransport
    /**
     * ChainID or esr chain name alias for which the link is valid.
     * Defaults to EOS (aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906).
     */
    chainId?: string | ChainName
    /**
     * URL to EOSIO node to communicate with or e eosjs JsonRpc instance.
     * Defaults to https://eos.greymass.com
     */
    rpc?: string | JsonRpc
    /**
     * URL to link callback service.
     * Defaults to https://cb.anchor.link.
     */
    service?: string
    /**
     * Optional storage adapter that will be used to persist sessions if set.
     * If not storage adapter is set but the given transport provides a storage, that will be used.
     * Explicitly set this to `null` to force no storage.
     */
    storage?: LinkStorage | null
    /**
     * Scheme for transport
     */
    scheme?: string
    /**
     * Type of wallet (Anchor/Proton)
     */
    walletType?: string
}

/** @internal */
export const defaults = {
    chainId: '384da888112027f0321850a169f737c33e53b388aad48b5adace4bab97f437e0',
    rpc: 'https://proton.greymass.com',
    service: 'https://cb.anchor.link',
}
