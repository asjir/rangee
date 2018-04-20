define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.find = (result, document) => {
        const element = document.querySelector(result.s);
        if (!element) {
            throw new Error('Unable to find element with selector: ' + result.s);
        }
        return element.childNodes[result.c];
    };
    exports.generateSelector = (node, relativeTo) => {
        let currentNode = node;
        const tagNames = [];
        let textNodeIndex = 0;
        if (node.parentNode) {
            textNodeIndex = this.childNodeIndexOf(node.parentNode, node);
            while (currentNode) {
                const tagName = currentNode.tagName;
                if (tagName) {
                    const nthIndex = this.computedNthIndex(currentNode);
                    let selector = tagName;
                    if (nthIndex > 1) {
                        selector += ":nth-of-type(" + nthIndex + ")";
                    }
                    tagNames.push(selector);
                }
                currentNode = (currentNode.parentNode || currentNode.parentElement);
                if (currentNode == (relativeTo.parentNode || relativeTo.parentElement)) {
                    break;
                }
            }
        }
        return { s: tagNames.reverse().join(">").toLowerCase(), c: textNodeIndex, o: 0 };
    };
    exports.childNodeIndexOf = (parentNode, childNode) => {
        const childNodes = parentNode.childNodes;
        let result = 0;
        for (let i = 0, l = childNodes.length; i < l; i++) {
            if (childNodes[i] === childNode) {
                result = i;
                break;
            }
        }
        return result;
    };
    exports.computedNthIndex = (childElement) => {
        let elementsWithSameTag = 0;
        const parent = (childElement.parentNode || childElement.parentElement);
        if (parent) {
            for (var i = 0, l = parent.childNodes.length; i < l; i++) {
                const currentHtmlElement = parent.childNodes[i];
                if (currentHtmlElement === childElement) {
                    elementsWithSameTag++;
                    break;
                }
                if (currentHtmlElement.tagName === childElement.tagName) {
                    elementsWithSameTag++;
                }
            }
        }
        return elementsWithSameTag;
    };
});
