/**
 * i18n/it.js – Italian translation (English is the source in js/content/stage*.js).
 *
 * Loaded after the stages and before app.js. Switch a profile to "it" and the
 * localizer applies this overlay; "en" uses the source as-is.
 */
(function (root) {
  'use strict';
  var NS = root.BelaSchool = root.BelaSchool || {};
  var content = NS.content = NS.content || {};

  content.translations = content.translations || {};
  content.translations.it = {
  "lexicon": {
    "Mouse": "Topo",
    "Star": "Stella",
    "Speaker": "Altoparlante",
    "Keyboard": "Tastiera",
    "Camera": "Fotocamera",
    "Computer": "Computer",
    "Laptop": "Portatile",
    "Monitor": "Monitor",
    "Screen": "Schermo",
    "Writing": "Scrivere",
    "Pointing": "Puntare",
    "Listening": "Ascoltare",
    "Keys": "Tasti",
    "Pointer": "Freccia",
    "On the go": "Da portare",
    "Printer": "Stampante",
    "Chest with a button": "Baule con un pulsante",
    "Picture of a flower": "Disegno di un fiore",
    "Butterfly": "Farfalla",
    "Flower": "Fiore",
    "Apple": "Mela",
    "Banana": "Banana",
    "Orange": "Arancione",
    "Basket": "Cesto",
    "Ball": "Palla",
    "Egg": "Uovo",
    "Sun": "Sole",
    "Mom": "Mamma",
    "Dad": "Papà",
    "Space bar": "Barra spaziatrice",
    "Enter": "Invio",
    "Backspace": "Backspace",
    "Shift": "Maiusc",
    "Start": "Inizio",
    "Turn right": "Gira a destra",
    "To the star": "Verso la stella",
    "Cat": "Gatto",
    "Dog": "Cane",
    "Straight on": "Dritto",
    "Around the corner": "Dietro l'angolo",
    "Bird": "Uccello",
    "Fish": "Pesce",
    "Jellyfish": "Medusa",
    "Flies": "Vola",
    "Swims": "Nuota",
    "big circle": "cerchio grande",
    "big square": "quadrato grande",
    "medium circle": "cerchio medio",
    "medium square": "quadrato medio",
    "small circle": "cerchio piccolo",
    "small square": "quadrato piccolo",
    "Big": "Grande",
    "Medium": "Medio",
    "Easy": "Facile",
    "Hard": "Difficile",
    "Small": "Piccolo",
    "Leicht": "Facile",
    "Mittel": "Medio",
    "Schwer": "Difficile",
    "1": "1",
    "2": "2",
    "3": "3",
    "4": "4",
    "5": "5",
    "6": "6",
    "7": "7",
    "8": "8",
    "9": "9",
    "10": "10",
    "A": "A",
    "B": "B",
    "C": "C",
    "D": "D",
    "E": "E",
    "F": "F",
    "G": "G",
    "H": "H",
    "I": "I",
    "J": "J",
    "K": "K",
    "L": "L",
    "a": "a",
    "b": "b",
    "c": "c",
    "d": "d",
    "e": "e",
    "f": "f",
    "g": "g",
    "h": "h",
    "i": "i",
    "j": "j",
    "k": "k",
    "l": "l"
  },
  "achievements": {
    "s1": "Esploratore del computer",
    "s2": "Maestro del topo",
    "s3": "Esploratore della tastiera",
    "s4": "Piccola stella della scrittura",
    "s5": "Esploratore dei numeri",
    "s6": "Piccolo genio della logica",
    "s7": "Programmatore junior",
    "s8": "Primo programmatore",
    "s9": "Professionista della scrittura"
  },
  "stages": {
    "1": {
      "title": "Il mio computer",
      "subtitle": "Che cos'è un computer e da cosa è fatto?"
    },
    "2": {
      "title": "Avventure con il topo",
      "subtitle": "Puntare, cliccare, trascinare, scorrere."
    },
    "3": {
      "title": "Avventure con la tastiera",
      "subtitle": "Trova il tasto giusto."
    },
    "4": {
      "title": "Lettere e scrittura",
      "subtitle": "Da A a Z e le prime parole."
    },
    "5": {
      "title": "Numeri",
      "subtitle": "Contare, confrontare, più e meno."
    },
    "6": {
      "title": "Giochi di logica",
      "subtitle": "Istruzioni, schemi e percorsi furbi."
    },
    "7": {
      "title": "Giochi di programmazione",
      "subtitle": "Bobby fa quello che gli dici."
    },
    "8": {
      "title": "Il mio primo JavaScript",
      "subtitle": "Che cos'è il codice e cosa fa."
    },
    "9": {
      "title": "Allenamento delle dita",
      "subtitle": "Scrivere con tutte le dita, senza fretta."
    }
  },
  "lessons": {
    "1-1": {
      "title": "Che cos'è un computer?",
      "goal": "Guardiamo un computer."
    },
    "1-2": {
      "title": "Il monitor",
      "goal": "Il monitor ci mostra le immagini."
    },
    "1-3": {
      "title": "La tastiera",
      "goal": "Con la tastiera scriviamo."
    },
    "1-4": {
      "title": "Il topo",
      "goal": "Con il topo indichi le cose."
    },
    "1-5": {
      "title": "Il portatile",
      "goal": "Un portatile è un computer da portare."
    },
    "1-6": {
      "title": "Altoparlante e fotocamera",
      "goal": "I computer possono sentire e parlare."
    },
    "1-7": {
      "title": "Cosa sanno fare i computer?",
      "goal": "I computer disegnano, calcolano e fanno musica."
    },
    "1-8": {
      "title": "Ripassiamo tutto",
      "goal": "Ricordiamo tutte le parti."
    },
    "1-m": {
      "title": "Finale della tappa",
      "goal": "Mostra quello che sai già."
    },
    "2-1": {
      "title": "Muovere il topo",
      "goal": "Porta la freccia lungo la linea."
    },
    "2-2": {
      "title": "La freccia",
      "goal": "Alcune cose si possono cliccare."
    },
    "2-3": {
      "title": "Cliccare",
      "goal": "Clicca le stelle."
    },
    "2-4": {
      "title": "Doppio clic",
      "goal": "Due clic veloci aprono il baule."
    },
    "2-5": {
      "title": "Tenere e trascinare",
      "goal": "Trascina la farfalla sul fiore."
    },
    "2-6": {
      "title": "Trascinare e rilasciare",
      "goal": "Metti tutta la frutta nel cesto."
    },
    "2-7": {
      "title": "Scorrere",
      "goal": "Scorri in basso e trova Bobby."
    },
    "2-8": {
      "title": "Diventa maestro del topo",
      "goal": "Quattro giochi per mani ferme."
    },
    "2-m": {
      "title": "Finale della tappa",
      "goal": "Un ultimo disegno per veri maestri del topo."
    },
    "3-1": {
      "title": "Che cos'è una tastiera?",
      "goal": "Trova dieci lettere sulla tastiera."
    },
    "3-2": {
      "title": "Trovare i numeri",
      "goal": "Trova dieci numeri sulla tastiera."
    },
    "3-3": {
      "title": "La barra spaziatrice",
      "goal": "La barra spaziatrice fa saltare Bobby."
    },
    "3-4": {
      "title": "Il tasto Invio",
      "goal": "Invio apre il baule."
    },
    "3-5": {
      "title": "Il tasto Backspace",
      "goal": "Backspace cancella una lettera."
    },
    "3-6": {
      "title": "Il tasto Maiusc",
      "goal": "Maiusc fa le lettere maiuscole."
    },
    "3-7": {
      "title": "I tasti freccia",
      "goal": "Bobby si muove con le frecce."
    },
    "3-8": {
      "title": "Di nuovo tutto",
      "goal": "Lettere, numeri e tasti insieme."
    },
    "3-m": {
      "title": "Finale della tappa",
      "goal": "Mostra cosa fa ogni tasto."
    },
    "4-1": {
      "title": "Da A a H",
      "goal": "Otto lettere con i disegni."
    },
    "4-2": {
      "title": "Da I a P",
      "goal": "Altre otto lettere."
    },
    "4-3": {
      "title": "Da Q a Z",
      "goal": "Le ultime lettere."
    },
    "4-4": {
      "title": "Grande e piccolo",
      "goal": "A e a stanno insieme."
    },
    "4-5": {
      "title": "Trova la lettera",
      "goal": "Quattro lettere sulla tastiera."
    },
    "4-6": {
      "title": "Scrivi una parola",
      "goal": "Sette paroline e il tuo nome."
    },
    "4-m": {
      "title": "Finale della tappa",
      "goal": "Tre parole senza aiuto."
    },
    "5-1": {
      "title": "Numeri da 0 a 5",
      "goal": "Conta le mele."
    },
    "5-2": {
      "title": "Numeri da 6 a 10",
      "goal": "Ora sono di più."
    },
    "5-3": {
      "title": "Numeri da 11 a 20",
      "goal": "Sai contare anche tanto."
    },
    "5-4": {
      "title": "Esercitati a contare",
      "goal": "Conta i fiori."
    },
    "5-5": {
      "title": "Quantità e numero",
      "goal": "Quale numero va con la quantità?"
    },
    "5-6": {
      "title": "Più grande e più piccolo",
      "goal": "Quale numero è più grande?"
    },
    "5-7": {
      "title": "Più",
      "goal": "Due più uno fa tre."
    },
    "5-8": {
      "title": "Meno",
      "goal": "Cinque meno due fa tre."
    },
    "5-m": {
      "title": "Finale della tappa",
      "goal": "Tre piccole somme."
    },
    "6-1": {
      "title": "Istruzioni",
      "goal": "Bobby segue i tuoi blocchi."
    },
    "6-2": {
      "title": "Ordine",
      "goal": "L'ordine crea il percorso."
    },
    "6-3": {
      "title": "Schemi",
      "goal": "Cosa viene dopo?"
    },
    "6-4": {
      "title": "Pensiero logico",
      "goal": "Cosa non va? Quale via aiuta?"
    },
    "6-5": {
      "title": "Se … allora",
      "goal": "Se c'è un muro, gira."
    },
    "6-6": {
      "title": "Ripeti",
      "goal": "Tre volte lo stesso è più corto."
    },
    "6-7": {
      "title": "Schemi nel quadrato",
      "goal": "Trova lo schema nel quadrato."
    },
    "6-8": {
      "title": "Chi vola, chi nuota?",
      "goal": "Ordina gli animali per dove vivono."
    },
    "6-9": {
      "title": "Grande, medio, piccolo",
      "goal": "Ordina le forme per grandezza."
    },
    "6-10": {
      "title": "Cosa va insieme?",
      "goal": "Collega le cose."
    },
    "6-m": {
      "title": "Finale della tappa",
      "goal": "Gira, cammina, arriva."
    },
    "7-1": {
      "title": "Blocchi e ordine",
      "goal": "Un blocco, un passo."
    },
    "7-2": {
      "title": "Girare",
      "goal": "Gira a sinistra e a destra."
    },
    "7-3": {
      "title": "Qualcosa non va",
      "goal": "Controlla, cambia, riprova."
    },
    "7-m": {
      "title": "Finale della tappa",
      "goal": "L'ultimo grande viaggio."
    },
    "8-1": {
      "title": "Che cos'è il codice?",
      "goal": "Il codice è un'istruzione per il computer."
    },
    "8-2": {
      "title": "Il primo comando",
      "goal": "alert mostra un messaggio."
    },
    "8-3": {
      "title": "Le variabili",
      "goal": "Una variabile è una piccola scatola."
    },
    "8-4": {
      "title": "Numeri",
      "goal": "Tre mele in una scatola."
    },
    "8-5": {
      "title": "Calcolare",
      "goal": "Due e tre fanno cinque."
    },
    "8-6": {
      "title": "Le funzioni",
      "goal": "Un'istruzione che puoi riusare."
    },
    "8-m": {
      "title": "Finale della tappa",
      "goal": "Variabili e calcoli insieme."
    },
    "9-1": {
      "title": "Come stanno le dita",
      "goal": "Conosci la riga di base."
    },
    "9-2": {
      "title": "Mano sinistra: A S D F",
      "goal": "Quattro tasti per la mano sinistra."
    },
    "9-3": {
      "title": "Mano destra: J K L",
      "goal": "Tre tasti per la mano destra."
    },
    "9-4": {
      "title": "Due mani",
      "goal": "Alterna sinistra e destra."
    },
    "9-5": {
      "title": "Paroline",
      "goal": "Parole che usano solo la riga di base."
    },
    "9-6": {
      "title": "In alto a sinistra: Q W",
      "goal": "La riga in alto con la mano sinistra."
    },
    "9-7": {
      "title": "In alto a destra: O P",
      "goal": "La riga in alto con la mano destra."
    },
    "9-8": {
      "title": "In basso: M N",
      "goal": "Arriva in basso con l'indice."
    },
    "9-9": {
      "title": "Misto e complesso",
      "goal": "Percorsi più lunghi sulla tastiera."
    },
    "9-10": {
      "title": "Razzo delle stelle",
      "goal": "Scrivi la lettera, il razzo vola."
    },
    "9-11": {
      "title": "Razzo delle parole",
      "goal": "Scegli livello e ritmo, poi scrivi."
    },
    "9-m": {
      "title": "Finale della tappa",
      "goal": "Mostra cosa sanno fare le tue dita."
    }
  },
  "activities": {
    "1-1-1": {
      "title": "Un computer",
      "speech": "Questo è un computer.",
      "prompt": "Questo è un computer.",
      "points": [
        "Calcola molto veloce.",
        "Mostra le immagini sul monitor.",
        "Ha bisogno di elettricità."
      ]
    },
    "1-1-2": {
      "title": "Dov'è il computer?",
      "speech": "Indica il computer.",
      "prompt": "Dov'è il computer?"
    },
    "1-2-1": {
      "title": "Il monitor",
      "speech": "Il monitor mostra le immagini.",
      "prompt": "Il monitor mostra le immagini.",
      "points": [
        "Sembra una televisione.",
        "Mostra cosa fa il computer."
      ]
    },
    "1-2-2": {
      "title": "Dov'è il monitor?",
      "speech": "Indica il monitor.",
      "prompt": "Dov'è il monitor?"
    },
    "1-3-1": {
      "title": "La tastiera",
      "speech": "La tastiera ha tanti tasti.",
      "prompt": "La tastiera ha tanti tasti.",
      "points": [
        "Ogni tasto ha un simbolo.",
        "Serve per scrivere le lettere."
      ]
    },
    "1-3-2": {
      "title": "Dov'è la tastiera?",
      "speech": "Indica la tastiera.",
      "prompt": "Dov'è la tastiera?"
    },
    "1-4-1": {
      "title": "Il topo",
      "speech": "Il topo indica lo schermo.",
      "prompt": "Il topo indica lo schermo.",
      "points": [
        "Ha una piccola freccia.",
        "Serve per cliccare le cose."
      ]
    },
    "1-4-2": {
      "title": "Dov'è il topo?",
      "speech": "Indica il topo.",
      "prompt": "Dov'è il topo?"
    },
    "1-5-1": {
      "title": "Il portatile",
      "speech": "Un portatile si porta con te.",
      "prompt": "Un portatile si porta con te.",
      "points": [
        "Schermo e tastiera sono insieme.",
        "Ha una batteria."
      ]
    },
    "1-5-2": {
      "title": "Portatile o computer grande?",
      "speech": "Cosa puoi portare?",
      "prompt": "Cosa puoi portare?"
    },
    "1-6-1": {
      "title": "Altoparlante e fotocamera",
      "speech": "L'altoparlante suona la musica.",
      "prompt": "L'altoparlante suona la musica.",
      "points": [
        "La fotocamera fa le foto.",
        "L'altoparlante fa i suoni."
      ]
    },
    "1-6-2": {
      "title": "Chi fa le foto?",
      "speech": "Chi fa le foto?",
      "prompt": "Chi fa le foto?"
    },
    "1-7-1": {
      "title": "Tante cose",
      "speech": "I computer sanno fare molto.",
      "prompt": "I computer sanno fare molto.",
      "points": [
        "Disegnano immagini.",
        "Suonano la musica.",
        "Calcolano con i numeri."
      ]
    },
    "1-7-2": {
      "title": "Cosa appartiene a un computer?",
      "speech": "Trascina tutto sul computer.",
      "prompt": "Metti ogni cosa al suo posto."
    },
    "1-8-1": {
      "title": "Collega le parti",
      "speech": "Collega le parti con il nome.",
      "prompt": "Collega ogni parte con il suo nome."
    },
    "1-8-2": {
      "title": "Memory",
      "speech": "Trova le immagini uguali.",
      "prompt": "Trova le immagini uguali."
    },
    "1-m-1": {
      "title": "Tutto mescolato",
      "speech": "Mostra cosa sai.",
      "prompt": "Cosa va dove?",
      "deck": [
        { "prompt": "Dov'è la tastiera?" },
        { "prompt": "Con cosa clicchi?" },
        { "prompt": "Dove vedi le immagini?" },
        { "prompt": "Cosa fa la musica?" },
        { "prompt": "Chi fa le foto?" }
      ]
    },
    "2-1-1": {
      "title": "Traccia la linea",
      "speech": "Muovi il topo lungo la linea.",
      "prompt": "Muovi il topo lungo la linea."
    },
    "2-2-1": {
      "title": "Cosa puoi cliccare?",
      "speech": "Cosa puoi cliccare?",
      "prompt": "Cosa puoi cliccare?"
    },
    "2-3-1": {
      "title": "Prendi le stelle",
      "speech": "Clicca le stelle.",
      "prompt": "Clicca ogni stella."
    },
    "2-3-2": {
      "title": "Memory del topo",
      "speech": "Trova le immagini uguali.",
      "prompt": "Clicca due carte uguali."
    },
    "2-4-1": {
      "title": "Apri il baule",
      "speech": "Clicca il baule due volte, veloce.",
      "prompt": "Clicca il baule due volte, veloce."
    },
    "2-5-1": {
      "title": "Farfalla e fiore",
      "speech": "Trascina la farfalla sul fiore.",
      "prompt": "Trascina la farfalla sul fiore."
    },
    "2-6-1": {
      "title": "Frutta nel cesto",
      "speech": "Metti tutta la frutta nel cesto.",
      "prompt": "Metti tutta la frutta nel cesto."
    },
    "2-7-1": {
      "title": "Scorri in basso",
      "speech": "Scorri in basso e trova Bobby.",
      "prompt": "Scorri in basso e trova Bobby.",
      "points": [
        "Gira la rotella del topo.",
        "Oppure trascina la barra."
      ]
    },
    "2-8-1": {
      "title": "Stelle medie",
      "speech": "Clicca le stelle.",
      "prompt": "Clicca ogni stella."
    },
    "2-8-2": {
      "title": "Stelle piccole",
      "speech": "Ora le stelle diventano più piccole.",
      "prompt": "Ora le stelle diventano più piccole."
    },
    "2-8-3": {
      "title": "Stelle volanti",
      "speech": "Le stelle volano. Cliccale.",
      "prompt": "Le stelle volano. Cliccale."
    },
    "2-8-4": {
      "title": "Costruisci il disegno",
      "speech": "Metti insieme il disegno.",
      "prompt": "Metti insieme i quattro pezzi."
    },
    "2-8-5": {
      "title": "Nuova linea",
      "speech": "Muoviti di nuovo lungo la linea.",
      "prompt": "Muovi il topo lungo la linea."
    },
    "2-m-1": {
      "title": "Disegno del sole",
      "speech": "Metti insieme il disegno del sole.",
      "prompt": "Metti insieme il disegno del sole."
    },
    "3-1-1": {
      "title": "Trova le lettere",
      "speech": "Premi sempre il tasto illuminato.",
      "prompt": "Premi il tasto che si illumina.",
      "hint": "Guarda l'anello giallo!"
    },
    "3-1-2": {
      "title": "Memory dei tasti",
      "speech": "Trova i tasti uguali.",
      "prompt": "Trova due carte con lo stesso tasto."
    },
    "3-2-1": {
      "title": "Trova i numeri",
      "speech": "Premi sempre il numero illuminato.",
      "prompt": "Premi il numero che si illumina.",
      "hint": "I numeri sono in alto."
    },
    "3-3-1": {
      "title": "Barra spaziatrice",
      "speech": "Premi la barra spaziatrice. Bobby salta!",
      "prompt": "Premi la barra spaziatrice. Bobby salta!",
      "hint": "La barra spaziatrice è in basso."
    },
    "3-4-1": {
      "title": "Invio",
      "speech": "Premi Invio e apri il baule.",
      "prompt": "Premi Invio e apri il baule.",
      "hint": "Invio è a destra."
    },
    "3-5-1": {
      "title": "Backspace",
      "speech": "Premi Backspace e cancella la lettera.",
      "prompt": "Premi Backspace e cancella la lettera.",
      "hint": "Backspace è in alto a destra."
    },
    "3-6-1": {
      "title": "Maiusc",
      "speech": "Premi Maiusc per una lettera maiuscola.",
      "prompt": "Premi Maiusc per una lettera maiuscola.",
      "hint": "Maiusc è tutto a sinistra."
    },
    "3-7-1": {
      "title": "Tasti freccia",
      "speech": "Premi la freccia illuminata.",
      "prompt": "Premi la freccia che si illumina.",
      "hint": "Le frecce sono in basso a destra."
    },
    "3-8-1": {
      "title": "Tasti misti",
      "speech": "Ora si mescola tutto.",
      "prompt": "Ora misto: lettere, numeri e tasti.",
      "hint": "Guarda l'anello giallo!"
    },
    "3-m-1": {
      "title": "Quiz dei tasti",
      "speech": "Quale tasto va bene?",
      "prompt": "Quale tasto va bene?",
      "deck": [
        { "prompt": "Come fai uno spazio?" },
        { "prompt": "Come apri qualcosa?" },
        { "prompt": "Come fai le maiuscole?" },
        { "prompt": "Come cancelli una lettera?" }
      ]
    },
    "4-1-1": {
      "title": "Da A a H",
      "speech": "Premi sempre la lettera.",
      "prompt": "Premi la lettera che vedi."
    },
    "4-2-1": {
      "title": "Da I a P",
      "speech": "Premi sempre la lettera.",
      "prompt": "Premi la lettera che vedi."
    },
    "4-3-1": {
      "title": "Da Q a Z",
      "speech": "Premi sempre la lettera.",
      "prompt": "Premi la lettera che vedi."
    },
    "4-4-1": {
      "title": "Collega A con F",
      "speech": "Collega ogni maiuscola con la minuscola.",
      "prompt": "Collega A con a e così via."
    },
    "4-4-2": {
      "title": "Collega G con L",
      "speech": "Collega ogni maiuscola con la minuscola.",
      "prompt": "Collega G con g e così via."
    },
    "4-5-1": {
      "title": "Da A a F",
      "speech": "Premi le lettere illuminate.",
      "prompt": "Premi la lettera che si illumina.",
      "hint": "Le lettere sono sulla tastiera."
    },
    "4-5-2": {
      "title": "Da G a L",
      "speech": "Premi le lettere illuminate.",
      "prompt": "Premi la lettera che si illumina.",
      "hint": "Le lettere sono sulla tastiera."
    },
    "4-5-3": {
      "title": "Da M a R",
      "speech": "Premi le lettere illuminate.",
      "prompt": "Premi la lettera che si illumina.",
      "hint": "Le lettere sono sulla tastiera."
    },
    "4-5-4": {
      "title": "Da S a Z",
      "speech": "Premi le lettere illuminate.",
      "prompt": "Premi la lettera che si illumina.",
      "hint": "Le lettere sono sulla tastiera."
    },
    "4-6-1": {
      "title": "Scrivi parole",
      "speech": "Scrivi la parola lettera per lettera.",
      "prompt": "Scrivi la parola.",
      "words": [
        { "text": "GATTO", "label": "Gatto", "art": "katze" },
        { "text": "CANE", "label": "Cane", "art": "hund" },
        { "text": "SOLE", "label": "Sole", "art": "sonne" },
        { "text": "MAMMA", "label": "Mamma", "art": "blume" },
        { "text": "PAPA", "label": "Papà", "art": "hut" },
        { "text": "PALLA", "label": "Palla", "art": "ball" },
        { "text": "UOVO", "label": "Uovo", "art": "ei" }
      ]
    },
    "4-6-2": {
      "title": "Il tuo nome",
      "speech": "Scrivi il tuo nome.",
      "prompt": "Scrivi il tuo nome nella casella."
    },
    "4-m-1": {
      "title": "Tre parole",
      "speech": "Scrivi le tre parole.",
      "prompt": "Scrivi le tre parole.",
      "words": [
        { "text": "MAMMA", "label": "Mamma", "art": "blume" },
        { "text": "PAPA", "label": "Papà", "art": "hut" },
        { "text": "UOVO", "label": "Uovo", "art": "ei" }
      ]
    },
    "5-1-1": {
      "title": "Conta le mele",
      "speech": "Quante mele ci sono?",
      "prompt": "Quante mele ci sono?"
    },
    "5-2-1": {
      "title": "Conta le stelle",
      "speech": "Quante stelle ci sono?",
      "prompt": "Quante stelle ci sono?"
    },
    "5-3-1": {
      "title": "Tante mele",
      "speech": "Quante mele ci sono?",
      "prompt": "Quante mele ci sono?"
    },
    "5-4-1": {
      "title": "Conta i fiori",
      "speech": "Quanti fiori ci sono?",
      "prompt": "Quanti fiori ci sono?"
    },
    "5-5-1": {
      "title": "Quale numero?",
      "speech": "Quale numero va con i disegni?",
      "prompt": "Quale numero va con i disegni?"
    },
    "5-6-1": {
      "title": "Più grande o più piccolo",
      "speech": "Quale numero è più grande?",
      "prompt": "Quale numero è più grande?",
      "deck": [
        { "prompt": "Quale numero è più grande?" },
        { "prompt": "Quale numero è più piccolo?" },
        { "prompt": "Quale numero è più grande?" }
      ]
    },
    "5-7-1": {
      "title": "Due più uno",
      "speech": "Due mele e una mela. Quante?",
      "prompt": "Due mele e una mela. Quante sono?"
    },
    "5-8-1": {
      "title": "Cinque meno due",
      "speech": "Cinque stelle. Due spariscono.",
      "prompt": "Cinque stelle. Due spariscono. Quante restano?"
    },
    "5-m-1": {
      "title": "Somme",
      "speech": "Risolvi le tre attività.",
      "prompt": "Quanto fa?",
      "deck": [
        { "prompt": "2 + 1 = ?" },
        { "prompt": "4 − 2 = ?" },
        { "prompt": "3 + 3 = ?" }
      ]
    },
    "6-1-1": {
      "title": "Due passi",
      "speech": "Metti due passi e parti.",
      "prompt": "Porta Bobby alla stella."
    },
    "6-2-1": {
      "title": "La strada giusta",
      "speech": "Metti le tre immagini in ordine.",
      "prompt": "Cosa viene prima, cosa dopo?"
    },
    "6-3-1": {
      "title": "Trova lo schema",
      "speech": "Cosa viene dopo?",
      "prompt": "Cosa viene dopo?"
    },
    "6-4-1": {
      "title": "Cosa è diverso?",
      "speech": "Cosa non va con gli altri?",
      "prompt": "Cosa non va con gli altri?"
    },
    "6-4-2": {
      "title": "Quale via?",
      "speech": "La strada è bloccata. Cosa aiuta?",
      "prompt": "La strada è bloccata. Cosa aiuta?"
    },
    "6-5-1": {
      "title": "Se muro, allora destra",
      "speech": "Se c'è un muro, gira a destra.",
      "prompt": "Se c'è un muro, gira a destra."
    },
    "6-6-1": {
      "title": "Tre volte avanti",
      "speech": "Ripeti il passo tre volte.",
      "prompt": "Ripeti il passo tre volte."
    },
    "6-7-1": {
      "title": "Cosa manca?",
      "speech": "Quale disegno manca nel quadrato?",
      "prompt": "Quale disegno manca nel quadrato?"
    },
    "6-8-1": {
      "title": "Volare o nuotare",
      "speech": "Chi vola? Chi nuota?",
      "prompt": "Metti ogni animale al posto giusto."
    },
    "6-9-1": {
      "title": "Ordina le grandezze",
      "speech": "Ordina le forme per grandezza.",
      "prompt": "Ordina: grande, medio e piccolo."
    },
    "6-10-1": {
      "title": "Cosa va bene?",
      "speech": "Cosa va insieme?",
      "prompt": "Cosa risponde alla domanda?",
      "deck": [
        { "prompt": "Chi nuota nell'acqua?" },
        { "prompt": "Chi vola nel cielo?" },
        { "prompt": "Chi fa miao?" },
        { "prompt": "Cosa cresce nel prato?" }
      ]
    },
    "6-m-1": {
      "title": "L'ultimo angolo",
      "speech": "Trova la via dietro l'angolo.",
      "prompt": "Trova la via dietro l'angolo."
    },
    "7-0-1": {
      "title": "Funziona così",
      "speech": "Metti i blocchi in basso. Poi parti.",
      "prompt": "Metti i blocchi e premi ▶ Vai.",
      "points": [
        "Ogni blocco è un passo.",
        "Dall'alto verso il basso.",
        "Premi ▶ e Bobby parte."
      ]
    },
    "7-1-1": {
      "title": "Dritto avanti",
      "speech": "Trova la via per la stella.",
      "prompt": "Porta Bobby alla stella."
    },
    "7-1-2": {
      "title": "Tre passi",
      "speech": "Trova la via per la stella.",
      "prompt": "Porta Bobby alla stella."
    },
    "7-1-3": {
      "title": "Prendi la stella",
      "speech": "Trova la via per la stella.",
      "prompt": "Porta Bobby alla stella."
    },
    "7-0-2": {
      "title": "Girare",
      "speech": "Girare non costa un passo.",
      "prompt": "Girare non è un passo.",
      "points": [
        "A destra gira in cerchio.",
        "Poi Bobby continua a camminare."
      ]
    },
    "7-2-1": {
      "title": "Una volta a destra",
      "speech": "Trova la via per la stella.",
      "prompt": "Porta Bobby alla stella."
    },
    "7-2-2": {
      "title": "Dietro l'angolo",
      "speech": "Trova la via per la stella.",
      "prompt": "Porta Bobby alla stella."
    },
    "7-2-3": {
      "title": "Zigzag",
      "speech": "Trova la via per la stella.",
      "prompt": "Porta Bobby alla stella."
    },
    "7-0-3": {
      "title": "Controlla e cambia",
      "speech": "Se non funziona, cambia un blocco.",
      "prompt": "Se non funziona, cambia un blocco.",
      "points": [
        "Guarda cosa succede.",
        "Cambia un blocco.",
        "Riprova."
      ]
    },
    "7-3-1": {
      "title": "Tre volte avanti",
      "speech": "Trova la via per la stella.",
      "prompt": "Porta Bobby alla stella."
    },
    "7-3-2": {
      "title": "Scalini",
      "speech": "Trova la via per la stella.",
      "prompt": "Porta Bobby alla stella."
    },
    "7-3-3": {
      "title": "Se muro, allora destra",
      "speech": "Trova la via per la stella.",
      "prompt": "Porta Bobby alla stella."
    },
    "7-3-4": {
      "title": "Stella o muro",
      "speech": "Trova la via per la stella.",
      "prompt": "Porta Bobby alla stella."
    },
    "7-3-5": {
      "title": "La deviazione",
      "speech": "Trova la via per la stella.",
      "prompt": "Porta Bobby alla stella."
    },
    "7-3-6": {
      "title": "Il grande viaggio",
      "speech": "Trova la via per la stella.",
      "prompt": "Porta Bobby alla stella."
    },
    "7-m-1": {
      "title": "Tutto insieme",
      "speech": "Trova la via per la stella.",
      "prompt": "Porta Bobby alla stella."
    },
    "8-1-1": {
      "title": "Il codice è come una ricetta",
      "speech": "Il codice è un'istruzione per il computer.",
      "prompt": "Il codice è un'istruzione per il computer.",
      "points": [
        "Una ricetta dice cosa fare.",
        "Anche il codice lo fa — per i computer."
      ]
    },
    "8-2-1": {
      "title": "Di' ciao",
      "speech": "Questo comando mostra un messaggio.",
      "prompt": "Questo comando mostra un messaggio.",
      "lineNotes": [
        "Questo comando mostra un testo."
      ]
    },
    "8-3-1": {
      "title": "Una scatola per il nome",
      "speech": "Il computer mette il nome in una scatola.",
      "prompt": "Il computer mette il nome in una scatola.",
      "lineNotes": [
        "Qui nasce la scatola myName.",
        "Si vede il testo che c'è dentro."
      ]
    },
    "8-4-1": {
      "title": "Tre mele",
      "speech": "Tre mele sono nella scatola.",
      "prompt": "Tre mele sono nella scatola.",
      "lineNotes": [
        "La scatola apples riceve il numero tre."
      ]
    },
    "8-5-1": {
      "title": "Cinque stelle",
      "speech": "Due più tre fa cinque.",
      "prompt": "Due più tre fa cinque.",
      "lineNotes": [
        "Il computer calcola due più tre."
      ]
    },
    "8-6-1": {
      "title": "Ciao, funzione!",
      "speech": "Puoi chiamare una funzione tante volte.",
      "prompt": "Puoi chiamare una funzione tante volte.",
      "lineNotes": [
        "Qui si costruisce l'istruzione.",
        "Il testo che c'è dentro.",
        "L'istruzione è pronta.",
        "Ora parte."
      ]
    },
    "8-m-1": {
      "title": "Due numeri",
      "speech": "Due numeri vengono sommati.",
      "prompt": "Due numeri vengono sommati.",
      "lineNotes": [
        "La scatola a riceve due.",
        "La scatola b riceve tre.",
        "Si vede la somma."
      ]
    },
    "9-1-1": {
      "title": "La riga di base",
      "speech": "Così si posano le dita.",
      "prompt": "Così si posano le dita.",
      "points": [
        "Dita su ASDF.",
        "Dita su JKL.",
        "Schiena dritta, piedi fermi."
      ]
    },
    "9-2-1": {
      "title": "Mano sinistra",
      "speech": "Mano sinistra: A S D F.",
      "prompt": "Scrivi con la mano sinistra."
    },
    "9-3-1": {
      "title": "Mano destra",
      "speech": "Mano destra: J K L.",
      "prompt": "Scrivi con la mano destra."
    },
    "9-4-1": {
      "title": "Insieme",
      "speech": "Ora tutte e due le mani.",
      "prompt": "Scrivi alternando sinistra e destra."
    },
    "9-5-1": {
      "title": "Parole con ASDF JKL",
      "speech": "Scrivi paroline con le dita.",
      "prompt": "Queste parole usano solo la riga di base."
    },
    "9-6-1": {
      "title": "Q e W",
      "speech": "In alto a sinistra: Q e W.",
      "prompt": "Q e W sono della mano sinistra."
    },
    "9-7-1": {
      "title": "O e P",
      "speech": "In alto a destra: O e P.",
      "prompt": "O e P sono della mano destra."
    },
    "9-8-1": {
      "title": "M e N",
      "speech": "In basso a destra: M e N.",
      "prompt": "M e N stanno sotto l'indice."
    },
    "9-9-1": {
      "title": "Tutto mescolato",
      "speech": "Ora si mescola tutto.",
      "prompt": "Lettere e parole su tutta la tastiera.",
      "sequences": ["qwas", "opmn", "mano", "luna", "piano"]
    },
    "9-10-1": {
      "title": "Spara alle lettere",
      "speech": "Colpisci le lettere con il razzo.",
      "prompt": "Premi la lettera. Il razzo parte!"
    },
    "9-11-1": {
      "title": "Razzo delle parole",
      "speech": "Scegli livello e ritmo.",
      "prompt": "Scrivi le lettere. Poi parte il razzo.",
      "levels": [
        { "label": "Facile", "pool": ["a", "s", "d", "f", "j", "k", "l"] },
        { "label": "Medio", "pool": ["as", "df", "jk", "kl", "sd", "fj", "lk"] },
        { "label": "Difficile", "pool": ["ala", "dal", "la", "le", "li", "ala"] }
      ]
    },
    "9-m-1": {
      "title": "Prova delle dita",
      "speech": "Mostra cosa sanno fare le tue dita.",
      "prompt": "Tutto insieme: lettere e parole."
    }
  }
};

  content.ui = content.ui || {};
  content.ui.it = {
    " and ": " e ",
    " for ": " per ",
    " min": " min",
    " of ": " di ",
    " sec": " sec",
    " – done": " – fatto",
    " – locked": " – bloccato",
    " – not yet": " – non ancora",
    "% correct": "% corretto",
    "About this app": "Info sull'app",
    "Add child": "Aggiungi bambino",
    "All children": "Tutti i bambini",
    "All good. Keep it up!": "Tutto bene. Continua così!",
    "All letters hit!": "Tutte le lettere colpite!",
    "Almost! The green cards are already right.": "Quasi! Le carte verdi sono già giuste.",
    "Almost! Try a different piece.": "Quasi! Prova un altro pezzo.",
    "Back to the map": "Torna alla mappa",
    "Backup": "Backup",
    "Bela – My First Computer School": "Bela – La mia prima scuola di computer",
    "Bobby does not understand this code.": "Bobby non capisce questo codice.",
    "Bobby got confused.": "Bobby si è confuso.",
    "Bobby reached the star!": "Bobby ha raggiunto la stella!",
    "Bobby's Computer School runs completely offline. No data is sent to a server.": "La scuola di computer di Bobby funziona tutta offline. Nessun dato va a un server.",
    "Cancel": "Annulla",
    "Change sound": "Cambia suono",
    "Check": "Controlla",
    "Child's language": "Lingua del bambino",
    "Child's name": "Nome del bambino",
    "Choose voice": "Scegli la voce",
    "Come on, let us take a look!": "Dai, andiamo a vedere!",
    "Continue": "Continua",
    "Done": "Fatto",
    "Done!": "Fatto!",
    "Done! The picture is complete.": "Fatto! Il disegno è completo.",
    "Every trophy is a big piece of the adventure.": "Ogni trofeo è un pezzo importante dell'avventura.",
    "Face-down card": "Carta coperta",
    "Fast": "Veloce",
    "Follow the line with the arrow keys": "Segui la linea con i tasti freccia",
    "For grown-ups": "Per i grandi",
    "Get Bobby to the star!": "Porta Bobby alla stella!",
    "Get Bobby to the star.": "Porta Bobby alla stella.",
    "Go": "Vai",
    "Good to see you, little explorer!": "Che bello vederti, piccolo esploratore!",
    "Hello! This is how I sound.": "Ciao! La mia voce è questa.",
    "Hit the letters with the rocket.": "Colpisci le lettere con il razzo.",
    "If wall": "Se muro",
    "Key ": "Tasto ",
    "Learning time": "Ora di imparare",
    "Left hand": "Mano sinistra",
    "Lessons": "Lezioni",
    "Let's go!": "Andiamo!",
    "Letter ": "Lettera ",
    "Letters ": "Lettere ",
    "Level and tempo": "Livello e ritmo",
    "Listen": "Ascolta",
    "Load backup": "Carica backup",
    "Load this backup": "Carica questo backup",
    "Look at the yellow ring!": "Guarda l'anello giallo!",
    "My Achievements": "I miei trofei",
    "My First Computer School": "La mia prima scuola di computer",
    "Needs practice": "Da esercitare",
    "New instruction: ": "Nuova istruzione: ",
    "Next": "Avanti",
    "No blocks yet. Tap a block below.": "Ancora nessun blocco. Tocca un blocco qui sotto.",
    "No play time recorded yet.": "Nessun tempo di gioco registrato.",
    "No voice found": "Nessuna voce trovata",
    "Normal": "Normale",
    "Not at the star yet. Try again!": "Non sei ancora alla stella. Riprova!",
    "Not quite. Try again.": "Non proprio. Riprova.",
    "Now tap the matching target.": "Ora tocca il bersaglio giusto.",
    "Now: ": "Adesso: ",
    "Off": "Spento",
    "On": "Acceso",
    "Only learning progress and settings are stored on this device.": "Su questo dispositivo restano solo i progressi e le impostazioni.",
    "Oops, nothing here.": "Ops, qui non c'è niente.",
    "Overview": "Panoramica",
    "Parent area": "Area genitori",
    "Piece ": "Pezzo ",
    "Please solve the task.": "Risolvi l'attività.",
    "Press the key ": "Premi il tasto ",
    "Press ▶ and watch.": "Premi ▶ e guarda.",
    "Progress has been reset.": "I progressi sono stati azzerati.",
    "Progress is not being saved. The browser is blocking storage.": "I progressi non vengono salvati. Il browser blocca la memoria.",
    "Progress stays on this device. A backup file helps when changing computers.": "I progressi restano su questo dispositivo. Un file di backup aiuta quando cambi computer.",
    "Put the picture together!": "Metti insieme il disegno!",
    "Put the picture together.": "Metti insieme il disegno.",
    "Read aloud": "Leggi ad alta voce",
    "Really delete every child's progress?": "Vuoi davvero cancellare i progressi di tutti i bambini?",
    "Reduced motion": "Movimento ridotto",
    "Remove": "Rimuovi",
    "Remove block": "Rimuovi blocco",
    "Rename": "Rinomina",
    "Repeat ×": "Ripeti ×",
    "Reset progress": "Azzera i progressi",
    "Rest your fingers on the home row.": "Appoggia le dita sulla riga di base.",
    "Right hand": "Mano destra",
    "Run: ": "Esegui: ",
    "Save progress": "Salva i progressi",
    "Scroll down …": "Scorri in basso …",
    "Scrollable area": "Area scorrevole",
    "Sessions": "Sessioni",
    "Settings": "Impostazioni",
    "Skip activity": "Salta l'attività",
    "Slot ": "Spazio ",
    "Slow": "Lento",
    "Soon!": "Presto!",
    "Sound": "Suono",
    "Stage complete ✓": "Tappa completata ✓",
    "Stages": "Tappe",
    "Stars": "Stelle",
    "Stars collected": "Stelle raccolte",
    "Tap a slot first.": "Tocca prima uno spazio.",
    "Tap the target": "Tocca il bersaglio",
    "That is quite a long journey!": "Che viaggio lungo!",
    "That was JavaScript!": "Questo era JavaScript!",
    "That was not right. Try again.": "Non era giusto. Riprova.",
    "The last profile cannot be removed.": "L'ultimo profilo non si può rimuovere.",
    "The next block goes here.": "Il prossimo blocco va qui.",
    "There is a wall. Change the path!": "C'è un muro. Cambia il percorso!",
    "This child": "Questo bambino",
    "This game is missing.": "Manca questo gioco.",
    "This is not a Bela backup.": "Questo non è un backup di Bela.",
    "This lesson does not exist.": "Questa lezione non esiste.",
    "This stage does not exist.": "Questa tappa non esiste.",
    "Time for this activity": "Tempo per questa attività",
    "Type your name": "Scrivi il tuo nome",
    "Type: ": "Scrivi: ",
    "Unlock all stages": "Sblocca tutte le tappe",
    "Version 1.0 · No ads · No external links": "Versione 1.0 · Niente pubblicità · Nessun link esterno",
    "Voice": "Voce",
    "We are going back to the map.": "Torniamo alla mappa.",
    "We do not need more blocks.": "Non servono altri blocchi.",
    "What comes next?": "Cosa viene dopo?",
    "Which progress do you want to delete?": "Quali progressi vuoi cancellare?",
    "Who is playing?": "Chi sta giocando?",
    "Yes, delete": "Sì, cancella",
    "Your achievements!": "I tuoi trofei!",
    "Your name": "Il tuo nome",
    "lessons": "lezioni",
    "not started": "non iniziata",
    "started": "iniziata",
    "↺ Clear": "↺ Pulisci",
    "▶ Go": "▶ Vai",
    "▶ Step": "▶ Passo",
    "▶▶ All": "▶▶ Tutto",
    "★ done": "★ fatto",
    "this child": "questo bambino",
    "Good to see you, {name}!": "Che bello vederti, {name}!",
    "{n} stars": "{n} stelle",
    "{title} is finished.": "{title} è finito.",
    "Really delete the progress of {name}?": "Vuoi davvero cancellare i progressi di {name}?",
    "Backup \"{name}\" with {count} child(ren).": "Backup \"{name}\" con {count} bambino/i.",
    "Put {n} on the plate": "Metti {n} sul piatto",
    "Type {word}": "Scrivi {word}"
  };

  content.bobbyFor = content.bobbyFor || {};
  content.bobbyFor.it = {
    "welcome": "Ciao, piccolo esploratore! Sono Bobby.",
    "lessonStart": "Dai, andiamo a vedere!",
    "correct": [
      "Fantastico!",
      "Esatto!",
      "Sei un grande!",
      "Wow, che bravo!",
      "Ottimo lavoro!",
      "Sì! Proprio così!"
    ],
    "wrong": [
      "Quasi! Riprova.",
      "Nessun problema, riprova!",
      "Guarda ancora bene.",
      "Ci siamo quasi. Continuiamo!"
    ],
    "hint": "Guarda qui …",
    "star": "Una stella per te!",
    "locked": "Chiedi a mamma o papà, così si va avanti!",
    "bye": "A presto, piccolo esploratore!",
    "next": "Andiamo avanti!",
    "allDone": "Sei un vero esploratore del computer!",
    "welcomeNamed": function (name) { return "Ciao, " + name + "! Sono Bobby."; },
    "stageDone": function (title) { return "Hai finito «" + title + "»!"; }
  };
})(typeof globalThis !== 'undefined' ? globalThis : this);
