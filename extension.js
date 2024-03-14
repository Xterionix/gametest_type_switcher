const vscode = require('vscode');
const { exec } = require('child_process');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	let disposable1 = vscode.commands.registerCommand('gametest-types-switcher.server_stable', () => {

		showLoadingWindow(context.extensionPath + '\\bats\\stable.bat', '@minecraft/server 1.9.0');

	});

	let disposable2 = vscode.commands.registerCommand('gametest-types-switcher.server_beta', () => {

		showLoadingWindow(context.extensionPath + '\\bats\\beta.bat', '@minecraft/server 1.10.0-beta');

	});

	let disposable3 = vscode.commands.registerCommand('gametest-types-switcher.server_preview', () => {

		showLoadingWindow(context.extensionPath + '\\bats\\preview.bat', '@minecraft/server 1.11.0-beta');

	});

	context.subscriptions.push(disposable1, disposable2, disposable3);
}

function showLoadingWindow(path, title) {
	vscode.window.withProgress({
		location: vscode.ProgressLocation.Window,
		title: `Installing ${title}`,
		cancellable: false
	}, async () => {
		return new Promise(async (resolve) => {
			exec(`"${path}"`, (error, stdout, stderr) => {
				if (error) {
					vscode.window.showErrorMessage(`Error installing ${title}: ${error.message}`);
					resolve();
					return;
				}
				vscode.window.showInformationMessage(`Successfully installed ${title}!`);
				resolve();
			});
		});
	});
}


function deactivate() { }

module.exports = {
	activate,
	deactivate
}