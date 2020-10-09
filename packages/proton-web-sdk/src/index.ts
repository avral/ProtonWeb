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
    appLogo: string,
    appName: string
) => {
    // Add RPC if not provided
    if (!linkOptions.rpc && linkOptions.endpoints) {
        linkOptions.rpc = new JsonRpc(linkOptions.endpoints)
    }

    const wallets = new SupportedWallets(appName, appLogo)

    let type
    if (localStorage.getItem('browser-transport-type')) {
        type = localStorage.getItem('browser-transport-type')
    } else {
        type = await wallets.displayWalletSelector()
    }

    let transport
    switch (type) {
        case 'proton':
            transport = new ProtonLinkBrowserTransport(transportOptions)
            localStorage.setItem('browser-transport-type', 'proton')
            break
        case 'anchor':
            transport = new AnchorLinkBrowserTransport(transportOptions)
            localStorage.setItem('browser-transport-type', 'anchor')
            break
        default:
            transport = new ProtonLinkBrowserTransport(transportOptions)
            localStorage.setItem('browser-transport-type', 'proton')
            break
    }

    // Create link
    const link = new ProtonLink({
        transport,
        ...linkOptions,
    })

    // Return link to users
    return link
}
