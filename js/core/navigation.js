/**
 * navigation.js – Stufenkarte, Stufenübersicht, Erfolge.
 */
(function (root) {
  'use strict';
  var NS = root.BelaSchool = root.BelaSchool || {};
  var navigation = {};

  function stageStars(store, stage) {
    var profile = store.profile();
    var record = profile.stages[String(stage.id)];
    if (!record) { return 0; }
    var stars = 0;
    Object.keys(record.lessons || {}).forEach(function (lessonId) {
      stars += (record.lessons[lessonId].completed || []).length;
    });
    if (record.milestone && record.milestone.done) { stars += 2; }
    return stars;
  }

  function isStageDone(store, stage) {
    var record = store.profile().stages[String(stage.id)];
    return !!(record && record.milestone && record.milestone.done);
  }

  navigation.menu = function () {
    var ui = NS.ui;
    var store = NS.store;
    var bobby = NS.content.bobby;
    var screen = ui.screen('menu-screen');

    var name = store.profile().name;
    var hero = ui.el('div', { className: 'hero' }, [
      ui.el('div', { className: 'hero-art' }, [ui.art('bobby', 150)]),
      ui.el('div', {}, [
        ui.el('h1', { text: NS.i18n.t('Meine erste Computer-Schule', 'My First Computer School') }),
        ui.el('p', { text: name
          ? NS.i18n.t('Schön, dass du da bist, ' + name + '!', 'Good to see you, ' + name + '!')
          : NS.i18n.t('Schön, dass du da bist, kleine Entdeckerin!', 'Good to see you, little explorer!') })
      ])
    ]);
    screen.appendChild(hero);

    var map = ui.el('div', { className: 'map' });

    NS.content.stages.forEach(function (stage) {
      var done = isStageDone(store, stage);
      var open = stage.alwaysOpen || store.isUnlocked(stage.id);
      var classes = 'island' + (done ? ' is-done' : '') + (open ? '' : ' is-locked');

      var button = ui.el('button', {
        className: classes,
        attrs: {
          type: 'button',
          'aria-label': stage.title + (open ? '' : NS.i18n.t(' – gesperrt', ' – locked'))
        },
        data: { stage: stage.id }
      }, [
        ui.el('span', { className: 'island-num', text: String(stage.id) }),
        ui.el('span', { className: 'island-art' }, [ui.art(stage.icon || stage.achievement.art || 'stern', 84)]),
        ui.el('span', { className: 'island-title', text: stage.title }),
        ui.el('span', { className: 'island-stars', text: '★ ' + stageStars(store, stage) })
      ]);

      button.addEventListener('click', function () {
        NS.audio.sfx('click');
        if (!open) {
          NS.audio.sfx('bump');
          ui.say(bobby.locked);
          return;
        }
        NS.router.go('#/stage/' + stage.id);
      });

      map.appendChild(button);
    });

    map.appendChild(ui.el('div', { className: 'map-spacer' }));
    screen.appendChild(map);

    ui.say(name ? bobby.welcomeNamed(name) : bobby.welcome);
    return screen;
  };

  navigation.stage = function (stageId) {
    var ui = NS.ui;
    var store = NS.store;
    var stage = NS.content.findStage(stageId);
    var screen = ui.screen('stage-screen');

    if (!stage) {
      screen.appendChild(ui.el('h1', { className: 'screen-title', text: NS.i18n.t('Diese Stufe gibt es nicht.', 'This stage does not exist.') }));
      screen.appendChild(ui.button(NS.i18n.t('Zur Karte', 'Back to the map'), { onClick: function () { NS.router.go('#/'); } }));
      return screen;
    }

    var head = ui.el('div', { className: 'stage-head' }, [
      ui.el('div', { className: 'stage-badge' }, [ui.art(stage.icon || 'stern', 80)]),
      ui.el('div', {}, [
        ui.el('h1', { className: 'screen-title', text: stage.title }),
        ui.el('p', { className: 'screen-sub', text: stage.subtitle || '' })
      ])
    ]);
    screen.appendChild(head);

    var list = ui.el('div', { className: 'lesson-list' });

    stage.lessons.forEach(function (lesson, index) {
      var record = store.profile().stages[String(stage.id)];
      var lessonRecord = record && record.lessons[lesson.id];
      var done = !!(lessonRecord && lessonRecord.done);
      var isMilestone = !!lesson.milestone || String(lesson.id).indexOf('-m') !== -1;

      var row = ui.el('button', {
        className: 'lesson-row' + (done ? ' is-done' : '') + (isMilestone ? ' milestone-row' : ''),
        attrs: { type: 'button' },
        data: { lesson: lesson.id }
      }, [
        ui.el('span', { className: 'lesson-num', text: isMilestone ? '★' : String(index + 1) }),
        ui.el('span', {}, [
          ui.el('span', { className: 'lesson-name', text: lesson.title }),
          ui.el('span', { className: 'lesson-goal', text: lesson.goal || '' })
        ]),
        ui.el('span', { className: 'lesson-check', text: done ? '✓' : '›' })
      ]);

      row.addEventListener('click', function () {
        NS.audio.sfx('click');
        NS.router.go('#/lesson/' + lesson.id);
      });
      list.appendChild(row);
    });

    screen.appendChild(list);

    var nextLesson = stage.lessons.filter(function (lesson) {
      var record = store.profile().stages[String(stage.id)];
      var lessonRecord = record && record.lessons[lesson.id];
      return !lessonRecord || !lessonRecord.done;
    })[0] || stage.lessons[stage.lessons.length - 1];

    var actions = ui.el('div', { className: 'row', style: { marginTop: '26px' } }, [
      ui.button(NS.i18n.t('Weiter', 'Continue'), { onClick: function () {
        if (nextLesson) { NS.router.go('#/lesson/' + nextLesson.id); }
      } }),
      ui.button(NS.i18n.t('Zur Karte', 'Back to the map'), { variant: 'soft', onClick: function () { NS.router.go('#/'); } })
    ]);
    screen.appendChild(actions);

    ui.say(stage.title + '. ' + (stage.subtitle || ''));
    return screen;
  };

  navigation.achievements = function () {
    var ui = NS.ui;
    var store = NS.store;
    var profile = store.profile();
    var screen = ui.screen('achievements-screen');

    screen.appendChild(ui.el('h1', { className: 'screen-title', text: NS.i18n.t('Meine Erfolge', 'My Achievements') }));
    screen.appendChild(ui.el('p', { className: 'screen-sub', text: NS.i18n.t('Jeder Pokal ist ein großes Stück Abenteuer.', 'Every trophy is a big piece of the adventure.') }));

    var grid = ui.el('div', { className: 'map' });
    NS.content.stages.forEach(function (stage) {
      var earned = profile.achievements.indexOf(stage.achievement.id) !== -1;
      var tile = ui.el('div', {
        className: 'island' + (earned ? ' is-done' : ' is-locked'),
        attrs: { 'aria-label': stage.achievement.title + (earned
          ? NS.i18n.t(' – geschafft', ' – done')
          : NS.i18n.t(' – noch nicht', ' – not yet')) }
      }, [
        ui.el('span', { className: 'island-art' }, [ui.art(earned ? 'pokal' : 'schloss', 80)]),
        ui.el('span', { className: 'island-title', text: earned ? stage.achievement.title : NS.i18n.t('Bald!', 'Soon!') }),
        ui.el('span', { className: 'island-stars', text: earned ? NS.i18n.t('★ geschafft', '★ done') : '★ ?' })
      ]);
      grid.appendChild(tile);
    });

    screen.appendChild(grid);
    screen.appendChild(ui.el('div', { className: 'row', style: { marginTop: '26px' } }, [
      ui.button(NS.i18n.t('Zur Karte', 'Back to the map'), { onClick: function () { NS.router.go('#/'); } })
    ]));

    ui.say(NS.i18n.t('Deine Erfolge!', 'Your achievements!'));
    return screen;
  };

  NS.navigation = navigation;
  if (typeof module !== 'undefined' && module.exports) { module.exports = navigation; }
})(typeof globalThis !== 'undefined' ? globalThis : this);
