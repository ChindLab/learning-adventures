#!/usr/bin/env node
/**
 * setup.js – first-run wizard for child profiles.
 *
 * Writes bela.config.json, then regenerates js/config/seed.js.
 * The seed is used only when the browser has no saved progress yet.
 */
'use strict';

const fs = require('node:fs');
const path = require('node:path');
const readline = require('node:readline/promises');
const { spawn } = require('node:child_process');
const { buildSeed } = require('./build-seed.js');

const ROOT = path.join(__dirname, '..');
const CONFIG = path.join(ROOT, 'bela.config.json');
const MAX_CHILDREN = 8;

function emptyConfig() {
  return {
    version: 1,
    activeProfile: 'p1',
    settings: { sound: true, speech: true, effects: true, reducedMotion: false },
    profiles: [{ id: 'p1', name: '', language: 'en-GB', unlockAll: false }]
  };
}

function writeConfig(children, activeIndex) {
  const config = {
    version: 1,
    activeProfile: 'p' + (activeIndex + 1),
    settings: { sound: true, speech: true, effects: true, reducedMotion: false },
    profiles: children.map((child, index) => ({
      id: 'p' + (index + 1),
      name: child.name,
      language: child.language,
      unlockAll: child.unlockAll
    }))
  };
  fs.writeFileSync(CONFIG, JSON.stringify(config, null, 2) + '\n');
  return config;
}

function normaliseLanguage(value) {
  const lower = String(value || '').trim().toLowerCase();
  const aliases = {
    en: 'en-GB', 'en-gb': 'en-GB', english: 'en-GB',
    de: 'de-DE', 'de-de': 'de-DE', deutsch: 'de-DE', german: 'de-DE',
    'de-ch': 'de-CH', gsw: 'de-CH', 'swiss german': 'de-CH',
    schwiizerdütsch: 'de-CH', schwiizerduetsch: 'de-CH',
    fr: 'fr-FR', 'fr-fr': 'fr-FR', français: 'fr-FR', francais: 'fr-FR', french: 'fr-FR',
    it: 'it-IT', 'it-it': 'it-IT', italiano: 'it-IT', italian: 'it-IT',
    zh: 'zh-CN', 'zh-cn': 'zh-CN', '中文': 'zh-CN', chinese: 'zh-CN',
    hi: 'hi-IN', 'hi-in': 'hi-IN', hindi: 'hi-IN', 'हिन्दी': 'hi-IN', 'हिंदी': 'hi-IN',
    ne: 'ne-NP', 'ne-np': 'ne-NP', nepali: 'ne-NP', 'नेपाली': 'ne-NP'
  };
  return aliases[lower] || 'en-GB';
}

async function yesNo(rl, question, defaultYes) {
  const suffix = defaultYes ? ' [Y/n] ' : ' [y/N] ';
  const answer = (await rl.question(question + suffix)).trim().toLowerCase();
  if (!answer) { return defaultYes; }
  return answer === 'y' || answer === 'yes' || answer === 'j' || answer === 'ja';
}

async function wizard() {
  if (!process.stdin.isTTY) {
    throw new Error('Interactive setup needs a terminal. Run ./setup.sh from a terminal.');
  }

  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  try {
    console.log('');
    console.log("Bela Learning — first-run setup");
    console.log('This writes bela.config.json and js/config/seed.js.');
    console.log('The seed is used only when the browser has no saved progress yet.');
    console.log('');

    const countAnswer = (await rl.question('How many children? (1–8) [1]: ')).trim();
    let count = parseInt(countAnswer || '1', 10);
    if (!Number.isFinite(count) || count < 1) { count = 1; }
    if (count > MAX_CHILDREN) { count = MAX_CHILDREN; }

    const children = [];
    for (let index = 0; index < count; index += 1) {
      const name = (await rl.question('Name of child ' + (index + 1) + ' (optional): ')).trim().slice(0, 20);
      const language = normaliseLanguage(await rl.question('Language en-GB/de-DE/de-CH/fr-FR/it-IT/zh-CN/hi-IN/ne-NP [en-GB]: '));
      const unlockAll = await yesNo(rl, 'Unlock all stages for this child?', false);
      children.push({ name, language, unlockAll });
    }

    let activeIndex = 1;
    if (children.length > 1) {
      const answer = (await rl.question('Which child starts? (1–' + children.length + ') [1]: ')).trim();
      const parsed = parseInt(answer || '1', 10);
      if (Number.isFinite(parsed) && parsed >= 1 && parsed <= children.length) { activeIndex = parsed; }
    }

    writeConfig(children, activeIndex - 1);
    const result = buildSeed();

    console.log('');
    console.log('Saved ' + children.length + ' child profile(s) to bela.config.json.');
    console.log('Generated ' + path.relative(ROOT, result.target) + '.');
    console.log('');
    children.forEach((child, index) => {
      console.log('  ' + (index + 1) + '. ' + (child.name || '(no name)') +
        ' — ' + child.language + (child.unlockAll ? ' — all stages unlocked' : ''));
    });
    console.log('');
    console.log('Next: open index.html.');
    console.log('If this browser already has Bela progress, the seed is ignored.');
    console.log('To apply it: parent area → reset progress, or clear this site\'s data.');

    const shouldOpen = await yesNo(rl, 'Open index.html now?', true);
    if (shouldOpen) { openApp(); }
  } finally {
    rl.close();
  }
}

function openApp() {
  const file = path.join(ROOT, 'index.html');
  const platform = process.platform;
  let command;
  let args;
  if (platform === 'darwin') { command = 'open'; args = [file]; }
  else if (platform === 'win32') { command = 'cmd'; args = ['/c', 'start', '', file]; }
  else { command = 'xdg-open'; args = [file]; }
  try {
    const child = spawn(command, args, { detached: true, stdio: 'ignore' });
    child.unref();
  } catch (error) {
    console.log('Could not open a browser automatically. Open index.html yourself.');
  }
}

function help() {
  console.log([
    "Bela Learning — setup",
    '',
    'Usage:',
    '  ./setup.sh            interactive first-run setup',
    '  ./setup.sh --reset    reset config to one unnamed child',
    '  ./setup.sh --help     this text',
    '',
    'Advanced: edit bela.config.json, then run:',
    '  npm run seed',
    '',
    'The seed is used only on the first run, when the browser has no saved progress.'
  ].join('\n'));
}

async function main() {
  const args = process.argv.slice(2);
  if (args.includes('--help') || args.includes('-h')) { help(); return; }
  if (args.includes('--reset')) {
    fs.writeFileSync(CONFIG, JSON.stringify(emptyConfig(), null, 2) + '\n');
    buildSeed();
    console.log('Reset bela.config.json to one unnamed child and regenerated the seed.');
    console.log('Existing browser progress is not touched. Use the parent area to reset it.');
    return;
  }
  await wizard();
}

main().catch((error) => {
  console.error('Setup failed: ' + error.message);
  process.exit(1);
});
