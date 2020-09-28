var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Numeric, Serialize } from 'eosjs';
import * as ecc from 'eosjs-ecc';
import makeFetch from 'fetch-ponyfill';
import linkAbi from './link-abi-data';
export const fetch = makeFetch().fetch;
const types = Serialize.getTypesFromAbi(Serialize.createInitialTypes(), linkAbi);
export function abiEncode(value, typeName) {
    let type = types.get(typeName);
    if (!type) {
        throw new Error(`No such type: ${typeName}`);
    }
    let buf = new Serialize.SerialBuffer();
    type.serialize(buf, value);
    return buf.asUint8Array();
}
export function abiDecode(data, typeName) {
    let type = types.get(typeName);
    if (!type) {
        throw new Error(`No such type: ${typeName}`);
    }
    if (typeof data === 'string') {
        data = Serialize.hexToUint8Array(data);
    }
    else if (!(data instanceof Uint8Array)) {
        data = new Uint8Array(data);
    }
    let buf = new Serialize.SerialBuffer({
        array: data,
    });
    return type.deserialize(buf);
}
export function sealMessage(message, privateKey, publicKey) {
    const res = ecc.Aes.encrypt(privateKey, publicKey, message);
    const data = {
        from: ecc.privateToPublic(privateKey),
        nonce: res.nonce.toString(),
        ciphertext: res.message,
        checksum: res.checksum,
    };
    return abiEncode(data, 'sealed_message');
}
export function normalizePublicKey(key) {
    if (key.startsWith('PUB_')) {
        return key;
    }
    return Numeric.publicKeyToString(Numeric.stringToPublicKey('EOS' + key.substr(-50)));
}
export function publicKeyEqual(keyA, keyB) {
    return normalizePublicKey(keyA) === normalizePublicKey(keyB);
}
export function generatePrivateKey() {
    return __awaiter(this, void 0, void 0, function* () {
        if (typeof window !== 'undefined' && window.crypto) {
            const data = new Uint32Array(32);
            window.crypto.getRandomValues(data);
            return ecc.PrivateKey.fromBuffer(Buffer.from(data)).toString();
        }
        else {
            return yield ecc.randomKey();
        }
    });
}
//# sourceMappingURL=utils.js.map