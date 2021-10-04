//Saving template and updating localStorage
const saveEditor = () => {
    const title = document.querySelector('#editor-title').value;
    const htmlEditorToSave = htmlEditor.getValue();
    const cssEditorToSave = cssEditor.getValue();
    const jsEditorToSave = jsEditor.getValue();

    const getItems = JSON.parse(localStorage.getItem('InsiderCase'));

    const storage = {
        [title]: {
            'date': new Date().getTime(),
            'html': htmlEditorToSave,
            'css': cssEditorToSave,
            'js': jsEditorToSave,
        },
        ...getItems
    };

    localStorage.setItem('InsiderCase', JSON.stringify(storage));
    renderHistoryComponent();
}

//Render history dropdown button
const renderHistoryComponent = () => {
    const root = document.querySelector('.history');

    const historyItems = JSON.parse(localStorage.getItem('InsiderCase'));
    const historyItemsArr = [];
    for (const historyItem in historyItems) {
        historyItemsArr.push(historyItem);
    }
    root.innerHTML = `
        <button type="button" class="btn btn-warning dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">History</button>
            <ul class="dropdown-menu">
                ${historyItemsArr.map((item) => {
        return `
                    <li><button type="button" onclick="renderSelectedHistory('${item}')" class="dropdown-item">${item}</></li>
                    `
    }).join('')}
            </ul>
    `;
}

//Render the selected template into the all 3 editors
const renderSelectedHistory = (key) => {
    let storage = localStorage.getItem('InsiderCase');
    const selectedEditor = JSON.parse(storage)[key];

    renderContent(selectedEditor.html, selectedEditor.css, selectedEditor.js);
}

//Render content
const renderContent = (_html_, _css_, _js_) => {
    const content = _html_ +
        "<style>" + _css_ + "</style>" +
        "<script>" + _js_ + "</script>";

    htmlEditor.setValue(_html_);
    cssEditor.setValue(_css_);
    jsEditor.setValue(_js_);

    const contentArea = document.querySelector('div.content iframe#content-area');
    let renderContent = contentArea.contentWindow.document;

    renderContent.open();
    renderContent.write(content);
    renderContent.close();
}

//Saving template into the sessionStorage
const initAutoSave = () => {
    if (sessionStorage.getItem("autoSaveHtmlEditor")) htmlEditor.setValue(sessionStorage.getItem("autoSaveHtmlEditor"));
    if (sessionStorage.getItem("autoSaveCssEditor")) cssEditor.setValue(sessionStorage.getItem("autoSaveCssEditor"));
    if (sessionStorage.getItem("autoSaveJsEditor")) jsEditor.setValue(sessionStorage.getItem("autoSaveJsEditor"));

    CodeMirror.on(htmlEditor, 'change', () => {
        sessionStorage.setItem("autoSaveHtmlEditor", htmlEditor.getValue());
    });
    CodeMirror.on(cssEditor, 'change', () => {
        sessionStorage.setItem("autoSaveCssEditor", cssEditor.getValue());
    });
    CodeMirror.on(jsEditor, 'change', () => {
        sessionStorage.setItem("autoSaveJsEditor", jsEditor.getValue());
    });
}

//Minimize and maximize editors
const minimize = (check) => {
    let height;
    if (check === 0) height = 100;
    if (check === 1) height = 300;

    htmlEditor.setSize(null, height);
    cssEditor.setSize(null, height);
    jsEditor.setSize(null, height);
    return check ? 0 : 1;
}