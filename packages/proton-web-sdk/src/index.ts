import ProtonLinkBrowserTransport from '@protonprotocol/proton-browser-transport'
import ProtonLink from '@protonprotocol/proton-link'
import { JsonRpc } from '@protonprotocol/protonjs'
import SupportedWallets from './supported-wallets'


interface ConnectWalletArgs {
    linkOptions: any,
    transportOptions?: {
        requestAccount?: string,
    } | any;
    selectorOptions?: {
        appName?: string,
        appLogo?: string,
        walletType?: string
        showSelector?: boolean
    }
}

export const ConnectWallet = async ({
    linkOptions = {},
    transportOptions = {},
    selectorOptions = {}
}: ConnectWalletArgs) => {
    // Add RPC if not provided
    if (!linkOptions.rpc && linkOptions.endpoints) {
        linkOptions.rpc = new JsonRpc(linkOptions.endpoints)
    }

    // Add chain ID if not present
    if (!linkOptions.chainId) {
        const info = await linkOptions.rpc.get_info();;
        linkOptions.chainId = info.chainId
    }

    // Default showSelector to true
    if (!selectorOptions.showSelector) {
        selectorOptions.showSelector = true
    }

    // Create Modal Class
    const wallets = new SupportedWallets(selectorOptions.appName, selectorOptions.appLogo)

    // Determine wallet type from storage or selector modal
    let walletType = selectorOptions.walletType
    if (!walletType) {
        const storedWalletType = localStorage.getItem('browser-transport-wallet-type')
        if (storedWalletType) {
            walletType = storedWalletType
        } else if (selectorOptions.showSelector) {
            walletType = await wallets.displayWalletSelector()
        } else {
            throw new Error('Wallet Type Unavailable: No walletType provided and showSelector is set to false')
        }
    }

    // Set scheme (proton default)
    switch (walletType) {
        case 'anchor':
            linkOptions.scheme = 'esr'
            break
        case 'proton': {
            // Proton Testnet
            if (linkOptions.chainId === '71ee83bcf52142d61019d95f9cc5427ba6a0d7ff8accd9e2088ae2abeaf3d3dd') {
                linkOptions.scheme = 'proton-dev'
            } else {
                linkOptions.scheme = 'proton'
            }
            break;
        }
        default:
            linkOptions.scheme = 'proton'
            break
    }

    // Create transport
    const transport = new ProtonLinkBrowserTransport({
        ...transportOptions,
        walletType
    })

    // Create link
    const link = new ProtonLink({
        ...linkOptions,
        transport,
        walletType
    })

    // Return link
    return link
}
