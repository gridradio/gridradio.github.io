const phoneticAlphabetNATO = {
    A: 'Alpha', B: 'Bravo', C: 'Charlie', D: 'Delta', E: 'Echo', F: 'Foxtrot', 
    G: 'Golf', H: 'Hotel', I: 'India', J: 'Juliett', K: 'Kilo', L: 'Lima', 
    M: 'Mike', N: 'November', O: 'Oscar', P: 'Papa', Q: 'Quebec', R: 'Romeo', 
    S: 'Sierra', T: 'Tango', U: 'Uniform', V: 'Victor', W: 'Whiskey', 
    X: 'X-ray', Y: 'Yankee', Z: 'Zulu'
};

const phoneticAlphabetRAF = {
    A: 'Ace', B: 'Beer', C: 'Charlie', D: 'Don', E: 'Edward', F: 'Freddie', 
    G: 'George', H: 'Harry', I: 'Ink', J: 'Johnnie', K: 'King', L: 'London', 
    M: 'Monkey', N: 'Nuts', O: 'Orange', P: 'Pip', Q: 'Queen', R: 'Robert', 
    S: 'Sugar', T: 'Toc', U: 'Uncle', V: 'Vic', W: 'William', 
    X: 'X-ray', Y: 'Yorker', Z: 'Zebra'
};

const morseCodeAlphabet = {
    A: '.-', B: '-...', C: '-.-.', D: '-..', E: '.', F: '..-.', 
    G: '--.', H: '....', I: '..', J: '.---', K: '-.-', L: '.-..', 
    M: '--', N: '-.', O: '---', P: '.--.', Q: '--.-', R: '.-.', 
    S: '...', T: '-', U: '..-', V: '...-', W: '.--', 
    X: '-..-', Y: '-.--', Z: '--..',
    0: '-----', 1: '.----', 2: '..---', 3: '...--', 4: '....-', 
    5: '.....', 6: '-....', 7: '--...', 8: '---..', 9: '----.'
};

const dictionary = {
    A: ['Apple', 'Ant', 'Anchor', 'Apricot', 'Axe', 'Airplane', 'Arrow', 'Armadillo'], 
    B: ['Banana', 'Boat', 'Button', 'Basket', 'Bee', 'Ball', 'Book', 'Bread'], 
    C: ['Cat', 'Car', 'Castle', 'Cup', 'Candle', 'Corn', 'Cow', 'Cloud'], 
    D: ['Dog', 'Door', 'Dart', 'Duck', 'Drum', 'Doll', 'Dish', 'Desk'], 
    E: ['Egg', 'Elephant', 'Engine', 'Envelope', 'Eagle', 'Earth', 'Elbow', 'Eraser'], 
    F: ['Fish', 'Fan', 'Fork', 'Feather', 'Flag', 'Fruit', 'Frog', 'Fence'], 
    G: ['Goat', 'Guitar', 'Garden', 'Grapes', 'Glass', 'Glove', 'Gate', 'Gold'], 
    H: ['Hat', 'Horse', 'Hammer', 'Heart', 'Helicopter', 'House', 'Hose', 'Hill'], 
    I: ['Igloo', 'Insect', 'Iron', 'Ice', 'Island', 'Ink', 'Ivory', 'Idea'], 
    J: ['Jam', 'Jacket', 'Jungle', 'Juice', 'Jar', 'Jet', 'Jewel', 'Joke'], 
    K: ['Kite', 'Key', 'King', 'Kangaroo', 'Kiwi', 'Knife', 'Kettle', 'Knot'], 
    L: ['Lion', 'Lamp', 'Leaf', 'Lemon', 'Ladder', 'Lake', 'Lava', 'Log'], 
    M: ['Mouse', 'Moon', 'Mountain', 'Mango', 'Map', 'Milk', 'Mug', 'Mud'], 
    N: ['Nose', 'Nest', 'Nut', 'Nail', 'Net', 'Needle', 'Necklace', 'Noodle'], 
    O: ['Orange', 'Oven', 'Octopus', 'Ostrich', 'Oil', 'Onion', 'Owl', 'Oak'], 
    P: ['Pen', 'Pencil', 'Plate', 'Pineapple', 'Pig', 'Pot', 'Pan', 'Pizza'], 
    Q: ['Queen', 'Quilt', 'Quiver', 'Quill', 'Quiz', 'Quart', 'Quartz', 'Queue'], 
    R: ['Rat', 'Rabbit', 'Ring', 'Rope', 'Rug', 'River', 'Radio', 'Rose'], 
    S: ['Sun', 'Snake', 'Star', 'Sand', 'Shell', 'Spoon', 'Shoe', 'Soup'], 
    T: ['Table', 'Tiger', 'Train', 'Tree', 'Tomato', 'Tent', 'Tooth', 'Truck'], 
    U: ['Umbrella', 'Unicorn', 'Uniform', 'Urchin', 'Utensil', 'Urn', 'Upgrade', 'Unit'], 
    V: ['Van', 'Vase', 'Violin', 'Vine', 'Volcano', 'Vulture', 'Vest', 'Vacuum'], 
    W: ['Water', 'Wheel', 'Window', 'Wolf', 'Whale', 'Worm', 'Wing', 'Wagon'], 
    X: ['Xylophone', 'Xenon', 'Xerox', 'X-ray', 'Xenia', 'Xenial', 'Xenopus', 'Xyst'], 
    Y: ['Yarn', 'Yak', 'Yacht', 'Yolk', 'Yam', 'Yogurt', 'Yellow', 'Yard'], 
    Z: ['Zebra', 'Zoo', 'Zero', 'Zip', 'Zinc', 'Zephyr', 'Zipper', 'Zombie']
};

