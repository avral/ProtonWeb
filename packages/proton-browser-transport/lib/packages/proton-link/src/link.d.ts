import * as esr from '@protonprotocol/proton-signing-request';
import { ApiInterfaces, JsonRpc } from 'eosjs';
import { LinkOptions } from './link-options';
import { LinkSession } from './link-session';
import { LinkStorage } from './link-storage';
import { LinkTransport } from './link-transport';
export declare type PermissionLevel = esr.abi.PermissionLevel;
export interface TransactArgs {
    transaction?: esr.abi.Transaction;
    action?: esr.abi.Action;
    actions?: esr.abi.Action[];
}
export interface TransactOptions {
    broadcast?: boolean;
}
export interface TransactResult {
    request: esr.SigningRequest;
    signatures: string[];
    payload: esr.CallbackPayload;
    signer: PermissionLevel;
    transaction: esr.abi.Transaction;
    serializedTransaction: Uint8Array;
    processed?: {
        [key: string]: any;
    };
}
export interface IdentifyResult extends TransactResult {
    account: object;
    signerKey: string;
}
export interface LoginResult extends IdentifyResult {
    session: LinkSession;
}
export declare class Link implements esr.AbiProvider {
    readonly rpc: JsonRpc;
    readonly transport: LinkTransport;
    readonly chainId: string;
    readonly storage?: LinkStorage;
    private serviceAddress;
    private requestOptions;
    private abiCache;
    private pendingAbis;
    constructor(options: LinkOptions);
    getAbi(account: string): Promise<any>;
    createCallbackUrl(): string;
    createRequest(args: esr.SigningRequestCreateArguments, transport?: LinkTransport): Promise<esr.SigningRequest>;
    sendRequest(request: esr.SigningRequest, transport?: LinkTransport, broadcast?: boolean): Promise<TransactResult>;
    transact(args: TransactArgs, options?: TransactOptions, transport?: LinkTransport): Promise<TransactResult>;
    identify(requestPermission?: PermissionLevel, info?: {
        [key: string]: string | Uint8Array;
    }): Promise<IdentifyResult>;
    login(identifier: string): Promise<LoginResult>;
    restoreSession(identifier: string, auth?: PermissionLevel): Promise<LinkSession | null>;
    listSessions(identifier: string): Promise<esr.abi.PermissionLevel[]>;
    removeSession(identifier: string, auth: PermissionLevel): Promise<void>;
    clearSessions(identifier: string): Promise<void>;
    makeSignatureProvider(availableKeys: string[], transport?: LinkTransport): ApiInterfaces.SignatureProvider;
    makeAuthorityProvider(): ApiInterfaces.AuthorityProvider;
    private touchSession;
    private storeSession;
    private sessionKey;
}
//# sourceMappingURL=link.d.ts.map