import * as vscode from 'vscode';

const lineMetadata = new Map();

export function setLine(deco: vscode.TextEditorDecorationType) {

    const terminal = vscode.window.activeTerminal;

    const activeEditor = vscode.window.activeTextEditor;

    let lineText: string;
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
        } else {
            const newTerminal = vscode.window.createTerminal("new Terminal");
            newTerminal.show();
            newTerminal.sendText(lineText);
        }
    }
}