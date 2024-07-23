const phoneticAlphabet = {
    A: 'Alpha', B: 'Bravo', C: 'Charlie', D: 'Delta', E: 'Echo', F: 'Foxtrot', 
    G: 'Golf', H: 'Hotel', I: 'India', J: 'Juliett', K: 'Kilo', L: 'Lima', 
    M: 'Mike', N: 'November', O: 'Oscar', P: 'Papa', Q: 'Quebec', R: 'Romeo', 
    S: 'Sierra', T: 'Tango', U: 'Uniform', V: 'Victor', W: 'Whiskey', 
    X: 'X-ray', Y: 'Yankee', Z: 'Zulu'
};

const morseCodeAlphabet = {
    A: '.-', B: '-...', C: '-.-.', D: '-..', E: '.', F: '..-.', 
    G: '--.', H: '....', I: '..', J: '.---', K: '-.-', L: '.-..', 
    M: '--', N: '-.', O: '---', P: '.--.', Q: '--.-', R: '.-.', 
    S: '...', T: '-', U: '..-', V: '...-', W: '.--', 
    X: '-..-', Y: '-.--', Z: '--..'
};

const dictionary = {
    A: ['Apple', 'Ant', 'Anchor'], B: ['Banana', 'Boat', 'Button'], 
    C: ['Cat', 'Car', 'Castle'], D: ['Dog', 'Door', 'Dart'], 
    E: ['Egg', 'Elephant', 'Engine'], F: ['Fish', 'Fan', 'Fork'], 
    G: ['Goat', 'Guitar', 'Garden'], H: ['Hat', 'Horse', 'Hammer'], 
    I: ['Igloo', 'Insect', 'Iron'], J: ['Jam', 'Jacket', 'Jungle'], 
    K: ['Kite', 'Key', 'King'], L: ['Lion', 'Lamp', 'Leaf'], 
    M: ['Mouse', 'Moon', 'Mountain'], N: ['Nose', 'Nest', 'Nut'], 
    O: ['Orange', 'Oven', 'Octopus'], P: ['Pen', 'Pencil', 'Plate'], 
    Q: ['Queen', 'Quilt', 'Quiver'], R: ['Rat', 'Rabbit', 'Ring'], 
    S: ['Sun', 'Snake', 'Star'], T: ['Table', 'Tiger', 'Train'], 
    U: ['Umbrella', 'Unicorn', 'Uniform'], V: ['Van', 'Vase', 'Violin'], 
    W: ['Water', 'Wheel', 'Window'], X: ['Xylophone', 'Xenon', 'Xerox'], 
    Y: ['Yarn', 'Yak', 'Yacht'], Z: ['Zebra', 'Zoo', 'Zero']
};

let currentLetter = '';
let score = 0;
let round = 0;
let timer;
let timeLeft;
let confettiAnimationFrame;
let usedLetters = [];

function getRandomLetter() {
    const letters = Object.keys(phoneticAlphabet);
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

function startGame() {
    score = 0;
    round = 0;
    usedLetters = [];
    document.getElementById('score-container').innerText = '';
    document.getElementById('feedback').innerText = '';
    document.getElementById('play-again').style.display = 'none';
    document.getElementById('start-container').style.display = 'none';
    document.getElementById('game-container').style.display = 'block';
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
    document.getElementById('round').innerText = `Round: ${round}`;
    currentLetter = getRandomLetter();
    const correctWord = phoneticAlphabet[currentLetter];
    const options = generateOptions(correctWord, currentLetter);

    document.getElementById('letter-display').innerText = currentLetter;
    document.getElementById('morse-code').innerText = morseCodeAlphabet[currentLetter];
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';
    options.forEach(option => {
        const optionElement = document.createElement('button');
        optionElement.className = 'option';
        optionElement.innerText = option;
        optionElement.onclick = () => {
            clearInterval(timer);
            if (option === correctWord) {
                score++;
            }
            nextRound();
        };
        optionsContainer.appendChild(optionElement);
    });

    startTimer();
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

// Ensure the game does not start automatically
document.getElementById('start-container').style.display = 'block';
document.getElementById('game-container').style.display = 'none';
document.getElementById('timer').style.display = 'none';
document.getElementById('round').style.display = 'none';
document.getElementById('score-container').innerText = '';
document.getElementById('feedback').innerText = '';
document.getElementById('play-again').style.display = 'none';
