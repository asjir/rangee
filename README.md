# rangee
Serialize/deserialize [Range](https://developer.mozilla.org/en-US/docs/Web/API/Range). 
***
## Typical use case
1. User wants to highlight HTML.
2. User wants to see the highlighted HTML on next page load (application should store Range representation and apply after page load).
***
## Demo
https://lukasrada.github.io/rangee/
***
## Under the hood
### From Range object to Range string representation
1. Create array of atomic range objects only with text inside from input range.
2. Create HTML selector from array of atomic ranges as JSON.
3. Serialization.
4. Compression.
5. Encoding.
### From Range string representation to Range object
1. Decoding.
2. Decompression.
3. Deserialization.
4. JSON parse.
5. Array of Range DOM.
## Demo instalation
1. Clone repository
2. Run webpack
3. Run node ./demo.js
4. Visit http://localhost:3000/demo.html
***
## Example (store and highlight)
```javascript
import Rangee from './Rangee';

const rangee = new Rangee({ document });

let rangeStorage = "";

document.querySelector("#save").addEventListener("click", () => {
    const selection = document.getSelection();
    if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);

        if (range) {
            const rangeRepresentation = rangee.getEncodedRange(range);
            rangeStorage = rangeRepresentation;
            // there you have rangee output (range representation in base64) and you can store somewhere
        }
    }    
})
...
document.querySelector("#load").addEventListener("click", () => {
    const rangeRepresentation = rangeStorage; // earlier stored range representation
    const ranges = rangee.getDecodedRanges(rangeRepresentation);

    // highlight range (sub ranges - beacause of HTML structure)
    ranges.forEach(range => {
        const highlight = document.createElement("mark")
        range.surroundContents(document.createElement("mark"));
    })   
})

```
## Roadmap
- [x] Basic functionality
- [ ] Implement LZMA compression
- [ ] Prepare to npm
- [ ] Create table of supported browsers
