define(["require", "exports", "./HtmlElementSelectorGenerator"], function (require, exports, HtmlElementSelectorGenerator_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.serialize = (range, relativeTo) => {
        const start = HtmlElementSelectorGenerator_1.generateSelector(range.startContainer, relativeTo);
        start.o = range.startOffset;
        const end = HtmlElementSelectorGenerator_1.generateSelector(range.endContainer, relativeTo);
        end.o = range.endOffset;
        return { s: start, e: end };
    };
    exports.deserialize = (result, document) => {
        const range = document.createRange();
        let startNode = HtmlElementSelectorGenerator_1.find(result.s, document);
        let endNode = HtmlElementSelectorGenerator_1.find(result.e, document);
        if (startNode.nodeType != Node.TEXT_NODE && startNode.firstChild) {
            startNode = startNode.firstChild;
        }
        if (endNode.nodeType != Node.TEXT_NODE && endNode.firstChild) {
            endNode = endNode.firstChild;
        }
        if (startNode) {
            range.setStart(startNode, result.s.o);
        }
        if (endNode) {
            range.setEnd(endNode, result.e.o);
        }
        return range;
    };
});
