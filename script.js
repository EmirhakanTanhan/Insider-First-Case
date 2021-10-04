//Declare editor variables
const htmlEditorAreaOut = document.querySelector('div.editor-area div._html');
const htmlEditorArea = htmlEditorAreaOut.querySelector('textarea#htmlEditor');
const cssEditorAreaOut = document.querySelector('div.editor-area div._css');
const cssEditorArea = cssEditorAreaOut.querySelector('textarea#cssEditor');
const jsEditorAreaOut = document.querySelector('div.editor-area div._js');
const jsEditorArea = jsEditorAreaOut.querySelector('textarea#javascriptEditor');

//Declare button variables
const runButton = document.querySelector('#runButton');
const minimizeButton = document.querySelector('#minimizeButton');

//Declare options for editors
const options = {
    lineNumbers: false,
    autoCloseTags: true,
    autoCloseBrackets: true,
    matchBrackets: true,
    gutters: ['CodeMirror-lint-markers'],
    lint: true,
    extraKeys: {
        "Ctrl-Space": "autocomplete",
    },
}

const htmlEditor = CodeMirror.fromTextArea(htmlEditorArea, {
    mode: 'xml',
    ...options
});

const cssEditor = CodeMirror.fromTextArea(cssEditorArea, {
    mode: 'css',
    ...options
});

const jsEditor = CodeMirror.fromTextArea(jsEditorArea, {
    mode: 'javascript',
    ...options
});

//Rendering history button with all saved templates
renderHistoryComponent();
//Initializing session autosave
initAutoSave();

//Render content when "Run" button is clicked
runButton.addEventListener('click', () => {
    renderContent(htmlEditor.getValue(), cssEditor.getValue(), jsEditor.getValue());
});

//Minimize and maximize editors when "Minimize" button is clicked
let minimized = 0;
minimizeButton.addEventListener('click', () => {
    minimized = minimize(minimized);
});

//Render content when "Ctrl + S" is clicked
document.addEventListener('keydown', e => {
    if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        renderContent(htmlEditor.getValue(), cssEditor.getValue(), jsEditor.getValue());
    }
});
