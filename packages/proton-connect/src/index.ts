import AnchorLink from 'anchor-link'
import ProtonLinkBrowserTransport from '@protonprotocol/proton-browser-transport'

export const ProtonConnect = (linkOptions = {}, transportOptions = {}) => {
    const transport = new ProtonLinkBrowserTransport(transportOptions)
    return new AnchorLink({
        transport,
        ...linkOptions
    })
}