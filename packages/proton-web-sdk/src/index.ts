import AnchorLinkBrowserTransport from '@protonprotocol/anchor-link-browser-transport'
import ProtonLinkBrowserTransport from '@protonprotocol/proton-browser-transport'
import ProtonLink from '@protonprotocol/proton-link'
import {JsonRpc} from '@protonprotocol/protonjs'
import SupportedWallets from './supported-wallets'

export const ConnectProton = (linkOptions = {} as any, transportOptions = {}) => {
    // Add RPC if not provided
    if (!linkOptions.rpc && linkOptions.endpoints) {
        linkOptions.rpc = new JsonRpc(linkOptions.endpoints)
    }

    // Create transport
    const transport = new ProtonLinkBrowserTransport(transportOptions)

    // Create link
    const link = new ProtonLink({
        transport,
        ...linkOptions,
    })

    // Return link to users
    return link
}

export const ConnectWallet = async (
    linkOptions = {} as any,
    transportOptions = {},
    appName: string,
    appLogo: string,
    walletType?: string,
    showSelector: boolean = true
) => {
    // Add RPC if not provided
    if (!linkOptions.rpc && linkOptions.endpoints) {
        linkOptions.rpc = new JsonRpc(linkOptions.endpoints)
    }

    const wallets = new SupportedWallets(appName, appLogo)

    if (!walletType) {
        const storedWalletType = localStorage.getItem('browser-transport-wallet-type')
        if (storedWalletType) {
            walletType = storedWalletType
        } else if (showSelector) {
            walletType = await wallets.displayWalletSelector()
        }
    }

    let transport
    switch (walletType) {
        case 'proton':
            transport = new ProtonLinkBrowserTransport(transportOptions)
            linkOptions.scheme = 'proton'
            break
        case 'anchor':
            transport = new AnchorLinkBrowserTransport(transportOptions)
            delete linkOptions.scheme
            break
        default:
            transport = new ProtonLinkBrowserTransport(transportOptions)
            break
    }

    // Create link
    const link = new ProtonLink({
        transport,
        ...linkOptions,
        walletType,
    })

    // Return link to users
    return link
}
