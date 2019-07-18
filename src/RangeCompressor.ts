const pako = require('pako');

export const compress = (decompressed: string) => pako.deflate(decompressed, { level: 9, raw: true })
export const decompress = (compressed: Uint8Array) => pako.inflate(compressed, { raw: true, to: "string" })