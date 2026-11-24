/**
 * jsdemo.test.js – der simulierte JavaScript-Interpreter.
 */
const test = require('node:test');
const assert = require('node:assert');
const { parse, execute } = require('../js/engines/jsDemo.js');

function run(code, viz) {
  const parsed = parse(code);
  assert.strictEqual(parsed.ok, true, parsed.error);
  return execute(parsed.program, viz).events;
}

test('alert mit Text', () => {
  const events = run('alert("Hallo!");');
  assert.deepStrictEqual(events.map((e) => e.type), ['alert']);
  assert.strictEqual(events[0].value, 'Hallo!');
});

test('Variable merken und anzeigen', () => {
  const events = run('let myName = "Anna";\nalert(myName);');
  assert.strictEqual(events[0].type, 'var');
  assert.strictEqual(events[0].value, 'Anna');
  assert.strictEqual(events[1].value, 'Anna');
});

test('Zahl erzeugt drei Bilder', () => {
  const events = run('let apples = 3;', 'apples');
  const numbers = events.find((e) => e.type === 'numbers');
  assert.strictEqual(numbers.count, 3);
});

test('Rechnen ergibt fünf', () => {
  const events = run('let result = 2 + 3;', 'stars');
  const numbers = events.find((e) => e.type === 'numbers');
  assert.strictEqual(numbers.count, 5);
});

test('Funktion definieren und aufrufen', () => {
  const events = run('function sayHello() {\n alert("Hallo!");\n}\nsayHello();');
  assert.strictEqual(events.filter((e) => e.type === 'alert').length, 1);
  assert.strictEqual(events.filter((e) => e.type === 'call').length, 1);
});

test('unbekannter Code wird abgelehnt', () => {
  assert.strictEqual(parse('console.log(1)').ok, false);
  assert.strictEqual(parse('alert(1)').ok, false);
});

test('kein eval und kein Function im Quelltext', () => {
  const fs = require('node:fs');
  const path = require('node:path');
  const source = fs.readFileSync(path.join(__dirname, '..', 'js', 'engines', 'jsDemo.js'), 'utf8');
  assert.ok(!/\beval\s*\(/.test(source));
  assert.ok(!/new\s+Function\s*\(/.test(source));
});
