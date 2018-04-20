define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.encode = (buffer) => btoa(Array.prototype.map.call(buffer, (ch) => String.fromCharCode(ch)).join(''));
    exports.decode = (base64) => {
        const binstr = atob(base64);
        const buffer = new Uint8Array(binstr.length);
        Array.prototype.forEach.call(binstr, (ch, index) => buffer[index] = ch.charCodeAt(0));
        return buffer;
    };
});
