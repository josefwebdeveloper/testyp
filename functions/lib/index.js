"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
const angularUniversal = require("angular-universal-express-firebase");
exports.ssrApp = angularUniversal.trigger({
    index: __dirname + '/index-server.html',
    main: __dirname + '/main.bundle',
    enableProdMode: true,
    cdnCacheExpiry: 600,
    browserCacheExpiry: 300,
    staleWhileRevalidate: 120
});
//# sourceMappingURL=index.js.map