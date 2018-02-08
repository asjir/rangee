class RangeEncoder {
    encode = (buffer: Uint8Array) => btoa(Array.prototype.map.call(buffer, (ch: number) => String.fromCharCode(ch)).join(''))

    decode = (base64: string) => {
        const binstr = atob(base64);
        const buffer = new Uint8Array(binstr.length);
        Array.prototype.forEach.call(binstr, (ch: string, index: number) => buffer[index] = ch.charCodeAt(0));
        return buffer;
    }
}

export default new RangeEncoder()