define(["require", "exports", "./Rangee"], function (require, exports, Rangee_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const rangee = new Rangee_1.Rangee({ document });
    const clonedExample = document.querySelector("#demo").cloneNode(true);
    let rangeRepresentationStorage = [];
    document.querySelector("#save").addEventListener("click", () => {
        const selection = document.getSelection();
        if (selection && selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            if (range) {
                const rangeRepresentation = rangee.serializeAtomic(range);
                console.log(rangeRepresentation);
                rangeRepresentationStorage.push(rangeRepresentation);
                selection.removeAllRanges();
            }
        }
    });
    document.querySelector("#load").addEventListener("click", () => {
        document.querySelector("#demo").innerHTML = clonedExample.innerHTML;
        rangeRepresentationStorage.forEach(rangeRepresentation => {
            const ranges = rangee.deserilaizeAtomic(rangeRepresentation);
            ranges.reverse().forEach(range => {
                const highlight = document.createElement("mark");
                range.surroundContents(highlight);
            });
        });
    });
    document.querySelector("#reset").addEventListener("click", () => {
        document.querySelector("#demo").innerHTML = clonedExample.innerHTML;
    });
    document.querySelector("#clear").addEventListener("click", () => {
        rangeRepresentationStorage = [];
    });
});
