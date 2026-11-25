/**
 * selftest.js – Entwicklungswerkzeug, nicht für Kinder.
 *
 * Spielt jede Aktivität automatisch durch: zuerst auf Englisch (Quelle), dann
 * auf Deutsch (Übersetzung). Zusätzlich werden alle Bildschirme gebaut.
 */
(function (root) {
  'use strict';
  var NS = root.BelaSchool = root.BelaSchool || {};

  function memoryStorage() {
    var map = {};
    return {
      getItem: function (k) { return Object.prototype.hasOwnProperty.call(map, k) ? map[k] : null; },
      setItem: function (k, v) { map[k] = String(v); },
      removeItem: function (k) { delete map[k]; }
    };
  }

  function fakeApi(record) {
    return {
      speak: function () {},
      sfx: function () {},
      hint: function () {},
      art: function (name, size) { return NS.icons.get(name, size); },
      progress: function () { return { correct: 0, attempts: 0 }; },
      complete: function (result) { record.push(result); }
    };
  }

  function makeRow(id, type, state, reason) {
    var tr = root.document.createElement('tr');
    [id, type, state, reason || ''].forEach(function (text) {
      var td = root.document.createElement('td');
      td.textContent = text;
      tr.appendChild(td);
    });
    tr.className = state === 'ok' ? 'row-ok' : 'row-fail';
    return tr;
  }

  async function runAll() {
    var table = root.document.getElementById('results');
    var summary = root.document.getElementById('summary');
    var failuresList = root.document.getElementById('failures');
    var total = 0;
    var passed = 0;
    var host = root.document.getElementById('host');

    NS.ui.setFast(true);
    NS.speech.setEnabled(false);
    var store = NS.progress.createStore(memoryStorage(), {});
    NS.store = store;

    var validation = NS.content.validate(NS.content.stages);
    if (!validation.ok) {
      validation.errors.forEach(function (error) {
        failuresList.appendChild(uiItem('content', 'validate', error));
      });
      total += validation.errors.length;
    }

    async function runActivity(activity, languageTag) {
      total += 1;
      var record = [];
      var container = root.document.createElement('div');
      container.style.position = 'absolute';
      container.style.left = '-9999px';
      container.style.width = '900px';
      host.appendChild(container);

      var handle = null;
      var reason = '';
      try {
        var engine = NS.engines[activity.type];
        if (!engine) { throw new Error('engine-missing'); }
        handle = engine.mount(container, activity, fakeApi(record));
        if (!container.querySelector('button, input, [tabindex]')) { throw new Error('no-controls'); }
        if (!handle || !handle.solveForTest) { throw new Error('no-solver'); }
        await handle.solveForTest(container);
        await NS.ui.wait(80);

        if (record.length !== 1) { throw new Error('completions=' + record.length); }
        if (record[0] && record[0].stars !== 1) { throw new Error('stars=' + record[0].stars); }
        if (handle.destroy) { handle.destroy(); handle.destroy(); }
        passed += 1;
      } catch (error) {
        reason = error && error.message ? error.message : String(error);
        failuresList.appendChild(uiItem(activity.id + ' [' + languageTag + ']', activity.type, reason));
        try { if (handle && handle.destroy) { handle.destroy(); } } catch (e) { /* egal */ }
      }
      container.remove();
      table.appendChild(makeRow(activity.id + ' [' + languageTag + ']', activity.type, reason ? 'fehlt' : 'ok', reason));
    }

    function uiItem(id, type, reason) {
      var item = root.document.createElement('li');
      item.textContent = id + ' (' + type + '): ' + reason;
      return item;
    }

    function eachActivity(stageIds, languageTag) {
      var chain = Promise.resolve();
      NS.content.stages.forEach(function (stage) {
        if (stageIds && stageIds.indexOf(stage.id) === -1) { return; }
        stage.lessons.forEach(function (lesson) {
          lesson.activities.forEach(function (activity) {
            chain = chain.then(function () { return runActivity(activity, languageTag); });
          });
        });
      });
      return chain;
    }

    // 1. English is the source.
    store.setLanguage('en-GB');
    NS.content.applyLanguage('en-GB');
    await eachActivity(null, 'en-GB');

    // 2. Every translation overlay (German, French, Italian, Chinese).
    var translations = NS.content.translations || {};
    var codes = Object.keys(translations).filter(function (code) { return code !== 'en-GB'; });
    for (var i = 0; i < codes.length; i += 1) {
      var code = codes[i];
      var stagesForLanguage = Object.keys(translations[code].stages).map(Number);
      store.setLanguage(code);
      NS.content.applyLanguage(code);
      await eachActivity(stagesForLanguage, code);
    }
    store.setLanguage('en-GB');
    NS.content.applyLanguage('en-GB');

    // 3. Bildschirme bauen.
    var screens = [
      ['menu', function () { return NS.navigation.menu(); }],
      ['stage-1', function () { return NS.navigation.stage(1); }],
      ['achievements', function () { return NS.navigation.achievements(); }],
      ['parent-gate', function () { return NS.parent.gate(); }],
      ['lesson-1-1', function () { return NS.lesson.run('1-1').node; }]
    ];
    screens.forEach(function (entry) {
      total += 1;
      try {
        var screen = entry[1]();
        if (!screen || !screen.querySelector('button')) { throw new Error('empty-screen'); }
        passed += 1;
        table.appendChild(makeRow('screen:' + entry[0], 'screen', 'ok', ''));
      } catch (error) {
        failuresList.appendChild(uiItem('screen:' + entry[0], 'screen', String(error.message || error)));
        table.appendChild(makeRow('screen:' + entry[0], 'screen', 'fehlt', String(error.message || error)));
      }
    });

    var allOk = passed === total;
    summary.textContent = (allOk ? 'Alles gut – ' : 'Achtung – ') + 'Gesamt: ' + passed + '/' + total + ' ok';
    summary.className = allOk ? 'summary-ok' : 'summary-fail';
    return { total: total, passed: passed, failures: failuresList.children.length };
  }

  root.selftest = { runAll: runAll };
  root.addEventListener('load', function () { runAll(); });
})(typeof globalThis !== 'undefined' ? globalThis : this);
