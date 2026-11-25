/**
 * i18n/fr.js – French translation (English is the source in js/content/stage*.js).
 *
 * Loaded after the stages and before app.js. Switch a profile to "fr" and the
 * localizer applies this overlay; "en" uses the source as-is.
 */
(function (root) {
  'use strict';
  var NS = root.BelaSchool = root.BelaSchool || {};
  var content = NS.content = NS.content || {};

  content.translations = content.translations || {};
  content.translations.fr = {
  "lexicon": {
    "Mouse": "Souris",
    "Star": "Étoile",
    "Speaker": "Haut-parleur",
    "Keyboard": "Clavier",
    "Camera": "Caméra",
    "Screen": "Écran",
    "Monitor": "Écran",
    "Computer": "Ordinateur",
    "Laptop": "Ordinateur portable",
    "Writing": "Écrire",
    "Pointing": "Pointer",
    "Listening": "Écouter",
    "Keys": "Touches",
    "Pointer": "Curseur",
    "On the go": "À emporter",
    "Printer": "Imprimante",
    "Chest with a button": "Coffre avec un bouton",
    "Picture of a flower": "Image d'une fleur",
    "Butterfly": "Papillon",
    "Flower": "Fleur",
    "Apple": "Pomme",
    "Banana": "Banane",
    "Basket": "Panier",
    "Ball": "Ballon",
    "Orange": "Orange",
    "Space bar": "Barre d'espace",
    "Turn right": "Tourner à droite",
    "To the star": "Vers l'étoile",
    "Start": "Départ",
    "Cat": "Chat",
    "Dog": "Chien",
    "Straight on": "Tout droit",
    "Around the corner": "Au tournant",
    "Bird": "Oiseau",
    "Fish": "Poisson",
    "Jellyfish": "Méduse",
    "Flies": "Vole",
    "Swims": "Nage",
    "Enter": "Entrée",
    "Backspace": "Retour arrière",
    "Shift": "Maj",
    "big circle": "grand cercle",
    "big square": "grand carré",
    "medium circle": "cercle moyen",
    "medium square": "carré moyen",
    "small circle": "petit cercle",
    "small square": "petit carré",
    "Big": "Grand",
    "Medium": "Moyen",
    "Easy": "Facile",
    "Hard": "Difficile",
    "Small": "Petit"
  },
  "achievements": {
    "s1": "Explorateur d'ordinateurs",
    "s2": "Maître de la souris",
    "s3": "Explorateur du clavier",
    "s4": "Petite étoile de la frappe",
    "s5": "Explorateur des nombres",
    "s6": "Petit génie de la logique",
    "s7": "Programmeur junior",
    "s8": "Premier programmeur",
    "s9": "Pro de la frappe"
  },
  "stages": {
    "1": {
      "title": "Mon ordinateur",
      "subtitle": "Qu'est-ce qu'un ordinateur et ses parties ?"
    },
    "2": {
      "title": "Aventures de souris",
      "subtitle": "Montrer, cliquer, glisser, défiler."
    },
    "3": {
      "title": "Aventures du clavier",
      "subtitle": "Trouve la bonne touche."
    },
    "4": {
      "title": "Lettres et frappe",
      "subtitle": "De A à Z et les premiers mots."
    },
    "5": {
      "title": "Les nombres",
      "subtitle": "Compter, comparer, plus et moins."
    },
    "6": {
      "title": "Jeux de logique",
      "subtitle": "Consignes, motifs et chemins malins."
    },
    "7": {
      "title": "Jeux de programmation",
      "subtitle": "Bobby fait ce que tu lui dis."
    },
    "8": {
      "title": "Mon premier JavaScript",
      "subtitle": "Ce qu'est le code et ce qu'il fait."
    },
    "9": {
      "title": "Entraînement des doigts",
      "subtitle": "Taper avec tous les doigts, sans hâte."
    }
  },
  "lessons": {
    "1-1": {
      "title": "Qu'est-ce qu'un ordinateur ?",
      "goal": "On regarde un ordinateur."
    },
    "1-2": {
      "title": "L'écran",
      "goal": "L'écran nous montre des images."
    },
    "1-3": {
      "title": "Le clavier",
      "goal": "On écrit avec le clavier."
    },
    "1-4": {
      "title": "La souris",
      "goal": "La souris montre les choses."
    },
    "1-5": {
      "title": "L'ordinateur portable",
      "goal": "Un portable se transporte facilement."
    },
    "1-6": {
      "title": "Haut-parleur et caméra",
      "goal": "Les ordinateurs entendent et parlent."
    },
    "1-7": {
      "title": "Que font les ordinateurs ?",
      "goal": "Ils dessinent, calculent et jouent de la musique."
    },
    "1-8": {
      "title": "Tout revoir",
      "goal": "On se souvient de toutes les parties."
    },
    "1-m": {
      "title": "Grande finale",
      "goal": "Montre tout ce que tu sais déjà."
    },
    "2-1": {
      "title": "Bouger la souris",
      "goal": "Suis la ligne avec le curseur."
    },
    "2-2": {
      "title": "Le curseur",
      "goal": "On peut cliquer sur certaines choses."
    },
    "2-3": {
      "title": "Cliquer",
      "goal": "Clique sur les étoiles."
    },
    "2-4": {
      "title": "Double-clic",
      "goal": "Deux clics rapides ouvrent le coffre."
    },
    "2-5": {
      "title": "Cliquer-glisser",
      "goal": "Glisse le papillon vers la fleur."
    },
    "2-6": {
      "title": "Glisser-déposer",
      "goal": "Mets tous les fruits dans le panier."
    },
    "2-7": {
      "title": "Défiler",
      "goal": "Défile vers le bas et trouve Bobby."
    },
    "2-8": {
      "title": "Devenir un pro de la souris",
      "goal": "Quatre jeux pour des mains calmes."
    },
    "2-m": {
      "title": "Grande finale",
      "goal": "Une dernière image pour les pros de la souris."
    },
    "3-1": {
      "title": "Qu'est-ce qu'un clavier ?",
      "goal": "Trouve dix lettres sur le clavier."
    },
    "3-2": {
      "title": "Trouver les chiffres",
      "goal": "Trouve dix chiffres sur le clavier."
    },
    "3-3": {
      "title": "La barre d'espace",
      "goal": "La barre d'espace fait sauter Bobby."
    },
    "3-4": {
      "title": "La touche Entrée",
      "goal": "Entrée ouvre le coffre."
    },
    "3-5": {
      "title": "La touche Retour arrière",
      "goal": "Retour arrière efface une lettre."
    },
    "3-6": {
      "title": "La touche Maj",
      "goal": "Maj fait les lettres majuscules."
    },
    "3-7": {
      "title": "Les flèches",
      "goal": "Bobby bouge avec les flèches."
    },
    "3-8": {
      "title": "Tout encore une fois",
      "goal": "Lettres, chiffres et touches mélangés."
    },
    "3-m": {
      "title": "Grande finale",
      "goal": "Montre quelle touche fait quoi."
    },
    "4-1": {
      "title": "De A à H",
      "goal": "Huit lettres avec des images."
    },
    "4-2": {
      "title": "De I à P",
      "goal": "Huit lettres de plus."
    },
    "4-3": {
      "title": "De Q à Z",
      "goal": "Les dernières lettres."
    },
    "4-4": {
      "title": "Grand et petit",
      "goal": "A et a vont ensemble."
    },
    "4-5": {
      "title": "Trouve la lettre",
      "goal": "Quatre lettres sur le clavier."
    },
    "4-6": {
      "title": "Tape un mot",
      "goal": "Sept petits mots et ton prénom."
    },
    "4-m": {
      "title": "Grande finale",
      "goal": "Trois mots sans aide."
    },
    "5-1": {
      "title": "Les nombres de 0 à 5",
      "goal": "Compte les pommes."
    },
    "5-2": {
      "title": "Les nombres de 6 à 10",
      "goal": "Maintenant, il y en a plus."
    },
    "5-3": {
      "title": "Les nombres de 11 à 20",
      "goal": "On peut compter de grandes quantités."
    },
    "5-4": {
      "title": "S'entraîner à compter",
      "goal": "Compte les fleurs."
    },
    "5-5": {
      "title": "Quantité et nombre",
      "goal": "Quel nombre va avec la quantité ?"
    },
    "5-6": {
      "title": "Plus grand et plus petit",
      "goal": "Quel nombre est plus grand ?"
    },
    "5-7": {
      "title": "Plus",
      "goal": "Deux et un font trois."
    },
    "5-8": {
      "title": "Moins",
      "goal": "Cinq moins deux font trois."
    },
    "5-m": {
      "title": "Grande finale",
      "goal": "Trois petits calculs."
    },
    "6-1": {
      "title": "Les instructions",
      "goal": "Bobby suit tes blocs."
    },
    "6-2": {
      "title": "L'ordre",
      "goal": "L'ordre fait le chemin."
    },
    "6-3": {
      "title": "Les motifs",
      "goal": "Qu'est-ce qui vient après ?"
    },
    "6-4": {
      "title": "La logique",
      "goal": "Qu'est-ce qui ne va pas ? Quel chemin aide ?"
    },
    "6-5": {
      "title": "Si … alors",
      "goal": "Si un mur arrive, tourne."
    },
    "6-6": {
      "title": "Répéter",
      "goal": "Trois fois la même chose, c'est plus court."
    },
    "6-7": {
      "title": "Motifs dans un carré",
      "goal": "Trouve le motif dans le carré."
    },
    "6-8": {
      "title": "Qui vole, qui nage ?",
      "goal": "Trie les animaux selon leur lieu de vie."
    },
    "6-9": {
      "title": "Grand, moyen, petit",
      "goal": "Trie les formes par taille."
    },
    "6-10": {
      "title": "Qu'est-ce qui va ensemble ?",
      "goal": "Relie les choses."
    },
    "6-m": {
      "title": "Grande finale",
      "goal": "Tourne, marche, arrive."
    },
    "7-1": {
      "title": "Blocs et ordre",
      "goal": "Un bloc, un pas."
    },
    "7-2": {
      "title": "Tourner",
      "goal": "Tourne à gauche et à droite."
    },
    "7-3": {
      "title": "Quelque chose cloche",
      "goal": "Vérifie, change, réessaie."
    },
    "7-m": {
      "title": "Grande finale",
      "goal": "Le dernier grand voyage."
    },
    "8-1": {
      "title": "Qu'est-ce que le code ?",
      "goal": "Le code est une consigne pour l'ordinateur."
    },
    "8-2": {
      "title": "La première commande",
      "goal": "alert affiche un message."
    },
    "8-3": {
      "title": "Les variables",
      "goal": "Une variable est une petite boîte."
    },
    "8-4": {
      "title": "Les nombres",
      "goal": "Trois pommes dans une boîte."
    },
    "8-5": {
      "title": "Calculer",
      "goal": "Deux et trois font cinq."
    },
    "8-6": {
      "title": "Les fonctions",
      "goal": "Une consigne que l'on réutilise."
    },
    "8-m": {
      "title": "Grande finale",
      "goal": "Variables et calculs ensemble."
    },
    "9-1": {
      "title": "Comment placer les doigts",
      "goal": "Découvre la rangée de base."
    },
    "9-2": {
      "title": "Main gauche : A S D F",
      "goal": "Quatre touches pour la main gauche."
    },
    "9-3": {
      "title": "Main droite : J K L",
      "goal": "Trois touches pour la main droite."
    },
    "9-4": {
      "title": "Les deux mains",
      "goal": "Alterne la gauche et la droite."
    },
    "9-5": {
      "title": "Les petits mots",
      "goal": "Des mots avec la rangée de base seule."
    },
    "9-6": {
      "title": "En haut à gauche : Q W",
      "goal": "La rangée du haut avec la main gauche."
    },
    "9-7": {
      "title": "En haut à droite : O P",
      "goal": "La rangée du haut avec la main droite."
    },
    "9-8": {
      "title": "En bas : M N",
      "goal": "Descends avec ton index."
    },
    "9-9": {
      "title": "Mélangé et complexe",
      "goal": "Des chemins plus longs sur le clavier."
    },
    "9-10": {
      "title": "Fusée des étoiles",
      "goal": "Tape la lettre, la fusée décolle."
    },
    "9-11": {
      "title": "Fusée des mots",
      "goal": "Choisis un niveau et un tempo, puis tape."
    },
    "9-m": {
      "title": "Grande finale",
      "goal": "Montre ce que tes doigts savent faire."
    }
  },
  "activities": {
    "1-1-1": {
      "title": "Un ordinateur",
      "speech": "Voici un ordinateur.",
      "prompt": "Voici un ordinateur.",
      "points": [
        "Il calcule très vite.",
        "Il montre des images sur l'écran.",
        "Il a besoin d'électricité."
      ]
    },
    "1-1-2": {
      "title": "Où est l'ordinateur ?",
      "speech": "Montre l'ordinateur.",
      "prompt": "Où est l'ordinateur ?"
    },
    "1-2-1": {
      "title": "L'écran",
      "speech": "L'écran montre des images.",
      "prompt": "L'écran montre des images.",
      "points": [
        "Il ressemble à une télévision.",
        "Il montre ce que fait l'ordinateur."
      ]
    },
    "1-2-2": {
      "title": "Où est l'écran ?",
      "speech": "Montre l'écran.",
      "prompt": "Où est l'écran ?"
    },
    "1-3-1": {
      "title": "Le clavier",
      "speech": "Le clavier a beaucoup de touches.",
      "prompt": "Le clavier a beaucoup de touches.",
      "points": [
        "Chaque touche a un symbole.",
        "On écrit des lettres avec."
      ]
    },
    "1-3-2": {
      "title": "Où est le clavier ?",
      "speech": "Montre le clavier.",
      "prompt": "Où est le clavier ?"
    },
    "1-4-1": {
      "title": "La souris",
      "speech": "La souris pointe vers l'écran.",
      "prompt": "La souris pointe vers l'écran.",
      "points": [
        "Elle a une petite flèche.",
        "On clique sur les choses avec."
      ]
    },
    "1-4-2": {
      "title": "Où est la souris ?",
      "speech": "Montre la souris.",
      "prompt": "Où est la souris ?"
    },
    "1-5-1": {
      "title": "L'ordinateur portable",
      "speech": "Un portable est un ordinateur à transporter.",
      "prompt": "Un portable est un ordinateur à transporter.",
      "points": [
        "L'écran et le clavier sont ensemble.",
        "Il a une batterie."
      ]
    },
    "1-5-2": {
      "title": "Portable ou grand ordinateur ?",
      "speech": "Que peux-tu porter ?",
      "prompt": "Que peux-tu porter ?"
    },
    "1-6-1": {
      "title": "Haut-parleur et caméra",
      "speech": "Le haut-parleur joue de la musique.",
      "prompt": "Le haut-parleur joue de la musique.",
      "points": [
        "La caméra prend des photos.",
        "Le haut-parleur fait du son."
      ]
    },
    "1-6-2": {
      "title": "Qui prend des photos ?",
      "speech": "Qui prend des photos ?",
      "prompt": "Qui prend des photos ?"
    },
    "1-7-1": {
      "title": "Tant de choses",
      "speech": "Les ordinateurs savent faire beaucoup.",
      "prompt": "Les ordinateurs savent faire beaucoup.",
      "points": [
        "Ils peignent des images.",
        "Ils jouent de la musique.",
        "Ils calculent avec des nombres."
      ]
    },
    "1-7-2": {
      "title": "Qu'est-ce qui va avec un ordinateur ?",
      "speech": "Glisse tout vers l'ordinateur.",
      "prompt": "Mets chaque chose à sa place."
    },
    "1-8-1": {
      "title": "Relie les parties",
      "speech": "Relie chaque partie à son nom.",
      "prompt": "Relie chaque partie à son nom."
    },
    "1-8-2": {
      "title": "Memory",
      "speech": "Trouve les images identiques.",
      "prompt": "Trouve les images identiques."
    },
    "1-m-1": {
      "title": "Tout mélangé",
      "speech": "Montre ce que tu sais.",
      "prompt": "Qu'est-ce qui va où ?",
      "deck": [
        { "prompt": "Où est le clavier ?" },
        { "prompt": "Avec quoi clique-t-on ?" },
        { "prompt": "Où vois-tu des images ?" },
        { "prompt": "Qui fait de la musique ?" },
        { "prompt": "Qui prend des photos ?" }
      ]
    },
    "2-1-1": {
      "title": "Suis la ligne",
      "speech": "Bouge la souris sur la ligne.",
      "prompt": "Bouge la souris sur la ligne."
    },
    "2-2-1": {
      "title": "Sur quoi peux-tu cliquer ?",
      "speech": "Sur quoi peux-tu cliquer ?",
      "prompt": "Sur quoi peux-tu cliquer ?"
    },
    "2-3-1": {
      "title": "Attrape les étoiles",
      "speech": "Clique sur les étoiles.",
      "prompt": "Clique sur chaque étoile."
    },
    "2-3-2": {
      "title": "Memory de la souris",
      "speech": "Trouve les images identiques.",
      "prompt": "Clique sur deux cartes identiques."
    },
    "2-4-1": {
      "title": "Ouvre le coffre",
      "speech": "Clique deux fois vite sur le coffre.",
      "prompt": "Clique deux fois vite sur le coffre."
    },
    "2-5-1": {
      "title": "Papillon et fleur",
      "speech": "Glisse le papillon vers la fleur.",
      "prompt": "Glisse le papillon vers la fleur."
    },
    "2-6-1": {
      "title": "Des fruits dans le panier",
      "speech": "Mets tous les fruits dans le panier.",
      "prompt": "Mets tous les fruits dans le panier."
    },
    "2-7-1": {
      "title": "Défile vers le bas",
      "speech": "Défile et trouve Bobby.",
      "prompt": "Défile et trouve Bobby.",
      "points": [
        "Tourne la molette de la souris.",
        "Ou glisse la barre."
      ]
    },
    "2-8-1": {
      "title": "Étoiles moyennes",
      "speech": "Clique sur les étoiles.",
      "prompt": "Clique sur chaque étoile."
    },
    "2-8-2": {
      "title": "Petites étoiles",
      "speech": "Les étoiles deviennent plus petites.",
      "prompt": "Les étoiles deviennent plus petites."
    },
    "2-8-3": {
      "title": "Étoiles volantes",
      "speech": "Les étoiles volent. Clique dessus.",
      "prompt": "Les étoiles volent. Clique dessus."
    },
    "2-8-4": {
      "title": "Construis l'image",
      "speech": "Assemble l'image.",
      "prompt": "Assemble les quatre morceaux."
    },
    "2-8-5": {
      "title": "Nouvelle ligne",
      "speech": "Suis la ligne encore une fois.",
      "prompt": "Bouge la souris sur la ligne."
    },
    "2-m-1": {
      "title": "Image du soleil",
      "speech": "Assemble l'image du soleil.",
      "prompt": "Assemble l'image du soleil."
    },
    "3-1-1": {
      "title": "Trouve les lettres",
      "speech": "Appuie sur la touche qui brille.",
      "prompt": "Appuie sur la touche qui brille.",
      "hint": "Regarde l'anneau jaune !"
    },
    "3-1-2": {
      "title": "Memory des touches",
      "speech": "Trouve les touches identiques.",
      "prompt": "Trouve deux cartes avec la même touche."
    },
    "3-2-1": {
      "title": "Trouve les chiffres",
      "speech": "Appuie sur le chiffre qui brille.",
      "prompt": "Appuie sur le chiffre qui brille.",
      "hint": "Les chiffres sont en haut."
    },
    "3-3-1": {
      "title": "Barre d'espace",
      "speech": "Appuie sur la barre d'espace. Bobby saute !",
      "prompt": "Appuie sur la barre d'espace. Bobby saute !",
      "hint": "La barre d'espace est en bas."
    },
    "3-4-1": {
      "title": "Entrée",
      "speech": "Appuie sur Entrée pour ouvrir.",
      "prompt": "Appuie sur Entrée et ouvre le coffre.",
      "hint": "Entrée est à droite."
    },
    "3-5-1": {
      "title": "Retour arrière",
      "speech": "Appuie sur Retour arrière.",
      "prompt": "Efface la lettre avec Retour arrière.",
      "hint": "Retour arrière est en haut à droite."
    },
    "3-6-1": {
      "title": "Maj",
      "speech": "Appuie sur Maj pour une majuscule.",
      "prompt": "Appuie sur Maj pour une majuscule.",
      "hint": "Maj est tout à gauche."
    },
    "3-7-1": {
      "title": "Les flèches",
      "speech": "Appuie sur la flèche qui brille.",
      "prompt": "Appuie sur la flèche qui brille.",
      "hint": "Les flèches sont en bas à droite."
    },
    "3-8-1": {
      "title": "Touches mélangées",
      "speech": "Maintenant, c'est mélangé.",
      "prompt": "Lettres, chiffres et touches mélangés.",
      "hint": "Regarde l'anneau jaune !"
    },
    "3-m-1": {
      "title": "Quiz des touches",
      "speech": "Quelle touche va bien ?",
      "prompt": "Quelle touche va bien ?",
      "deck": [
        { "prompt": "Comment faire un espace ?" },
        { "prompt": "Comment ouvrir quelque chose ?" },
        { "prompt": "Comment faire des majuscules ?" },
        { "prompt": "Comment effacer une lettre ?" }
      ]
    },
    "4-1-1": {
      "title": "De A à H",
      "speech": "Appuie toujours sur la lettre.",
      "prompt": "Appuie sur la lettre que tu vois."
    },
    "4-2-1": {
      "title": "De I à P",
      "speech": "Appuie toujours sur la lettre.",
      "prompt": "Appuie sur la lettre que tu vois."
    },
    "4-3-1": {
      "title": "De Q à Z",
      "speech": "Appuie toujours sur la lettre.",
      "prompt": "Appuie sur la lettre que tu vois."
    },
    "4-4-1": {
      "title": "Relie A à F",
      "speech": "Relie chaque majuscule à sa minuscule.",
      "prompt": "Relie A avec a, et ainsi de suite."
    },
    "4-4-2": {
      "title": "Relie G à L",
      "speech": "Relie chaque majuscule à sa minuscule.",
      "prompt": "Relie G avec g, et ainsi de suite."
    },
    "4-5-1": {
      "title": "De A à F",
      "speech": "Appuie sur les lettres qui brillent.",
      "prompt": "Appuie sur la lettre qui brille.",
      "hint": "Les lettres sont sur le clavier."
    },
    "4-5-2": {
      "title": "De G à L",
      "speech": "Appuie sur les lettres qui brillent.",
      "prompt": "Appuie sur la lettre qui brille.",
      "hint": "Les lettres sont sur le clavier."
    },
    "4-5-3": {
      "title": "De M à R",
      "speech": "Appuie sur les lettres qui brillent.",
      "prompt": "Appuie sur la lettre qui brille.",
      "hint": "Les lettres sont sur le clavier."
    },
    "4-5-4": {
      "title": "De S à Z",
      "speech": "Appuie sur les lettres qui brillent.",
      "prompt": "Appuie sur la lettre qui brille.",
      "hint": "Les lettres sont sur le clavier."
    },
    "4-6-1": {
      "title": "Tape des mots",
      "speech": "Tape le mot lettre par lettre.",
      "prompt": "Tape le mot.",
      "words": [
        { "text": "CHAT", "label": "Chat", "art": "katze" },
        { "text": "CHIEN", "label": "Chien", "art": "hund" },
        { "text": "SOLEIL", "label": "Soleil", "art": "sonne" },
        { "text": "MAMAN", "label": "Maman", "art": "blume" },
        { "text": "PAPA", "label": "Papa", "art": "hut" },
        { "text": "BALLON", "label": "Ballon", "art": "ball" },
        { "text": "OEUF", "label": "Œuf", "art": "ei" }
      ]
    },
    "4-6-2": {
      "title": "Ton prénom",
      "speech": "Tape ton prénom.",
      "prompt": "Tape ton prénom dans la case."
    },
    "4-m-1": {
      "title": "Trois mots",
      "speech": "Tape les trois mots.",
      "prompt": "Tape les trois mots.",
      "words": [
        { "text": "MAMAN", "label": "Maman", "art": "blume" },
        { "text": "PAPA", "label": "Papa", "art": "hut" },
        { "text": "OEUF", "label": "Œuf", "art": "ei" }
      ]
    },
    "5-1-1": {
      "title": "Compte les pommes",
      "speech": "Combien de pommes y a-t-il ?",
      "prompt": "Combien de pommes y a-t-il ?"
    },
    "5-2-1": {
      "title": "Compte les étoiles",
      "speech": "Combien d'étoiles y a-t-il ?",
      "prompt": "Combien d'étoiles y a-t-il ?"
    },
    "5-3-1": {
      "title": "Beaucoup de pommes",
      "speech": "Combien de pommes y a-t-il ?",
      "prompt": "Combien de pommes y a-t-il ?"
    },
    "5-4-1": {
      "title": "Compte les fleurs",
      "speech": "Combien de fleurs y a-t-il ?",
      "prompt": "Combien de fleurs y a-t-il ?"
    },
    "5-5-1": {
      "title": "Quel nombre ?",
      "speech": "Quel nombre va avec les images ?",
      "prompt": "Quel nombre va avec les images ?"
    },
    "5-6-1": {
      "title": "Plus grand ou plus petit",
      "speech": "Quel nombre est plus grand ?",
      "prompt": "Quel nombre est plus grand ?",
      "deck": [
        { "prompt": "Quel nombre est plus grand ?" },
        { "prompt": "Quel nombre est plus petit ?" },
        { "prompt": "Quel nombre est plus grand ?" }
      ]
    },
    "5-7-1": {
      "title": "Deux plus un",
      "speech": "Deux pommes et une pomme. Combien ?",
      "prompt": "Deux pommes et une pomme. Combien y en a-t-il ?"
    },
    "5-8-1": {
      "title": "Cinq moins deux",
      "speech": "Cinq étoiles. Deux s'en vont.",
      "prompt": "Cinq étoiles. Deux s'en vont. Combien en reste-t-il ?"
    },
    "5-m-1": {
      "title": "Calculs",
      "speech": "Résous les trois tâches.",
      "prompt": "Combien cela fait-il ?",
      "deck": [
        { "prompt": "2 + 1 = ?" },
        { "prompt": "4 − 2 = ?" },
        { "prompt": "3 + 3 = ?" }
      ]
    },
    "6-1-1": {
      "title": "Deux pas",
      "speech": "Place deux pas et démarre.",
      "prompt": "Amène Bobby à l'étoile."
    },
    "6-2-1": {
      "title": "Le bon ordre",
      "speech": "Mets les trois images dans l'ordre.",
      "prompt": "Qu'est-ce qui vient d'abord ?"
    },
    "6-3-1": {
      "title": "Trouve le motif",
      "speech": "Qu'est-ce qui vient après ?",
      "prompt": "Qu'est-ce qui vient après ?"
    },
    "6-4-1": {
      "title": "Qu'est-ce qui est différent ?",
      "speech": "Qui n'est pas comme les autres ?",
      "prompt": "Qu'est-ce qui est différent ?"
    },
    "6-4-2": {
      "title": "Quel chemin ?",
      "speech": "Le chemin est bloqué. Qu'est-ce qui aide ?",
      "prompt": "Le chemin est bloqué. Qu'est-ce qui aide ?"
    },
    "6-5-1": {
      "title": "Si mur, alors à droite",
      "speech": "Si un mur arrive, tourne à droite.",
      "prompt": "Si un mur arrive, tourne à droite."
    },
    "6-6-1": {
      "title": "Trois fois en avant",
      "speech": "Répète le pas trois fois.",
      "prompt": "Répète le pas trois fois."
    },
    "6-7-1": {
      "title": "Qu'est-ce qui manque ?",
      "speech": "Quelle image manque dans le carré ?",
      "prompt": "Quelle image manque dans le carré ?"
    },
    "6-8-1": {
      "title": "Voler ou nager",
      "speech": "Qui vole ? Qui nage ?",
      "prompt": "Mets chaque animal à sa place."
    },
    "6-9-1": {
      "title": "Trie les tailles",
      "speech": "Trie les formes par taille.",
      "prompt": "Trie : grand, moyen et petit."
    },
    "6-10-1": {
      "title": "Qu'est-ce qui va bien ?",
      "speech": "Qu'est-ce qui va ensemble ?",
      "prompt": "Qu'est-ce qui répond à la question ?",
      "deck": [
        { "prompt": "Qui nage dans l'eau ?" },
        { "prompt": "Qui vole dans le ciel ?" },
        { "prompt": "Qui fait miaou ?" },
        { "prompt": "Qu'est-ce qui pousse dans le pré ?" }
      ]
    },
    "6-m-1": {
      "title": "Le dernier coin",
      "speech": "Trouve le chemin du coin.",
      "prompt": "Trouve le chemin du coin."
    },
    "7-0-1": {
      "title": "Voilà comment ça marche",
      "speech": "Place des blocs en bas. Puis démarre.",
      "prompt": "Place des blocs et appuie sur ▶ Go.",
      "points": [
        "Chaque bloc est un pas.",
        "De haut en bas.",
        "Appuie sur ▶ et Bobby démarre."
      ]
    },
    "7-1-1": {
      "title": "Tout droit",
      "speech": "Trouve le chemin de l'étoile.",
      "prompt": "Amène Bobby à l'étoile."
    },
    "7-1-2": {
      "title": "Trois pas",
      "speech": "Trouve le chemin de l'étoile.",
      "prompt": "Amène Bobby à l'étoile."
    },
    "7-1-3": {
      "title": "Prends l'étoile",
      "speech": "Trouve le chemin de l'étoile.",
      "prompt": "Amène Bobby à l'étoile."
    },
    "7-0-2": {
      "title": "Tourner",
      "speech": "Tourner ne coûte pas de pas.",
      "prompt": "Tourner n'est pas un pas.",
      "points": [
        "À droite, en rond.",
        "Puis Bobby continue d'avancer."
      ]
    },
    "7-2-1": {
      "title": "Une fois à droite",
      "speech": "Trouve le chemin de l'étoile.",
      "prompt": "Amène Bobby à l'étoile."
    },
    "7-2-2": {
      "title": "Au tournant",
      "speech": "Trouve le chemin de l'étoile.",
      "prompt": "Amène Bobby à l'étoile."
    },
    "7-2-3": {
      "title": "Zigzag",
      "speech": "Trouve le chemin de l'étoile.",
      "prompt": "Amène Bobby à l'étoile."
    },
    "7-0-3": {
      "title": "Vérifie et change",
      "speech": "Si ça ne marche pas, change un bloc.",
      "prompt": "Si ça ne marche pas, change un bloc.",
      "points": [
        "Regarde ce qui se passe.",
        "Change un bloc.",
        "Recommence."
      ]
    },
    "7-3-1": {
      "title": "Trois fois en avant",
      "speech": "Trouve le chemin de l'étoile.",
      "prompt": "Amène Bobby à l'étoile."
    },
    "7-3-2": {
      "title": "L'escalier",
      "speech": "Trouve le chemin de l'étoile.",
      "prompt": "Amène Bobby à l'étoile."
    },
    "7-3-3": {
      "title": "Si mur, alors à droite",
      "speech": "Trouve le chemin de l'étoile.",
      "prompt": "Amène Bobby à l'étoile."
    },
    "7-3-4": {
      "title": "Étoile ou mur",
      "speech": "Trouve le chemin de l'étoile.",
      "prompt": "Amène Bobby à l'étoile."
    },
    "7-3-5": {
      "title": "Le détour",
      "speech": "Trouve le chemin de l'étoile.",
      "prompt": "Amène Bobby à l'étoile."
    },
    "7-3-6": {
      "title": "Le grand voyage",
      "speech": "Trouve le chemin de l'étoile.",
      "prompt": "Amène Bobby à l'étoile."
    },
    "7-m-1": {
      "title": "Tout ensemble",
      "speech": "Trouve le chemin de l'étoile.",
      "prompt": "Amène Bobby à l'étoile."
    },
    "8-1-1": {
      "title": "Le code, c'est comme une recette",
      "speech": "Le code est une consigne pour l'ordinateur.",
      "prompt": "Le code est une consigne pour l'ordinateur.",
      "points": [
        "Une recette dit quoi faire.",
        "Le code aussi, pour l'ordinateur."
      ]
    },
    "8-2-1": {
      "title": "Dis bonjour",
      "speech": "Cette commande affiche un message.",
      "prompt": "Cette commande affiche un message.",
      "lineNotes": [
        "Cette commande affiche un texte."
      ]
    },
    "8-3-1": {
      "title": "Une boîte pour le prénom",
      "speech": "L'ordinateur met le prénom dans une boîte.",
      "prompt": "L'ordinateur met le prénom dans une boîte.",
      "lineNotes": [
        "Ici, la boîte myName est créée.",
        "Le texte qu'elle contient s'affiche."
      ]
    },
    "8-4-1": {
      "title": "Trois pommes",
      "speech": "Trois pommes sont dans la boîte.",
      "prompt": "Trois pommes sont dans la boîte.",
      "lineNotes": [
        "La boîte apples reçoit le nombre trois."
      ]
    },
    "8-5-1": {
      "title": "Cinq étoiles",
      "speech": "Deux plus trois font cinq.",
      "prompt": "Deux plus trois font cinq.",
      "lineNotes": [
        "L'ordinateur calcule deux plus trois."
      ]
    },
    "8-6-1": {
      "title": "Bonjour, fonction !",
      "speech": "On peut appeler une fonction souvent.",
      "prompt": "Tu peux appeler une fonction encore et encore.",
      "lineNotes": [
        "Ici, la consigne est construite.",
        "Le texte à l'intérieur.",
        "La consigne est prête.",
        "Maintenant, elle s'exécute."
      ]
    },
    "8-m-1": {
      "title": "Deux nombres",
      "speech": "Deux nombres sont additionnés.",
      "prompt": "Deux nombres sont additionnés.",
      "lineNotes": [
        "La boîte a reçoit deux.",
        "La boîte b reçoit trois.",
        "La somme s'affiche."
      ]
    },
    "9-1-1": {
      "title": "La rangée de base",
      "speech": "Voici comment reposent les doigts.",
      "prompt": "Voici comment reposent les doigts.",
      "points": [
        "Les doigts sur ASDF.",
        "Les doigts sur JKL.",
        "Dos droit, pieds immobiles."
      ]
    },
    "9-2-1": {
      "title": "Main gauche",
      "speech": "Main gauche : A S D F.",
      "prompt": "Tape avec ta main gauche."
    },
    "9-3-1": {
      "title": "Main droite",
      "speech": "Main droite : J K L.",
      "prompt": "Tape avec ta main droite."
    },
    "9-4-1": {
      "title": "Ensemble",
      "speech": "Maintenant, les deux mains ensemble.",
      "prompt": "Tape en alternant gauche et droite."
    },
    "9-5-1": {
      "title": "Mots avec ASDF JKL",
      "speech": "Tape des petits mots avec tes doigts.",
      "prompt": "Ces mots n'ont besoin que de la rangée de base."
    },
    "9-6-1": {
      "title": "Q et W",
      "speech": "En haut à gauche : Q et W.",
      "prompt": "Q et W vont avec la main gauche."
    },
    "9-7-1": {
      "title": "O et P",
      "speech": "En haut à droite : O et P.",
      "prompt": "O et P vont avec la main droite."
    },
    "9-8-1": {
      "title": "M et N",
      "speech": "En bas à droite : M et N.",
      "prompt": "M et N sont sous ton index."
    },
    "9-9-1": {
      "title": "Tout mélangé",
      "speech": "Maintenant, on mélange.",
      "prompt": "Lettres et mots sur tout le clavier.",
      "sequences": ["qwas", "opmn", "main", "lune", "plan"]
    },
    "9-10-1": {
      "title": "Tire sur les lettres",
      "speech": "Touche les lettres avec la fusée.",
      "prompt": "Appuie sur la lettre. La fusée décolle !"
    },
    "9-11-1": {
      "title": "Fusée des mots",
      "speech": "Choisis le niveau et le tempo.",
      "prompt": "Tape les lettres. Puis la fusée démarre.",
      "levels": [
        { "label": "Facile", "pool": ["a", "s", "d", "f", "j", "k", "l"] },
        { "label": "Moyen", "pool": ["as", "df", "jk", "kl", "sd", "fj", "lk"] },
        { "label": "Difficile", "pool": ["sac", "mal", "las", "cas", "mas", "bal"] }
      ]
    },
    "9-m-1": {
      "title": "Test des doigts",
      "speech": "Montre ce que tes doigts savent faire.",
      "prompt": "Tout ensemble : lettres et mots."
    }
  }
};

  content.ui = content.ui || {};
  content.ui.fr = {
    " and ": " et ",
    " for ": " pour ",
    " min": " min",
    " of ": " sur ",
    " sec": " s",
    " – done": " – terminé",
    " – locked": " – verrouillé",
    " – not yet": " – pas encore",
    "% correct": "% juste",
    "About this app": "À propos de cette appli",
    "Add child": "Ajouter un enfant",
    "All children": "Tous les enfants",
    "All good. Keep it up!": "Tout va bien. Continue !",
    "All letters hit!": "Toutes les lettres touchées !",
    "Almost! The green cards are already right.": "Presque ! Les cartes vertes sont déjà justes.",
    "Almost! Try a different piece.": "Presque ! Essaie une autre pièce.",
    "Back to the map": "Retour à la carte",
    "Backup": "Sauvegarde",
    "Bela – My First Computer School": "Bela – Mon école d'informatique",
    "Bobby does not understand this code.": "Bobby ne comprend pas ce code.",
    "Bobby got confused.": "Bobby est un peu perdu.",
    "Bobby reached the star!": "Bobby a atteint l'étoile !",
    "Bobby's Computer School runs completely offline. No data is sent to a server.": "L'école d'informatique de Bobby marche hors ligne. Rien n'est envoyé à un serveur.",
    "Cancel": "Annuler",
    "Change sound": "Changer le son",
    "Check": "Vérifier",
    "Child's language": "Langue de l'enfant",
    "Child's name": "Prénom de l'enfant",
    "Choose voice": "Choisir la voix",
    "Come on, let us take a look!": "Viens, on va regarder !",
    "Continue": "Continuer",
    "Done": "Terminé",
    "Done!": "Terminé !",
    "Done! The picture is complete.": "Terminé ! L'image est complète.",
    "Every trophy is a big piece of the adventure.": "Chaque trophée est un morceau de l'aventure.",
    "Face-down card": "Carte face cachée",
    "Fast": "Rapide",
    "Follow the line with the arrow keys": "Suis la ligne avec les flèches",
    "For grown-ups": "Pour les adultes",
    "Get Bobby to the star!": "Amène Bobby à l'étoile !",
    "Get Bobby to the star.": "Amène Bobby à l'étoile.",
    "Go": "Démarrer",
    "Good to see you, little explorer!": "Content de te voir, petit explorateur !",
    "Hello! This is how I sound.": "Bonjour ! Voilà ma voix.",
    "Hit the letters with the rocket.": "Touche les lettres avec la fusée.",
    "If wall": "Si mur",
    "Key ": "Touche ",
    "Learning time": "Temps d'apprentissage",
    "Left hand": "Main gauche",
    "Lessons": "Leçons",
    "Let's go!": "C'est parti !",
    "Letter ": "Lettre ",
    "Letters ": "Lettres ",
    "Level and tempo": "Niveau et tempo",
    "Listen": "Écouter",
    "Load backup": "Charger une sauvegarde",
    "Load this backup": "Charger cette sauvegarde",
    "Look at the yellow ring!": "Regarde l'anneau jaune !",
    "My Achievements": "Mes trophées",
    "My First Computer School": "Mon école d'informatique",
    "Needs practice": "À s'entraîner",
    "New instruction: ": "Nouvelle consigne : ",
    "Next": "Suivant",
    "No blocks yet. Tap a block below.": "Pas encore de bloc. Touche un bloc en bas.",
    "No play time recorded yet.": "Pas encore de temps de jeu.",
    "No voice found": "Aucune voix trouvée",
    "Normal": "Normal",
    "Not at the star yet. Try again!": "Pas encore à l'étoile. Réessaie !",
    "Not quite. Try again.": "Presque. Réessaie.",
    "Now tap the matching target.": "Touche la bonne cible.",
    "Now: ": "Maintenant : ",
    "Off": "Non",
    "On": "Oui",
    "Only learning progress and settings are stored on this device.": "Seuls les progrès et les réglages restent sur cet appareil.",
    "Oops, nothing here.": "Oups, rien ici.",
    "Overview": "Aperçu",
    "Parent area": "Espace parents",
    "Piece ": "Morceau ",
    "Please solve the task.": "Résous la tâche, s'il te plaît.",
    "Press the key ": "Appuie sur la touche ",
    "Press ▶ and watch.": "Appuie sur ▶ et regarde.",
    "Progress has been reset.": "Les progrès sont effacés.",
    "Progress is not being saved. The browser is blocking storage.": "Les progrès ne sont pas enregistrés. Le navigateur bloque le stockage.",
    "Progress stays on this device. A backup file helps when changing computers.": "Les progrès restent sur cet appareil. Une sauvegarde aide quand on change d'ordinateur.",
    "Put the picture together!": "Assemble l'image !",
    "Put the picture together.": "Assemble l'image.",
    "Read aloud": "Lire à voix haute",
    "Really delete every child's progress?": "Vraiment effacer les progrès de tous les enfants ?",
    "Reduced motion": "Moins d'animations",
    "Remove": "Retirer",
    "Remove block": "Retirer le bloc",
    "Rename": "Renommer",
    "Repeat ×": "Répéter ×",
    "Reset progress": "Effacer les progrès",
    "Rest your fingers on the home row.": "Pose tes doigts sur la rangée de base.",
    "Right hand": "Main droite",
    "Run: ": "Lancer : ",
    "Save progress": "Sauvegarder les progrès",
    "Scroll down …": "Défile vers le bas …",
    "Scrollable area": "Zone défilante",
    "Sessions": "Sessions",
    "Settings": "Réglages",
    "Skip activity": "Passer l'activité",
    "Slot ": "Emplacement ",
    "Slow": "Lent",
    "Soon!": "Bientôt !",
    "Sound": "Son",
    "Stage complete ✓": "Étape terminée ✓",
    "Stages": "Étapes",
    "Stars": "Étoiles",
    "Stars collected": "Étoiles gagnées",
    "Tap a slot first.": "Touche d'abord un emplacement.",
    "Tap the target": "Touche la cible",
    "That is quite a long journey!": "Quel long voyage !",
    "That was JavaScript!": "C'était du JavaScript !",
    "That was not right. Try again.": "Ce n'était pas ça. Réessaie.",
    "The last profile cannot be removed.": "Le dernier profil ne peut pas être retiré.",
    "The next block goes here.": "Le prochain bloc va ici.",
    "There is a wall. Change the path!": "Il y a un mur. Change le chemin !",
    "This child": "Cet enfant",
    "This game is missing.": "Ce jeu manque.",
    "This is not a Bela backup.": "Ce n'est pas une sauvegarde Bela.",
    "This lesson does not exist.": "Cette leçon n'existe pas.",
    "This stage does not exist.": "Cette étape n'existe pas.",
    "Time for this activity": "Temps pour cette activité",
    "Type your name": "Tape ton prénom",
    "Type: ": "Tape : ",
    "Unlock all stages": "Débloquer toutes les étapes",
    "Version 1.0 · No ads · No external links": "Version 1.0 · Sans pub · Sans liens externes",
    "Voice": "Voix",
    "We are going back to the map.": "On retourne à la carte.",
    "We do not need more blocks.": "On n'a pas besoin d'autres blocs.",
    "What comes next?": "Qu'est-ce qui vient après ?",
    "Which progress do you want to delete?": "Quels progrès veux-tu effacer ?",
    "Who is playing?": "Qui joue ?",
    "Yes, delete": "Oui, effacer",
    "Your achievements!": "Tes trophées !",
    "Your name": "Ton prénom",
    "lessons": "leçons",
    "not started": "pas commencé",
    "started": "commencé",
    "↺ Clear": "↺ Effacer",
    "▶ Go": "▶ Démarrer",
    "▶ Step": "▶ Pas",
    "▶▶ All": "▶▶ Tout",
    "★ done": "★ terminé",
    "this child": "cet enfant",
    "Good to see you, {name}!": "Content de te voir, {name} !",
    "{n} stars": "{n} étoiles",
    "{title} is finished.": "{title} est terminé.",
    "Really delete the progress of {name}?": "Vraiment effacer les progrès de {name} ?",
    "Backup \"{name}\" with {count} child(ren).": "Sauvegarde « {name} » avec {count} enfant(s).",
    "Put {n} on the plate": "Mets {n} sur l'assiette",
    "Type {word}": "Tape {word}"
  };

  content.bobbyFor = content.bobbyFor || {};
  content.bobbyFor.fr = {
  "welcome": "Bonjour, petit explorateur ! Je suis Bobby.",
  "lessonStart": "Viens, on va regarder !",
  "correct": [
    "Bravo !",
    "Exactement !",
    "Tu es génial !",
    "Waouh, tu as trouvé !",
    "C'était très bien !",
    "Oui ! Comme ça !"
  ],
  "wrong": [
    "Presque ! Réessaie.",
    "Pas de souci, encore une fois !",
    "Regarde encore de près.",
    "Tout près. On continue !"
  ],
  "hint": "Regarde par ici …",
  "star": "Une étoile pour toi !",
  "locked": "Demande à maman ou papa, puis on continue !",
  "bye": "À bientôt, petit explorateur !",
  "next": "On continue !",
  "allDone": "Tu es un vrai explorateur d'ordinateurs !",
  "welcomeNamed": function (name) { return "Bonjour, " + name + " ! Je suis Bobby."; },
  "stageDone": function (title) { return "Tu as fini « " + title + " » !"; }
};
  content.bobbyFr = content.bobbyFor.fr;
})(typeof globalThis !== 'undefined' ? globalThis : this);
