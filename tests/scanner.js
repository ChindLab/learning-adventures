/**
 * scanner.js – Testwerkzeug: sucht Netzwerkzugriffe in ausgelieferten Dateien.
 *
 * Absichtlich außerhalb von js/, damit die geprüften Dateien den Scanner
 * nicht selbst enthalten. Die einzige erlaubte URL ist der SVG-Namespace.
 */
const PATTERNS = [
  { label: 'fetch', test: /\bfetch\s*\(/, },
  { label: 'xhr', test: /XMLHttpRequest/ },
  { label: 'websocket', test: /WebSocket/ },
  { label: 'dynamic-import', test: /\bimport\s*\(/ }
];

function scanSource(text) {
  const hits = [];
  for (const pattern of PATTERNS) {
    if (pattern.test.test(text)) { hits.push(pattern.label); }
  }
  const urls = text.match(/https?:\/\/[^\s"'<>)]+/g) || [];
  for (const url of urls) {
    if (url.indexOf('www.w3.org') === -1) { hits.push('external-url'); break; }
  }
  return hits;
}

module.exports = { scanSource };
