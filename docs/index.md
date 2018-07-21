<h1>Scenarios</h1>
<div>
    <button onclick="toggleVisibility('#scenario1')">Scenario 1 - Basic text highlight</button>
    <img id="scenario1" style="display: none" src="https://i.imgur.com/B8DJZ9Q.gif" />
</div>
<div>
    <button onclick="toggleVisibility('#scenario2')">Scenario 2 - Text highlight over HTML elements</button>
    <img id="scenario2" style="display: none" src="https://i.imgur.com/kNUN0ij.gif" />
</div>
<div>
    <button onclick="toggleVisibility('#scenario3')">Scenario 3 - Text highlight over HTML elements with highlight overlaps</button>
    <img id="scenario3" style="display: none" src="https://i.imgur.com/NsBpAJV.gif" />
</div>
<div>
<h1>Example</h1>
    <div>
        <button id="save">Save selected range</button>
        <button id="load">Load selected range</button>
        <button id="reset">Reset HTML</button>
        <button id="clear">Clear range storage</button>
    </div>
    <div id="demo">
        <h2>Tum Quintus: Est plane, Piso, ut dicis, inquit.</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. At eum nihili facit; Quae quo sunt excelsiores, eo dant clariora indicia naturae. Quis enim redargueret? <b>Quia nec honesto quic quam honestius nec turpi turpius.</b> </p>
        <ol>
            <li>Sed tamen enitar et, si minus multa mihi occurrent, non fugiam ista popularia.</li>
            <li>Quid ergo dubitamus, quin, si non dolere voluptas sit summa, non esse in voluptate dolor sit maximus?</li>
            <li>Ita enim vivunt quidam, ut eorum vita refellatur oratio.</li>
            <li>Cum autem venissemus in Academiae non sine causa nobilitata spatia, solitudo erat ea, quam volueramus.</li>
            <li>De illis, cum volemus.</li>
            <li>Quae cum praeponunt, ut sit aliqua rerum selectio, naturam videntur sequi;</li>
        </ol>

        <ul>
            <li>Re mihi non aeque satisfacit, et quidem locis pluribus.</li>
            <li>Itaque dicunt nec dubitant: mihi sic usus est, tibi ut opus est facto, fac.</li>
            <li>Si sapiens, ne tum quidem miser, cum ab Oroete, praetore Darei, in crucem actus est.</li>
            <li>Ita fit ut, quanta differentia est in principiis naturalibus, tanta sit in finibus bonorum malorumque dissimilitudo.</li>
            <li>At ille non pertimuit saneque fidenter: Istis quidem ipsis verbis, inquit;</li>
            <li>Neque enim disputari sine reprehensione nec cum iracundia aut pertinacia recte disputari potest.</li>
        </ul>

        <h3>Stulti autem malorum memoria torquentur, sapientes bona praeterita grata recordatione renovata delectant.</h3>
        <p>Hos contra singulos dici est melius. <b>Tum Triarius: Posthac quidem, inquit, audacius.</b> Omnia peccata paria dicitis. Quamquam ab iis philosophiam et omnes ingenuas disciplinas habemus; Vitiosum est enim in dividendo partem in genere numerare. Quid ait Aristoteles reliquique Platonis alumni? </p>
        <blockquote cite="http://loripsum.net">
            Quin etiam ferae, inquit Pacuvius, quíbus abest, ad praécavendum intéllegendi astútia, iniecto terrore mortis horrescunt.
        </blockquote>

        <h2>Duo Reges: constructio interrete.</h2>
        <p>Quare conare, quaeso. <b>Qualem igitur hominem natura inchoavit?</b> Quam ob rem tandem, inquit, non satisfacit? Summum ením bonum exposuit vacuitatem doloris; <b>Haec para/doca illi, nos admirabilia dicamus.</b> </p>
<pre>Ex ea quae sint apta, ea bonesta, ea pulchra, ea laudabilia,
illa autem superiora naturale nominantur, quae coniuncta cum
honestis vitam beatam perficiunt et absolvunt.

Istam voluptatem, inquit, Epicurus ignorat?
</pre>

        <dl>
            <dt><dfn>Poterat autem inpune;</dfn></dt>
            <dd>Nam aliquando posse recte fieri dicunt nulla expectata nec quaesita voluptate.</dd>
            <dt><dfn>Reguli reiciendam;</dfn></dt>
            <dd>Maximus dolor, inquit, brevis est.</dd>
            <dt><dfn>Age sane, inquam.</dfn></dt>
            <dd>Habent enim et bene longam et satis litigiosam disputationem.</dd>
        </dl>


    </div>
    <script>
    var require = {
        paths: {
            "pako": "https://cdnjs.cloudflare.com/ajax/libs/pako/1.0.6/pako.min"    
        }
    }
    </script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/require.js/2.3.5/require.min.js"></script>
    <script>
        require(['require', 'https://rawgit.com/LukasRada/rangee/master/build/index.js'], function (require, Rangee) {
            const rangee = new Rangee.Rangee({ document });

            const clonedExample = document.querySelector("#demo").cloneNode(true);

            let rangeRepresentationStorage = [];

            document.querySelector("#save").addEventListener("click", function() {
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
            })

            document.querySelector("#load").addEventListener("click", function() {
                document.querySelector("#demo").innerHTML = clonedExample.innerHTML;

                rangeRepresentationStorage.forEach(function(rangeRepresentation) {
                    const ranges = rangee.deserilaizeAtomic(rangeRepresentation);

                    ranges.reverse().forEach(function(range) {
                        const highlight = document.createElement("mark")
                        range.surroundContents(highlight);
                    })
                })     
            })

            document.querySelector("#reset").addEventListener("click", function() {
                document.querySelector("#demo").innerHTML = clonedExample.innerHTML
            })

            document.querySelector("#clear").addEventListener("click", function() {
                rangeRepresentationStorage = []
            })
        });        
    </script> 
<script>
function toggleVisibility(selector) {
    var element = document.querySelector(selector);    
    if (element.style.display === "none") {
        element.style.display = "block";
    } else {
        element.style.display = "none";
    }
}
</script>
</div>
