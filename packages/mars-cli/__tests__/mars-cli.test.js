'use strict';

const marsCli = require('..');
const assert = require('assert').strict;

assert.strictEqual(marsCli(), 'Hello from marsCli');
console.info('marsCli tests passed');
