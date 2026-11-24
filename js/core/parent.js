/**
 * parent.js – Elternbereich: Rechenfrage, Fortschritt, Profile, Sicherung.
 *
 * Der Bereich ist absichtlich nur für Erwachsene erreichbar (kleines Zahnrad
 * + Rechenaufgabe) und bleibt nur für diese Sitzung offen.
 */
(function (root) {
  'use strict';
  var NS = root.BelaSchool = root.BelaSchool || {};
  var parent = {};

  var unlocked = false;
  var question = null;
  var entry = '';
  var message = '';
  var confirmReset = null;
  var importPreview = null;
  var importError = '';

  function newQuestion() {
    var a = 3 + Math.floor(Math.random() * 9);
    var b = 2 + Math.floor(Math.random() * 9);
    if (Math.random() < 0.4 && a > b) { return { text: a + ' − ' + b, answer: a - b }; }
    return { text: a + ' + ' + b, answer: a + b };
  }

  function minutes(ms) {
    return Math.round((ms || 0) / 60000) + NS.i18n.t(' Min.', ' min');
  }

  function duration(ms) {
    var total = Math.round((ms || 0) / 1000);
    if (total < 60) { return total + NS.i18n.t(' Sek.', ' sec'); }
    var rest = total % 60;
    return Math.floor(total / 60) + NS.i18n.t(' Min.', ' min') + (rest ? ' ' + rest + NS.i18n.t(' Sek.', ' sec') : '');
  }

  function countLessons() {
    var total = 0;
    NS.content.stages.forEach(function (stage) {
      total += stage.lessons.filter(function (lesson) {
        return !lesson.milestone && String(lesson.id).indexOf('-m') === -1;
      }).length;
    });
    return total;
  }

  function countDone(store) {
    var done = 0;
    var profile = store.profile();
    NS.content.stages.forEach(function (stage) {
      var record = profile.stages[String(stage.id)];
      if (!record) { return; }
      Object.keys(record.lessons || {}).forEach(function (id) {
        if (record.lessons[id].done) { done += 1; }
      });
    });
    return done;
  }

  parent.gate = function () {
    var ui = NS.ui;
    if (unlocked) { return parent.dashboard(); }

    var screen = ui.screen('gate-screen');
    if (!question) { question = newQuestion(); }

    var wrap = ui.el('div', { className: 'gate card' }, [
      ui.el('h1', { className: 'screen-title', text: NS.i18n.t('Für Erwachsene', 'For grown-ups') }),
      ui.el('p', { className: 'muted', text: NS.i18n.t('Bitte die Aufgabe lösen.', 'Please solve the task.') }),
      ui.el('div', { className: 'count-expression', text: question.text + ' = ?' }),
      ui.el('div', { className: 'count-expression', attrs: { 'aria-live': 'polite' }, text: entry || '_' })
    ]);

    if (message) {
      wrap.appendChild(ui.el('p', { className: 'feedback-line is-soft center', text: message }));
    }

    var pad = ui.el('div', { className: 'num-pad' });
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].forEach(function (digit) {
      pad.appendChild(ui.el('button', {
        className: 'btn soft',
        attrs: { type: 'button' },
        text: digit,
        on: { click: function () {
          if (entry.length < 3) { entry += digit; renderGate(); }
        } }
      }));
    });

    pad.appendChild(ui.el('button', {
      className: 'btn ghost',
      attrs: { type: 'button' },
      text: '⌫',
      on: { click: function () { entry = entry.slice(0, -1); renderGate(); } }
    }));
    pad.appendChild(ui.el('button', {
      className: 'btn',
      attrs: { type: 'button' },
      text: 'OK',
      on: { click: check }
    }));

    wrap.appendChild(pad);
    wrap.appendChild(ui.button(NS.i18n.t('Zurück zur Karte', 'Back to the map'), { variant: 'ghost', onClick: function () {
      entry = ''; message = '';
      NS.router.go('#/');
    } }));
    screen.appendChild(wrap);

    function check() {
      if (Number(entry) === question.answer) {
        unlocked = true;
        entry = '';
        message = '';
        NS.router.render();
      } else {
        message = NS.i18n.t('Das war nicht richtig. Versuch es noch einmal.', 'That was not right. Try again.');
        entry = '';
        question = newQuestion();
        NS.router.render();
      }
    }

    return screen;
  };

  function renderGate() {
    NS.router.render();
  }

  parent.dashboard = function () {
    var ui = NS.ui;
    var store = NS.store;
    var profile = store.profile();
    var screen = ui.screen('parent-screen');

    var head = ui.el('div', { className: 'row' }, [
      ui.el('h1', { className: 'screen-title', text: NS.i18n.t('Elternbereich', 'Parent area') }),
      ui.el('div', { className: 'spacer' }),
      ui.button(NS.i18n.t('Zur Karte', 'Back to the map'), { variant: 'soft', onClick: function () { NS.router.go('#/'); } })
    ]);
    screen.appendChild(head);

    /* --- Profile --- */
    var profiles = ui.el('div', { className: 'profile-chips' });
    store.listProfiles().forEach(function (item) {
      profiles.appendChild(ui.el('button', {
        className: 'chip' + (item.id === profile.id ? ' is-active' : ''),
        attrs: { type: 'button' },
        text: (item.name || item.id.toUpperCase()) + ' ★ ' + item.stars,
        on: { click: function () { store.setActiveProfile(item.id); NS.i18n.apply(); NS.router.render(); } }
      }));
    });
    screen.appendChild(ui.el('h2', { text: NS.i18n.t('Wer spielt?', 'Who is playing?') }));
    screen.appendChild(profiles);

    var addRow = ui.el('div', { className: 'row' });
    var nameInput = ui.el('input', {
      attrs: { type: 'text', placeholder: NS.i18n.t('Name des Kindes', "Child's name"), 'aria-label': NS.i18n.t('Name des Kindes', "Child's name"), maxlength: '20' },
      className: 'field',
      style: { fontSize: '20px', padding: '12px', borderRadius: '14px', border: '3px solid #D8D2C6', minWidth: '220px' }
    });
    addRow.appendChild(nameInput);
    addRow.appendChild(ui.button(NS.i18n.t('Kind hinzufügen', 'Add child'), { variant: 'soft', onClick: function () {
      store.addProfile(nameInput.value || '');
      NS.i18n.apply();
      NS.router.render();
    } }));
    addRow.appendChild(ui.button(NS.i18n.t('Umbenennen', 'Rename'), { variant: 'ghost', onClick: function () {
      store.renameProfile(profile.id, nameInput.value || profile.name);
      NS.router.render();
    } }));
    addRow.appendChild(ui.button(NS.i18n.t('Entfernen', 'Remove'), { variant: 'ghost', className: 'danger', onClick: function () {
      var result = store.removeProfile(profile.id);
      if (!result.ok) { message = NS.i18n.t('Das letzte Profil kann nicht entfernt werden.', 'The last profile cannot be removed.'); }
      NS.i18n.apply();
      NS.router.render();
    } }));
    screen.appendChild(addRow);
    if (message) {
      screen.appendChild(ui.el('p', { className: 'feedback-line is-soft', text: message }));
    }

    /* --- Überblick --- */
    var stats = ui.el('div', { className: 'stat-grid' }, [
      stat(profile.stars, NS.i18n.t('Sterne', 'Stars')),
      stat(countDone(store) + ' / ' + countLessons(), NS.i18n.t('Lektionen', 'Lessons')),
      stat(minutes(profile.stats.playMs), NS.i18n.t('Lernzeit', 'Learning time')),
      stat(String(profile.stats.sessions), NS.i18n.t('Sitzungen', 'Sessions'))
    ]);
    screen.appendChild(ui.el('h2', { text: NS.i18n.t('Überblick', 'Overview') }));
    screen.appendChild(stats);

    if (store.persistFailed) {
      screen.appendChild(ui.el('p', {
        className: 'feedback-line is-soft',
        text: NS.i18n.t('Fortschritt wird nicht gespeichert. Der Browser blockiert den Speicher.', 'Progress is not being saved. The browser is blocking storage.')
      }));
    }

    /* --- Stufen --- */
    screen.appendChild(ui.el('h2', { text: NS.i18n.t('Stufen', 'Stages') }));
    var stageBox = ui.el('div', { className: 'card' });
    NS.content.stages.forEach(function (stage) {
      var record = profile.stages[String(stage.id)] || { lessons: {}, milestone: { done: false } };
      var total = stage.lessons.length;
      var done = stage.lessons.filter(function (lesson) {
        return record.lessons[lesson.id] && record.lessons[lesson.id].done;
      }).length;
      var percent = total ? Math.round((done / total) * 100) : 0;

      stageBox.appendChild(ui.el('div', { className: 'stage-progress' }, [
        ui.el('div', { className: 'row' }, [
          ui.el('strong', { text: stage.id + '. ' + stage.title }),
          ui.el('span', { className: 'spacer' }),
          ui.el('span', { className: 'muted', text: done + ' / ' + total + ' ' + NS.i18n.t('Lektionen', 'lessons') })
        ]),
        ui.el('div', { className: 'bar' }, [ui.el('i', { style: { width: percent + '%' } })]),
        ui.el('div', { className: 'muted', style: { fontSize: '16px' }, text:
          (record.milestone && record.milestone.done
            ? NS.i18n.t('Stufe geschafft ✓', 'Stage complete ✓')
            : (done ? NS.i18n.t('angefangen', 'started') : NS.i18n.t('noch nicht begonnen', 'not started'))) })
      ]));

      var lessons = ui.el('div', { style: { margin: '4px 0 16px 18px' } });
      stage.lessons.forEach(function (lesson) {
        var lr = record.lessons[lesson.id];
        if (!lr) { return; }

        var detail = root.document.createElement('details');
        detail.className = 'lesson-detail';
        var summary = root.document.createElement('summary');
        summary.textContent = lesson.title + ' – ' + lr.correct + '/' + lr.attempts +
          ' richtig · ' + duration(lr.ms || 0);
        detail.appendChild(summary);

        var times = lr.times || {};
        var ids = Object.keys(times);
        if (!ids.length) {
          detail.appendChild(ui.el('div', {
            className: 'muted',
            style: { fontSize: '15px', marginLeft: '18px' },
            text: 'Noch keine Spielzeit erfasst.'
          }));
        } else {
          ids.forEach(function (id) {
            var activity = NS.content.activity(id);
            detail.appendChild(ui.el('div', {
              className: 'muted',
              style: { fontSize: '15px', marginLeft: '18px' },
              text: '• ' + (activity ? activity.title : id) + ' · ' + duration(times[id])
            }));
          });
        }

        lessons.appendChild(detail);
      });
      stageBox.appendChild(lessons);
    });
    screen.appendChild(stageBox);

    /* --- Übungsbedarf --- */
    var weak = store.weakAreas(3);
    screen.appendChild(ui.el('h2', { text: NS.i18n.t('Übungsbedarf', 'Needs practice') }));
    var weakBox = ui.el('div', { className: 'card' });
    if (!weak.length) {
      weakBox.appendChild(ui.el('p', { text: NS.i18n.t('Alles im grünen Bereich. Weiter so!', 'All good. Keep it up!') }));
    } else {
      weak.forEach(function (item) {
        var lesson = NS.content.findLesson(item.lesson);
        weakBox.appendChild(ui.el('p', { text:
          (lesson ? lesson.lesson.title : item.lesson) + ' – ' + Math.round(item.accuracy * 100) + NS.i18n.t(' % richtig', '% correct') }));
      });
    }
    screen.appendChild(weakBox);

    /* --- Einstellungen --- */
    screen.appendChild(ui.el('h2', { text: NS.i18n.t('Einstellungen', 'Settings') }));
    var settings = ui.el('div', { className: 'card' });
    var s = store.state().settings;

    var langRow = ui.el('div', { className: 'row', style: { marginBottom: '12px' } }, [
      ui.el('span', { text: NS.i18n.t('Sprache des Kindes', "Child's language") }),
      ui.el('span', { className: 'spacer' })
    ]);
    langRow.appendChild(ui.button('Deutsch', {
      variant: profile.language === 'de' ? 'soft' : 'ghost',
      onClick: function () {
        store.setLanguage('de');
        NS.i18n.apply();
        NS.router.render();
      }
    }));
    langRow.appendChild(ui.button('English', {
      variant: profile.language === 'en' ? 'soft' : 'ghost',
      onClick: function () {
        store.setLanguage('en');
        NS.i18n.apply();
        NS.router.render();
      }
    }));
    settings.appendChild(langRow);

    settings.appendChild(toggleRow(NS.i18n.t('Ton', 'Sound'), s.sound, function () {
      store.setSetting('sound', !store.state().settings.sound);
      NS.router.render();
    }));
    settings.appendChild(toggleRow(NS.i18n.t('Vorlesen', 'Read aloud'), s.speech, function () {
      store.setSetting('speech', !store.state().settings.speech);
      NS.speech.setEnabled(store.state().settings.speech && store.state().settings.sound);
      NS.router.render();
    }));
    settings.appendChild(toggleRow(NS.i18n.t('Reduzierte Bewegung', 'Reduced motion'), s.reducedMotion, function () {
      store.setSetting('reducedMotion', !store.state().settings.reducedMotion);
      applyReducedMotion();
      NS.router.render();
    }));

    // Stimme in der aktuellen Sprache des Kindes.
    var voiceRow = ui.el('div', { className: 'row', style: { marginBottom: '12px' } }, [
      ui.el('span', { text: NS.i18n.t('Stimme', 'Voice') }),
      ui.el('span', { className: 'spacer' })
    ]);
    var select = ui.el('select', {
      className: 'voice-select',
      attrs: { 'aria-label': NS.i18n.t('Stimme wählen', 'Choose voice') }
    });
    var voices = NS.speech.listVoices();
    if (!voices.length) {
      select.appendChild(ui.el('option', { text: NS.i18n.t('Keine Stimme gefunden', 'No voice found') }));
      select.disabled = true;
    } else {
      voices.forEach(function (candidate) {
        var option = root.document.createElement('option');
        option.value = candidate.voiceURI;
        option.textContent = candidate.name + ' (' + candidate.lang + ')';
        select.appendChild(option);
      });
      var current = NS.speech.currentVoice();
      select.value = s.voiceURI || (current && current.voiceURI) || voices[0].voiceURI;
    }
    select.addEventListener('change', function () {
      store.setSetting('voiceURI', select.value);
      NS.speech.setVoice(select.value);
      NS.speech.say(NS.i18n.t('Hallo! So klinge ich.', 'Hello! This is how I sound.'));
    });
    voiceRow.appendChild(select);
    voiceRow.appendChild(ui.button(NS.i18n.t('Anhören', 'Listen'), { variant: 'ghost', onClick: function () {
      NS.speech.setVoice(select.value);
      NS.speech.say(NS.i18n.t('Hallo! So klinge ich.', 'Hello! This is how I sound.'));
    } }));
    settings.appendChild(voiceRow);

    settings.appendChild(toggleRow(NS.i18n.t('Alle Stufen freischalten', 'Unlock all stages'), profile.unlockAll, function () {
      store.setUnlockAll(!profile.unlockAll);
      NS.router.render();
    }));
    screen.appendChild(settings);

    /* --- Zurücksetzen --- */
    screen.appendChild(ui.el('h2', { text: NS.i18n.t('Fortschritt zurücksetzen', 'Reset progress') }));
    var danger = ui.el('div', { className: 'danger-zone' });
    if (!confirmReset) {
      danger.appendChild(ui.el('p', { text: NS.i18n.t('Welchen Fortschritt möchtest du löschen?', 'Which progress do you want to delete?') }));
      danger.appendChild(ui.el('div', { className: 'row' }, [
        ui.button(NS.i18n.t('Dieses Kind', 'This child'), { variant: 'ghost', className: 'danger', onClick: function () {
          confirmReset = 'active'; NS.router.render();
        } }),
        ui.button(NS.i18n.t('Alle Kinder', 'All children'), { variant: 'ghost', className: 'danger', onClick: function () {
          confirmReset = 'all'; NS.router.render();
        } })
      ]));
    } else {
      danger.appendChild(ui.el('p', { text: confirmReset === 'all'
        ? NS.i18n.t('Wirklich den Fortschritt aller Kinder löschen?', "Really delete every child's progress?")
        : NS.i18n.t('Wirklich den Fortschritt von ' + (profile.name || 'diesem Kind') + ' löschen?',
                    'Really delete the progress of ' + (profile.name || 'this child') + '?') }));
      danger.appendChild(ui.el('div', { className: 'row' }, [
        ui.button(NS.i18n.t('Ja, löschen', 'Yes, delete'), { variant: 'ghost', className: 'danger', onClick: function () {
          if (confirmReset === 'all') { store.resetAll(); } else { store.resetActiveProfile(); }
          confirmReset = null;
          message = NS.i18n.t('Der Fortschritt wurde zurückgesetzt.', 'Progress has been reset.');
          NS.router.go('#/');
        } }),
        ui.button(NS.i18n.t('Abbrechen', 'Cancel'), { variant: 'soft', onClick: function () {
          confirmReset = null; NS.router.render();
        } })
      ]));
    }
    screen.appendChild(danger);

    /* --- Sicherung --- */
    screen.appendChild(ui.el('h2', { text: NS.i18n.t('Sicherung', 'Backup') }));
    var backup = ui.el('div', { className: 'card' });
    backup.appendChild(ui.el('p', { text: NS.i18n.t(
      'Der Fortschritt bleibt auf diesem Gerät. Eine Sicherungsdatei hilft beim Rechnerwechsel.',
      'Progress stays on this device. A backup file helps when changing computers.'
    ) }));
    backup.appendChild(ui.el('div', { className: 'row' }, [
      ui.button(NS.i18n.t('Fortschritt sichern', 'Save progress'), { variant: 'soft', onClick: download }),
      (function () {
        var label = ui.button(NS.i18n.t('Sicherung laden', 'Load backup'), { variant: 'ghost', onClick: function () { input.click(); } });
        var input = ui.el('input', {
          attrs: { type: 'file', accept: '.json,application/json' },
          style: { display: 'none' },
          on: { change: function () {
            var file = input.files && input.files[0];
            if (!file) { return; }
            file.text().then(function (text) {
              var parsed = null;
              try { parsed = JSON.parse(text); } catch (e) { parsed = null; }
              if (!parsed) {
                importError = NS.i18n.t('Das ist keine Bela-Sicherung.', 'This is not a Bela backup.');
                importPreview = null; NS.router.render(); return;
              }
              importPreview = { text: text, name: file.name, profiles: Object.keys(parsed.profiles || {}).length };
              importError = '';
              NS.router.render();
            });
          } }
        });
        var holder = ui.el('span', {}, [label, input]);
        return holder;
      })()
    ]));

    if (importError) {
      backup.appendChild(ui.el('p', { className: 'feedback-line is-soft', text: importError }));
    }
    if (importPreview) {
      backup.appendChild(ui.el('p', { text: NS.i18n.t(
        'Sicherung „' + importPreview.name + '" mit ' + importPreview.profiles + ' Kind(ern).',
        'Backup "' + importPreview.name + '" with ' + importPreview.profiles + ' child(ren).'
      ) }));
      backup.appendChild(ui.el('div', { className: 'row' }, [
        ui.button(NS.i18n.t('Diese Sicherung laden', 'Load this backup'), { onClick: function () {
          var result = store.importJSON(importPreview.text);
          importPreview = null;
          if (result.ok) { NS.i18n.apply(); NS.router.render(); }
          else { importError = NS.i18n.t('Das ist keine Bela-Sicherung.', 'This is not a Bela backup.'); NS.router.render(); }
        } }),
        ui.button(NS.i18n.t('Abbrechen', 'Cancel'), { variant: 'ghost', onClick: function () {
          importPreview = null; importError = ''; NS.router.render();
        } })
      ]));
    }
    screen.appendChild(backup);

    /* --- Über --- */
    screen.appendChild(ui.el('h2', { text: NS.i18n.t('Über diese App', 'About this app') }));
    screen.appendChild(ui.el('div', { className: 'card' }, [
      ui.el('p', { text: NS.i18n.t(
        'Bela Learning läuft vollständig offline. Es werden keine Daten an einen Server geschickt.',
        'Bobby\'s Computer School runs completely offline. No data is sent to a server.'
      ) }),
      ui.el('p', { text: NS.i18n.t(
        'Gespeichert werden nur Lernfortschritt und Einstellungen auf diesem Gerät.',
        'Only learning progress and settings are stored on this device.'
      ) }),
      ui.el('p', { className: 'muted', text: NS.i18n.t(
        'Version 1.0 · Keine Werbung · Keine externen Links',
        'Version 1.0 · No ads · No external links'
      ) })
    ]));

    return screen;

    function stat(value, label) {
      return ui.el('div', { className: 'stat' }, [
        ui.el('b', { text: String(value) }),
        ui.el('span', { text: label })
      ]);
    }

    function toggleRow(label, value, onToggle) {
      return ui.el('div', { className: 'row', style: { marginBottom: '12px' } }, [
        ui.el('span', { text: label }),
        ui.el('span', { className: 'spacer' }),
        ui.button(value ? NS.i18n.t('An', 'On') : NS.i18n.t('Aus', 'Off'), {
          variant: value ? 'soft' : 'ghost',
          onClick: onToggle
        })
      ]);
    }

    function download() {
      try {
        var blob = new Blob([store.exportJSON()], { type: 'application/json' });
        var link = root.document.createElement('a');
        link.href = root.URL.createObjectURL(blob);
        link.download = 'bela-fortschritt-' + new Date().toISOString().slice(0, 10) + '.json';
        root.document.body.appendChild(link);
        link.click();
        link.remove();
        root.setTimeout(function () { root.URL.revokeObjectURL(link.href); }, 1500);
      } catch (e) {
        importError = 'Die Sicherung konnte nicht erstellt werden.';
        NS.router.render();
      }
    }
  };

  function applyReducedMotion() {
    if (!NS.store) { return; }
    var reduce = NS.store.state().settings.reducedMotion;
    root.document.documentElement.classList.toggle('reduce-motion', !!reduce);
  }

  NS.parent = parent;
  NS.parent.applyReducedMotion = applyReducedMotion;
  if (typeof module !== 'undefined' && module.exports) { module.exports = parent; }
})(typeof globalThis !== 'undefined' ? globalThis : this);
