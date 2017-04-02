import path from 'path';
import fs from 'fs';
import assert from 'assert';
import { transformFileSync } from 'babel-core';
import fixturesBabelConfig from '../fixtures-babel-config';

function normalize (str) {
  return str.replace(/\r\n?/g, '\n').trim();
}

describe('transform-react-loadable', () => {
  const fixturesDir = path.join(__dirname, '../fixtures');
  for (const caseName of fs.readdirSync(fixturesDir)) {
    if (caseName.startsWith('.')) {
      continue;
    }
    it(`should ${caseName.split('-').join(' ')}`, () => {
      const fixtureDir = path.join(fixturesDir, caseName);
      const actualPath = path.join(fixtureDir, 'actual.js');
      const optionsPath = path.join(fixtureDir, 'options.json');
      const options = fs.existsSync(optionsPath) ? JSON.parse(fs.readFileSync(optionsPath).toString()) : {};
      const actual = transformFileSync(actualPath, fixturesBabelConfig(options)).code;

      const expected = fs.readFileSync(
          path.join(fixtureDir, 'expected.js')
      ).toString();

      assert.equal(normalize(actual), normalize(expected));
    });
  }
});
