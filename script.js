let secretNumber;
let attempts;
let currentPlayer = '';
let players = JSON.parse(localStorage.getItem('players')) || {};

function exitGame() {
    if(confirm('Are you sure you want to exit the game?')) {
        window.close();
        window.location.href = "about:blank";
    }
}

function confirmExit() {
    if(confirm('Are you sure you want to exit? Your progress will be saved.')) {
        window.location.reload();
    }
}

function startGame() {
    const name = document.getElementById('playerName').value.trim();
    if (!name) {
        alert('Please enter your name!');
        return;
    }

    currentPlayer = name;
    if (!players[currentPlayer]) {
        players[currentPlayer] = { bestScore: 0, gamesPlayed: 0 };
    }

    document.getElementById('playerNameDisplay').textContent = currentPlayer;
    document.getElementById('welcomeScreen').style.display = 'none';
    document.getElementById('gameScreen').style.display = 'flex';
    
    initGame();
}

function initGame() {
    secretNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    document.getElementById('attempts').textContent = attempts;
    document.getElementById('highScore').textContent = players[currentPlayer].bestScore || '-';
    document.getElementById('message').textContent = '';
    document.getElementById('message').className = '';
    document.getElementById('guessInput').value = '';
    document.getElementById('guessInput').disabled = false;
}


function checkGuess() {
    const guess = parseInt(document.getElementById('guessInput').value);
    
    if (isNaN(guess) || guess < 1 || guess > 100) {
        showMessage('Please enter a valid number between 1 and 100', 'error');
        return;
    }

    attempts++;
    document.getElementById('attempts').textContent = attempts;

    if (guess === secretNumber) {
        handleWin();
    } else {
        const hint = guess > secretNumber ? 'Too high! Try lower 👇' : 'Too low! Try higher ☝️';
        showMessage(hint, 'error');
    }
    
    document.getElementById('guessInput').value = '';
}

function handleWin() {
    showMessage('🎉 Congratulations! You got it!', 'success');
    document.getElementById('guessInput').disabled = true;
    
    players[currentPlayer].gamesPlayed++;
    if (!players[currentPlayer].bestScore || attempts < players[currentPlayer].bestScore) {
        players[currentPlayer].bestScore = attempts;
        document.getElementById('highScore').textContent = attempts;
    }
    localStorage.setItem('players', JSON.stringify(players));
}

function showMessage(text, className) {
    const messageEl = document.getElementById('message');
    messageEl.textContent = text;
    messageEl.className = className;
}

function showRankings() {
    document.getElementById('gameScreen').style.display = 'none';
    document.getElementById('rankScreen').style.display = 'flex';
    
    const sortedPlayers = Object.entries(players)
        .sort(([,a], [,b]) => a.bestScore - b.bestScore)
        .filter(([,player]) => player.bestScore > 0);

    document.getElementById('rankingsList').innerHTML = sortedPlayers
        .map(([name, player], index) => `
            <div class="rank-item">
                <span>👑 #${index + 1} ${name}</span>
                <span>🎯 Best: ${player.bestScore} | 🎮 Games: ${player.gamesPlayed}</span>
            </div>
        `).join('');
}

function backToGame() {
    document.getElementById('rankScreen').style.display = 'none';
    document.getElementById('gameScreen').style.display = 'flex';
}

document.getElementById('playerName').addEventListener('keyup', function(event) {
    if (event.key === 'Enter') startGame();
});

document.getElementById('guessInput').addEventListener('keyup', function(event) {
    if (event.key === 'Enter') checkGuess();
});
