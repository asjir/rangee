define(["require", "exports", "pako"], function (require, exports, Pako) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.compress = (decompressed) => Pako.deflateRaw(decompressed, { level: 9, raw: true });
    exports.decompress = (compressed) => Pako.inflate(compressed, { raw: true, to: "string" });
});
