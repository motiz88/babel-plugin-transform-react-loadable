/* @flow */

import type { NodePath, Scope } from 'babel-traverse';
import syntaxDynamicImport from 'babel-plugin-syntax-dynamic-import';

function deepestScopeOf (path: NodePath, scopes: Scope[]): ?Scope {
  let scope = path.scope;
  do {
    if (scopes.indexOf(scope) !== -1) {
      return scope;
    }
  } while (scope = scope.parent); // eslint-disable-line no-cond-assign
}

type BabelVisitors = {
  [key: string]: (path: NodePath) => void
};

type BabelPlugin = {
  visitor?: BabelVisitors
};

export default function ({types: t, template}: {types: BabelTypes, template: BabelTemplate}): BabelPlugin {
  return {
    inherits: syntaxDynamicImport,
    visitor: {
      Function (path: NodePath) {
        
      }
    }
  };
}
