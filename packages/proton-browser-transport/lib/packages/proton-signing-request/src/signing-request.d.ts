import { Serialize } from 'eosjs';
import * as abi from './abi';
export interface AbiProvider {
    getAbi: (account: string) => Promise<any>;
}
export interface ZlibProvider {
    deflateRaw: (data: Uint8Array) => Uint8Array;
    inflateRaw: (data: Uint8Array) => Uint8Array;
}
export interface SignatureProvider {
    sign: (message: string) => {
        signer: string;
        signature: string;
    };
}
export interface CallbackPayload {
    sig: string;
    tx: string;
    bn?: string;
    sa: string;
    sp: string;
    rbn: string;
    rid: string;
    req: string;
    ex: string;
    [sig0: string]: string | undefined;
}
export interface ResolvedCallback {
    url: string;
    background: boolean;
    payload: CallbackPayload;
}
export interface TransactionContext {
    timestamp?: string;
    expire_seconds?: number;
    block_num?: number;
    ref_block_num?: number;
    ref_block_prefix?: number;
    expiration?: string;
}
export declare enum ChainName {
    UNKNOWN = 0,
    EOS = 1,
    TELOS = 2,
    JUNGLE = 3,
    KYLIN = 4,
    WORBLI = 5,
    BOS = 6,
    MEETONE = 7,
    INSIGHTS = 8,
    BEOS = 9,
    WAX = 10,
    PROTON = 11,
    FIO = 12
}
export declare const PlaceholderName = "............1";
export declare const PlaceholderPermission = "............2";
export declare const PlaceholderAuth: abi.PermissionLevel;
export declare type CallbackType = string | {
    url: string;
    background: boolean;
};
export interface SigningRequestCreateArguments {
    action?: abi.Action;
    actions?: abi.Action[];
    transaction?: {
        actions: abi.Action[];
        [key: string]: any;
    };
    identity?: abi.Identity;
    chainId?: string | number;
    broadcast?: boolean;
    callback?: CallbackType;
    info?: {
        [key: string]: string | Uint8Array;
    };
}
export interface SigningRequestCreateIdentityArguments {
    callback: CallbackType;
    chainId?: string | number;
    account?: string;
    permission?: string;
    info?: {
        [key: string]: string | Uint8Array;
    };
}
export interface SigningRequestEncodingOptions {
    textEncoder?: any;
    textDecoder?: any;
    zlib?: ZlibProvider;
    abiProvider?: AbiProvider;
    signatureProvider?: SignatureProvider;
    scheme?: string;
}
export declare type AbiMap = Map<string, any>;
export declare class SigningRequest {
    static type: Serialize.Type;
    static idType: Serialize.Type;
    static transactionType: Serialize.Type;
    scheme: string;
    static create(args: SigningRequestCreateArguments, options?: SigningRequestEncodingOptions): Promise<SigningRequest>;
    static identity(args: SigningRequestCreateIdentityArguments, options?: SigningRequestEncodingOptions): Promise<SigningRequest>;
    static fromTransaction(chainId: Uint8Array | string, serializedTransaction: Uint8Array | string, options?: SigningRequestEncodingOptions): SigningRequest;
    static from(uri: string, options?: SigningRequestEncodingOptions): SigningRequest;
    static fromData(data: Uint8Array, options?: SigningRequestEncodingOptions): SigningRequest;
    version: number;
    data: abi.SigningRequest;
    signature?: abi.RequestSignature;
    private textEncoder;
    private textDecoder;
    private zlib?;
    private abiProvider?;
    constructor(version: number, data: abi.SigningRequest, textEncoder: TextEncoder, textDecoder: TextDecoder, zlib?: ZlibProvider, abiProvider?: AbiProvider, signature?: abi.RequestSignature, scheme?: string);
    sign(signatureProvider: SignatureProvider): void;
    getSignatureDigest(): Uint8Array;
    setSignature(signer: string, signature: string): void;
    setCallback(url: string, background: boolean): void;
    setBroadcast(broadcast: boolean): void;
    encode(compress?: boolean, slashes?: boolean): string;
    getData(): Uint8Array;
    getSignatureData(): Uint8Array;
    getRequiredAbis(): string[];
    requiresTapos(): boolean;
    fetchAbis(abiProvider?: AbiProvider): Promise<AbiMap>;
    resolveActions(abis: AbiMap, signer?: abi.PermissionLevel): abi.Action[];
    resolveTransaction(abis: AbiMap, signer: abi.PermissionLevel, ctx?: TransactionContext): abi.Transaction;
    resolve(abis: AbiMap, signer: abi.PermissionLevel, ctx?: TransactionContext): ResolvedSigningRequest;
    getScheme(): string;
    getChainId(): abi.ChainId;
    getRawActions(): abi.Action[];
    getRawTransaction(): abi.Transaction;
    isIdentity(): boolean;
    shouldBroadcast(): boolean;
    getIdentity(): string | null;
    getIdentityPermission(): string | null;
    getRawInfo(): {
        [key: string]: Uint8Array;
    };
    getInfo(): {
        [key: string]: string;
    };
    setInfoKey(key: string, value: string | boolean): void;
    clone(): SigningRequest;
    toString(): string;
    toJSON(): string;
}
export declare class ResolvedSigningRequest {
    static fromPayload(payload: CallbackPayload, options?: SigningRequestEncodingOptions): Promise<ResolvedSigningRequest>;
    readonly request: SigningRequest;
    readonly signer: abi.PermissionLevel;
    readonly transaction: abi.Transaction;
    readonly serializedTransaction: Uint8Array;
    constructor(request: SigningRequest, signer: abi.PermissionLevel, transaction: abi.Transaction, serializedTransaction: Uint8Array);
    getTransactionId(): string;
    getCallback(signatures: string[], blockNum?: number): ResolvedCallback | null;
}
export declare function idToName(chainId: abi.ChainId): ChainName;
export declare function nameToId(chainName: ChainName): abi.ChainId;
//# sourceMappingURL=signing-request.d.ts.map