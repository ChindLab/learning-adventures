# Geräusche

Alle Geräusche werden zur Laufzeit im Browser erzeugt (`js/core/audio.js`).
Deshalb liegen hier keine Audiodateien: nichts nachzuladen, keine Lizenzfragen,
keine Dateigröße.

Möchtest du echte Klänge verwenden, lege sie hier als `.mp3` oder `.ogg` ab und
ersetze in `js/core/audio.js` die Funktion `tone(...)` durch einen
`new Audio('assets/sounds/dein-klang.mp3')`-Aufruf. Die Namen der Klänge
(`click`, `correct`, `wrong`, `star`, `milestone`, `pop`, `bump`) bleiben
gleich, damit die Spiele unverändert funktionieren.

Wichtig: keine Dateien aus unbekannten Quellen verwenden. Für eine App, die
Kindern gehört, sollten alle Geräusche selbst erzeugt oder eindeutig frei
lizenziert sein.
