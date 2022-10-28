let gameHeader = document.querySelector('.game-info');
let hangManImg = document.querySelector(`.hang-man-board img`);
let lettersContainer = document.querySelector('.letters');
let lettersResultsContainer = document.querySelector('.game-letters-result');
let layout = document.querySelector('.layout');

const audioWronge = new Audio(
  './sounds/mixkit-fast-creaking-floorboard-177.wav'
);
const audioLost = new Audio('./sounds/lost.wav');
const audioGood = new Audio('./sounds/good.wav');
const audioWin = new Audio('./sounds/win.wav');

const letters = 'abcdefghijklmnopqrstuvwxyz';
const words = {
  programming: [
    'php',
    'javascript',
    'go',
    'scala',
    'fortran',
    'r',
    'mysql',
    'python',
  ],
  movies: [
    'Prestige',
    'Inception',
    'Parasite',
    'Interstellar',
    'Whiplash',
    'Memento',
    'Coco',
    'Up',
  ],
  people: [
    'Albert Einstein',
    'Hitchcock',
    'Alexander',
    'Cleopatra',
    'Mahatma Ghandi',
  ],
  countries: ['Syria', 'Palestine', 'Yemen', 'Egypt', 'Bahrain', 'Qatar'],
};
// {{Radom Word From Random Category Function}}
let randomProperty = function (obj) {
  let keys = Object.keys(obj);
  let wordFrom = keys[(keys.length * Math.random()) << 0];
  let propertyWord =
    obj[wordFrom][Math.floor(Math.random() * obj[wordFrom].length)];
  return { wordFrom, propertyWord };
};

// {{word info}}
let wordObject = randomProperty(words);
let word = wordObject.propertyWord;
let wordArray = word.toUpperCase().split('');
let matchedWordArray = wordArray.filter((e) => {
  return e !== ' ';
});
let wordCategory = wordObject.wordFrom;

console.log(word);

// {{Header}}
let wordInfo = document.createElement('p');
wordInfo.innerHTML = `Word From: <span>${wordCategory}</span>`;
gameHeader.append(wordInfo);

// {{Game Control}}
let wrongAnswers = 0;
hangManImg.src = `./images/hm${wrongAnswers}.png`;

// letters buttons
let lettersArray = letters.split('');

// Founded Letters
let foundedLetters = [];
let start = function () {
  for (let i = 0; i < lettersArray.length; i++) {
    let letterSpan = document.createElement('span');
    letterText = document.createTextNode(lettersArray[i].toUpperCase());
    let letter = lettersArray[i].toUpperCase();
    letterSpan.append(letterText);
    lettersContainer.append(letterSpan);
    letterSpan.dataset.click = 'false';

    // {{ Letters On Click }}
    letterSpan.onclick = function () {
      if (letterSpan.getAttribute('data-click') === 'false') {
        this.dataset.click = 'true';
        this.className = 'clicked';

        if (word.toUpperCase().includes(letter)) {
          // true
          audioGood.play();
          foundedLetters = [...foundedLetters, letter];
          lettersResultsContainer.innerHTML = '';
          for (let i = 0; i < wordArray.length; i++) {
            let wordLetterSpan = document.createElement('span');

            foundedLetters.includes(wordArray[i]) &&
              (wordLetterSpan.innerText = wordArray[i]);
            wordArray[i] == ' ' &&
              (wordLetterSpan.style.cssText =
                'visibility: hidden; width: 20px;');
            lettersResultsContainer.append(wordLetterSpan);
          }
          if (
            Array.from(new Set(matchedWordArray.sort())).length ===
            Array.from(new Set(foundedLetters.sort())).length
          ) {
            // ON WIN
            audioWin.play();
            winSituation(word);
          }
        } else {
          // false
          if (wrongAnswers < 7) {
            audioWronge.play();
            wrongAnswers++;
            hangManImg.src = `./images/hm${wrongAnswers}.png`;
          } else {
            audioLost.play();
            loseSituation(word);
          }
        }
      }
    };
  }
};
start();
// {{ Letters Results }}
for (let i = 0; i < wordArray.length; i++) {
  let wordLetterSpan = document.createElement('span');
  lettersResultsContainer.append(wordLetterSpan);
  wordArray[i] == ' ' &&
    (wordLetterSpan.style.cssText = 'visibility: hidden; width: 20px;');
}

// {{ Win Situation }}
let winSituation = function (word) {
  let winDiv = document.createElement('div');
  winDiv.className = 'win';
  let firstH1 = document.createElement('h1');
  firstH1.innerText = word;
  let secondH1 = document.createElement('h1');
  secondH1.innerText = 'Good Job You Win!';
  let button = document.createElement('button');
  button.innerText = 'Play Again';
  winDiv.append(firstH1);
  winDiv.append(secondH1);
  winDiv.append(button);
  document.body.append(winDiv);
  layout.style.display = 'block';
  button.onclick = function () {
    layout.style.display = 'none';
    winDiv.remove();
    init();
  };
};

// {{ Lose Situation }}
let loseSituation = function (word) {
  let winDiv = document.createElement('div');
  winDiv.className = 'lose';
  let firstH1 = document.createElement('h1');
  firstH1.innerText = word;
  let secondH1 = document.createElement('h1');
  secondH1.innerText = 'You Lost!';
  let button = document.createElement('button');
  button.innerText = 'Try Again';
  winDiv.append(firstH1);
  winDiv.append(secondH1);
  winDiv.append(button);
  document.body.append(winDiv);
  layout.style.display = 'block';
  button.onclick = function () {
    layout.style.display = 'none';
    winDiv.remove();
    init();
  };
};

// {{ init }}
let init = function () {
  wordObject = randomProperty(words);
  word = wordObject.propertyWord;
  wordArray = word.toUpperCase().split('');
  matchedWordArray = wordArray.filter((e) => {
    return e !== ' ';
  });
  wordInfo.innerHTML = '';
  wordCategory = wordObject.wordFrom;
  wordInfo = document.createElement('p');
  wordInfo.innerHTML = `Word From: <span>${wordCategory}</span>`;
  gameHeader.append(wordInfo);

  // {{Game Control}}
  wrongAnswers = 0;
  hangManImg.src = `./images/hm${wrongAnswers}.png`;

  // letters buttons
  lettersArray = letters.split('');

  // Founded Letters
  foundedLetters = [];

  lettersContainer.innerHTML = '';
  lettersResultsContainer.innerHTML = '';

  for (let i = 0; i < wordArray.length; i++) {
    let wordLetterSpan = document.createElement('span');
    lettersResultsContainer.append(wordLetterSpan);
    wordArray[i] == ' ' &&
      (wordLetterSpan.style.cssText = 'visibility: hidden; width: 20px;');
  }
  start();

  console.log(word);
};
