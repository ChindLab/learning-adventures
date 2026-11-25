/**
 * content/index.js – Sammelstelle für alle Lehrinhalte.
 *
 * Jede Stufe meldet sich hier an. `validate` prüft die Daten unabhängig von
 * der Darstellung; derselbe Code läuft im Browser (selftest.html) und unter
 * Node (tests/content.test.js).
 */
(function (root) {
  'use strict';
  var NS = root.BelaSchool = root.BelaSchool || {};
  var content = NS.content = NS.content || {};

  content.stages = content.stages || [];
  content.baseStages = content.baseStages || [];

  content.register = function (stage) {
    content.baseStages.push(stage);
    content.stages.push(stage);
  };

  /* ---------- Sprachwechsel ---------- */

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function applyLabels(activity, lexicon) {
    function label(text) { return lexicon[text] || text; }
    ['options', 'items', 'targets', 'cards'].forEach(function (field) {
      if (Array.isArray(activity[field])) {
        activity[field] = activity[field].map(function (entry) {
          return entry && entry.label ? Object.assign({}, entry, { label: label(entry.label) }) : entry;
        });
      }
    });
    if (Array.isArray(activity.pairs)) {
      activity.pairs = activity.pairs.map(function (pair) {
        return {
          a: pair.a && pair.a.label ? Object.assign({}, pair.a, { label: label(pair.a.label) }) : pair.a,
          b: pair.b && pair.b.label ? Object.assign({}, pair.b, { label: label(pair.b.label) }) : pair.b
        };
      });
    }
    if (Array.isArray(activity.deck)) {
      activity.deck = activity.deck.map(function (item) {
        var copy = Object.assign({}, item);
        if (Array.isArray(item.options)) {
          copy.options = item.options.map(function (option) {
            return option && option.label ? Object.assign({}, option, { label: label(option.label) }) : option;
          });
        }
        return copy;
      });
    }
    if (Array.isArray(activity.levels)) {
      activity.levels = activity.levels.map(function (level) {
        return level && level.label ? Object.assign({}, level, { label: label(level.label) }) : level;
      });
    }
    return activity;
  }

  function localizeActivity(activity, tr, lexicon) {
    var copy = Object.assign({}, activity);
    if (tr) {
      ['title', 'speech', 'prompt', 'goal'].forEach(function (field) {
        if (tr[field]) { copy[field] = tr[field]; }
      });
      if (tr.points) { copy.points = tr.points.slice(); }
      if (tr.hint) { copy.hint = tr.hint; }
      if (tr.lineNotes) { copy.lineNotes = tr.lineNotes.slice(); }
      if (tr.letters && Array.isArray(activity.letters)) {
        copy.letters = activity.letters.map(function (letter, index) {
          return tr.letters[index] ? Object.assign({}, letter, tr.letters[index]) : letter;
        });
      }
      if (tr.deck && Array.isArray(activity.deck)) {
        copy.deck = activity.deck.map(function (item, index) {
          var translated = tr.deck[index];
          if (!translated) { return item; }
          var next = Object.assign({}, item);
          if (translated.prompt) { next.prompt = translated.prompt; }
          return next;
        });
      }
      if (tr.words && Array.isArray(activity.words)) {
        copy.words = activity.words.map(function (word, index) {
          return tr.words[index] ? Object.assign({}, word, tr.words[index]) : word;
        });
      }
      if (tr.sequences && Array.isArray(activity.sequences)) {
        copy.sequences = tr.sequences.slice();
      }
      if (tr.levels && Array.isArray(activity.levels)) {
        copy.levels = activity.levels.map(function (level, index) {
          var translated = tr.levels[index];
          if (!translated) { return level; }
          var next = Object.assign({}, level);
          if (translated.label) { next.label = translated.label; }
          if (translated.pool) { next.pool = translated.pool.slice(); }
          return next;
        });
      }
    }
    return applyLabels(copy, lexicon);
  }

  function localize(stages, lang, translation) {
    if (lang === 'en' || !translation) { return stages; }
    var lexicon = translation.lexicon || {};
    return stages.map(function (stage) {
      var next = clone(stage);
      var meta = translation.stages && translation.stages[stage.id];
      if (meta) {
        if (meta.title) { next.title = meta.title; }
        if (meta.subtitle) { next.subtitle = meta.subtitle; }
      }
      if (translation.achievements && translation.achievements[next.achievement.id]) {
        next.achievement.title = translation.achievements[next.achievement.id];
      }
      next.lessons = next.lessons.map(function (lesson) {
        var lessonTr = translation.lessons && translation.lessons[lesson.id];
        if (lessonTr) {
          if (lessonTr.title) { lesson.title = lessonTr.title; }
          if (lessonTr.goal) { lesson.goal = lessonTr.goal; }
        }
        lesson.activities = lesson.activities.map(function (activity) {
          return localizeActivity(activity, translation.activities && translation.activities[activity.id], lexicon);
        });
        return lesson;
      });
      return next;
    });
  }

  /**
   * Sets the language. English is the source; German is an overlay from
   * i18n/de.js. Any other value falls back to English.
   */
  content.applyLanguage = function (lang) {
    var translations = content.translations || {};
    var selected = (lang !== 'en' && translations[lang]) ? lang : 'en';
    content.stages = selected === 'en'
      ? content.baseStages
      : localize(content.baseStages, selected, translations[selected]);
    content.bobby = (content.bobbyFor && content.bobbyFor[selected]) || content.bobbyEn;
    content.language = selected;
  };

  content.findStage = function (id) {
    for (var i = 0; i < content.stages.length; i++) {
      if (String(content.stages[i].id) === String(id)) { return content.stages[i]; }
    }
    return null;
  };

  content.findLesson = function (lessonId) {
    for (var i = 0; i < content.stages.length; i++) {
      var lessons = content.stages[i].lessons || [];
      for (var j = 0; j < lessons.length; j++) {
        if (lessons[j].id === lessonId) { return { stage: content.stages[i], lesson: lessons[j] }; }
      }
    }
    return null;
  };

  content.activity = function (activityId) {
    for (var i = 0; i < content.stages.length; i++) {
      var lessons = content.stages[i].lessons || [];
      for (var j = 0; j < lessons.length; j++) {
        var activities = lessons[j].activities || [];
        for (var k = 0; k < activities.length; k++) {
          if (activities[k].id === activityId) { return activities[k]; }
        }
      }
    }
    return null;
  };

  content.lessonOf = function (activityId) {
    for (var i = 0; i < content.stages.length; i++) {
      var lessons = content.stages[i].lessons || [];
      for (var j = 0; j < lessons.length; j++) {
        var activities = lessons[j].activities || [];
        for (var k = 0; k < activities.length; k++) {
          if (activities[k].id === activityId) {
            return { stage: content.stages[i], lesson: lessons[j] };
          }
        }
      }
    }
    return null;
  };

  var ENGINES = ['explain', 'pickOne', 'matchPairs', 'dragDrop', 'target', 'keyPress',
    'typeText', 'homeRow', 'rocket', 'countObjects', 'pattern', 'sequence', 'gridRun', 'puzzle', 'jsDemo'];

  var FORBIDDEN = /(falsch|fehler|leider|coming soon|platzhalter|todo|game over)/i;

  /**
   * Prüft alle Inhalte. Gibt `{ok, errors}` zurück; bricht nie ab.
   */
  function validate(stages) {
    var errors = [];
    var ids = {};
    if (!stages || !stages.length) { errors.push('no-stages'); return { ok: false, errors: errors }; }

    stages.forEach(function (stage) {
      if (!stage.id) { errors.push('stage-without-id'); }
      if (!stage.title) { errors.push('stage-without-title:' + stage.id); }
      if (!stage.achievement || !stage.achievement.id) { errors.push('stage-without-achievement:' + stage.id); }
      if (!stage.lessons || !stage.lessons.length) { errors.push('stage-without-lessons:' + stage.id); }

      var hasMilestone = false;
      var count = 0;

      (stage.lessons || []).forEach(function (lesson) {
        if (!lesson.id) { errors.push('lesson-without-id:' + stage.id); }
        if (!lesson.activities || !lesson.activities.length) { errors.push('lesson-without-activities:' + lesson.id); }
        if (lesson.milestone || String(lesson.id).indexOf('-m') !== -1) { hasMilestone = true; }

        (lesson.activities || []).forEach(function (activity) {
          count += 1;
          if (!activity.id) { errors.push('activity-without-id:' + lesson.id); }
          if (ids[activity.id]) { errors.push('duplicate-id:' + activity.id); }
          ids[activity.id] = true;

          if (ENGINES.indexOf(activity.type) === -1) {
            errors.push('unknown-engine:' + activity.id + ':' + activity.type);
          }
          if (!activity.title) { errors.push('activity-without-title:' + activity.id); }
          if (!activity.speech) { errors.push('activity-without-speech:' + activity.id); }
          if (activity.speech && String(activity.speech).split(/\s+/).length > 8) {
            errors.push('speech-too-long:' + activity.id);
          }
          if (activity.speech && FORBIDDEN.test(activity.speech)) {
            errors.push('forbidden-word:' + activity.id);
          }

          var optionIds = {};
          (activity.options || []).forEach(function (option) {
            optionIds[option.id] = true;
            if (option.id === undefined) { errors.push('option-without-id:' + activity.id); }
          });
          if (activity.answer !== undefined && activity.options && !optionIds[activity.answer]) {
            errors.push('answer-not-in-options:' + activity.id);
          }
          if (activity.deck) {
            activity.deck.forEach(function (item, index) {
              if (!item.answer) { errors.push('deck-item-without-answer:' + activity.id + ':' + index); }
            });
          }
          if (activity.type === 'dragDrop') {
            var itemIds = (activity.items || []).map(function (item) { return item.id; });
            (activity.targets || []).forEach(function (target) {
              (target.accepts || []).forEach(function (accepted) {
                if (itemIds.indexOf(accepted) === -1) {
                  errors.push('dragdrop-accepts-unknown:' + activity.id + ':' + accepted);
                }
              });
            });
          }
          if (activity.type === 'countObjects' && activity.mode === 'sub' && activity.b > activity.a) {
            errors.push('sub-negative:' + activity.id);
          }
          if (activity.type === 'gridRun' && !activity.selftestProgram) {
            errors.push('gridrun-without-selftest-program:' + activity.id);
          }
        });
      });

      if (!hasMilestone) { errors.push('stage-without-milestone:' + stage.id); }
      if (count === 0) { errors.push('stage-without-activities:' + stage.id); }
    });

    return { ok: errors.length === 0, errors: errors };
  }

  content.validate = validate;
  content.ENGINES = ENGINES;

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { validate: validate, ENGINES: ENGINES, content: content };
  }
})(typeof globalThis !== 'undefined' ? globalThis : this);
