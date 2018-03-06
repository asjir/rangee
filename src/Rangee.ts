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

    getEncodedRange = (range: Range) => {
        const partialRanges = this.createPartialRanges(range);

        const serialized = partialRanges
            .map(range => serialize(range.cloneRange(), this.options.document.body))
            .map(serializedRange => JSON.stringify(serializedRange))
            .join("|");

        const compressed = compress(serialized);
        const encoded = encode(compressed);

        return encoded;
    }

    getDecodedRanges = (representation: string) => {
        const decoded = decode(representation);
        const decompressed = decompress(decoded);
        const serializedRanges = decompressed
            .split("|")
            .map(decompressedRangeRepresentation => JSON.parse(decompressedRangeRepresentation) as RangeSerialized)
            .reverse()
            .map(serializedRange => deserialize(serializedRange, this.options.document))
        return serializedRanges;
    }

    createPartialRanges = (range: Range) => {
        // text
        if (range.startContainer === range.endContainer
            && range.startContainer.nodeType === Node.TEXT_NODE
            && range.endContainer.nodeType === Node.TEXT_NODE) {
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
        const ranges: Range[] = [];
        let node: Node;
        while (node = treeWalker.nextNode()) {
            if (node === range.startContainer) {
                startFound = true;
            }

            if (node.nodeType === Node.TEXT_NODE && startFound && !endFound && node.textContent && node.textContent.length > 0) {
                const newRange = this.options.document.createRange()
                newRange.setStart(node, node === range.startContainer ? range.startOffset : 0);
                newRange.setEnd(node, node === range.endContainer ? range.endOffset : (node as Text).length);
                ranges.push(newRange);
            }

            if (node === range.endContainer) {
                endFound = true;
            }
        }

        return ranges;
    }
}