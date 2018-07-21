export interface RangeeOptions {
    document: Document;
}
export declare class Rangee {
    options: Readonly<RangeeOptions>;
    constructor(options: RangeeOptions);
    serializeAtomic: (range: Range) => string;
    deserilaizeAtomic: (representation: string) => Range[];
    serialize: (range: Range) => string;
    deserialize: (serialized: string) => Range;
    createAtomicRanges: (range: Range) => Range[];
}
