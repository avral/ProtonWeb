'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var ProtonLink = require('@protonprotocol/proton-link');
var ProtonLinkBrowserTransport = require('@protonprotocol/proton-browser-transport');
var protonjs = require('@protonprotocol/protonjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var ProtonLink__default = /*#__PURE__*/_interopDefaultLegacy(ProtonLink);
var ProtonLinkBrowserTransport__default = /*#__PURE__*/_interopDefaultLegacy(ProtonLinkBrowserTransport);

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

var ProtonConnect = function (linkOptions, transportOptions) {
    if (linkOptions === void 0) { linkOptions = {}; }
    if (transportOptions === void 0) { transportOptions = {}; }
    // Add RPC if not provided
    if (!linkOptions.rpc && linkOptions.endpoints) {
        linkOptions.rpc = new protonjs.JsonRpc(linkOptions.endpoints);
    }
    // Create transport
    var transport = new ProtonLinkBrowserTransport__default['default'](transportOptions);
    // Create link
    var link = new ProtonLink__default['default'](__assign({ transport: transport }, linkOptions));
    // Return link to users
    return link;
};

exports.ProtonConnect = ProtonConnect;
//# sourceMappingURL=index.es5.js.map
