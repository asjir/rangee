import HtmlElementSelectorGenerator from "./HtmlElementSelectorGenerator"
import RangeSerialized from './RangeSerialized';

class HtmlDocumentRangeSerializer {
    serialize(range: Range, relativeTo: HTMLElement): RangeSerialized {
        const start = HtmlElementSelectorGenerator.generateSelector(range.startContainer, relativeTo);
        start.offset = range.startOffset;
        const end = HtmlElementSelectorGenerator.generateSelector(range.endContainer, relativeTo);
        end.offset = range.endOffset;

        return { start, end };
    }

    deserialize(result: RangeSerialized, document: Document): Range {
        const range = document.createRange();
        let startNode: Node | null = HtmlElementSelectorGenerator.find(result.start, document);
        let endNode: Node | null = HtmlElementSelectorGenerator.find(result.end, document);

        if (startNode.nodeType != Node.TEXT_NODE) {
            startNode = startNode.firstChild;
        }
        if (endNode.nodeType != Node.TEXT_NODE) {
            endNode = endNode.firstChild;
        }
        if (startNode) {
            range.setStart(startNode, result.start.offset);
        }
        if (endNode) {
            range.setEnd(endNode, result.end.offset);
        }        

        return range;
    }
}

export default new HtmlDocumentRangeSerializer()