const phoneticAlphabet = {
    A: 'Alpha', B: 'Bravo', C: 'Charlie', D: 'Delta', E: 'Echo', F: 'Foxtrot', 
    G: 'Golf', H: 'Hotel', I: 'India', J: 'Juliett', K: 'Kilo', L: 'Lima', 
    M: 'Mike', N: 'November', O: 'Oscar', P: 'Papa', Q: 'Quebec', R: 'Romeo', 
    S: 'Sierra', T: 'Tango', U: 'Uniform', V: 'Victor', W: 'Whiskey', 
    X: 'X-ray', Y: 'Yankee', Z: 'Zulu'
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

function generateOptions(correctWord) {
    const allWords = Object.values(phoneticAlphabet);
    let options = [correctWord];

    while (options.length < 3) {
        const randomWord = allWords[Math.floor(Math.random() * allWords.length)];
        if (!options.includes(randomWord)) {
            options.push(randomWord);
        }
    }

    return options.sort(() => Math.random() - 0.5);
}

function startTimer() {
    timeLeft = 10;
    document.getElementById('timer').innerText = timeLeft;
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').innerText = timeLeft;
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
    const options = generateOptions(correctWord);

    document.getElementById('letter-display').innerText = currentLetter;
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';
    options.forEach(option => {
        const optionElement = document.createElement('div');
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
