let targetNumber;
let attempts = 0;
const messageDiv = document.getElementById('message');
const attemptsSpan = document.getElementById('attempts');
const guessInput = document.getElementById('guessInput');
const guessBtn = document.getElementById('guessBtn');

function initGame() {
    targetNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    attemptsSpan.textContent = attempts;
    messageDiv.textContent = '';
    messageDiv.className = '';
    guessInput.value = '';
    guessInput.disabled = false;
    guessBtn.disabled = false;
}

function checkGuess() {
    const userGuess = parseInt(guessInput.value);

    if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
        messageDiv.textContent = "Please enter a valid number between 1 and 100";
        messageDiv.className = 'error';
        return;
    }

    attempts++;
    attemptsSpan.textContent = attempts;

    if (userGuess === targetNumber) {
        messageDiv.textContent = `🎉 Congratulations! You got it in ${attempts} attempts!`;
        messageDiv.className = 'success';
        guessInput.disabled = true;
        guessBtn.disabled = true;
    } else {
        const difference = Math.abs(targetNumber - userGuess);
        let hint = userGuess < targetNumber ? "Too low! " : "Too high! ";

        if (difference > 40) hint += "You're freezing cold! ❄️";
        else if (difference > 20) hint += "You're cold! 🌨️";
        else if (difference > 10) hint += "You're getting warm! 🌤️";
        else if (difference > 5) hint += "You're hot! 🔥";
        else hint += "You're burning hot! 🌋";

        messageDiv.textContent = hint;
        messageDiv.className = '';
    }

    guessInput.value = '';
    guessInput.focus();
}

function resetGame() {
    initGame();
    guessInput.focus();
}

guessInput.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        checkGuess();
    }
});

initGame();