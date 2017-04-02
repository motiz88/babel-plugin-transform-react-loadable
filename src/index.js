/* @flow */

import type { NodePath, Scope } from 'babel-traverse';
import syntaxDynamicImport from 'babel-plugin-syntax-dynamic-import';

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
