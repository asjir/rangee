import RangeSerialized from './RangeSerialized';
export declare const serialize: (range: Range, relativeTo: HTMLElement) => RangeSerialized;
export declare const deserialize: (result: RangeSerialized, document: Document) => Range;
