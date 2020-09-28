var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as esr from '@protonprotocol/proton-signing-request';
import { JsonRpc } from 'eosjs';
import * as ecc from 'eosjs-ecc';
import WebSocket from 'isomorphic-ws';
import zlib from 'pako';
import { v4 as uuid } from 'uuid';
import { CancelError, IdentityError } from './errors';
import { defaults } from './link-options';
import { LinkChannelSession, LinkFallbackSession, LinkSession } from './link-session';
import { abiEncode, fetch, generatePrivateKey, normalizePublicKey, publicKeyEqual } from './utils';
export class Link {
    constructor(options) {
        this.abiCache = new Map();
        this.pendingAbis = new Map();
        if (typeof options !== 'object') {
            throw new TypeError('Missing options object');
        }
        if (!options.transport) {
            throw new TypeError('options.transport is required, see https://github.com/greymass/anchor-link#transports');
        }
        if (options.rpc === undefined || typeof options.rpc === 'string') {
            this.rpc = new JsonRpc(options.rpc || defaults.rpc, { fetch: fetch });
        }
        else {
            this.rpc = options.rpc;
        }
        if (options.chainId) {
            this.chainId =
                typeof options.chainId === 'number'
                    ? esr.nameToId(options.chainId)
                    : options.chainId;
        }
        else {
            this.chainId = defaults.chainId;
        }
        this.serviceAddress = (options.service || defaults.service).trim().replace(/\/$/, '');
        this.transport = options.transport;
        if (options.storage !== null) {
            this.storage = options.storage || this.transport.storage;
        }
        this.requestOptions = {
            abiProvider: this,
            textDecoder: options.textDecoder || new TextDecoder(),
            textEncoder: options.textEncoder || new TextEncoder(),
            zlib,
            scheme: options.scheme
        };
    }
    getAbi(account) {
        return __awaiter(this, void 0, void 0, function* () {
            let rv = this.abiCache.get(account);
            if (!rv) {
                let getAbi = this.pendingAbis.get(account);
                if (!getAbi) {
                    getAbi = this.rpc.get_abi(account);
                    this.pendingAbis.set(account, getAbi);
                }
                rv = (yield getAbi).abi;
                this.pendingAbis.delete(account);
                if (rv) {
                    this.abiCache.set(account, rv);
                }
            }
            return rv;
        });
    }
    createCallbackUrl() {
        return `${this.serviceAddress}/${uuid()}`;
    }
    createRequest(args, transport) {
        return __awaiter(this, void 0, void 0, function* () {
            const t = transport || this.transport;
            let request = yield esr.SigningRequest.create(Object.assign(Object.assign({}, args), { chainId: this.chainId, broadcast: false, callback: {
                    url: this.createCallbackUrl(),
                    background: true,
                } }), this.requestOptions);
            if (t.prepare) {
                request = yield t.prepare(request);
            }
            return request;
        });
    }
    sendRequest(request, transport, broadcast = false) {
        return __awaiter(this, void 0, void 0, function* () {
            const t = transport || this.transport;
            try {
                const linkUrl = request.data.callback;
                if (!linkUrl.startsWith(this.serviceAddress)) {
                    throw new Error('Request must have a link callback');
                }
                if (request.data.flags !== 2) {
                    throw new Error('Invalid request flags');
                }
                const ctx = {};
                const socket = waitForCallback(linkUrl, ctx).then((data) => {
                    if (typeof data.rejected === 'string') {
                        throw new CancelError(`Rejected by wallet: ${data.rejected}`);
                    }
                    return data;
                });
                const cancel = new Promise((resolve, reject) => {
                    t.onRequest(request, (reason) => {
                        if (ctx.cancel) {
                            ctx.cancel();
                        }
                        if (typeof reason === 'string') {
                            reject(new CancelError(reason));
                        }
                        else {
                            reject(reason);
                        }
                    });
                });
                const payload = yield Promise.race([socket, cancel]);
                const signer = {
                    actor: payload.sa,
                    permission: payload.sp,
                };
                const signatures = Object.keys(payload)
                    .filter((key) => key.startsWith('sig') && key !== 'sig0')
                    .map((key) => payload[key]);
                const resolved = yield esr.ResolvedSigningRequest.fromPayload(payload, this.requestOptions);
                const info = resolved.request.getInfo();
                if (info['fuel_sig']) {
                    signatures.unshift(info['fuel_sig']);
                }
                const { serializedTransaction, transaction } = resolved;
                const result = {
                    request: resolved.request,
                    serializedTransaction,
                    transaction,
                    signatures,
                    payload,
                    signer,
                };
                if (broadcast) {
                    const res = yield this.rpc.push_transaction({
                        signatures: result.signatures,
                        serializedTransaction: result.serializedTransaction,
                    });
                    result.processed = res.processed;
                }
                if (t.onSuccess) {
                    t.onSuccess(request, result);
                }
                return result;
            }
            catch (error) {
                if (t.onFailure) {
                    t.onFailure(request, error);
                }
                throw error;
            }
        });
    }
    transact(args, options, transport) {
        return __awaiter(this, void 0, void 0, function* () {
            const t = transport || this.transport;
            const broadcast = options ? options.broadcast !== false : true;
            if (t && t.showLoading) {
                t.showLoading();
            }
            let anyArgs = args;
            if (args.actions &&
                (anyArgs.expiration ||
                    anyArgs.ref_block_num ||
                    anyArgs.ref_block_prefix ||
                    anyArgs.max_net_usage_words ||
                    anyArgs.max_cpu_usage_ms ||
                    anyArgs.delay_sec)) {
                args = {
                    transaction: Object.assign({ expiration: '1970-01-01T00:00:00', ref_block_num: 0, ref_block_prefix: 0, max_net_usage_words: 0, max_cpu_usage_ms: 0, delay_sec: 0 }, anyArgs),
                };
            }
            const request = yield this.createRequest(args, t);
            const result = yield this.sendRequest(request, t, broadcast);
            return result;
        });
    }
    identify(requestPermission, info) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = yield this.createRequest({
                identity: { permission: requestPermission || null },
                info,
            });
            const res = yield this.sendRequest(request);
            if (!res.request.isIdentity()) {
                throw new IdentityError(`Unexpected response`);
            }
            const message = Buffer.concat([
                Buffer.from(request.getChainId(), 'hex'),
                Buffer.from(res.serializedTransaction),
                Buffer.alloc(32),
            ]);
            const { signer } = res;
            const signerKey = ecc.recover(res.signatures[0], message);
            const account = yield this.rpc.get_account(signer.actor);
            if (!account) {
                throw new IdentityError(`Signature from unknown account: ${signer.actor}`);
            }
            const permission = account.permissions.find(({ perm_name }) => perm_name === signer.permission);
            if (!permission) {
                throw new IdentityError(`${signer.actor} signed for unknown permission: ${signer.permission}`);
            }
            const auth = permission.required_auth;
            const keyAuth = auth.keys.find(({ key }) => publicKeyEqual(key, signerKey));
            if (!keyAuth) {
                throw new IdentityError(`${formatAuth(signer)} has no key matching id signature`);
            }
            if (auth.threshold > keyAuth.weight) {
                throw new IdentityError(`${formatAuth(signer)} signature does not reach auth threshold`);
            }
            if (requestPermission) {
                if ((requestPermission.actor !== esr.PlaceholderName &&
                    requestPermission.actor !== signer.actor) ||
                    (requestPermission.permission !== esr.PlaceholderPermission &&
                        requestPermission.permission !== signer.permission)) {
                    throw new IdentityError(`Unexpected identity proof from ${formatAuth(signer)}, expected ${formatAuth(requestPermission)} `);
                }
            }
            return Object.assign(Object.assign({}, res), { account,
                signerKey });
        });
    }
    login(identifier) {
        return __awaiter(this, void 0, void 0, function* () {
            const privateKey = yield generatePrivateKey();
            const requestKey = ecc.privateToPublic(privateKey);
            const createInfo = {
                session_name: identifier,
                request_key: requestKey,
            };
            const res = yield this.identify(undefined, {
                link: abiEncode(createInfo, 'link_create'),
            });
            const metadata = { sameDevice: res.request.getRawInfo()['return_path'] !== undefined };
            let session;
            if (res.payload.link_ch && res.payload.link_key && res.payload.link_name) {
                session = new LinkChannelSession(this, {
                    identifier,
                    auth: res.signer,
                    publicKey: res.signerKey,
                    channel: {
                        url: res.payload.link_ch,
                        key: res.payload.link_key,
                        name: res.payload.link_name,
                    },
                    requestKey: privateKey,
                }, metadata);
            }
            else {
                session = new LinkFallbackSession(this, {
                    identifier,
                    auth: res.signer,
                    publicKey: res.signerKey,
                }, metadata);
            }
            if (this.storage) {
                yield this.storeSession(identifier, session);
            }
            return Object.assign(Object.assign({}, res), { session });
        });
    }
    restoreSession(identifier, auth) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.storage) {
                throw new Error('Unable to restore session: No storage adapter configured');
            }
            let key;
            if (auth) {
                key = this.sessionKey(identifier, formatAuth(auth));
            }
            else {
                let latest = (yield this.listSessions(identifier))[0];
                if (!latest) {
                    return null;
                }
                key = this.sessionKey(identifier, formatAuth(latest));
            }
            let data = yield this.storage.read(key);
            if (!data) {
                return null;
            }
            let sessionData;
            try {
                sessionData = JSON.parse(data);
            }
            catch (error) {
                throw new Error(`Unable to restore session: Stored JSON invalid (${error.message || String(error)})`);
            }
            const session = LinkSession.restore(this, sessionData);
            if (auth) {
                yield this.touchSession(identifier, auth);
            }
            return session;
        });
    }
    listSessions(identifier) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.storage) {
                throw new Error('Unable to list sessions: No storage adapter configured');
            }
            let key = this.sessionKey(identifier, 'list');
            let list;
            try {
                list = JSON.parse((yield this.storage.read(key)) || '[]');
            }
            catch (error) {
                throw new Error(`Unable to list sessions: Stored JSON invalid (${error.message || String(error)})`);
            }
            return list;
        });
    }
    removeSession(identifier, auth) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.storage) {
                throw new Error('Unable to remove session: No storage adapter configured');
            }
            let key = this.sessionKey(identifier, formatAuth(auth));
            yield this.storage.remove(key);
            yield this.touchSession(identifier, auth, true);
        });
    }
    clearSessions(identifier) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.storage) {
                throw new Error('Unable to clear sessions: No storage adapter configured');
            }
            for (const auth of yield this.listSessions(identifier)) {
                yield this.removeSession(identifier, auth);
            }
        });
    }
    makeSignatureProvider(availableKeys, transport) {
        return {
            getAvailableKeys: () => __awaiter(this, void 0, void 0, function* () { return availableKeys; }),
            sign: (args) => __awaiter(this, void 0, void 0, function* () {
                const t = transport || this.transport;
                let request = esr.SigningRequest.fromTransaction(args.chainId, args.serializedTransaction, this.requestOptions);
                request.setCallback(this.createCallbackUrl(), true);
                request.setBroadcast(false);
                if (t.prepare) {
                    request = yield t.prepare(request);
                }
                const { serializedTransaction, signatures, } = yield this.sendRequest(request, t);
                return Object.assign(Object.assign({}, args), { serializedTransaction,
                    signatures });
            }),
        };
    }
    makeAuthorityProvider() {
        const { rpc } = this;
        return {
            getRequiredKeys(args) {
                return __awaiter(this, void 0, void 0, function* () {
                    const { availableKeys, transaction } = args;
                    const result = yield rpc.fetch('/v1/chain/get_required_keys', {
                        transaction,
                        available_keys: availableKeys.map(normalizePublicKey),
                    });
                    return result.required_keys.map(normalizePublicKey);
                });
            },
        };
    }
    touchSession(identifier, auth, remove = false) {
        return __awaiter(this, void 0, void 0, function* () {
            let auths = yield this.listSessions(identifier);
            let formattedAuth = formatAuth(auth);
            let existing = auths.findIndex((a) => formatAuth(a) === formattedAuth);
            if (existing >= 0) {
                auths.splice(existing, 1);
            }
            if (remove === false) {
                auths.unshift(auth);
            }
            let key = this.sessionKey(identifier, 'list');
            yield this.storage.write(key, JSON.stringify(auths));
        });
    }
    storeSession(identifier, session) {
        return __awaiter(this, void 0, void 0, function* () {
            let key = this.sessionKey(identifier, formatAuth(session.auth));
            let data = JSON.stringify(session.serialize());
            yield this.storage.write(key, data);
            yield this.touchSession(identifier, session.auth);
        });
    }
    sessionKey(identifier, suffix) {
        return [this.chainId, identifier, suffix].join('-');
    }
}
function waitForCallback(url, ctx) {
    return new Promise((resolve, reject) => {
        let active = true;
        let retries = 0;
        const socketUrl = url.replace(/^http/, 'ws');
        const handleResponse = (response) => {
            try {
                resolve(JSON.parse(response));
            }
            catch (error) {
                error.message = 'Unable to parse callback JSON: ' + error.message;
                reject(error);
            }
        };
        const connect = () => {
            const socket = new WebSocket(socketUrl);
            ctx.cancel = () => {
                active = false;
                if (socket.readyState === WebSocket.OPEN ||
                    socket.readyState === WebSocket.CONNECTING) {
                    socket.close();
                }
            };
            socket.onmessage = (event) => {
                active = false;
                if (socket.readyState === WebSocket.OPEN) {
                    socket.close();
                }
                if (typeof Blob !== 'undefined' && event.data instanceof Blob) {
                    const reader = new FileReader();
                    reader.onload = () => {
                        handleResponse(reader.result);
                    };
                    reader.onerror = (error) => {
                        reject(error);
                    };
                    reader.readAsText(event.data);
                }
                else {
                    if (typeof event.data === 'string') {
                        handleResponse(event.data);
                    }
                    else {
                        handleResponse(event.data.toString());
                    }
                }
            };
            socket.onopen = () => {
                retries = 0;
            };
            socket.onerror = (error) => { };
            socket.onclose = (close) => {
                if (active) {
                    setTimeout(connect, backoff(retries++));
                }
            };
        };
        connect();
    });
}
function backoff(tries) {
    return Math.min(Math.pow(tries * 10, 2), 10 * 1000);
}
function formatAuth(auth) {
    let { actor, permission } = auth;
    if (actor === esr.PlaceholderName) {
        actor = '<any>';
    }
    if (permission === esr.PlaceholderName || permission === esr.PlaceholderPermission) {
        permission = '<any>';
    }
    return `${actor}@${permission}`;
}
//# sourceMappingURL=link.js.map