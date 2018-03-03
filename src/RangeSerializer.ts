import HtmlElementSelectorGenerator from "./HtmlElementSelectorGenerator"
import RangeSerialized from './RangeSerialized';

export class HtmlDocumentRangeSerializer {
    serialize(range: Range, relativeTo: HTMLElement): RangeSerialized {
        const start = HtmlElementSelectorGenerator.generateSelector(range.startContainer, relativeTo);
        start.o = range.startOffset;
        const end = HtmlElementSelectorGenerator.generateSelector(range.endContainer, relativeTo);
        end.o = range.endOffset;

        return { s: start, e: end };
    }

    deserialize(result: RangeSerialized, document: Document): Range {
        const range = document.createRange();
        let startNode = HtmlElementSelectorGenerator.find(result.s, document);
        let endNode = HtmlElementSelectorGenerator.find(result.e, document);

        if (startNode.nodeType != Node.TEXT_NODE) {
            startNode = startNode.firstChild;
        }
        if (endNode.nodeType != Node.TEXT_NODE) {
            endNode = endNode.firstChild;
        }
        if (startNode) {
            range.setStart(startNode, result.s.o);
        }
        if (endNode) {
            range.setEnd(endNode, result.e.o);
        }        

        return range;
    }
}

export default new HtmlDocumentRangeSerializer()