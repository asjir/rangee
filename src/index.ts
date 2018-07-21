import { serialize, deserialize } from './RangeSerializer';
import { compress, decompress } from './RangeCompressor';
import { encode, decode } from './RangeEncoder';
import RangeSerialized from './RangeSerialized';

export interface RangeeOptions {
    document: Document;
}

export class Rangee {
    options: Readonly<RangeeOptions>;

    constructor(options: RangeeOptions) {
        this.options = {
            ...options
        }
    }

    serializeAtomic = (range: Range) => {
        const atomicRanges = this.createAtomicRanges(range);
        const serialized = atomicRanges
            .map(range => serialize(range.cloneRange(), this.options.document.body))
            .map(serializedRange => JSON.stringify(serializedRange))
            .join("|");
        const compressed = compress(serialized);
        const encoded = encode(compressed);
        return encoded;
    }

    deserilaizeAtomic = (representation: string) => {
        const decoded = decode(representation);
        const decompressed = decompress(decoded);
        const serializedRanges = decompressed
            .split("|")
            .map(decompressedRangeRepresentation => JSON.parse(decompressedRangeRepresentation) as RangeSerialized)
            .reverse()
            .map(serializedRange => deserialize(serializedRange, this.options.document))
        return serializedRanges;
    }

    serialize = (range: Range) => {
        const serialized = serialize(range.cloneRange(), this.options.document.body);
        const serializedStringified = JSON.stringify(serialized);
        const compressed = compress(serializedStringified);
        const encoded = encode(compressed);
        return encoded;
    }

    deserialize = (serialized: string) => {
        const decoded = decode(serialized);
        const decompressed = decompress(decoded);
        const decompressedParsed = JSON.parse(decompressed) as RangeSerialized;
        const deserilaized = deserialize(decompressedParsed, this.options.document);
        return deserilaized;
    }

    createAtomicRanges = (range: Range) => {
        // text
        if (range.startContainer === range.endContainer && range.startContainer.nodeType === Node.TEXT_NODE) {
            return [range];
        }

        const documentAsAny = this.options.document as any; // IE does not know the right spec signature for createTreeWalker

        // elements
        const treeWalker = documentAsAny.createTreeWalker(
            range.commonAncestorContainer,
            NodeFilter.SHOW_ALL,
            (node: Node) => NodeFilter.FILTER_ACCEPT,
            false
        ) as TreeWalker

        let startFound = false;
        let endFound = false;
        const atomicRanges: Range[] = [];
        let node: Node;
        while (node = treeWalker.nextNode()) {
            if (node === range.startContainer) {
                startFound = true;
            }

            if (node.nodeType === Node.TEXT_NODE && startFound && !endFound && node.textContent && node.textContent.trim().length > 0) {
                const atomicRange = this.options.document.createRange()
                atomicRange.setStart(node, node === range.startContainer ? range.startOffset : 0);
                atomicRange.setEnd(node, node === range.endContainer ? range.endOffset : (node as Text).length);
                atomicRanges.push(atomicRange);
            }

            if (node === range.endContainer) {
                endFound = true;
            }
        }

        return atomicRanges;
    }
}