let currentLetter = '';
let score = 0;
let round = 0;
let timer;
let timeLeft;
let confettiAnimationFrame;
let usedLetters = [];
let currentMode = 'nato';
let gameDifficulty = 'normal';
const results = [];

function getRandomLetter() {
    const letters = Object.keys(currentMode === 'nato' ? phoneticAlphabetNATO : currentMode === 'raf' ? phoneticAlphabetRAF : morseCodeAlphabet);
    let letter;
    do {
        letter = letters[Math.floor(Math.random() * letters.length)];
    } while (usedLetters.includes(letter));
    usedLetters.push(letter);
    return letter;
}

function generateOptions(correctWord, letter) {
    const words = dictionary[letter].filter(word => word !== correctWord);
    let options = [correctWord];

    while (options.length < 3) {
        const randomWord = words[Math.floor(Math.random() * words.length)];
        if (!options.includes(randomWord)) {
            options.push(randomWord);
        }
    }

    return options.sort(() => Math.random() - 0.5);
}

function startTimer() {
    timeLeft = 10;
    const timerElement = document.getElementById('timer');
    timerElement.innerText = timeLeft;
    timerElement.style.color = 'green';
    timer = setInterval(() => {
        timeLeft--;
        timerElement.innerText = timeLeft;
        if (timeLeft <= 5 && gameDifficulty === 'easy' && currentMode !== 'morse') {
            showHint();
        }
        if (timeLeft <= 3) {
            timerElement.style.color = 'red';
        } else if (timeLeft <= 6) {
            timerElement.style.color = 'orange';
        }
        if (timeLeft <= 0) {
            clearInterval(timer);
            nextRound();
        }
    }, 1000);
}

function showHint() {
    const correctWord = currentMode === 'nato' ? phoneticAlphabetNATO[currentLetter] : phoneticAlphabetRAF[currentLetter];
    const hint = correctWord.slice(0, 10 - timeLeft);
    document.getElementById('morse-code').innerText = hint;
}

