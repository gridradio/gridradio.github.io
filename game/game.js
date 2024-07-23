const phoneticAlphabet = {
    A: 'Alpha', B: 'Bravo', C: 'Charlie', D: 'Delta', E: 'Echo', F: 'Foxtrot', 
    G: 'Golf', H: 'Hotel', I: 'India', J: 'Juliett', K: 'Kilo', L: 'Lima', 
    M: 'Mike', N: 'November', O: 'Oscar', P: 'Papa', Q: 'Quebec', R: 'Romeo', 
    S: 'Sierra', T: 'Tango', U: 'Uniform', V: 'Victor', W: 'Whiskey', 
    X: 'X-ray', Y: 'Yankee', Z: 'Zulu'
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

function getRandomLetter() {
    const letters = Object.keys(phoneticAlphabet);
    return letters[Math.floor(Math.random() * letters.length)];
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
    document.getElementById('timer').innerText = timeLeft;
    document.getElementById('timer').style.color = 'green';
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').innerText = timeLeft;
        if (timeLeft <= 3) {
            document.getElementById('timer').style.color = 'red';
        } else if (timeLeft <= 6) {
            document.getElementById('timer').style.color = 'orange';
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
    document.getElementById('score-container').innerText = '';
    document.getElementById('play-again').style.display = 'none';
    nextRound();
}

function nextRound() {
    if (round >= 10) {
        endGame();
        return;
    }

    round++;
    currentLetter = getRandomLetter();
    const correctWord = phoneticAlphabet[currentLetter];
    const options = generateOptions(correctWord, currentLetter);

    document.getElementById('letter-display').innerText = currentLetter;
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
    document.getElementById('options-container').innerHTML = '';
    document.getElementById('timer').innerText = '';
    document.getElementById('score-container').innerText = `Your score: ${score} / 10`;
    document.getElementById('play-again').style.display = 'block';
}

startGame();
