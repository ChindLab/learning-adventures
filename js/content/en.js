/**
 * en.js – englische Fassung der Inhalte.
 *
 * Deutsch bleibt die Quelle in stage*.js. Diese Datei legt nur die Texte
 * darüber, die sich ändern: Titel, Sprechzeilen, Aufgaben, Punkte und
 * Deck-Fragen. Kurze Beschriftungen (Optionen, Ziele, Karten) kommen aus
 * dem Wörterbuch `lexicon`; fehlt ein Eintrag, bleibt Deutsch stehen.
 *
 * Übersetzt sind die Pilotstufen 1, 2, 6 und 9. Die übrigen Stufen bleiben
 * vorerst deutsch; der Elternbereich weist darauf hin.
 */
(function (root) {
  'use strict';
  var NS = root.BelaSchool = root.BelaSchool || {};
  var content = NS.content = NS.content || {};

  content.en = {
    lexicon: {
      'Maus': 'Mouse',
      'Tastatur': 'Keyboard',
      'Monitor': 'Monitor',
      'Computer': 'Computer',
      'Laptop': 'Laptop',
      'Lautsprecher': 'Speaker',
      'Kamera': 'Camera',
      'Drucker': 'Printer',
      'Bildschirm': 'Screen',
      'Tasten': 'Keys',
      'Pfeil': 'Pointer',
      'Unterwegs': 'On the go',
      'Maus': 'Mouse',
      'Blume': 'Flower',
      'Schmetterling': 'Butterfly',
      'Korb': 'Basket',
      'Apfel': 'Apple',
      'Banane': 'Banana',
      'Orange': 'Orange',
      'Vogel': 'Bird',
      'Fisch': 'Fish',
      'Qualle': 'Jellyfish',
      'Katze': 'Cat',
      'Hund': 'Dog',
      'Ball': 'Ball',
      'Sonne': 'Sun',
      'Stern': 'Star',
      'Truhe mit Knopf': 'Chest with a button',
      'Bild einer Blume': 'Picture of a flower',
      'Fliegt': 'Flies',
      'Schwimmt': 'Swims',
      'Groß': 'Big',
      'Mittel': 'Medium',
      'Klein': 'Small',
      'großer Kreis': 'big circle',
      'großes Quadrat': 'big square',
      'mittlerer Kreis': 'medium circle',
      'mittleres Quadrat': 'medium square',
      'kleiner Kreis': 'small circle',
      'kleines Quadrat': 'small square',
      'Start': 'Start',
      'Rechts drehen': 'Turn right',
      'Zum Stern': 'To the star',
      'Schreiben': 'Writing',
      'Zeigen': 'Pointing',
      'Hören': 'Listening',
      'Geradeaus': 'Straight on',
      'Um die Ecke': 'Around the corner',
      'Leertaste': 'Space bar',
      'Pfeil nach oben': 'Arrow up',
      'Pfeil nach unten': 'Arrow down',
      'Pfeil nach links': 'Arrow left',
      'Pfeil nach rechts': 'Arrow right'
    },

    achievements: {
      s1: 'Computer Explorer',
      s2: 'Mouse Master',
      s3: 'Keyboard Explorer',
      s4: 'Little Typing Star',
      s5: 'Number Explorer',
      s6: 'Little Logic Genius',
      s7: 'Junior Programmer',
      s8: 'First Programmer',
      s9: 'Typing Pro'
    },

    stages: {
      1: { title: 'My Computer', subtitle: 'What is a computer and what belongs to it?' },
      2: { title: 'Mouse Adventures', subtitle: 'Point, click, drag, scroll.' },
      3: { title: 'Keyboard Adventures', subtitle: 'Find the right key.' },
      4: { title: 'Letters & Typing', subtitle: 'From A to Z and the first words.' },
      5: { title: 'Numbers', subtitle: 'Count, compare, plus and minus.' },
      6: { title: 'Logic Games', subtitle: 'Instructions, patterns and clever paths.' },
      7: { title: 'Programming Games', subtitle: 'Bobby runs whatever you tell him.' },
      8: { title: 'My First JavaScript', subtitle: 'What code is and what it does.' },
      9: { title: 'Finger Training', subtitle: 'Typing with all fingers, without hurry.' }
    },

    lessons: {
      '1-1': { title: 'What is a computer?', goal: 'We look at a computer.' },
      '1-2': { title: 'The monitor', goal: 'The monitor shows us pictures.' },
      '1-3': { title: 'The keyboard', goal: 'We write with the keyboard.' },
      '1-4': { title: 'The mouse', goal: 'The mouse points at things.' },
      '1-5': { title: 'The laptop', goal: 'A laptop is a computer to carry.' },
      '1-6': { title: 'Speaker and camera', goal: 'Computers can hear and speak.' },
      '1-7': { title: 'What can computers do?', goal: 'Computers paint, calculate and play music.' },
      '1-8': { title: 'Review everything', goal: 'We remember all the parts.' },
      '1-m': { title: 'Stage finale', goal: 'Show what you already know.' },

      '2-1': { title: 'Move the mouse', goal: 'Move the pointer along the line.' },
      '2-2': { title: 'The pointer', goal: 'Some things can be clicked.' },
      '2-3': { title: 'Clicking', goal: 'Click the stars.' },
      '2-4': { title: 'Double click', goal: 'Two quick clicks open the chest.' },
      '2-5': { title: 'Hold and drag', goal: 'Drag the butterfly to the flower.' },
      '2-6': { title: 'Drag and drop', goal: 'Put all the fruit in the basket.' },
      '2-7': { title: 'Scrolling', goal: 'Scroll down and find Bobby.' },
      '2-8': { title: 'Become a mouse master', goal: 'Four games for steady hands.' },
      '2-m': { title: 'Stage finale', goal: 'One last picture for real mouse masters.' },

      '6-1': { title: 'Instructions', goal: 'Bobby follows your blocks.' },
      '6-2': { title: 'Order', goal: 'The order makes the path.' },
      '6-3': { title: 'Patterns', goal: 'What comes next?' },
      '6-4': { title: 'Logical thinking', goal: 'What does not fit? Which path helps?' },
      '6-5': { title: 'If … then', goal: 'If a wall comes, turn.' },
      '6-6': { title: 'Repeat', goal: 'Three times the same is shorter.' },
      '6-7': { title: 'Patterns in a square', goal: 'Find the pattern in the square.' },
      '6-8': { title: 'What flies, what swims?', goal: 'Sort animals by where they live.' },
      '6-9': { title: 'Big, medium, small', goal: 'Sort shapes by size.' },
      '6-10': { title: 'What belongs together?', goal: 'Connect things.' },
      '6-m': { title: 'Stage finale', goal: 'Turn, walk, arrive.' },

      '9-1': { title: 'How the fingers lie', goal: 'Get to know the home row.' },
      '9-2': { title: 'Left hand: A S D F', goal: 'Four keys for the left hand.' },
      '9-3': { title: 'Right hand: J K L', goal: 'Three keys for the right hand.' },
      '9-4': { title: 'Both hands', goal: 'Alternate left and right.' },
      '9-5': { title: 'Little words', goal: 'Words that only need the home row.' },
      '9-6': { title: 'Top left: Q W', goal: 'The top row with the left hand.' },
      '9-7': { title: 'Top right: O P', goal: 'The top row with the right hand.' },
      '9-8': { title: 'Bottom: M N', goal: 'Reach down with your index finger.' },
      '9-9': { title: 'Mixed and complex', goal: 'Longer paths across the keyboard.' },
      '9-10': { title: 'Star Rocket', goal: 'Type the letter, the rocket flies.' },
      '9-11': { title: 'Word Rocket', goal: 'Pick a level and tempo, then type.' },
      '9-m': { title: 'Stage finale', goal: 'Show what your fingers can do.' },

      '3-1': { title: 'What is a keyboard?', goal: 'Find ten letters on the keyboard.' },
      '3-2': { title: 'Finding numbers', goal: 'Find ten numbers on the keyboard.' },
      '3-3': { title: 'The space bar', goal: 'The space bar makes Bobby jump.' },
      '3-4': { title: 'The Enter key', goal: 'Enter opens the chest.' },
      '3-5': { title: 'The Backspace key', goal: 'Backspace deletes a letter.' },
      '3-6': { title: 'The Shift key', goal: 'Shift makes capital letters.' },
      '3-7': { title: 'The arrow keys', goal: 'Bobby moves with the arrows.' },
      '3-8': { title: 'Everything again', goal: 'Letters, numbers and keys mixed.' },
      '3-m': { title: 'Stage finale', goal: 'Show which key does what.' },

      '4-1': { title: 'A to H', goal: 'Eight letters with pictures.' },
      '4-2': { title: 'I to P', goal: 'Eight more letters.' },
      '4-3': { title: 'Q to Z', goal: 'The last letters.' },
      '4-4': { title: 'Big and small', goal: 'A and a belong together.' },
      '4-5': { title: 'Find the letter', goal: 'Four letters on the keyboard.' },
      '4-6': { title: 'Type a word', goal: 'Seven little words and your name.' },
      '4-m': { title: 'Stage finale', goal: 'Three words without help.' },

      '5-1': { title: 'Numbers from 0 to 5', goal: 'Count the apples.' },
      '5-2': { title: 'Numbers from 6 to 10', goal: 'Now there are more.' },
      '5-3': { title: 'Numbers from 11 to 20', goal: 'You can count big amounts too.' },
      '5-4': { title: 'Practise counting', goal: 'Count flowers.' },
      '5-5': { title: 'Amount and number', goal: 'Which number matches the amount?' },
      '5-6': { title: 'Bigger and smaller', goal: 'Which number is bigger?' },
      '5-7': { title: 'Plus', goal: 'Two and one makes three.' },
      '5-8': { title: 'Minus', goal: 'Five minus two makes three.' },
      '5-m': { title: 'Stage finale', goal: 'Three little sums.' },

      '7-1': { title: 'Blocks and order', goal: 'One block, one step.' },
      '7-2': { title: 'Turning', goal: 'Turn left and right.' },
      '7-3': { title: 'Something is wrong', goal: 'Check, change, try again.' },
      '7-m': { title: 'Stage finale', goal: 'The last big journey.' },

      '8-1': { title: 'What is code?', goal: 'Code is an instruction for the computer.' },
      '8-2': { title: 'The first command', goal: 'alert shows a message.' },
      '8-3': { title: 'Variables', goal: 'A variable is a little box.' },
      '8-4': { title: 'Numbers', goal: 'Three apples in a box.' },
      '8-5': { title: 'Calculating', goal: 'Two and three makes five.' },
      '8-6': { title: 'Functions', goal: 'An instruction you can reuse.' },
      '8-m': { title: 'Stage finale', goal: 'Variables and calculating together.' }
    },

    activities: {
      '1-1-1': { title: 'A computer', speech: 'This is a computer.', prompt: 'This is a computer.', points: ['It calculates very fast.', 'It shows pictures on the monitor.', 'It needs electricity.'] },
      '1-1-2': { title: 'Where is the computer?', speech: 'Point to the computer.', prompt: 'Where is the computer?' },
      '1-2-1': { title: 'The monitor', speech: 'The monitor shows pictures.', prompt: 'The monitor shows pictures.', points: ['It looks like a television.', 'It shows what the computer does.'] },
      '1-2-2': { title: 'Where is the monitor?', speech: 'Point to the monitor.', prompt: 'Where is the monitor?' },
      '1-3-1': { title: 'The keyboard', speech: 'The keyboard has many keys.', prompt: 'The keyboard has many keys.', points: ['Every key has a symbol.', 'You use it to write letters.'] },
      '1-3-2': { title: 'Where is the keyboard?', speech: 'Point to the keyboard.', prompt: 'Where is the keyboard?' },
      '1-4-1': { title: 'The mouse', speech: 'The mouse points at the screen.', prompt: 'The mouse points at the screen.', points: ['It has a little arrow.', 'You use it to click on things.'] },
      '1-4-2': { title: 'Where is the mouse?', speech: 'Point to the mouse.', prompt: 'Where is the mouse?' },
      '1-5-1': { title: 'The laptop', speech: 'A laptop is a computer to carry.', prompt: 'A laptop is a computer to carry.', points: ['Screen and keyboard are together.', 'It has a battery.'] },
      '1-5-2': { title: 'Laptop or big computer?', speech: 'What can you carry?', prompt: 'What can you carry?' },
      '1-6-1': { title: 'Speaker and camera', speech: 'The speaker plays music.', prompt: 'The speaker plays music.', points: ['The camera takes photos.', 'The speaker makes sounds.'] },
      '1-6-2': { title: 'Who takes photos?', speech: 'Who takes photos?', prompt: 'Who takes photos?' },
      '1-7-1': { title: 'So many things', speech: 'Computers can do a lot.', prompt: 'Computers can do a lot.', points: ['They paint pictures.', 'They play music.', 'They calculate with numbers.'] },
      '1-7-2': { title: 'What belongs to a computer?', speech: 'Drag everything to the computer.', prompt: 'Put everything in its place.' },
      '1-8-1': { title: 'Connect the parts', speech: 'Connect the parts with the name.', prompt: 'Connect each part with its name.' },
      '1-8-2': { title: 'Memory', speech: 'Find the matching pictures.', prompt: 'Find the matching pictures.' },
      '1-m-1': {
        title: 'Everything mixed', speech: 'Show what you know.', prompt: 'What belongs where?',
        deck: [
          { prompt: 'Where is the keyboard?' },
          { prompt: 'What do you click with?' },
          { prompt: 'Where do you see pictures?' },
          { prompt: 'What makes music?' },
          { prompt: 'What takes photos?' }
        ]
      },

      '2-1-1': { title: 'Trace the line', speech: 'Move the mouse along the line.', prompt: 'Move the mouse along the line.' },
      '2-2-1': { title: 'What can you click?', speech: 'What can you click?', prompt: 'What can you click?' },
      '2-3-1': { title: 'Catch the stars', speech: 'Click the stars.', prompt: 'Click on each star.' },
      '2-4-1': { title: 'Open the chest', speech: 'Click the chest twice, quickly.', prompt: 'Click the chest twice, quickly.' },
      '2-5-1': { title: 'Butterfly and flower', speech: 'Drag the butterfly to the flower.', prompt: 'Drag the butterfly to the flower.' },
      '2-6-1': { title: 'Fruit in the basket', speech: 'Put all the fruit in the basket.', prompt: 'Put all the fruit in the basket.' },
      '2-7-1': { title: 'Scroll down', speech: 'Scroll down and find Bobby.', prompt: 'Scroll down and find Bobby.', points: ['Turn the mouse wheel.', 'Or drag the bar.'] },
      '2-8-1': { title: 'Medium stars', speech: 'Click the stars.', prompt: 'Click on each star.' },
      '2-8-2': { title: 'Small stars', speech: 'Now the stars get smaller.', prompt: 'Now the stars get smaller.' },
      '2-8-3': { title: 'Flying stars', speech: 'The stars are flying. Click them.', prompt: 'The stars are flying. Click them.' },
      '2-8-4': { title: 'Build the picture', speech: 'Put the picture together.', prompt: 'Put the four pieces together.' },
      '2-8-5': { title: 'New line', speech: 'Move along the line again.', prompt: 'Move the mouse along the line.' },
      '2-m-1': { title: 'Sun picture', speech: 'Put the sun picture together.', prompt: 'Put the sun picture together.' },

      '6-1-1': { title: 'Two steps', speech: 'Place two steps and start.', prompt: 'Get Bobby to the star.' },
      '6-2-1': { title: 'The right way', speech: 'Put the three pictures in the right order.', prompt: 'What comes first, what next?' },
      '6-3-1': { title: 'Spot the pattern', speech: 'What comes next?', prompt: 'What comes next?' },
      '6-4-1': { title: 'What is different?', speech: 'What does not fit with the others?', prompt: 'What does not fit with the others?' },
      '6-4-2': { title: 'Which way?', speech: 'The path is blocked. What helps?', prompt: 'The path is blocked. What helps?' },
      '6-5-1': { title: 'If wall, then right', speech: 'If a wall comes, turn right.', prompt: 'If a wall comes, turn right.' },
      '6-6-1': { title: 'Three times forward', speech: 'Repeat the step three times.', prompt: 'Repeat the step three times.' },
      '6-7-1': { title: 'What is missing?', speech: 'Which picture is missing in the square?', prompt: 'Which picture is missing in the square?' },
      '6-8-1': { title: 'Fly or swim', speech: 'What flies? What swims?', prompt: 'Put each animal in the right place.' },
      '6-9-1': { title: 'Sort sizes', speech: 'Sort the shapes by size.', prompt: 'Sort: big, medium and small.' },
      '6-10-1': {
        title: 'What fits?', speech: 'What belongs together?', prompt: 'What fits the question?',
        deck: [
          { prompt: 'Who swims in water?' },
          { prompt: 'Who flies in the sky?' },
          { prompt: 'Who says meow?' },
          { prompt: 'What grows in the meadow?' }
        ]
      },
      '6-m-1': { title: 'The last corner', speech: 'Find the way around the corner.', prompt: 'Find the way around the corner.' },

      '9-1-1': { title: 'The home row', speech: 'This is how the fingers rest on the keyboard.', prompt: 'This is how the fingers rest on the keyboard.', points: ['Fingers on ASDF.', 'Fingers on JKL.', 'Back straight, feet still.'] },
      '9-2-1': { title: 'Left hand', speech: 'Left hand: A S D F.', prompt: 'Type with your left hand.' },
      '9-3-1': { title: 'Right hand', speech: 'Right hand: J K L.', prompt: 'Type with your right hand.' },
      '9-4-1': { title: 'Together', speech: 'Now both hands together.', prompt: 'Type alternating left and right.' },
      '9-5-1': { title: 'Words with ASDF JKL', speech: 'Type little words with your fingers.', prompt: 'These words only need the home row.' },
      '9-6-1': { title: 'Q and W', speech: 'Top left: Q and W.', prompt: 'Q and W belong to the left hand.' },
      '9-7-1': { title: 'O and P', speech: 'Top right: O and P.', prompt: 'O and P belong to the right hand.' },
      '9-8-1': { title: 'M and N', speech: 'Bottom right: M and N.', prompt: 'M and N sit under your index finger.' },
      '9-9-1': { title: 'Everything mixed', speech: 'Now it gets mixed.', prompt: 'Letters and words across the keyboard.' },
      '9-10-1': { title: 'Shoot the letters', speech: 'Hit the letters with the rocket.', prompt: 'Press the letter. The rocket takes off!' },
      '9-11-1': { title: 'Word Rocket', speech: 'Choose level and tempo.', prompt: 'Type the letters. Then the rocket starts.' },
      '9-m-1': { title: 'Finger test', speech: 'Show what your fingers can do.', prompt: 'All together: letters and words.' },

      '3-1-1': { title: 'Find letters', speech: 'Always press the highlighted key.', prompt: 'Press the key that glows.', hint: 'Look at the yellow ring!' },
      '3-2-1': { title: 'Find numbers', speech: 'Always press the highlighted number.', prompt: 'Press the number that glows.', hint: 'The numbers are at the top.' },
      '3-3-1': { title: 'Space bar', speech: 'Press the space bar. Bobby jumps!', prompt: 'Press the space bar. Bobby jumps!', hint: 'The space bar is at the bottom.' },
      '3-4-1': { title: 'Enter', speech: 'Press Enter and open the chest.', prompt: 'Press Enter and open the chest.', hint: 'Enter is on the right.' },
      '3-5-1': { title: 'Backspace', speech: 'Press Backspace and delete the letter.', prompt: 'Press Backspace and delete the letter.', hint: 'Backspace is at the top right.' },
      '3-6-1': { title: 'Shift', speech: 'Press Shift for a capital letter.', prompt: 'Press Shift for a capital letter.', hint: 'Shift is on the far left.' },
      '3-7-1': { title: 'Arrow keys', speech: 'Press the highlighted arrow.', prompt: 'Press the arrow that glows.', hint: 'The arrows are at the bottom right.' },
      '3-8-1': { title: 'Mixed keys', speech: 'Now it gets mixed.', prompt: 'Mixed now: letters, numbers and keys.', hint: 'Look at the yellow ring!' },
      '3-m-1': {
        title: 'Key quiz', speech: 'Which key fits?', prompt: 'Which key fits?',
        deck: [
          { prompt: 'How do you make a space?' },
          { prompt: 'How do you open something?' },
          { prompt: 'How do you make capital letters?' },
          { prompt: 'How do you delete a letter?' }
        ]
      },

      '4-1-1': {
        title: 'A to H', speech: 'Always press the letter.', prompt: 'Press the letter you see.',
        letters: [
          { word: 'Apple', art: 'apfel' }, { word: 'Ball', art: 'ball' },
          { word: 'Cat', art: 'katze' }, { word: 'Dog', art: 'hund' },
          { word: 'Elephant', art: 'elefant' }, { word: 'Fish', art: 'fisch' },
          { word: 'Guitar', art: 'gitarre' }, { word: 'Hat', art: 'hut' }
        ]
      },
      '4-2-1': {
        title: 'I to P', speech: 'Always press the letter.', prompt: 'Press the letter you see.',
        letters: [
          { word: 'Ice cream', art: 'eis' }, { word: 'Jacket', art: 'jacke' },
          { word: 'Kite', art: 'drachen' }, { word: 'Lamp', art: 'lampe' },
          { word: 'Mouse', art: 'maus' }, { word: 'Nose', art: 'nase' },
          { word: 'Orange', art: 'orange' }, { word: 'Pony', art: 'pferd' }
        ]
      },
      '4-3-1': {
        title: 'Q to Z', speech: 'Always press the letter.', prompt: 'Press the letter you see.',
        letters: [
          { word: 'Queen', art: 'krone' }, { word: 'Robot', art: 'roboter' },
          { word: 'Sun', art: 'sonne' }, { word: 'Tea', art: 'tasse' },
          { word: 'Umbrella', art: 'regenschirm' }, { word: 'Vase', art: 'vase' },
          { word: 'Water', art: 'wasser' }, { word: 'Xylophone', art: 'xylophon' },
          { word: 'Yoga', art: 'yoga' }, { word: 'Zebra', art: 'zebra' }
        ]
      },
      '4-4-1': { title: 'Connect A to F', speech: 'Connect each capital with the small letter.', prompt: 'Connect A with a and so on.' },
      '4-4-2': { title: 'Connect G to L', speech: 'Connect each capital with the small letter.', prompt: 'Connect G with g and so on.' },
      '4-5-1': { title: 'A to F', speech: 'Press the highlighted letters.', prompt: 'Press the letter that glows.', hint: 'The letters are on the keyboard.' },
      '4-5-2': { title: 'G to L', speech: 'Press the highlighted letters.', prompt: 'Press the letter that glows.', hint: 'The letters are on the keyboard.' },
      '4-5-3': { title: 'M to R', speech: 'Press the highlighted letters.', prompt: 'Press the letter that glows.', hint: 'The letters are on the keyboard.' },
      '4-5-4': { title: 'S to Z', speech: 'Press the highlighted letters.', prompt: 'Press the letter that glows.', hint: 'The letters are on the keyboard.' },
      '4-6-1': {
        title: 'Type words', speech: 'Type the word letter by letter.', prompt: 'Type the word.',
        words: [
          { text: 'CAT', label: 'Cat' }, { text: 'DOG', label: 'Dog' },
          { text: 'SUN', label: 'Sun' }, { text: 'MOM', label: 'Mom' },
          { text: 'DAD', label: 'Dad' }, { text: 'BALL', label: 'Ball' },
          { text: 'EGG', label: 'Egg' }
        ]
      },
      '4-6-2': { title: 'Your name', speech: 'Type your name.', prompt: 'Type your name in the box.' },
      '4-m-1': {
        title: 'Three words', speech: 'Type the three words.', prompt: 'Type the three words.',
        words: [
          { text: 'MOM', label: 'Mom' }, { text: 'DAD', label: 'Dad' },
          { text: 'EGG', label: 'Egg' }
        ]
      },

      '5-1-1': { title: 'Count apples', speech: 'How many apples are there?', prompt: 'How many apples are there?' },
      '5-2-1': { title: 'Count stars', speech: 'How many stars are there?', prompt: 'How many stars are there?' },
      '5-3-1': { title: 'Many apples', speech: 'How many apples are there?', prompt: 'How many apples are there?' },
      '5-4-1': { title: 'Count flowers', speech: 'How many flowers are there?', prompt: 'How many flowers are there?' },
      '5-5-1': { title: 'Which number?', speech: 'Which number matches the pictures?', prompt: 'Which number matches the pictures?' },
      '5-6-1': {
        title: 'Bigger or smaller', speech: 'Which number is bigger?', prompt: 'Which number is bigger?',
        deck: [
          { prompt: 'Which number is bigger?' },
          { prompt: 'Which number is smaller?' },
          { prompt: 'Which number is bigger?' }
        ]
      },
      '5-7-1': { title: 'Two plus one', speech: 'Two apples and one apple. How many?', prompt: 'Two apples and one apple. How many are there?' },
      '5-8-1': { title: 'Five minus two', speech: 'Five stars. Two disappear.', prompt: 'Five stars. Two disappear. How many are left?' },
      '5-m-1': { title: 'Sums', speech: 'Solve the three tasks.', prompt: 'How much is that?' },

      '7-0-1': {
        title: 'This is how it works', speech: 'Place blocks below. Then start.', prompt: 'Place blocks and press ▶ Go.',
        points: ['Each block is one step.', 'From top to bottom.', 'Press ▶ and Bobby starts.']
      },
      '7-1-1': { title: 'Straight ahead', speech: 'Find the way to the star.', prompt: 'Get Bobby to the star.' },
      '7-1-2': { title: 'Three steps', speech: 'Find the way to the star.', prompt: 'Get Bobby to the star.' },
      '7-1-3': { title: 'Collect the star', speech: 'Find the way to the star.', prompt: 'Get Bobby to the star.' },
      '7-0-2': {
        title: 'Turning', speech: 'Turning costs no step.', prompt: 'Turning is not a step.',
        points: ['Right turns in a circle.', 'Then Bobby keeps walking.']
      },
      '7-2-1': { title: 'Once right', speech: 'Find the way to the star.', prompt: 'Get Bobby to the star.' },
      '7-2-2': { title: 'Around the corner', speech: 'Find the way to the star.', prompt: 'Get Bobby to the star.' },
      '7-2-3': { title: 'Zigzag', speech: 'Find the way to the star.', prompt: 'Get Bobby to the star.' },
      '7-0-3': {
        title: 'Check and change', speech: 'If it does not work, change a block.', prompt: 'If it does not work, change a block.',
        points: ['Watch what happens.', 'Change one block.', 'Start again.']
      },
      '7-3-1': { title: 'Three times forward', speech: 'Find the way to the star.', prompt: 'Get Bobby to the star.' },
      '7-3-2': { title: 'Staircase', speech: 'Find the way to the star.', prompt: 'Get Bobby to the star.' },
      '7-3-3': { title: 'If wall, then right', speech: 'Find the way to the star.', prompt: 'Get Bobby to the star.' },
      '7-3-4': { title: 'Star or wall', speech: 'Find the way to the star.', prompt: 'Get Bobby to the star.' },
      '7-3-5': { title: 'The detour', speech: 'Find the way to the star.', prompt: 'Get Bobby to the star.' },
      '7-3-6': { title: 'The big journey', speech: 'Find the way to the star.', prompt: 'Get Bobby to the star.' },
      '7-m-1': { title: 'Everything together', speech: 'Find the way to the star.', prompt: 'Get Bobby to the star.' },

      '8-1-1': {
        title: 'Code is like a recipe', speech: 'Code is an instruction for the computer.', prompt: 'Code is an instruction for the computer.',
        points: ['A recipe says what to do.', 'Code does too — for computers.']
      },
      '8-2-1': { title: 'Say hello', speech: 'This command shows a message.', prompt: 'This command shows a message.', lineNotes: ['This command shows a text.'] },
      '8-3-1': { title: 'A box for the name', speech: 'The computer puts the name in a box.', prompt: 'The computer puts the name in a box.', lineNotes: ['This creates the box myName.', 'The text inside it is shown.'] },
      '8-4-1': { title: 'Three apples', speech: 'Three apples are in the box.', prompt: 'Three apples are in the box.', lineNotes: ['The box apples gets the number three.'] },
      '8-5-1': { title: 'Five stars', speech: 'Two plus three makes five.', prompt: 'Two plus three makes five.', lineNotes: ['The computer calculates two plus three.'] },
      '8-6-1': { title: 'Hello, function!', speech: 'You can call a function again and again.', prompt: 'You can call a function again and again.', lineNotes: ['This builds the instruction.', 'The text inside.', 'The instruction is ready.', 'Now it runs.'] },
      '8-m-1': { title: 'Two numbers', speech: 'Two numbers are added together.', prompt: 'Two numbers are added together.', lineNotes: ['Box a gets two.', 'Box b gets three.', 'The sum is shown.'] }
    }
  };
})(typeof globalThis !== 'undefined' ? globalThis : this);
