import { compressToUint8Array, decompressFromUint8Array } from 'lz-string';

export class RangeCompressor {
    compress = (decompressed: string) => compressToUint8Array(decompressed);
    decompress = (compressed: Uint8Array) => decompressFromUint8Array(compressed);
}

export default new RangeCompressor();