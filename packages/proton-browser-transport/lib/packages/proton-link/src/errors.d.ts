export declare type LinkErrorCode = 'E_DELIVERY' | 'E_TIMEOUT' | 'E_CANCEL' | 'E_IDENTITY';
export declare class CancelError extends Error {
    code: string;
    constructor(reason?: string);
}
export declare class IdentityError extends Error {
    code: string;
    constructor(reason?: string);
}
export declare class SessionError extends Error {
    code: 'E_DELIVERY' | 'E_TIMEOUT';
    constructor(reason: string, code: 'E_DELIVERY' | 'E_TIMEOUT');
}
//# sourceMappingURL=errors.d.ts.map