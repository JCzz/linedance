import * as vscode from 'vscode';
import * as deco from './deco/clear';
import * as line from './deco/line';

let decorationType: vscode.TextEditorDecorationType;
const lineMetadata = new Map();

export function activate(context: vscode.ExtensionContext) {

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

export function deactivate() {
	if (decorationType) {
		decorationType.dispose();
	  }
}
