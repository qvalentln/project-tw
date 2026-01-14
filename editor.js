const root = document.documentElement;

// read current value using getComputedStyle
const currentKeywordColor =
    getComputedStyle(root).getPropertyValue("--keyword").trim();

//console.log("Current keyword color:", currentKeywordColor);

// generate a random color
const randomColor = `hsl(${Math.random() * 360}, 70%, 60%)`;

// write the new value back to the CSS variable
root.style.setProperty("--keyword", randomColor);


function saveFile() {
    const text = document.getElementById('editing').value;
    // create a blob of the data
    const blob = new Blob([text], { type: 'text/plain' });
    
    // create an invisible link to trigger the download
    const anchor = document.createElement('a');
    anchor.download = "code.cpp"; // you can change this extension
    anchor.href = window.URL.createObjectURL(blob);
    anchor.target = "_blank";
    anchor.style.display = "none"; 
    
    document.body.appendChild(anchor);
    anchor.click(); // trigger the download
    document.body.removeChild(anchor);
}


function insert(chars) {
    const textarea = document.getElementById('editing');
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const value = textarea.value;

    // insert the characters
    textarea.value = value.substring(0, start) + chars + value.substring(end);

    // move cursor to the middle if it's a pair (like {})
    let moveCursor = (chars.length > 1 && chars !== '    ') ? 1 : chars.length;
    textarea.selectionStart = textarea.selectionEnd = start + moveCursor;

    textarea.focus();
    update(); // call your existing update function to sync the highlighting
}




const editing = document.querySelector("#editing");
const highlighting = document.querySelector("#highlighting");
const gutter = document.querySelector("#gutter");
const lnShow = document.querySelector("#ln");
const colShow = document.querySelector("#col");


function update() {
    let text = editing.value;

    // sync scrolling
    highlighting.scrollTop = editing.scrollTop;
    highlighting.scrollLeft = editing.scrollLeft;
    gutter.scrollTop = editing.scrollTop;

    // syntax highlighting
    let html = text.replace(/&/g, "&amp;").replace(/</g, "&lt;");
    html = html.replace(/\/\/.*/g, '<span class="token-comment">$&</span>');
    html = html.replace(/\b(int|bool|return|if|for|while|void)\b/g, '<span class="token-keyword">$&</span>');
    html = html.replace(/\b(point|vector|std|string)\b/g, '<span class="token-type">$&</span>');
    html = html.replace(/\b[a-zA-Z_]\w*(?=\()/g, '<span class="token-func">$&</span>');
    
    highlighting.innerHTML = html + (text.endsWith("\n") ? "\n " : "");

    // line numbers
    const lineCount = text.split("\n").length;
    gutter.innerHTML = Array.from({length: lineCount}, (_, i) => i + 1).join("<br>");

    // position stats
    const pos = editing.selectionStart;
    const lines = text.substr(0, pos).split("\n");
    lnShow.innerText = lines.length;
    colShow.innerText = lines[lines.length - 1].length + 1;
}

// tab and pair logic
editing.addEventListener("keydown", (e) => {
    const start = editing.selectionStart;
    const end = editing.selectionEnd;
    if (e.key === "Tab") {
        e.preventDefault();
        editing.value = editing.value.substring(0, start) + "    " + editing.value.substring(end);
        editing.selectionStart = editing.selectionEnd = start + 4;
        update();
    }
    const pairs = {"{": "}", "(": ")", "[": "]", '"': '"', "'": "'"};
    if (pairs[e.key]) {
        e.preventDefault();
        editing.value = editing.value.substring(0, start) + e.key + pairs[e.key] + editing.value.substring(end);
        editing.selectionStart = editing.selectionEnd = start + 1;
        update();
    }
});

editing.addEventListener("input", update);
editing.addEventListener("scroll", update);
editing.addEventListener("click", update);


update();