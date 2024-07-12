'use strict';

const marsServer = require('..');
const assert = require('assert').strict;

assert.strictEqual(marsServer(), 'Hello from marsServer');
console.info('marsServer tests passed');
