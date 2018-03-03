import RangeSerializer from './RangeSerializer';
import RangeCompressor from './RangeCompressor';
import RangeEncoder from './RangeEncoder';
import RangeSerialized from './RangeSerialized';

export interface RangeeOptions {
    document: Document;
}

class Rangee {
    options: Readonly<RangeeOptions>;

    constructor(options: RangeeOptions) {
        this.options = {
            ...options
        }
    }

    getEncodedRange = (range: Range) => {
        const partialRanges = this.createPartialRanges(range);

        const serialized = partialRanges
            .map((range, index) => RangeSerializer.serialize(range.cloneRange(), this.options.document.body))
            .map(r => JSON.stringify(r))
            .join("|");

        const compressed = RangeCompressor.compress(serialized);
        const encoded = RangeEncoder.encode(compressed);

        return encoded;
    }

    getDecodedRanges = (representation: string) => {
        const decoded = RangeEncoder.decode(representation);
        const decompressed = RangeCompressor.decompress(decoded);
        const serializedRanges = decompressed
            .split("|")
            .map(r => JSON.parse(r) as RangeSerialized)
            .reverse()
            .map(r => RangeSerializer.deserialize(r, this.options.document))
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

export default Rangee