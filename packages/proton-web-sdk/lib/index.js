import ProtonLink from '@protonprotocol/proton-link';
import ProtonLinkBrowserTransport from '@protonprotocol/proton-browser-transport';
import { JsonRpc } from '@protonprotocol/protonjs';
export const ProtonConnect = (linkOptions = {}, transportOptions = {}) => {
    // Add RPC if not provided
    if (!linkOptions.rpc && linkOptions.endpoints) {
        linkOptions.rpc = new JsonRpc(linkOptions.endpoints);
    }
    // Create transport
    const transport = new ProtonLinkBrowserTransport(transportOptions);
    // Create link
    const link = new ProtonLink({
        transport,
        ...linkOptions
    });
    // Return link to users
    return link;
};
//# sourceMappingURL=index.js.map