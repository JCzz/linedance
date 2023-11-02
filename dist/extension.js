/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("vscode");

/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.attachCleanLine = void 0;
const vscode = __webpack_require__(1);
function attachCleanLine(deco) {
    vscode.workspace.onDidChangeTextDocument(event => {
        const activeEditor = vscode.window.activeTextEditor;
        if (!activeEditor) {
            return;
        }
        const contentChange = event.contentChanges[0];
        if (contentChange.text === '\n') {
            let currentLine = activeEditor.selection.active.line;
            currentLine = currentLine + 1;
            let lineText = activeEditor.document.lineAt(currentLine).text;
            console.log(`Enter key pressed on line ${currentLine}, someVariable: ${lineText}`);
            const line = activeEditor.document.lineAt(currentLine);
            // const decoration = {
            // 	range: new vscode.Range(line.range.start, line.range.end),
            // };
            // HOWTO: remove decorator for the new line after return
            activeEditor.setDecorations(deco, []);
        }
    });
}
exports.attachCleanLine = attachCleanLine;


/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.setLine = void 0;
const vscode = __webpack_require__(1);
const lineMetadata = new Map();
function setLine(deco) {
    const terminal = vscode.window.activeTerminal;
    const activeEditor = vscode.window.activeTextEditor;
    let lineText;
    if (activeEditor) {
        let lineNumber = activeEditor.selection.active.line;
        lineNumber = lineNumber;
        const line = activeEditor.document.lineAt(lineNumber);
        lineText = activeEditor.document.lineAt(lineNumber).text;
        // decorationType2 = vscode.window.createTextEditorDecorationType({});
        const decoration = {
            range: new vscode.Range(line.range.start, line.range.end),
        };
        activeEditor.setDecorations(deco, [decoration]);
        // vscode.commands.executeCommand(lineText);
        // Store metadata for the decorated line using the line number as a key
        // lineMetadata.set(lineNumber, { customData: 'example metadata' }); // add any structure as metadata, could be multiple settings for this line.
        if (terminal) {
            terminal.sendText(lineText);
        }
        else {
            const newTerminal = vscode.window.createTerminal("new Terminal");
            newTerminal.show();
            newTerminal.sendText(lineText);
        }
    }
}
exports.setLine = setLine;


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.deactivate = exports.activate = void 0;
const vscode = __webpack_require__(1);
const deco = __webpack_require__(2);
const line = __webpack_require__(3);
let decorationType;
const lineMetadata = new Map();
function activate(context) {
    console.log('Congratulations, your extension "linedance" is now active!');
    let disposable = vscode.commands.registerCommand("appsyouwear.linedance", () => {
        decorationType = vscode.window.createTextEditorDecorationType({
            borderWidth: "0 0 1px 0",
            borderStyle: "solid",
            borderColor: "green",
        });
        deco.attachCleanLine(decorationType);
        line.setLine(decorationType);
        vscode.window.showInformationMessage('Hello World from linedance!');
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
function deactivate() {
    if (decorationType) {
        decorationType.dispose();
    }
}
exports.deactivate = deactivate;

})();

module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=extension.js.map