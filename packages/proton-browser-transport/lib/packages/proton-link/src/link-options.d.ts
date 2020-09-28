import { ChainName } from '@protonprotocol/proton-signing-request';
import { JsonRpc } from 'eosjs';
import { LinkStorage } from './link-storage';
import { LinkTransport } from './link-transport';
export interface LinkOptions {
    transport: LinkTransport;
    chainId?: string | ChainName;
    rpc?: string | JsonRpc;
    service?: string;
    storage?: LinkStorage | null;
    textEncoder?: TextEncoder;
    textDecoder?: TextDecoder;
    scheme?: string;
}
export declare const defaults: {
    chainId: string;
    rpc: string;
    service: string;
};
//# sourceMappingURL=link-options.d.ts.map