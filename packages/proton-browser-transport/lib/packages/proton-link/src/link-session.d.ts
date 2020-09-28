import { ApiInterfaces } from 'eosjs';
import { Link, PermissionLevel, TransactArgs, TransactOptions, TransactResult } from './link';
import { LinkTransport } from './link-transport';
export declare abstract class LinkSession {
    abstract link: Link;
    abstract identifier: string;
    abstract publicKey: string;
    abstract auth: {
        actor: string;
        permission: string;
    };
    abstract type: string;
    abstract metadata: {
        [key: string]: any;
    };
    abstract makeAuthorityProvider(): ApiInterfaces.AuthorityProvider;
    abstract makeSignatureProvider(): ApiInterfaces.SignatureProvider;
    abstract transact(args: TransactArgs, options?: TransactOptions): Promise<TransactResult>;
    abstract serialize(): SerializedLinkSession;
    remove(): Promise<void>;
    static restore(link: Link, data: SerializedLinkSession): LinkSession;
}
export interface SerializedLinkSession {
    type: string;
    metadata: {
        [key: string]: any;
    };
    data: any;
}
interface ChannelInfo {
    key: string;
    name: string;
    url: string;
}
export interface LinkChannelSessionData {
    identifier: string;
    auth: PermissionLevel;
    publicKey: string;
    channel: ChannelInfo;
    requestKey: string;
}
export declare class LinkChannelSession extends LinkSession implements LinkTransport {
    readonly link: Link;
    readonly auth: PermissionLevel;
    readonly identifier: string;
    readonly type = "channel";
    readonly metadata: any;
    readonly publicKey: string;
    serialize: () => SerializedLinkSession;
    private channel;
    private timeout;
    private encrypt;
    constructor(link: Link, data: LinkChannelSessionData, metadata: any);
    onSuccess(request: any, result: any): void;
    onFailure(request: any, error: any): void;
    onRequest(request: any, cancel: any): void;
    prepare(request: any): Promise<any>;
    showLoading(): void;
    makeSignatureProvider(): ApiInterfaces.SignatureProvider;
    makeAuthorityProvider(): ApiInterfaces.AuthorityProvider;
    transact(args: TransactArgs, options?: TransactOptions): Promise<TransactResult>;
}
export interface LinkFallbackSessionData {
    auth: {
        actor: string;
        permission: string;
    };
    publicKey: string;
    identifier: string;
}
export declare class LinkFallbackSession extends LinkSession implements LinkTransport {
    readonly link: Link;
    readonly auth: {
        actor: string;
        permission: string;
    };
    readonly type = "fallback";
    readonly identifier: string;
    readonly metadata: {
        [key: string]: any;
    };
    readonly publicKey: string;
    serialize: () => SerializedLinkSession;
    constructor(link: Link, data: LinkFallbackSessionData, metadata: any);
    onSuccess(request: any, result: any): void;
    onFailure(request: any, error: any): void;
    onRequest(request: any, cancel: any): void;
    prepare(request: any): Promise<any>;
    showLoading(): void;
    makeSignatureProvider(): ApiInterfaces.SignatureProvider;
    makeAuthorityProvider(): ApiInterfaces.AuthorityProvider;
    transact(args: TransactArgs, options?: TransactOptions): Promise<TransactResult>;
}
export {};
//# sourceMappingURL=link-session.d.ts.map