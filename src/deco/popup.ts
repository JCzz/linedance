import * as vscode from 'vscode';

// popup
function popup(context: vscode.ExtensionContext) {

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