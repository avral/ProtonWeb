export class CancelError extends Error {
    constructor(reason) {
        super(`User canceled request ${reason ? '(' + reason + ')' : ''}`);
        this.code = 'E_CANCEL';
    }
}
export class IdentityError extends Error {
    constructor(reason) {
        super(`Unable to verify identity ${reason ? '(' + reason + ')' : ''}`);
        this.code = 'E_IDENTITY';
    }
}
export class SessionError extends Error {
    constructor(reason, code) {
        super(reason);
        this.code = code;
    }
}
//# sourceMappingURL=errors.js.map