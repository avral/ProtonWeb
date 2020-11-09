import ProtonLinkBrowserTransport, { BrowserTransportOptions } from '@protonprotocol/proton-browser-transport'
import ProtonLink, { LinkOptions, LinkStorage, PermissionLevel } from '@protonprotocol/proton-link'
import { JsonRpc } from '@protonprotocol/protonjs'
import SupportedWallets from './supported-wallets'

const USER_AUTH_KEY = 'user-auth'
const USER_WALLET_KEY = 'wallet-type'
const STORAGE_PREFIX_DEFAULT = 'proton-storage'
const PROTON_TESTNET_CHAINID = '71ee83bcf52142d61019d95f9cc5427ba6a0d7ff8accd9e2088ae2abeaf3d3dd'

const parseJson = (json: string) => {
    try {
        return JSON.parse(json)
    } catch (e) {
        return {}
    }
}

class Storage implements LinkStorage {
    constructor(readonly keyPrefix: string) {}
    async write(key: string, data: string): Promise<void> {
        localStorage.setItem(this.storageKey(key), data)
    }
    async read(key: string): Promise<string | null> {
        return localStorage.getItem(this.storageKey(key))
    }
    async remove(key: string): Promise<void> {
        localStorage.removeItem(this.storageKey(key))
    }
    storageKey(key: string) {
        return `${this.keyPrefix}-${key}`
    }
}

type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

interface ConnectWalletArgs {
    linkOptions: PartialBy<LinkOptions, 'transport'> & {
        endpoints?: string | string[],
        rpc?: JsonRpc,
        storage?: LinkStorage,
        storagePrefix?: string,
        restoreSession?: boolean
    },
    transportOptions?: BrowserTransportOptions;
    selectorOptions?: {
        appName?: string,
        appLogo?: string,
        walletType?: string
    }
}

export const ConnectWallet = async ({
    linkOptions = {},
    transportOptions = {
        requestAccount: ''
    },
    selectorOptions = {}
}: ConnectWalletArgs) => {
    // Add RPC if not provided
    if (!linkOptions.rpc) {
        const valid_endpoints = linkOptions.endpoints && linkOptions.endpoints.length
        if (!valid_endpoints) throw new Error('Must provide linkOptions.rpc or linkOptions.endpoints')
        linkOptions.rpc = new JsonRpc(linkOptions.endpoints)
    }

    // Add chain ID if not present
    if (!linkOptions.chainId) {
        const info = await linkOptions.rpc!.get_info();;
        linkOptions.chainId = info.chain_id
    }

    // Add storage if not present
    if (!linkOptions.storage) {
        linkOptions.storage = new Storage(linkOptions.storagePrefix || STORAGE_PREFIX_DEFAULT)
    }

    // Stop restore session if no saved data
    if (linkOptions.restoreSession) {
        const [storedUserAuth, storedWalletType] = await Promise.all([
            linkOptions.storage.read(USER_AUTH_KEY),
            linkOptions.storage.read(USER_WALLET_KEY)
        ])

        if (!storedUserAuth || !storedWalletType) {
            // clean storage to remove unexpected side effects if session restore fails
            linkOptions.storage.remove(USER_AUTH_KEY)
            linkOptions.storage.remove(USER_WALLET_KEY)

            return {
                link: null,
                session: null
            }
        }
    }

    let session
    let link
    let loginResult

    while(!session) {
        // Create Modal Class
        const wallets = new SupportedWallets(selectorOptions.appName, selectorOptions.appLogo)

        // Determine wallet type from params, storage or selector modal
        const walletType = selectorOptions.walletType || await linkOptions.storage.read(USER_WALLET_KEY) || await wallets.displayWalletSelector()

        // Set scheme (proton default)
        if (walletType === 'anchor') {
            linkOptions.scheme = 'esr'
        } else {
            linkOptions.scheme = linkOptions.chainId === PROTON_TESTNET_CHAINID ? 'proton-dev' : 'proton'
        }
        
        // Create transport
        const transport = new ProtonLinkBrowserTransport({
            ...transportOptions,
            walletType
        })

        // Create link
        link = new ProtonLink({
            ...linkOptions,
            transport,
            walletType
        })

        // Get session based on login or restore session
        if (!linkOptions.restoreSession) {
            let backToSelector = false
            document.addEventListener('backToSelector', () => { backToSelector = true })

            try {
                loginResult = await link.login(transportOptions.requestAccount)
                session = loginResult.session
                linkOptions.storage.write(USER_AUTH_KEY, JSON.stringify(loginResult.session.auth))
            } catch(e) {
                if (backToSelector) {
                    document.removeEventListener('backToSelector', () => { backToSelector = true })
                    continue
                }
                return e
            }
        } else {
            const stringifiedUserAuth = await linkOptions.storage.read(USER_AUTH_KEY)
            const parsedUserAuth = parseJson(stringifiedUserAuth)
            if (Object.keys(parsedUserAuth).length > 0) {
                session = await link.restoreSession(transportOptions.requestAccount, parsedUserAuth)
            }
        }
    }

    return {
        link,
        session,
        loginResult
    }
}
