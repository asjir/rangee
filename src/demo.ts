import { Rangee }from './Rangee';

const rangee = new Rangee({ document });

const clonedExample = document.querySelector("#demo").cloneNode(true) as HTMLElement;

let rangeRepresentationStorage: Array<string> = [];

document.querySelector("#save").addEventListener("click", () => {
    const selection = document.getSelection();
    if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        if (range) {
            const rangeRepresentation = rangee.getEncodedRange(range);
            console.log(rangeRepresentation);
            rangeRepresentationStorage.push(rangeRepresentation);
            selection.removeAllRanges();
        }
    }    
})

document.querySelector("#load").addEventListener("click", () => {
    document.querySelector("#demo").innerHTML = clonedExample.innerHTML;

    rangeRepresentationStorage.forEach(rangeRepresentation => {
        const ranges = rangee.getDecodedRanges(rangeRepresentation);

        ranges.forEach(range => {
            const highlight = document.createElement("mark")
            range.surroundContents(highlight);
        })
    })     
})

document.querySelector("#reset").addEventListener("click", () => {
    document.querySelector("#demo").innerHTML = clonedExample.innerHTML
})

document.querySelector("#clear").addEventListener("click", () => {
    rangeRepresentationStorage = []
})