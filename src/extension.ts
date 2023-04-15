// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

function getAllTimezone() {
	const timezone: Record<string, string[]> = require('./timezone.json');
	
	const result: {label: string, value: string}[] = [];
	
	for (const k in timezone) {
		for (const country of timezone[k]) {
			result.push({
				label: `${country}: ${k}`,
				value: k
			});
		}
	}

	return result;
}

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('timezone.helper', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showQuickPick(getAllTimezone()).then(item => {
			if (item) {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
          const position = editor.selection.active;
          editor.edit((editBuilder) => {
            editBuilder.insert(position, item.value);
          });
        } else {
          vscode.window.showInformationMessage(item.value);
        }
			}
		});
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
