# Pull request

## What does a child learn here?

<!-- One sentence. e.g. "Recognising which of two things is heavier." -->

## What changed?

<!-- Lessons, game types, engine, translations, docs. -->

## Checklist

- [ ] `npm test` is green.
- [ ] `selftest.html` is green (`Gesamt: n/n ok`).
- [ ] CI is green, including the required `ci-success` check.
- [ ] Browser smoke run via Playwright MCP or CLI; console has no errors.
- [ ] German **and** English text added.
- [ ] New activity/lesson ids are unique; existing ids unchanged.
- [ ] Works with keyboard only (Tab, Enter, arrows).
- [ ] Works with sound off and reduced motion.
- [ ] No network requests, no external assets, no tracking.
- [ ] No timer, lives or score loss was introduced.
- [ ] Screenshot or short description attached.

## Test evidence

```
npm test:        __/__ pass
selftest.html:   Alles gut – Gesamt: __/__ ok
console (app):   __ errors
manual:          German + English, 1024×600, keyboard only
```

“Should work” is not evidence. If the browser layer was not run, say so and ask a
maintainer to run it.

## Screenshot

<!-- Drag an image here if it is a visual change. -->
