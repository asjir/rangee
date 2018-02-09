declare class RangeeOptions {
    document: Document;
}

declare class Rangee {
    constructor(options: RangeeOptions);

    getEncodedRange(range: Range): string;

    getDecodedRanges(representation: string): Range[];

    getDecodedRanges(range: Range): Range[];
}