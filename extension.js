const vscode = require("vscode");
const path = require("upath");
const fs = require("fs-extra");

function activate(context) {
  let disposable = vscode.commands.registerCommand(
    "nowignore.add",
    async function(fileUri) {
      const rootPath = path.normalize(vscode.workspace.rootPath);
      //* Create .nowignore file at root level
      const ignoreFile = path.join(rootPath, "/.nowignore");
      await fs.ensureFile(ignoreFile);

      //* Clean resource name
      const selectedPath = path.normalize(fileUri.fsPath);
      const resolvedPath = path.join(
        "/",
        path.relative(rootPath, selectedPath)
      );

      //* Add selected resource
      await fs.appendFile(ignoreFile, resolvedPath + "\n");

      vscode.window.showInformationMessage(
        `Added ${resolvedPath} to .nowignore!`
      );
    }
  );

  context.subscriptions.push(disposable);
}
exports.activate = activate;

function deactivate() {}
exports.deactivate = deactivate;
