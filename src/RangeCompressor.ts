import * as Pako from 'pako';

export class RangeCompressor {
    compress = (decompressed: string) => Pako.deflateRaw(decompressed)
    decompress = (compressed: Uint8Array) => Pako.inflateRaw(compressed, { to: 'string' })
}

export default new RangeCompressor();