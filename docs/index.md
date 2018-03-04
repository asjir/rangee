<h2>Scenario 1 - Basic text highlight <button onclick="toggleVisibility('#scenario1')">toggle visibility</button></h2>
<img id="scenario1" src="https://i.imgur.com/B8DJZ9Q.gif" />
<h2>Scenario 2 - Text highlight over HTML elements <button onclick="toggleVisibility('#scenario2')">toggle visibility</button></h2>
<img id="scenario2" src="https://i.imgur.com/kNUN0ij.gif" />
<h2>Scenario 3 - Text highlight over HTML elements with highlight overlaps <button onclick="toggleVisibility('#scenario3')">toggle visibility</button></h2>
<img id="scenario3" src="https://i.imgur.com/NsBpAJV.gif" />
<div>
<h2>Example</h2>
    <div>
        <button id="save">Save selected range</button>
        <button id="load">Load selected range</button>
        <button id="reset">Reset HTML</button>
        <button id="clear">Clear range storage</button>
    </div>
    <div id="demo">
        <dl>
            <dt><dfn>Poterat autem inpune;</dfn></dt>
            <dd>Nam aliquando posse recte fieri dicunt nulla expectata nec quaesita voluptate.</dd>
            <dt><dfn>Reguli reiciendam;</dfn></dt>
            <dd>Maximus dolor, inquit, brevis est.</dd>
            <dt><dfn>Age sane, inquam.</dfn></dt>
            <dd>Habent enim et bene longam et satis litigiosam disputationem.</dd>
        </dl>
    
</div>
<script src="https://cdn.rawgit.com/LukasRada/rangee/master/dist/demo.js"></script>
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
