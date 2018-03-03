// naming obscurity is because of minification result of string representation of ranges
export default interface HtmlElementSelectorResult {
    /** selector */
    s: string;

    /** childIndexOf */
    c: number;

    /** offset */
    o: number;
}