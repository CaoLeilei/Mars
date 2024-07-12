'use strict';

const marsAdmin = require('..');
const assert = require('assert').strict;

assert.strictEqual(marsAdmin(), 'Hello from marsAdmin');
console.info('marsAdmin tests passed');
