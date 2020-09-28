const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
const lookup = new Uint8Array(256);
for (let i = 0; i < 64; i++) {
    lookup[charset.charCodeAt(i)] = i;
}
export function encode(data) {
    const byteLength = data.byteLength;
    const byteRemainder = byteLength % 3;
    const mainLength = byteLength - byteRemainder;
    const parts = [];
    let a;
    let b;
    let c;
    let d;
    let chunk;
    for (let i = 0; i < mainLength; i += 3) {
        chunk = (data[i] << 16) | (data[i + 1] << 8) | data[i + 2];
        a = (chunk & 16515072) >> 18;
        b = (chunk & 258048) >> 12;
        c = (chunk & 4032) >> 6;
        d = chunk & 63;
        parts.push(charset[a] + charset[b] + charset[c] + charset[d]);
    }
    if (byteRemainder === 1) {
        chunk = data[mainLength];
        a = (chunk & 252) >> 2;
        b = (chunk & 3) << 4;
        parts.push(charset[a] + charset[b]);
    }
    else if (byteRemainder === 2) {
        chunk = (data[mainLength] << 8) | data[mainLength + 1];
        a = (chunk & 64512) >> 10;
        b = (chunk & 1008) >> 4;
        c = (chunk & 15) << 2;
        parts.push(charset[a] + charset[b] + charset[c]);
    }
    return parts.join('');
}
export function decode(input) {
    const byteLength = input.length * 0.75;
    const data = new Uint8Array(byteLength);
    let a;
    let b;
    let c;
    let d;
    let p = 0;
    for (let i = 0; i < input.length; i += 4) {
        a = lookup[input.charCodeAt(i)];
        b = lookup[input.charCodeAt(i + 1)];
        c = lookup[input.charCodeAt(i + 2)];
        d = lookup[input.charCodeAt(i + 3)];
        data[p++] = (a << 2) | (b >> 4);
        data[p++] = ((b & 15) << 4) | (c >> 2);
        data[p++] = ((c & 3) << 6) | (d & 63);
    }
    return data;
}
//# sourceMappingURL=base64u.js.map