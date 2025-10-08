// Game state
let gameState = {
    player1: { name: '', choice: '' },
    player2: { name: '', choice: '' },
    currentPlayerSelecting: 1,
    isFlipping: false
};

// DOM Elements
const setupSection = document.getElementById('setup-section');
const gameSection = document.getElementById('game-section');
const choiceModal = document.getElementById('choice-modal');
const startGameBtn = document.getElementById('start-game');
const flipBtn = document.getElementById('flip-btn');
const resetBtn = document.getElementById('reset-btn');
const player1Input = document.getElementById('player1');
const player2Input = document.getElementById('player2');
const coin = document.getElementById('coin');
const resultMessage = document.getElementById('result-message');
const currentPlayerText = document.getElementById('current-player-text');
const choiceButtons = document.querySelectorAll('.choice-btn');

// Event Listeners
startGameBtn.addEventListener('click', startGame);
flipBtn.addEventListener('click', flipCoin);
resetBtn.addEventListener('click', resetGame);

choiceButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const choice = e.currentTarget.getAttribute('data-choice');
        handleChoiceSelection(choice);
    });
});

// Start the game
function startGame() {
    const p1Name = player1Input.value.trim();
    const p2Name = player2Input.value.trim();

    if (!p1Name || !p2Name) {
        alert('Please enter both player names!');
        return;
    }

    gameState.player1.name = p1Name;
    gameState.player2.name = p2Name;

    // Hide setup, show game section
    setupSection.classList.add('hidden');
    gameSection.classList.remove('hidden');

    // Show modal for player 1 to choose
    showChoiceModal(1);
}

// Show modal for player to choose coin side
function showChoiceModal(playerNum) {
    gameState.currentPlayerSelecting = playerNum;
    const playerName = playerNum === 1 ? gameState.player1.name : gameState.player2.name;
    currentPlayerText.textContent = `${playerName}, choose your side!`;
    choiceModal.classList.add('active');
}

// Handle choice selection
function handleChoiceSelection(choice) {
    if (gameState.currentPlayerSelecting === 1) {
        gameState.player1.choice = choice;
        gameState.player2.choice = choice === 'heads' ? 'tails' : 'heads';
        
        // Update display
        document.getElementById('player1-display').textContent = gameState.player1.name;
        document.getElementById('player1-choice').textContent = capitalize(gameState.player1.choice);
        document.getElementById('player2-display').textContent = gameState.player2.name;
        document.getElementById('player2-choice').textContent = capitalize(gameState.player2.choice);
        
        // Close modal
        choiceModal.classList.remove('active');
    }
}

// Flip the coin
function flipCoin() {
    if (gameState.isFlipping) return;

    gameState.isFlipping = true;
    flipBtn.disabled = true;
    resultMessage.textContent = '';
    resultMessage.classList.remove('winner');

    // Remove previous animation classes
    coin.classList.remove('flip-heads', 'flip-tails');

    // Randomly determine the result
    const result = Math.random() < 0.5 ? 'heads' : 'tails';

    // Add appropriate animation class
    setTimeout(() => {
        if (result === 'heads') {
            coin.classList.add('flip-heads');
        } else {
            coin.classList.add('flip-tails');
        }
    }, 100);

    // Show result after animation
    setTimeout(() => {
        announceWinner(result);
        gameState.isFlipping = false;
        flipBtn.disabled = false;
    }, 2100);
}

// Announce the winner
function announceWinner(result) {
    let winner;
    
    if (gameState.player1.choice === result) {
        winner = gameState.player1.name;
    } else {
        winner = gameState.player2.name;
    }

    resultMessage.textContent = `${capitalize(result)}! ${winner} wins! 🎉`;
    resultMessage.classList.add('winner');
}

// Reset the game
function resetGame() {
    // Reset game state
    gameState = {
        player1: { name: '', choice: '' },
        player2: { name: '', choice: '' },
        currentPlayerSelecting: 1,
        isFlipping: false
    };

    // Clear inputs
    player1Input.value = '';
    player2Input.value = '';

    // Remove coin animations
    coin.classList.remove('flip-heads', 'flip-tails');

    // Clear result
    resultMessage.textContent = '';
    resultMessage.classList.remove('winner');

    // Reset button state
    flipBtn.disabled = false;

    // Show setup section
    gameSection.classList.add('hidden');
    setupSection.classList.remove('hidden');

    // Close modal if open
    choiceModal.classList.remove('active');
}

// Utility function to capitalize strings
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Close modal when clicking outside
choiceModal.addEventListener('click', (e) => {
    if (e.target === choiceModal) {
        // Don't allow closing without making a choice
        // choiceModal.classList.remove('active');
    }
});

// Keyboard support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !gameState.isFlipping) {
        if (!setupSection.classList.contains('hidden')) {
            startGame();
        } else if (!flipBtn.disabled) {
            flipCoin();
        }
    }
});
