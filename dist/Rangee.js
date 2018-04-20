define(["require", "exports", "./RangeSerializer", "./RangeCompressor", "./RangeEncoder"], function (require, exports, RangeSerializer_1, RangeCompressor_1, RangeEncoder_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Rangee {
        constructor(options) {
            this.serializeAtomic = (range) => {
                const atomicRanges = this.createAtomicRanges(range);
                const serialized = atomicRanges
                    .map(range => RangeSerializer_1.serialize(range.cloneRange(), this.options.document.body))
                    .map(serializedRange => JSON.stringify(serializedRange))
                    .join("|");
                const compressed = RangeCompressor_1.compress(serialized);
                const encoded = RangeEncoder_1.encode(compressed);
                return encoded;
            };
            this.deserilaizeAtomic = (representation) => {
                const decoded = RangeEncoder_1.decode(representation);
                const decompressed = RangeCompressor_1.decompress(decoded);
                const serializedRanges = decompressed
                    .split("|")
                    .map(decompressedRangeRepresentation => JSON.parse(decompressedRangeRepresentation))
                    .reverse()
                    .map(serializedRange => RangeSerializer_1.deserialize(serializedRange, this.options.document));
                return serializedRanges;
            };
            this.serialize = (range) => {
                const serialized = RangeSerializer_1.serialize(range.cloneRange(), this.options.document.body);
                const serializedStringified = JSON.stringify(serialized);
                const compressed = RangeCompressor_1.compress(serializedStringified);
                const encoded = RangeEncoder_1.encode(compressed);
                return encoded;
            };
            this.deserialize = (serialized) => {
                const decoded = RangeEncoder_1.decode(serialized);
                const decompressed = RangeCompressor_1.decompress(decoded);
                const decompressedParsed = JSON.parse(decompressed);
                const deserilaized = RangeSerializer_1.deserialize(decompressedParsed, this.options.document);
                return deserilaized;
            };
            this.createAtomicRanges = (range) => {
                // text
                if (range.startContainer === range.endContainer && range.startContainer.nodeType === Node.TEXT_NODE) {
                    return [range];
                }
                const documentAsAny = this.options.document; // IE does not know the right spec signature for createTreeWalker
                // elements
                const treeWalker = documentAsAny.createTreeWalker(range.commonAncestorContainer, NodeFilter.SHOW_ALL, (node) => NodeFilter.FILTER_ACCEPT, false);
                let startFound = false;
                let endFound = false;
                const atomicRanges = [];
                let node;
                while (node = treeWalker.nextNode()) {
                    if (node === range.startContainer) {
                        startFound = true;
                    }
                    if (node.nodeType === Node.TEXT_NODE && startFound && !endFound && node.textContent && node.textContent.length > 0) {
                        const atomicRange = this.options.document.createRange();
                        atomicRange.setStart(node, node === range.startContainer ? range.startOffset : 0);
                        atomicRange.setEnd(node, node === range.endContainer ? range.endOffset : node.length);
                        atomicRanges.push(atomicRange);
                    }
                    if (node === range.endContainer) {
                        endFound = true;
                    }
                }
                return atomicRanges;
            };
            this.options = Object.assign({}, options);
        }
    }
    exports.Rangee = Rangee;
});
