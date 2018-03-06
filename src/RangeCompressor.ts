import * as Pako from 'pako';

export const compress = (decompressed: string) => Pako.deflateRaw(decompressed, { level: 9, raw: true })
export const decompress = (compressed: Uint8Array) => Pako.inflate(compressed, { raw: true, to: "string" })