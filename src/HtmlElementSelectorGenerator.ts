import HtmlElementSelectorResult from './HtmlElementSelectorResult';

export class HtmlElementSelectorGenerator {
    find = (result: HtmlElementSelectorResult, document: Document): Node => {
        const element = document.querySelector(result.s);
        if (!element) {
            throw new Error('Unable to find element with selector: ' + result.s);
        }
        return element.childNodes[result.c];
    }

    generateSelector = (node: Node, relativeTo: Node): HtmlElementSelectorResult => {        
        let currentNode = (node as HTMLElement);
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

                currentNode = (currentNode.parentNode || currentNode.parentElement) as HTMLElement;

                if (currentNode == (relativeTo.parentNode || relativeTo.parentElement)) {
                    break;
                }
            }
        }        

        return { s: tagNames.reverse().join(">").toLowerCase(), c: textNodeIndex, o: 0 };
    }

    private childNodeIndexOf(parentNode: Node, childNode: Node) {
        const childNodes = parentNode.childNodes;
        let result = 0;
        for (let i = 0, l = childNodes.length; i < l; i++) {
            if (childNodes[i] === childNode) {
                result = i;
                break;
            }
        }
        return result;
    }

    private computedNthIndex(childElement: HTMLElement) {
        let elementsWithSameTag = 0;

        const parent = (childElement.parentNode || childElement.parentElement);

        if (parent) {
            for (var i = 0, l = parent.childNodes.length; i < l; i++) {
                const currentHtmlElement = parent.childNodes[i] as HTMLElement;
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
    }
}

export default new HtmlElementSelectorGenerator()