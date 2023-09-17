// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "plugaz" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand("demoline.extension", () => {
    // The code you place here will be executed every time your command is executed
    // Display a message box to the user

    const terminal = vscode.window.activeTerminal;

    const activeEditor = vscode.window.activeTextEditor;

    let lineText: string;
    if (activeEditor) {
      let lineNumber = activeEditor.selection.active.line;
      const line = activeEditor.document.lineAt(lineNumber);
      lineText = activeEditor.document.lineAt(lineNumber).text;

      const decorationType = vscode.window.createTextEditorDecorationType({
        borderWidth: "0 0 1px 0",
        borderStyle: "solid",
        borderColor: "green",
      });

      const decoration = {
        range: new vscode.Range(line.range.start, line.range.end),
      };

      activeEditor.setDecorations(decorationType, [decoration]);
      // vscode.commands.executeCommand(lineText);

      if (terminal) {
        terminal.sendText(lineText);
      } else {
        const newTerminal = vscode.window.createTerminal("new Terminal");
        newTerminal.show();
        newTerminal.sendText(lineText);
      }

      // popup
      if (true) {
        const diagonsticCollection =
          vscode.languages.createDiagnosticCollection("demoline.diagnostic");
        context.subscriptions.push(diagonsticCollection);

        const diagnostics = [];

        const diagnostic = new vscode.Diagnostic(
          new vscode.Range(
            new vscode.Position(5, 0),
            new vscode.Position(5, 10)
          ),
          "This is an error message",
          vscode.DiagnosticSeverity.Error
        );
        diagnostics.push(diagnostic);

        diagonsticCollection.set(
          vscode.window.activeTextEditor!.document.uri,
          diagnostics
        );

        vscode.window
          .showErrorMessage("There is an error", "Show detailes")
          .then((choice) => {
            if (choice === "show detailes".toString()) {
              // handle
            }
            if (choice === "There is an error".toString()) {
              // handle
            }
          });

        // popup context menu

        vscode.window.showInformationMessage("bla context");
      }

      // vscode.window.showInformationMessage('Hello World from plugaz!');

      // const currentDateAndTime = new Date().toISOString();

      // console.log(currentDateAndTime);
    }
  });



  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}