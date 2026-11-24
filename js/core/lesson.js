/**
 * lesson.js – führt durch eine Lektion: Willkommen, Aufgaben, Feier.
 *
 * Der `api`-Vertrag ist für alle Spiele gleich (siehe Spezifikation 4.3).
 * `api.complete` ist pro Aufgabe genau einmal wirksam – auch bei hektischem
 * Doppelklicken.
 */
(function (root) {
  'use strict';
  var NS = root.BelaSchool = root.BelaSchool || {};
  var lessonApi = {};

  lessonApi.run = function (lessonId) {
    var ui = NS.ui;
    var store = NS.store;
    var bobby = NS.content.bobby;
    var found = NS.content.findLesson(lessonId);

    if (!found) {
      var missing = ui.screen();
      missing.appendChild(ui.el('h1', { className: 'screen-title', text: NS.i18n.t('Diese Lektion gibt es nicht.', 'This lesson does not exist.') }));
      missing.appendChild(ui.button(NS.i18n.t('Zur Karte', 'Back to the map'), { onClick: function () { NS.router.go('#/'); } }));
      return missing;
    }

    var stage = found.stage;
    var lesson = found.lesson;
    var isMilestone = !!lesson.milestone || String(lesson.id).indexOf('-m') !== -1;
    var index = 0;
    var destroyed = false;
    var currentHandle = null;
    var currentActivity = null;
    var activityTimer = null;
    var clockInterval = null;
    var timeSaved = true;
    var completed = false;
    var attempts = 0;

    var screen = ui.screen('lesson-screen');
    var bar = ui.el('div', { className: 'lesson-bar' });
    var dots = ui.el('div', { className: 'dots' });
    var skip = ui.el('button', {
      className: 'icon-btn skip-btn',
      attrs: { type: 'button', 'aria-label': NS.i18n.t('Aufgabe überspringen', 'Skip activity') },
      text: '›'
    });
    var host = ui.el('div', { className: 'activity-host' });
    bar.appendChild(dots);
    bar.appendChild(skip);
    screen.appendChild(bar);
    screen.appendChild(host);

    skip.addEventListener('click', function () {
      NS.audio.sfx('click');
      advance();
    });

    store.setLastLesson(lesson.id);
    root.addEventListener('pagehide', saveTime);
    renderDots();
    showWelcome();

    function renderDots() {
      ui.clear(dots);
      lesson.activities.forEach(function (_, i) {
        dots.appendChild(ui.el('span', {
          className: 'dot' + (i < index ? ' is-done' : (i === index ? ' is-current' : ''))
        }));
      });
    }

    function showWelcome() {
      ui.clear(host);
      stopClock();
      var welcome = ui.el('div', { className: 'card center', style: { padding: '40px' } }, [
        ui.art('bobby', 150),
        ui.el('h1', { className: 'screen-title', text: lesson.title }),
        ui.el('p', { text: lesson.goal || NS.i18n.t('Komm, wir schauen uns das an!', 'Come on, let us take a look!') }),
        ui.button(NS.i18n.t('Los geht es!', "Let's go!"), { onClick: function () { startActivity(); } })
      ]);
      host.appendChild(welcome);
      ui.say(lesson.goal || bobby.lessonStart);
    }

    /** Räumt die vorige Aufgabe auf, bevor die nächste erscheint. */
    function disposeCurrent() {
      if (currentHandle && typeof currentHandle.destroy === 'function') {
        try { currentHandle.destroy(); } catch (e) { /* egal */ }
      }
      currentHandle = null;
    }

    function startActivity() {
      if (destroyed) { return; }
      disposeCurrent();
      var activity = lesson.activities[index];
      if (!activity) { finishLesson(); return; }

      completed = false;
      attempts = 0;
      currentActivity = activity;
      activityTimer = startTimer();
      timeSaved = false;
      startClock();
      ui.clear(host);
      renderDots();

      var engine = NS.engines[activity.type];
      if (!engine) {
        host.appendChild(ui.el('p', { text: NS.i18n.t('Dieses Spiel fehlt noch.', 'This game is missing.') }));
        return;
      }

      var api = {
        speak: function (text) { ui.say(text); },
        sfx: function (name) { NS.audio.sfx(name); },
        hint: function (text) { ui.say(text); },
        art: function (name, size) { return NS.icons.get(name, size); },
        progress: function () { return { correct: completed ? 1 : 0, attempts: attempts }; },
        complete: function (result) {
          if (completed || destroyed) { return; }
          completed = true;
          attempts += (result && result.attempts) || 0;
          saveTime();
          store.recordOutcome(
            stage.id,
            lesson.id,
            Math.max(1, (result && result.correct) || 1),
            (result && result.attempts) || 0
          );
          store.completeActivity(stage.id, lesson.id, activity.id);
          NS.audio.sfx('star');
          ui.confetti();
          var barEl = ui.el('div', { className: 'toast', text: bobby.star });
          root.document.body.appendChild(barEl);
          root.setTimeout(function () { barEl.remove(); }, 900);
          ui.wait(900).then(function () {
            if (!destroyed) { advance(); }
          });
        }
      };

      currentHandle = engine.mount(host, activity, api);
    }

    function advance() {
      saveTime();
      index += 1;
      if (index >= lesson.activities.length) { finishLesson(); }
      else { startActivity(); }
    }

    /**
     * Misst die Zeit einer Aufgabe. Ist der Tab verborgen, wird pausiert –
     * sonst stünden Stunden im Elternbereich, in denen niemand gespielt hat.
     */
    function startTimer() {
      var accumulated = 0;
      var since = Date.now();
      var paused = false;

      function onVisibility() {
        if (root.document.hidden) {
          if (!paused) { accumulated += Date.now() - since; paused = true; }
        } else if (paused) {
          since = Date.now();
          paused = false;
        }
      }

      root.document.addEventListener('visibilitychange', onVisibility);

      return {
        stop: function () {
          if (!paused) { accumulated += Date.now() - since; paused = true; }
          root.document.removeEventListener('visibilitychange', onVisibility);
          return Math.max(0, accumulated);
        },
        peek: function () {
          return accumulated + (paused ? 0 : Date.now() - since);
        }
      };
    }

    /** Uhr links neben den Sternen: zeigt die Zeit dieser Aufgabe. */
    function startClock() {
      if (clockInterval) { root.clearInterval(clockInterval); }
      NS.app.setClock(0);
      clockInterval = root.setInterval(function () {
        if (activityTimer && !timeSaved) { NS.app.setClock(activityTimer.peek()); }
      }, 500);
    }

    function stopClock() {
      if (clockInterval) { root.clearInterval(clockInterval); clockInterval = null; }
      NS.app.setClock(null);
    }

    function saveTime() {      if (timeSaved || !activityTimer || !currentActivity) { return; }
      timeSaved = true;
      var elapsed = activityTimer.stop();
      activityTimer = null;
      if (clockInterval) { root.clearInterval(clockInterval); clockInterval = null; }
      if (elapsed >= 500) {
        store.recordActivityTime(stage.id, lesson.id, currentActivity.id, elapsed);
      }
      NS.app.setClock(elapsed);
    }

    function finishLesson() {
      if (destroyed) { return; }
      disposeCurrent();
      store.completeLesson(stage.id, lesson.id);

      if (isMilestone) {
        store.completeMilestone(stage.id, stage.achievement.id);
      }

      ui.clear(host);
      var title = isMilestone ? stage.achievement.title : lesson.title;
      var celebrate = ui.el('div', { className: 'celebrate' }, [
        ui.el('div', { className: 'trophy' }, [ui.art(isMilestone ? 'pokal' : 'stern', 170)]),
        ui.el('h1', { className: 'screen-title', text: isMilestone ? NS.i18n.t('Geschafft!', 'Done!') : bobby.correct[0] }),
        ui.el('p', { text: isMilestone
          ? bobby.stageDone(stage.title)
          : NS.i18n.t(lesson.title + ' ist fertig.', lesson.title + ' is finished.') }),
        ui.el('p', { className: 'muted', text: isMilestone ? title : bobby.next })
      ]);
      var actions = ui.el('div', { className: 'row center', style: { justifyContent: 'center', marginTop: '20px' } });

      var lessons = stage.lessons;
      var position = lessons.indexOf(lesson);
      var next = lessons[position + 1];

      if (next) {
        actions.appendChild(ui.button(NS.i18n.t('Weiter', 'Continue'), { onClick: function () {
          NS.router.go('#/lesson/' + next.id);
        } }));
      }
      actions.appendChild(ui.button(NS.i18n.t('Zur Karte', 'Back to the map'), { variant: 'soft', onClick: function () {
        NS.router.go('#/');
      } }));

      celebrate.appendChild(actions);
      host.appendChild(celebrate);

      NS.audio.sfx('milestone');
      ui.confetti();
      ui.say(isMilestone ? bobby.stageDone(stage.title) : bobby.correct[0]);
      renderDots();
    }

    return {
      node: screen,
      destroy: function () {
        destroyed = true;
        saveTime();
        stopClock();
        root.removeEventListener('pagehide', saveTime);
        if (currentHandle && typeof currentHandle.destroy === 'function') {
          try { currentHandle.destroy(); } catch (e) { /* egal */ }
        }
      }
    };
  };

  NS.lesson = lessonApi;
  if (typeof module !== 'undefined' && module.exports) { module.exports = lessonApi; }
})(typeof globalThis !== 'undefined' ? globalThis : this);
