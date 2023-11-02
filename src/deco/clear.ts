import * as vscode from 'vscode';

export function attachCleanLine(deco: vscode.TextEditorDecorationType) {
	vscode.workspace.onDidChangeTextDocument(event => {
		const activeEditor = vscode.window.activeTextEditor;
		if (!activeEditor) {return;}

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