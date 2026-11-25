/**
 * icons.js – alle Bilder als eingebautes SVG.
 *
 * Vorteile: keine Dateien nachzuladen, beliebig skalierbar, pastellfarben
 * direkt aus dem Code. `get()` liefert ein fertiges <svg>-Element.
 */
(function (root) {
  'use strict';
  var NS = root.BelaSchool = root.BelaSchool || {};

  var INK = '#3B3355';
  var BLUE = '#5B7CFA';
  var MINT = '#2FA36B';
  var YELLOW = '#F5C542';

  var ART = {
    bobby: '<svg viewBox="0 0 100 100"><line x1="50" y1="9" x2="50" y2="18" stroke="' + INK + '" stroke-width="4"/><circle cx="50" cy="7" r="5" fill="' + MINT + '"/><rect x="18" y="16" width="64" height="52" rx="16" fill="' + BLUE + '"/><rect x="26" y="24" width="48" height="34" rx="10" fill="#EAF2FF"/><circle cx="41" cy="40" r="5" fill="' + INK + '"/><circle cx="59" cy="40" r="5" fill="' + INK + '"/><path d="M40 48 Q50 56 60 48" stroke="' + INK + '" fill="none" stroke-width="3" stroke-linecap="round"/><rect x="30" y="70" width="40" height="22" rx="8" fill="#4A63D8"/><circle cx="50" cy="81" r="4" fill="#FFF2B2"/></svg>',

    computer: '<svg viewBox="0 0 100 100"><rect x="10" y="12" width="58" height="40" rx="6" fill="#CDE7FF" stroke="' + INK + '" stroke-width="3"/><rect x="16" y="18" width="46" height="28" rx="3" fill="#FFF"/><rect x="74" y="12" width="18" height="58" rx="4" fill="#E3D8FF" stroke="' + INK + '" stroke-width="3"/><rect x="78" y="20" width="10" height="4" rx="2" fill="' + INK + '"/><rect x="78" y="28" width="10" height="4" rx="2" fill="' + INK + '"/><rect x="30" y="56" width="18" height="8" fill="#C8F0DA" stroke="' + INK + '" stroke-width="2"/><rect x="22" y="66" width="34" height="6" rx="3" fill="#FFD9C0" stroke="' + INK + '" stroke-width="2"/></svg>',
    monitor: '<svg viewBox="0 0 100 100"><rect x="9" y="14" width="82" height="54" rx="8" fill="#CDE7FF" stroke="' + INK + '" stroke-width="4"/><rect x="18" y="22" width="64" height="38" rx="4" fill="#FFF"/><rect x="42" y="68" width="16" height="10" fill="#E3D8FF" stroke="' + INK + '" stroke-width="3"/><rect x="30" y="78" width="40" height="7" rx="3" fill="#FFD9C0" stroke="' + INK + '" stroke-width="3"/></svg>',
    tastatur: '<svg viewBox="0 0 100 100"><rect x="6" y="32" width="88" height="38" rx="8" fill="#E3D8FF" stroke="' + INK + '" stroke-width="4"/><g fill="#FFF"><rect x="14" y="40" width="9" height="8" rx="2"/><rect x="27" y="40" width="9" height="8" rx="2"/><rect x="40" y="40" width="9" height="8" rx="2"/><rect x="53" y="40" width="9" height="8" rx="2"/><rect x="66" y="40" width="9" height="8" rx="2"/><rect x="79" y="40" width="7" height="8" rx="2"/><rect x="14" y="52" width="9" height="8" rx="2"/><rect x="27" y="52" width="9" height="8" rx="2"/><rect x="40" y="52" width="9" height="8" rx="2"/><rect x="53" y="52" width="9" height="8" rx="2"/><rect x="66" y="52" width="9" height="8" rx="2"/><rect x="79" y="52" width="7" height="8" rx="2"/></g><rect x="27" y="62" width="46" height="6" rx="3" fill="#FFF"/></svg>',
    maus: '<svg viewBox="0 0 100 100"><rect x="32" y="12" width="36" height="76" rx="18" fill="#FFD9C0" stroke="' + INK + '" stroke-width="4"/><line x1="50" y1="12" x2="50" y2="38" stroke="' + INK + '" stroke-width="3"/><line x1="50" y1="30" x2="50" y2="40" stroke="' + INK + '" stroke-width="5" stroke-linecap="round"/></svg>',
    laptop: '<svg viewBox="0 0 100 100"><rect x="20" y="18" width="60" height="40" rx="5" fill="#CDE7FF" stroke="' + INK + '" stroke-width="4"/><rect x="26" y="24" width="48" height="28" rx="2" fill="#FFF"/><path d="M10 64 H90 L84 78 H16 Z" fill="#C8F0DA" stroke="' + INK + '" stroke-width="4" stroke-linejoin="round"/><rect x="40" y="68" width="20" height="4" rx="2" fill="' + INK + '"/></svg>',
    lautsprecher: '<svg viewBox="0 0 100 100"><rect x="26" y="10" width="48" height="80" rx="10" fill="#FFF2B2" stroke="' + INK + '" stroke-width="4"/><circle cx="50" cy="34" r="12" fill="#FFD9C0" stroke="' + INK + '" stroke-width="3"/><circle cx="50" cy="66" r="16" fill="#FFD9C0" stroke="' + INK + '" stroke-width="3"/><path d="M78 26 Q90 50 78 74" stroke="' + INK + '" fill="none" stroke-width="3" stroke-linecap="round"/></svg>',
    kamera: '<svg viewBox="0 0 100 100"><rect x="12" y="28" width="56" height="40" rx="8" fill="#C8F0DA" stroke="' + INK + '" stroke-width="4"/><circle cx="40" cy="48" r="13" fill="#FFF" stroke="' + INK + '" stroke-width="3"/><circle cx="40" cy="48" r="6" fill="' + INK + '"/><path d="M68 40 L84 30 V66 L68 56 Z" fill="#CDE7FF" stroke="' + INK + '" stroke-width="3" stroke-linejoin="round"/><rect x="22" y="34" width="8" height="4" rx="2" fill="' + INK + '"/></svg>',
    drucker: '<svg viewBox="0 0 100 100"><rect x="24" y="12" width="52" height="22" rx="3" fill="#FFF" stroke="' + INK + '" stroke-width="3"/><rect x="12" y="34" width="76" height="30" rx="6" fill="#E3D8FF" stroke="' + INK + '" stroke-width="4"/><rect x="30" y="58" width="40" height="28" rx="3" fill="#FFF" stroke="' + INK + '" stroke-width="3"/><line x1="22" y1="44" x2="34" y2="44" stroke="' + INK + '" stroke-width="3" stroke-linecap="round"/><rect x="40" y="64" width="20" height="3" rx="1" fill="#CDE7FF"/></svg>',
    schreibtisch: '<svg viewBox="0 0 100 100"><rect x="8" y="40" width="84" height="10" rx="4" fill="#FFD9C0" stroke="' + INK + '" stroke-width="3"/><rect x="16" y="50" width="8" height="34" fill="#FFD9C0" stroke="' + INK + '" stroke-width="3"/><rect x="76" y="50" width="8" height="34" fill="#FFD9C0" stroke="' + INK + '" stroke-width="3"/><rect x="30" y="18" width="40" height="22" rx="3" fill="#CDE7FF" stroke="' + INK + '" stroke-width="3"/></svg>',

    apfel: '<svg viewBox="0 0 100 100"><circle cx="45" cy="56" r="26" fill="#FF8FA3" stroke="' + INK + '" stroke-width="3"/><circle cx="60" cy="56" r="22" fill="#FF8FA3" stroke="' + INK + '" stroke-width="3"/><path d="M48 30 Q46 18 56 14" stroke="#6B4A2F" fill="none" stroke-width="5" stroke-linecap="round"/><path d="M54 20 Q66 12 72 20 Q64 28 54 20" fill="' + MINT + '"/></svg>',
    ei: '<svg viewBox="0 0 100 100"><ellipse cx="50" cy="52" rx="28" ry="36" fill="#FFF6E0" stroke="' + INK + '" stroke-width="4"/><ellipse cx="40" cy="44" rx="7" ry="10" fill="#FFE9B8"/></svg>',
    eis: '<svg viewBox="0 0 100 100"><path d="M38 22 L50 82 L62 22 Z" fill="#FFE3C2" stroke="' + INK + '" stroke-width="3" stroke-linejoin="round"/><circle cx="50" cy="24" r="18" fill="#FFC9D8" stroke="' + INK + '" stroke-width="3"/><circle cx="43" cy="20" r="4" fill="#FFF"/></svg>',
    drachen: '<svg viewBox="0 0 100 100"><path d="M50 14 L68 44 L50 74 L32 44 Z" fill="#CDE7FF" stroke="' + INK + '" stroke-width="3" stroke-linejoin="round"/><path d="M50 74 Q46 86 56 92" stroke="' + INK + '" fill="none" stroke-width="3"/><path d="M50 74 L58 82 L50 84 Z" fill="#FFC9D8"/></svg>',
    krone: '<svg viewBox="0 0 100 100"><path d="M20 68 L16 34 L34 48 L50 24 L66 48 L84 34 L80 68 Z" fill="#FFE066" stroke="' + INK + '" stroke-width="3" stroke-linejoin="round"/><rect x="20" y="68" width="60" height="10" rx="4" fill="#FFC9D8" stroke="' + INK + '" stroke-width="3"/><circle cx="50" cy="58" r="4" fill="' + INK + '"/></svg>',
    regenschirm: '<svg viewBox="0 0 100 100"><path d="M14 48 Q50 12 86 48 Q74 42 62 48 Q50 42 38 48 Q26 42 14 48 Z" fill="#E3D8FF" stroke="' + INK + '" stroke-width="3" stroke-linejoin="round"/><path d="M50 48 V76 Q50 88 62 84" stroke="' + INK + '" fill="none" stroke-width="4" stroke-linecap="round"/><path d="M50 20 V48" stroke="' + INK + '" stroke-width="3"/></svg>',
    vase: '<svg viewBox="0 0 100 100"><path d="M34 20 H66 L60 40 Q76 56 68 76 Q60 88 50 88 Q40 88 32 76 Q24 56 40 40 Z" fill="#C8F0DA" stroke="' + INK + '" stroke-width="3" stroke-linejoin="round"/><path d="M38 12 Q50 4 62 12" stroke="#2FA36B" fill="none" stroke-width="4" stroke-linecap="round"/></svg>',
    buch: '<svg viewBox="0 0 100 100"><path d="M16 20 Q34 14 50 24 Q66 14 84 20 V76 Q66 70 50 80 Q34 70 16 76 Z" fill="#CDE7FF" stroke="' + INK + '" stroke-width="3"/><line x1="50" y1="24" x2="50" y2="80" stroke="' + INK + '" stroke-width="3"/><path d="M26 34 H42 M26 44 H42 M58 34 H74 M58 44 H74" stroke="' + INK + '" stroke-width="2.5" stroke-linecap="round"/></svg>',
    ball: '<svg viewBox="0 0 100 100"><circle cx="50" cy="52" r="32" fill="#CDE7FF" stroke="' + INK + '" stroke-width="4"/><path d="M22 46 Q50 34 78 46" stroke="' + INK + '" fill="none" stroke-width="3"/><path d="M26 66 Q50 54 74 66" stroke="' + INK + '" fill="none" stroke-width="3"/></svg>',
    katze: '<svg viewBox="0 0 100 100"><path d="M24 44 L20 20 L40 32 Z" fill="#FFD9C0" stroke="' + INK + '" stroke-width="3" stroke-linejoin="round"/><path d="M76 44 L80 20 L60 32 Z" fill="#FFD9C0" stroke="' + INK + '" stroke-width="3" stroke-linejoin="round"/><circle cx="50" cy="56" r="28" fill="#FFD9C0" stroke="' + INK + '" stroke-width="3"/><circle cx="40" cy="52" r="3.5" fill="' + INK + '"/><circle cx="60" cy="52" r="3.5" fill="' + INK + '"/><path d="M50 62 L46 66 H54 Z" fill="#FF8FA3"/><path d="M28 60 H14 M28 66 H15 M72 60 H86 M72 66 H85" stroke="' + INK + '" stroke-width="2" stroke-linecap="round"/></svg>',
    hund: '<svg viewBox="0 0 100 100"><ellipse cx="34" cy="30" rx="12" ry="18" fill="#B98B5E" stroke="' + INK + '" stroke-width="3"/><ellipse cx="66" cy="30" rx="12" ry="18" fill="#B98B5E" stroke="' + INK + '" stroke-width="3"/><circle cx="50" cy="52" r="28" fill="#D9B07E" stroke="' + INK + '" stroke-width="3"/><circle cx="41" cy="48" r="3.5" fill="' + INK + '"/><circle cx="59" cy="48" r="3.5" fill="' + INK + '"/><ellipse cx="50" cy="62" rx="7" ry="5" fill="' + INK + '"/><path d="M50 67 V72" stroke="' + INK + '" stroke-width="3"/></svg>',
    elefant: '<svg viewBox="0 0 100 100"><circle cx="46" cy="50" r="28" fill="#C9D8F0" stroke="' + INK + '" stroke-width="3"/><ellipse cx="26" cy="40" rx="14" ry="20" fill="#C9D8F0" stroke="' + INK + '" stroke-width="3"/><path d="M62 62 Q78 66 76 82 Q74 92 64 88" fill="#C9D8F0" stroke="' + INK + '" stroke-width="3"/><circle cx="44" cy="45" r="3" fill="' + INK + '"/><circle cx="58" cy="45" r="3" fill="' + INK + '"/></svg>',
    fisch: '<svg viewBox="0 0 100 100"><path d="M14 52 Q40 22 70 52 Q40 82 14 52 Z" fill="#7FD1E8" stroke="' + INK + '" stroke-width="3"/><path d="M70 52 L88 34 V70 Z" fill="#7FD1E8" stroke="' + INK + '" stroke-width="3" stroke-linejoin="round"/><circle cx="36" cy="46" r="3.5" fill="' + INK + '"/></svg>',
    gitarre: '<svg viewBox="0 0 100 100"><circle cx="40" cy="64" r="22" fill="#F2B36B" stroke="' + INK + '" stroke-width="3"/><circle cx="40" cy="64" r="9" fill="#FFF" stroke="' + INK + '" stroke-width="3"/><rect x="48" y="14" width="10" height="46" rx="3" fill="#B98B5E" stroke="' + INK + '" stroke-width="3"/><rect x="44" y="8" width="18" height="12" rx="3" fill="#3B3355"/></svg>',
    hut: '<svg viewBox="0 0 100 100"><path d="M30 54 Q30 20 50 20 Q70 20 70 54 Z" fill="#CDE7FF" stroke="' + INK + '" stroke-width="3"/><rect x="14" y="52" width="72" height="12" rx="6" fill="#7FB2FF" stroke="' + INK + '" stroke-width="3"/><rect x="40" y="40" width="20" height="8" rx="3" fill="#FFF2B2"/></svg>',
    igel: '<svg viewBox="0 0 100 100"><path d="M18 62 L26 40 L34 58 L42 34 L50 56 L58 32 L66 56 L74 38 L82 62 Z" fill="#B98B5E" stroke="' + INK + '" stroke-width="3" stroke-linejoin="round"/><ellipse cx="50" cy="66" rx="32" ry="18" fill="#FFE3C2" stroke="' + INK + '" stroke-width="3"/><circle cx="36" cy="64" r="3" fill="' + INK + '"/><circle cx="50" cy="70" r="3" fill="' + INK + '"/></svg>',
    jacke: '<svg viewBox="0 0 100 100"><path d="M34 16 L50 26 L66 16 L80 26 L74 54 L66 50 V86 H34 V50 L26 54 L20 26 Z" fill="#FFC9D8" stroke="' + INK + '" stroke-width="3" stroke-linejoin="round"/><line x1="50" y1="26" x2="50" y2="86" stroke="' + INK + '" stroke-width="3"/><circle cx="50" cy="42" r="3" fill="' + INK + '"/><circle cx="50" cy="62" r="3" fill="' + INK + '"/></svg>',
    lampe: '<svg viewBox="0 0 100 100"><path d="M28 52 Q28 18 50 18 Q72 18 72 52 Z" fill="#FFF2B2" stroke="' + INK + '" stroke-width="3"/><rect x="40" y="52" width="20" height="10" fill="#C8F0DA" stroke="' + INK + '" stroke-width="3"/><path d="M34 74 Q50 82 66 74" stroke="' + INK + '" fill="none" stroke-width="3" stroke-linecap="round"/><path d="M38 66 Q50 72 62 66" stroke="' + INK + '" fill="none" stroke-width="3" stroke-linecap="round"/></svg>',
    nase: '<svg viewBox="0 0 100 100"><path d="M50 24 Q38 48 36 62 Q34 76 50 76 Q66 76 64 62" fill="#FFD9C0" stroke="' + INK + '" stroke-width="4" stroke-linecap="round"/><path d="M40 62 Q50 68 60 62" stroke="' + INK + '" fill="none" stroke-width="3" stroke-linecap="round"/></svg>',
    orange: '<svg viewBox="0 0 100 100"><circle cx="50" cy="54" r="30" fill="#FFB347" stroke="' + INK + '" stroke-width="3"/><path d="M50 24 V16" stroke="' + INK + '" stroke-width="4" stroke-linecap="round"/><path d="M52 20 Q66 12 70 22 Q58 28 52 20" fill="' + MINT + '"/></svg>',
    pferd: '<svg viewBox="0 0 100 100"><path d="M28 34 L36 18 L48 30 L60 26 L72 36 L68 52 L76 70 Q60 84 32 76 L24 56 Z" fill="#C99A6B" stroke="' + INK + '" stroke-width="3" stroke-linejoin="round"/><circle cx="44" cy="44" r="3" fill="' + INK + '"/><path d="M36 18 L34 10 M44 20 L44 12" stroke="' + INK + '" stroke-width="3" stroke-linecap="round"/><path d="M58 66 Q66 62 72 66" stroke="' + INK + '" fill="none" stroke-width="3"/></svg>',
    qualle: '<svg viewBox="0 0 100 100"><path d="M22 50 Q22 18 50 18 Q78 18 78 50 Z" fill="#E3D8FF" stroke="' + INK + '" stroke-width="3"/><path d="M30 52 Q26 70 32 84 M42 52 Q40 72 44 86 M58 52 Q60 72 56 84 M70 52 Q74 70 68 84" stroke="' + INK + '" fill="none" stroke-width="3" stroke-linecap="round"/><circle cx="40" cy="38" r="3" fill="' + INK + '"/><circle cx="60" cy="38" r="3" fill="' + INK + '"/></svg>',
    roboter: '<svg viewBox="0 0 100 100"><rect x="30" y="26" width="40" height="34" rx="8" fill="' + BLUE + '" stroke="' + INK + '" stroke-width="3"/><circle cx="42" cy="42" r="5" fill="#FFF"/><circle cx="58" cy="42" r="5" fill="#FFF"/><circle cx="42" cy="42" r="2" fill="' + INK + '"/><circle cx="58" cy="42" r="2" fill="' + INK + '"/><rect x="42" y="50" width="16" height="4" rx="2" fill="#FFF"/><rect x="38" y="62" width="24" height="20" rx="5" fill="#C8F0DA" stroke="' + INK + '" stroke-width="3"/><line x1="50" y1="18" x2="50" y2="26" stroke="' + INK + '" stroke-width="3"/><circle cx="50" cy="16" r="4" fill="' + MINT + '"/></svg>',
    sonne: '<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="22" fill="#FFE066" stroke="' + INK + '" stroke-width="3"/><g stroke="#F5C542" stroke-width="4" stroke-linecap="round"><line x1="50" y1="12" x2="50" y2="22"/><line x1="50" y1="78" x2="50" y2="88"/><line x1="12" y1="50" x2="22" y2="50"/><line x1="78" y1="50" x2="88" y2="50"/><line x1="23" y1="23" x2="30" y2="30"/><line x1="70" y1="70" x2="77" y2="77"/><line x1="77" y1="23" x2="70" y2="30"/><line x1="30" y1="70" x2="23" y2="77"/></g><circle cx="43" cy="47" r="2.5" fill="' + INK + '"/><circle cx="57" cy="47" r="2.5" fill="' + INK + '"/><path d="M43 56 Q50 62 57 56" stroke="' + INK + '" fill="none" stroke-width="2.5" stroke-linecap="round"/></svg>',
    tasse: '<svg viewBox="0 0 100 100"><path d="M20 34 H68 V66 Q68 80 44 80 Q20 80 20 66 Z" fill="#FFC9D8" stroke="' + INK + '" stroke-width="3"/><path d="M68 42 Q86 42 86 56 Q86 70 68 68" fill="none" stroke="' + INK + '" stroke-width="4"/><path d="M34 22 Q30 16 34 10 M48 22 Q44 16 48 10" stroke="' + INK + '" fill="none" stroke-width="3" stroke-linecap="round"/></svg>',
    uhr: '<svg viewBox="0 0 100 100"><circle cx="50" cy="54" r="30" fill="#CDE7FF" stroke="' + INK + '" stroke-width="4"/><line x1="50" y1="54" x2="50" y2="34" stroke="' + INK + '" stroke-width="4" stroke-linecap="round"/><line x1="50" y1="54" x2="64" y2="60" stroke="' + INK + '" stroke-width="4" stroke-linecap="round"/><circle cx="50" cy="54" r="3" fill="' + INK + '"/><rect x="42" y="18" width="16" height="6" rx="3" fill="#FFD9C0" stroke="' + INK + '" stroke-width="2"/></svg>',
    vogel: '<svg viewBox="0 0 100 100"><ellipse cx="48" cy="56" rx="26" ry="20" fill="#7FD1E8" stroke="' + INK + '" stroke-width="3"/><circle cx="66" cy="42" r="14" fill="#7FD1E8" stroke="' + INK + '" stroke-width="3"/><circle cx="70" cy="40" r="3" fill="' + INK + '"/><path d="M80 44 L92 48 L80 52 Z" fill="#FFB347" stroke="' + INK + '" stroke-width="2"/><path d="M36 60 Q24 70 30 78" stroke="' + INK + '" fill="none" stroke-width="3" stroke-linecap="round"/><path d="M44 52 Q50 46 58 52" stroke="' + INK + '" fill="none" stroke-width="3"/></svg>',
    wasser: '<svg viewBox="0 0 100 100"><path d="M10 40 Q25 26 40 40 T70 40 T100 40" fill="none" stroke="#7FB2FF" stroke-width="6" stroke-linecap="round"/><path d="M10 58 Q25 44 40 58 T70 58 T100 58" fill="none" stroke="#7FB2FF" stroke-width="6" stroke-linecap="round"/><path d="M10 76 Q25 62 40 76 T70 76 T100 76" fill="none" stroke="#7FB2FF" stroke-width="6" stroke-linecap="round"/></svg>',
    xylophon: '<svg viewBox="0 0 100 100"><rect x="14" y="30" width="72" height="40" rx="6" fill="#FFF2B2" stroke="' + INK + '" stroke-width="3"/><rect x="20" y="36" width="10" height="28" rx="2" fill="#FFC9D8"/><rect x="34" y="40" width="10" height="24" rx="2" fill="#CDE7FF"/><rect x="48" y="36" width="10" height="28" rx="2" fill="#C8F0DA"/><rect x="62" y="44" width="10" height="20" rx="2" fill="#E3D8FF"/><rect x="76" y="40" width="6" height="24" rx="2" fill="#FFD9C0"/></svg>',
    yoga: '<svg viewBox="0 0 100 100"><circle cx="50" cy="26" r="12" fill="#FFD9C0" stroke="' + INK + '" stroke-width="3"/><path d="M50 38 V58" stroke="' + INK + '" stroke-width="6" stroke-linecap="round"/><path d="M50 44 L30 36 M50 44 L70 36 M50 58 L34 78 M50 58 L66 78" stroke="' + INK + '" stroke-width="5" stroke-linecap="round"/><path d="M22 82 H78" stroke="#C8F0DA" stroke-width="6" stroke-linecap="round"/></svg>',
    zebra: '<svg viewBox="0 0 100 100"><ellipse cx="48" cy="56" rx="30" ry="22" fill="#FFF" stroke="' + INK + '" stroke-width="3"/><g stroke="#3B3355" stroke-width="5" stroke-linecap="round"><line x1="34" y1="38" x2="30" y2="52"/><line x1="46" y1="34" x2="42" y2="52"/><line x1="58" y1="36" x2="54" y2="54"/><line x1="70" y1="42" x2="66" y2="58"/></g><circle cx="74" cy="36" r="14" fill="#FFF" stroke="' + INK + '" stroke-width="3"/><circle cx="78" cy="34" r="3" fill="' + INK + '"/><path d="M30 74 V88 M44 74 V88 M58 74 V88 M70 74 V88" stroke="' + INK + '" stroke-width="4"/></svg>',
    dino: '<svg viewBox="0 0 100 100"><path d="M20 66 Q20 40 44 38 L60 30 Q76 32 76 44 L70 50 Q78 56 74 66 L64 78 H32 Z" fill="#9ED9B0" stroke="' + INK + '" stroke-width="3"/><circle cx="62" cy="42" r="3" fill="' + INK + '"/><path d="M20 64 Q10 62 8 54" stroke="' + INK + '" fill="none" stroke-width="5" stroke-linecap="round"/><path d="M32 78 V88 M56 78 V88" stroke="' + INK + '" stroke-width="4"/><path d="M34 46 L30 38 L40 42 L38 32 L46 40" fill="#C8F0DA" stroke="' + INK + '" stroke-width="2"/></svg>',

    stern: '<svg viewBox="0 0 100 100"><path d="M50 10 L61 38 L91 40 L68 58 L76 88 L50 71 L24 88 L32 58 L9 40 L39 38 Z" fill="#FFE066" stroke="' + INK + '" stroke-width="3" stroke-linejoin="round"/></svg>',
    pokal: '<svg viewBox="0 0 100 100"><path d="M28 14 H72 V34 Q72 56 50 56 Q28 56 28 34 Z" fill="#FFE066" stroke="' + INK + '" stroke-width="3"/><path d="M28 20 H16 Q16 38 30 42 M72 20 H84 Q84 38 70 42" fill="none" stroke="' + INK + '" stroke-width="3"/><rect x="44" y="56" width="12" height="14" fill="#FFD9C0" stroke="' + INK + '" stroke-width="3"/><rect x="30" y="70" width="40" height="10" rx="3" fill="#FFD9C0" stroke="' + INK + '" stroke-width="3"/></svg>',
    schloss: '<svg viewBox="0 0 100 100"><path d="M32 46 V34 Q32 14 50 14 Q68 14 68 34 V46" fill="none" stroke="' + INK + '" stroke-width="7"/><rect x="22" y="44" width="56" height="46" rx="8" fill="#CDE7FF" stroke="' + INK + '" stroke-width="3"/><circle cx="50" cy="64" r="7" fill="' + INK + '"/><rect x="47" y="68" width="6" height="12" rx="3" fill="' + INK + '"/></svg>',
    truhe: '<svg viewBox="0 0 100 100"><rect x="16" y="46" width="68" height="36" rx="5" fill="#C99A6B" stroke="' + INK + '" stroke-width="3"/><path d="M16 50 Q16 24 50 24 Q84 24 84 50 Z" fill="#B98B5E" stroke="' + INK + '" stroke-width="3"/><rect x="44" y="42" width="12" height="18" rx="2" fill="#FFE066" stroke="' + INK + '" stroke-width="3"/><rect x="16" y="56" width="68" height="6" fill="#FFD9C0" stroke="' + INK + '" stroke-width="2"/></svg>',
    banane: '<svg viewBox="0 0 100 100"><path d="M24 30 Q34 76 74 78 Q86 78 84 68 Q72 64 60 48 Q48 32 34 24 Q24 22 24 30 Z" fill="#FFE066" stroke="' + INK + '" stroke-width="3"/><path d="M34 26 Q50 52 62 60" stroke="' + INK + '" fill="none" stroke-width="2" opacity="0.5"/></svg>',
    korb: '<svg viewBox="0 0 100 100"><path d="M16 44 H84 L76 86 H24 Z" fill="#E8B87A" stroke="' + INK + '" stroke-width="3"/><path d="M30 44 L38 24 M50 44 V22 M70 44 L62 24" stroke="' + INK + '" fill="none" stroke-width="4" stroke-linecap="round"/><path d="M28 58 H72 M26 70 H74" stroke="' + INK + '" stroke-width="3" opacity="0.5"/></svg>',
    blume: '<svg viewBox="0 0 100 100"><line x1="50" y1="52" x2="50" y2="88" stroke="' + MINT + '" stroke-width="5" stroke-linecap="round"/><path d="M50 70 Q34 64 30 74 Q42 80 50 70" fill="#9ED9B0"/><circle cx="50" cy="38" r="12" fill="#FFE066" stroke="' + INK + '" stroke-width="3"/><circle cx="34" cy="44" r="11" fill="#FFC9D8" stroke="' + INK + '" stroke-width="2"/><circle cx="66" cy="44" r="11" fill="#FFC9D8" stroke="' + INK + '" stroke-width="2"/><circle cx="40" cy="26" r="11" fill="#FFC9D8" stroke="' + INK + '" stroke-width="2"/><circle cx="60" cy="26" r="11" fill="#FFC9D8" stroke="' + INK + '" stroke-width="2"/></svg>',
    schmetterling: '<svg viewBox="0 0 100 100"><ellipse cx="34" cy="38" rx="18" ry="16" fill="#E3D8FF" stroke="' + INK + '" stroke-width="3"/><ellipse cx="66" cy="38" rx="18" ry="16" fill="#E3D8FF" stroke="' + INK + '" stroke-width="3"/><ellipse cx="36" cy="62" rx="14" ry="12" fill="#CDE7FF" stroke="' + INK + '" stroke-width="3"/><ellipse cx="64" cy="62" rx="14" ry="12" fill="#CDE7FF" stroke="' + INK + '" stroke-width="3"/><rect x="47" y="30" width="6" height="46" rx="3" fill="' + INK + '"/><path d="M50 30 Q42 18 36 20 M50 30 Q58 18 64 20" stroke="' + INK + '" fill="none" stroke-width="2"/></svg>',
    kreis: '<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="30" fill="#FFC9D8" stroke="' + INK + '" stroke-width="4"/></svg>',
    quadrat: '<svg viewBox="0 0 100 100"><rect x="22" y="22" width="56" height="56" rx="6" fill="#CDE7FF" stroke="' + INK + '" stroke-width="4"/></svg>',
    dreieck: '<svg viewBox="0 0 100 100"><path d="M50 18 L86 78 H14 Z" fill="#C8F0DA" stroke="' + INK + '" stroke-width="4" stroke-linejoin="round"/></svg>',
    herz: '<svg viewBox="0 0 100 100"><path d="M50 84 Q14 58 14 38 Q14 20 32 20 Q44 20 50 32 Q56 20 68 20 Q86 20 86 38 Q86 58 50 84 Z" fill="#FFC9D8" stroke="' + INK + '" stroke-width="3"/></svg>',

    'pfeil-oben': '<svg viewBox="0 0 100 100"><path d="M50 16 L80 52 H62 V84 H38 V52 H20 Z" fill="#C8F0DA" stroke="' + INK + '" stroke-width="3" stroke-linejoin="round"/></svg>',    'pfeil-unten': '<svg viewBox="0 0 100 100"><path d="M50 84 L20 48 H38 V16 H62 V48 H80 Z" fill="#C8F0DA" stroke="' + INK + '" stroke-width="3" stroke-linejoin="round"/></svg>',
    'pfeil-links': '<svg viewBox="0 0 100 100"><path d="M16 50 L52 20 V38 H84 V62 H52 V80 Z" fill="#C8F0DA" stroke="' + INK + '" stroke-width="3" stroke-linejoin="round"/></svg>',
    'pfeil-rechts': '<svg viewBox="0 0 100 100"><path d="M84 50 L48 20 V38 H16 V62 H48 V80 Z" fill="#C8F0DA" stroke="' + INK + '" stroke-width="3" stroke-linejoin="round"/></svg>',

    'hand-left': '<svg viewBox="0 0 100 100" class="hand-svg"><ellipse cx="12" cy="70" rx="9" ry="14" fill="#FFD9C0" stroke="' + INK + '" stroke-width="3" transform="rotate(-25 12 70)"/><rect x="16" y="52" width="66" height="38" rx="15" fill="#FFD9C0" stroke="' + INK + '" stroke-width="3"/><g data-finger="pinky" fill="#FFC9D8" stroke="' + INK + '" stroke-width="2.5"><rect x="20" y="36" width="13" height="24" rx="6"/></g><g data-finger="ring" fill="#FFD9C0" stroke="' + INK + '" stroke-width="2.5"><rect x="34" y="28" width="13" height="32" rx="6"/></g><g data-finger="middle" fill="#FFF2B2" stroke="' + INK + '" stroke-width="2.5"><rect x="48" y="22" width="13" height="38" rx="6"/></g><g data-finger="index" fill="#C8F0DA" stroke="' + INK + '" stroke-width="2.5"><rect x="62" y="28" width="13" height="32" rx="6"/></g></svg>',
    'hand-right': '<svg viewBox="0 0 100 100" class="hand-svg"><ellipse cx="88" cy="70" rx="9" ry="14" fill="#FFD9C0" stroke="' + INK + '" stroke-width="3" transform="rotate(25 88 70)"/><rect x="18" y="52" width="66" height="38" rx="15" fill="#FFD9C0" stroke="' + INK + '" stroke-width="3"/><g data-finger="index" fill="#C8F0DA" stroke="' + INK + '" stroke-width="2.5"><rect x="25" y="28" width="13" height="32" rx="6"/></g><g data-finger="middle" fill="#FFF2B2" stroke="' + INK + '" stroke-width="2.5"><rect x="39" y="22" width="13" height="38" rx="6"/></g><g data-finger="ring" fill="#FFD9C0" stroke="' + INK + '" stroke-width="2.5"><rect x="53" y="28" width="13" height="32" rx="6"/></g><g data-finger="pinky" fill="#FFC9D8" stroke="' + INK + '" stroke-width="2.5"><rect x="67" y="36" width="13" height="24" rx="6"/></g></svg>',

    rakete: '<svg viewBox="0 0 100 100"><path d="M50 8 Q68 30 68 56 L60 70 H40 L32 56 Q32 30 50 8 Z" fill="#EAF2FF" stroke="' + INK + '" stroke-width="3" stroke-linejoin="round"/><circle cx="50" cy="38" r="8" fill="#CDE7FF" stroke="' + INK + '" stroke-width="2.5"/><path d="M32 56 L18 76 L36 70 Z" fill="#FFC9D8" stroke="' + INK + '" stroke-width="2.5" stroke-linejoin="round"/><path d="M68 56 L82 76 L64 70 Z" fill="#FFC9D8" stroke="' + INK + '" stroke-width="2.5" stroke-linejoin="round"/><path d="M44 71 Q50 90 56 71" fill="#FFB347" stroke="' + INK + '" stroke-width="2.5"/></svg>',

    'block-forward': '<svg viewBox="0 0 100 100"><rect x="6" y="18" width="88" height="64" rx="12" fill="#CDE7FF" stroke="' + INK + '" stroke-width="3"/><path d="M34 50 H62 M52 38 L66 50 L52 62" stroke="' + INK + '" fill="none" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    'block-back': '<svg viewBox="0 0 100 100"><rect x="6" y="18" width="88" height="64" rx="12" fill="#FFD9C0" stroke="' + INK + '" stroke-width="3"/><path d="M66 50 H38 M48 38 L34 50 L48 62" stroke="' + INK + '" fill="none" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    'block-left': '<svg viewBox="0 0 100 100"><rect x="6" y="18" width="88" height="64" rx="12" fill="#E3D8FF" stroke="' + INK + '" stroke-width="3"/><path d="M62 50 Q50 30 34 50 M34 50 L44 36 M34 50 L48 56" stroke="' + INK + '" fill="none" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    'block-right': '<svg viewBox="0 0 100 100"><rect x="6" y="18" width="88" height="64" rx="12" fill="#E3D8FF" stroke="' + INK + '" stroke-width="3"/><path d="M38 50 Q50 30 66 50 M66 50 L56 36 M66 50 L52 56" stroke="' + INK + '" fill="none" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    'block-jump': '<svg viewBox="0 0 100 100"><rect x="6" y="18" width="88" height="64" rx="12" fill="#C8F0DA" stroke="' + INK + '" stroke-width="3"/><path d="M28 66 Q50 20 72 66" stroke="' + INK + '" fill="none" stroke-width="6" stroke-linecap="round"/><circle cx="72" cy="66" r="5" fill="' + INK + '"/></svg>',
    'block-repeat': '<svg viewBox="0 0 100 100"><rect x="6" y="18" width="88" height="64" rx="12" fill="#FFF2B2" stroke="' + INK + '" stroke-width="3"/><path d="M34 40 H62 Q72 40 72 50 Q72 60 62 60 H42 M42 60 L52 50 M42 60 L52 70" stroke="' + INK + '" fill="none" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    'block-if': '<svg viewBox="0 0 100 100"><rect x="6" y="18" width="88" height="64" rx="12" fill="#FFC9D8" stroke="' + INK + '" stroke-width="3"/><path d="M50 28 L70 50 L50 72 L30 50 Z" fill="#FFF" stroke="' + INK + '" stroke-width="4"/><path d="M50 40 V52 M50 58 V62" stroke="' + INK + '" stroke-width="5" stroke-linecap="round"/></svg>',
    'block-collect': '<svg viewBox="0 0 100 100"><rect x="6" y="18" width="88" height="64" rx="12" fill="#FFE066" stroke="' + INK + '" stroke-width="3"/><path d="M50 30 L56 45 L72 46 L59 56 L63 72 L50 63 L37 72 L41 56 L28 46 L44 45 Z" fill="#FFF" stroke="' + INK + '" stroke-width="3" stroke-linejoin="round"/></svg>',

    frage: '<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="32" fill="#FFF2B2" stroke="' + INK + '" stroke-width="4"/><path d="M40 40 Q40 28 50 28 Q62 28 62 40 Q62 50 50 52 V58" fill="none" stroke="' + INK + '" stroke-width="6" stroke-linecap="round"/><circle cx="50" cy="70" r="4" fill="' + INK + '"/></svg>'
  };

  var LABELS = {
    bobby: 'Bobby, der Roboter', computer: 'Computer', monitor: 'Monitor',
    tastatur: 'Tastatur', maus: 'Maus', laptop: 'Laptop', lautsprecher: 'Lautsprecher',
    kamera: 'Kamera', drucker: 'Drucker', schreibtisch: 'Schreibtisch',
    apfel: 'Apfel', ball: 'Ball', katze: 'Katze', hund: 'Hund', elefant: 'Elefant',
    ei: 'Ei', eis: 'Eis', drachen: 'Drachen', krone: 'Krone', regenschirm: 'Regenschirm', vase: 'Vase', buch: 'Buch',    fisch: 'Fisch', gitarre: 'Gitarre', hut: 'Hut', igel: 'Igel', jacke: 'Jacke',
    lampe: 'Lampe', nase: 'Nase', orange: 'Orange', pferd: 'Pferd', qualle: 'Qualle',
    roboter: 'Roboter', sonne: 'Sonne', tasse: 'Tasse', uhr: 'Uhr', vogel: 'Vogel',
    wasser: 'Wasser', xylophon: 'Xylophon', yoga: 'Yoga', zebra: 'Zebra', dino: 'Dino',
    stern: 'Stern', pokal: 'Pokal', schloss: 'Schloss', truhe: 'Schatztruhe',
    banane: 'Banane', korb: 'Korb', blume: 'Blume', schmetterling: 'Schmetterling',
    kreis: 'Kreis', quadrat: 'Quadrat', dreieck: 'Dreieck', herz: 'Herz',
    'pfeil-oben': 'Pfeil nach oben', 'pfeil-unten': 'Pfeil nach unten',
    'pfeil-links': 'Pfeil nach links', 'pfeil-rechts': 'Pfeil nach rechts',
    'hand-left': 'Linke Hand mit Fingern', 'hand-right': 'Rechte Hand mit Fingern',
    rakete: 'Rakete',
    'block-forward': 'Vorwärts', 'block-back': 'Rückwärts', 'block-left': 'Links drehen',
    'block-right': 'Rechts drehen', 'block-jump': 'Springen', 'block-repeat': 'Wiederholen',
    'block-if': 'Wenn', 'block-collect': 'Stern sammeln', frage: 'Unbekanntes Bild'
  };

  var LABELS_EN = {
    bobby: 'Bobby the robot', computer: 'Computer', monitor: 'Monitor',
    tastatur: 'Keyboard', maus: 'Mouse', laptop: 'Laptop', lautsprecher: 'Speaker',
    kamera: 'Camera', drucker: 'Printer', schreibtisch: 'Desk',
    apfel: 'Apple', ball: 'Ball', katze: 'Cat', hund: 'Dog', elefant: 'Elephant',
    ei: 'Egg', eis: 'Ice cream', drachen: 'Kite', krone: 'Crown', regenschirm: 'Umbrella',
    vase: 'Vase', buch: 'Book', fisch: 'Fish', gitarre: 'Guitar', hut: 'Hat', igel: 'Hedgehog',
    jacke: 'Jacket', lampe: 'Lamp', nase: 'Nose', orange: 'Orange', pferd: 'Horse',
    qualle: 'Jellyfish', roboter: 'Robot', sonne: 'Sun', tasse: 'Cup', uhr: 'Clock',
    vogel: 'Bird', wasser: 'Water', xylophon: 'Xylophone', yoga: 'Yoga', zebra: 'Zebra',
    dino: 'Dinosaur', stern: 'Star', pokal: 'Trophy', schloss: 'Lock', truhe: 'Treasure chest',
    banane: 'Banana', korb: 'Basket', blume: 'Flower', schmetterling: 'Butterfly',
    kreis: 'Circle', quadrat: 'Square', dreieck: 'Triangle', herz: 'Heart',
    'pfeil-oben': 'Arrow up', 'pfeil-unten': 'Arrow down',
    'pfeil-links': 'Arrow left', 'pfeil-rechts': 'Arrow right',
    'hand-left': 'Left hand with fingers', 'hand-right': 'Right hand with fingers',
    rakete: 'Rocket',
    'block-forward': 'Forward', 'block-back': 'Back', 'block-left': 'Turn left',
    'block-right': 'Turn right', 'block-jump': 'Jump', 'block-repeat': 'Repeat',
    'block-if': 'If', 'block-collect': 'Collect star', frage: 'Unknown picture'
  };

  function labelFor(name) {
    var german = LABELS[name] || 'Bild';
    var english = LABELS_EN[name] || german;
    var language = (NS.content && NS.content.language) || 'en';
    if (language !== 'en' && language !== 'de') {
      var translation = NS.content.translations && NS.content.translations[language];
      var lexicon = translation && translation.lexicon;
      if (lexicon && lexicon[english]) { return lexicon[english]; }
    }
    return NS.i18n ? NS.i18n.t(english, german) : english;
  }

  function markup(name) {
    return ART[name] || ART.frage;
  }

  function get(name, size) {
    var host = root.document.createElement('div');
    host.innerHTML = markup(name);
    var svg = host.firstChild;
    if (!svg) { return host; }
    var px = size || 100;
    svg.setAttribute('width', px);
    svg.setAttribute('height', px);
    svg.setAttribute('role', 'img');
    svg.setAttribute('aria-label', labelFor(name));
    svg.classList.add('art');
    return svg;
  }

  var icons = { get: get, markup: markup, has: function (name) { return !!ART[name]; } };
  NS.icons = icons;
  if (typeof module !== 'undefined' && module.exports) { module.exports = icons; }
})(typeof globalThis !== 'undefined' ? globalThis : this);
