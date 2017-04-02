/* @flow */

import type { NodePath, Scope } from "babel-traverse";
import syntaxDynamicImport from "babel-plugin-syntax-dynamic-import";

type BabelVisitors = {
  [key: string]: (path: NodePath) => void
};

type BabelPlugin = {
  visitor?: BabelVisitors
};

function isObjectPropertyWithName (path: NodePath, name: string): boolean {
  if (!path.isObjectProperty()) {
    return false;
  }
  if (!path.node.computed) {
    return path.node.key.name === name || path.node.key.value === name;
  }
  const keyEval = path.get("key").evaluate();
  return keyEval.confident && keyEval.value === name;
}

function hasPropertyWithName (path: NodePath, key: string): boolean {
  return path
    .get('properties')
    .some(prop => isObjectPropertyWithName(prop, key));
}

export default function (
  { types: t, template }: { types: BabelTypes, template: BabelTemplate }
): BabelPlugin {
  const webpackTemplate = template(
    `
    () => require.resolveWeak(MODULE)
  `
  );
  const serverTemplate = template(
    `
    PATH.join(__dirname, MODULE)
  `
  );

  return {
    inherits: syntaxDynamicImport,
    visitor: {
      Import(path) {
        const options = {
          server: true,
          webpack: false,
          ...this.opts
        };
        if (!options.server && !options.webpack) {
          return;
        }
        const importCall: NodePath = path.parentPath;
        if (!importCall.isCallExpression() || path.parentKey !== "callee") {
          return;
        }
        const importArgs: ?Array<NodePath> = importCall.get("arguments");
        if (!Array.isArray(importArgs) || importArgs.length !== 1) {
          return;
        }
        const importString = importArgs[0].evaluate();
        if (!importString.confident) {
          return;
        }
        const importCallContainer = importCall.parentPath;
        if (
          !importCallContainer.isArrowFunctionExpression() ||
          !importCallContainer.node.expression ||
          importCall.parentKey !== "body"
        ) {
          return;
        }
        const loaderProp = importCallContainer.parentPath;
        if (
          !isObjectPropertyWithName(loaderProp, "loader") ||
          importCallContainer.parentKey !== "value"
        ) {
          return;
        }
        const loadableConfig = loaderProp.parentPath;
        if (
          !loadableConfig.isObjectExpression() ||
          loaderProp.parentKey !== "properties"
        ) {
          return;
        }
        const loadableCall = loadableConfig.parentPath;
        if (
          !loadableCall.isCallExpression() ||
          loadableConfig.parentKey !== "arguments" ||
          loadableConfig.key !== 0 ||
          loadableCall.node.arguments.length !== 1
        ) {
          return;
        }
        const loadableIdentifier = loadableCall.get("callee");
        const loadableBinding = loadableIdentifier.scope.getBinding(
          loadableIdentifier.node.name
        );
        if (!loadableBinding) {
          return;
        }
        const loadableImportSpecifier = loadableBinding.path;
        const loadableImportDeclaration = loadableImportSpecifier.parentPath;
        if (
          !loadableImportSpecifier.isImportDefaultSpecifier() ||
          !loadableImportDeclaration.isImportDeclaration()
        ) {
          return;
        }
        const loadableSource = loadableImportDeclaration
          .get("source")
          .evaluate();
        if (
          !loadableSource.confident || loadableSource.value !== "react-loadable"
        ) {
          return;
        }

        if (
          options.webpack &&
          !hasPropertyWithName(loadableConfig, 'webpackRequireWeakId')
        ) {
          const prop = t.objectProperty(
            t.identifier('webpackRequireWeakId'),
            webpackTemplate({
              MODULE: t.stringLiteral(importString.value)
            }).expression
          );
          loaderProp.insertAfter(prop);
        }
        if (
          options.server &&
          !hasPropertyWithName(loadableConfig, 'serverSideRequirePath')
        ) {
          const prop = t.objectProperty(
            t.identifier('serverSideRequirePath'),
            serverTemplate({
              MODULE: t.stringLiteral(importString.value),
              PATH: this.addImport('path', 'default', 'path')
            }).expression
          );
          loaderProp.insertAfter(prop);
        }
      }
    }
  };
}