function startGame(mode) {
    score = 0;
    round = 0;
    usedLetters = [];
    results.length = 0;
    currentMode = mode;
    gameDifficulty = document.getElementById('difficulty').value;
    document.getElementById('score-container').innerText = '';
    document.getElementById('feedback').innerText = '';
    document.getElementById('play-again').style.display = 'none';
    document.getElementById('breakdown-container').innerHTML = '';
    document.getElementById('start-container').style.display = 'none';
    document.getElementById('game-container').style.display = 'block';
    document.getElementById('flashcard-container').style.display = 'none';
    document.getElementById('timer').style.display = 'block';
    document.getElementById('round').style.display = 'block';
    stopConfetti();
    nextRound();
}

function nextRound() {
    if (round >= 10) {
        endGame();
        return;
    }

    round++;
    document.getElementById('round').innerText = `Round ${round}`;
    currentLetter = getRandomLetter();

    const correctWord = (currentMode === 'nato' ? phoneticAlphabetNATO : currentMode === 'raf' ? phoneticAlphabetRAF : currentLetter)[currentLetter];
    let options;

    if (currentMode === 'morse') {
        options = generateMorseOptions(currentLetter);
        document.getElementById('letter-display').innerText = morseCodeAlphabet[currentLetter];
        document.getElementById('morse-code').innerText = '';
        playMorseCode(morseCodeAlphabet[currentLetter]);
    } else {
        options = generateOptions(correctWord, currentLetter);
        document.getElementById('letter-display').innerText = currentLetter;
        document.getElementById('morse-code').innerText = morseCodeAlphabet[currentLetter];
    }

    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';
    options.forEach(option => {
        const optionElement = document.createElement('button');
        optionElement.className = 'option';
        optionElement.innerText = option;
        optionElement.onclick = () => {
            clearInterval(timer);
            const result = { question: currentLetter, chosen: option, correctAnswer: currentMode === 'morse' ? currentLetter : correctWord, correct: false };
            if (currentMode === 'morse' ? option === currentLetter : option === correctWord) {
                score++;
                result.correct = true;
            }
            results.push(result);
            nextRound();
        };
        optionsContainer.appendChild(optionElement);
    });

    startTimer();
}

function generateMorseOptions(letter) {
    const letters = Object.keys(morseCodeAlphabet).filter(l => l !== letter);
    let options = [letter];

    while (options.length < 3) {
        const randomLetter = letters[Math.floor(Math.random() * letters.length)];
        if (!options.includes(randomLetter)) {
            options.push(randomLetter);
        }
    }

    return options.sort(() => Math.random() - 0.5);
}

let audioContext;
function playMorseCode(morseCode) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const dotDuration = 0.1; // Duration of a dot in seconds
    const dashDuration = dotDuration * 3; // Duration of a dash in seconds
    const gapDuration = dotDuration; // Gap between symbols in seconds

    let currentTime = audioContext.currentTime;

    morseCode.split('').forEach(symbol => {
        const oscillator = audioContext.createOscillator();
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(700, currentTime);

        if (symbol === '.') {
            oscillator.start(currentTime);
            oscillator.stop(currentTime + dotDuration);
            currentTime += dotDuration + gapDuration;
        } else if (symbol === '-') {
            oscillator.start(currentTime);
            oscillator.stop(currentTime + dashDuration);
            currentTime += dashDuration + gapDuration;
        }

        oscillator.connect(audioContext.destination);
    });
}

function repeatMorseCode() {
    playMorseCode(morseCodeAlphabet[flashcardLetters[flashcardIndex]]);
}

function endGame() {
    document.getElementById('letter-display').innerText = '';
    document.getElementById('morse-code').innerText = '';
    document.getElementById('options-container').innerHTML = '';
    document.getElementById('timer').style.display = 'none';
    document.getElementById('round').style.display = 'none';

    const feedback = document.getElementById('feedback');
    if (score === 10) {
        feedback.innerText = "Perfect! You got 10/10!";
        startConfetti();
    } else if (score >= 7) {
        feedback.innerText = `Great job! You got ${score}/10.`;
    } else if (score >= 4) {
        feedback.innerText = `Not bad! You got ${score}/10.`;
    } else {
        feedback.innerText = `Better luck next time! You got ${score}/10.`;
    }

    document.getElementById('score-container').innerText = `Your score: ${score} / 10`;
    document.getElementById('play-again').style.display = 'block';
    displayBreakdown();
}

