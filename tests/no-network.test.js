/**
 * no-network.test.js – stellt sicher, dass die App niemals ins Netz greift.
 */
const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');
const { scanSource } = require('./scanner.js');

function walk(dir, out) {
  out = out || [];
  if (!fs.existsSync(dir)) { return out; }
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) { walk(full, out); } else { out.push(full); }
  }
  return out;
}

test('scanner findet fetch und absolute URLs', () => {
  assert.deepStrictEqual(scanSource('fetch("/x")'), ['fetch']);
  assert.deepStrictEqual(scanSource('const u = "https://beispiel.example/a.js"'), ['external-url']);
});

test('scanner akzeptiert harmlosen Text', () => {
  assert.deepStrictEqual(scanSource('Bobby sagt: Hallo, kleine Entdeckerin!'), []);
});

test('keine ausgelieferte Datei greift ins Netz', () => {
  const files = walk(path.join(__dirname, '..', 'js'))
    .filter((f) => f.endsWith('.js'))
    .concat([
      path.join(__dirname, '..', 'index.html'),
      path.join(__dirname, '..', 'selftest.html')
    ]);
  for (const file of files) {
    const findings = scanSource(fs.readFileSync(file, 'utf8'));
    assert.deepStrictEqual(findings, [], 'Netzwerkzugriff in ' + file);
  }
});
