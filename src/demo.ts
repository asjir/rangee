import Rangee from './Rangee';

const rangee = new Rangee({ document });
const storageRangeKey = "range";

const clonedExample = document.querySelector("#demo").cloneNode(true) as HTMLElement;

document.querySelector("#save").addEventListener("click", () => {
    const selection = document.getSelection();
    if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);

        if (range) {
            const rangeRepresentation = rangee.getEncodedRange(range);
            console.log(rangeRepresentation);
            sessionStorage.setItem(storageRangeKey, rangeRepresentation);
            document.getSelection().removeAllRanges();
        }
    }    
})

document.querySelector("#load").addEventListener("click", () => {
    const rangeRepresentation = sessionStorage.getItem(storageRangeKey);
    if (rangeRepresentation) {
        const ranges = rangee.getDecodedRanges(rangeRepresentation);

        ranges.forEach(range => {
            const highlight = document.createElement("mark")
            range.surroundContents(document.createElement("mark"));
        })
    }    
})

document.querySelector("#reset").addEventListener("click", () => {
    document.querySelector("#demo").innerHTML = clonedExample.innerHTML
})