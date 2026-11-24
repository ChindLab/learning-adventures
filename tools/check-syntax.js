#!/usr/bin/env node
/**
 * check-syntax.js – parses every JavaScript file before tests run.
 *
 * Node's test runner only loads the files a test requires. A syntax error in
 * an engine that no test imports would otherwise slip through (that happened
 * once with parent.js). This walks the shipped and test code.
 */
'use strict';

const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');

const ROOT = path.join(__dirname, '..');
const ROOTS = ['js', 'tools', 'tests'];
const EXTRA_FILES = ['playwright.config.js'];

function walk(dir, files) {
  if (!fs.existsSync(dir)) { return files; }
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) { walk(full, files); }
    else if (entry.name.endsWith('.js')) { files.push(full); }
  }
  return files;
}

const files = [];
ROOTS.forEach((dir) => walk(path.join(ROOT, dir), files));
EXTRA_FILES.forEach((name) => {
  const full = path.join(ROOT, name);
  if (fs.existsSync(full)) { files.push(full); }
});

let failed = 0;
for (const file of files.sort()) {
  const result = spawnSync(process.execPath, ['--check', file], { encoding: 'utf8' });
  if (result.status !== 0) {
    failed += 1;
    console.error('Syntax error in ' + path.relative(ROOT, file));
    if (result.stderr) { console.error(result.stderr.trim()); }
  }
}

if (failed) {
  console.error(failed + ' file(s) failed the syntax check.');
  process.exit(1);
}

console.log('Syntax OK: ' + files.length + ' JavaScript files.');
