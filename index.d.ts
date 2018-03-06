declare module "rangee" {
    class RangeeOptions {
        document: Document;
    }
    class Rangee {
        constructor(options: RangeeOptions);

        getEncodedRange(range: Range): string;

        getDecodedRanges(representation: string): Range[];

        getDecodedRanges(range: Range): Range[];
    }
}