function displayBreakdown() {
    const breakdownContainer = document.getElementById('breakdown-container');
    let breakdownHTML = `<table>
        <tr>
            <th>Question</th>
            <th>Chosen Option</th>
            <th>Correct Answer</th>
            <th>Result</th>
        </tr>`;
    results.forEach(result => {
        breakdownHTML += `<tr>
            <td>${currentMode === 'morse' ? morseCodeAlphabet[result.question] : result.question}</td>
            <td>${result.chosen}</td>
            <td>${result.correct ? result.chosen : result.correctAnswer}</td>
            <td>${result.correct ? '✅' : '❌'}</td>
        </tr>`;
    });
    breakdownHTML += '</table>';
    breakdownContainer.innerHTML = breakdownHTML;
}

function startConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const confettiPieces = Array.from({ length: 300 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        color: `hsl(${Math.random() * 360}, 100%, 50%)`,
        size: Math.random() * 10 + 5,
        speed: Math.random() * 3 + 2
    }));

    function drawConfetti() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        confettiPieces.forEach(piece => {
            ctx.fillStyle = piece.color;
            ctx.beginPath();
            ctx.arc(piece.x, piece.y, piece.size, 0, 2 * Math.PI);
            ctx.fill();

            piece.y += piece.speed;
            if (piece.y > canvas.height) {
                piece.y = -piece.size;
                piece.x = Math.random() * canvas.width;
            }
        });
        confettiAnimationFrame = requestAnimationFrame(drawConfetti);
    }

    drawConfetti();
}

function stopConfetti() {
    cancelAnimationFrame(confettiAnimationFrame);
    const canvas = document.getElementById('confetti-canvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function showStartOptions() {
    document.getElementById('start-container').style.display = 'block';
    document.getElementById('game-container').style.display = 'none';
    document.getElementById('flashcard-container').style.display = 'none';
    document.getElementById('timer').style.display = 'none';
    document.getElementById('round').style.display = 'none';
    document.getElementById('score-container').innerText = '';
    document.getElementById('feedback').innerText = '';
    document.getElementById('play-again').style.display = 'none';
    document.getElementById('breakdown-container').innerHTML = '';
}

// Flashcard Mode
let flashcardLetters = [];
let flashcardIndex = 0;

function startFlashcards(mode) {
    currentMode = mode;
    flashcardLetters = Object.keys(mode === 'nato' ? phoneticAlphabetNATO : morseCodeAlphabet);
    flashcardIndex = 0;
    document.getElementById('start-container').style.display = 'none';
    document.getElementById('game-container').style.display = 'none';
    document.getElementById('flashcard-container').style.display = 'flex';
    showFlashcard();
    document.querySelector('.repeat-button').style.display = (mode === 'morse') ? 'inline-block' : 'none';
}

function showFlashcard() {
    const letter = flashcardLetters[flashcardIndex];
    const displayText = currentMode === 'nato' ? phoneticAlphabetNATO[letter] : morseCodeAlphabet[letter];
    document.getElementById('flashcard').innerText = letter;
    document.getElementById('flashcard-code').innerText = displayText;
    if (currentMode === 'morse') {
        playMorseCode(displayText);
    }
}

function nextFlashcard() {
    flashcardIndex = (flashcardIndex + 1) % flashcardLetters.length;
    showFlashcard();
}

function previousFlashcard() {
    flashcardIndex = (flashcardIndex - 1 + flashcardLetters.length) % flashcardLetters.length;
    showFlashcard();
}

// Ensure the game does not start automatically
showStartOptions();
