import { Bytes } from './link-abi';
export declare const fetch: typeof globalThis.fetch;
export declare function abiEncode(value: any, typeName: string): Uint8Array;
export declare function abiDecode<ResultType = any>(data: Bytes, typeName: string): ResultType;
export declare function sealMessage(message: string, privateKey: string, publicKey: string): Uint8Array;
export declare function normalizePublicKey(key: string): string;
export declare function publicKeyEqual(keyA: string, keyB: string): boolean;
export declare function generatePrivateKey(): Promise<any>;
//# sourceMappingURL=utils.d.ts.map