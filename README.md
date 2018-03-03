# rangee
Create range representation of your range representation in HTML (Range DOM object).

### Typical use case:
User wants to highlight HTML.

User wants to see the highlighted HTML on next page load.

### Example
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
### Roadmap (is to be done)
Basic functionality is fulfilled. Development continue.

