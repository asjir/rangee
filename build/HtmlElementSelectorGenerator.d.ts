import HtmlElementSelectorResult from './HtmlElementSelectorResult';
export declare const find: (result: HtmlElementSelectorResult, document: Document) => Node;
export declare const generateSelector: (node: Node, relativeTo: Node) => HtmlElementSelectorResult;
export declare const childNodeIndexOf: (parentNode: Node, childNode: Node) => number;
export declare const computedNthIndex: (childElement: HTMLElement) => number;
