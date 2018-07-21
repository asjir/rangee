import { deflateRaw, inflate } from 'pako';

export const compress = (decompressed: string) => deflateRaw(decompressed, { level: 9, raw: true })
export const decompress = (compressed: Uint8Array) => inflate(compressed, { raw: true, to: "string" })