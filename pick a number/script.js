// State management
let usedNumbers = new Set();
let minRange = 1;
let maxRange = 10;

// DOM elements
const minRangeInput = document.getElementById('minRange');
const maxRangeInput = document.getElementById('maxRange');
const readyBtn = document.getElementById('readyBtn');
const resetBtn = document.getElementById('resetBtn');
const currentNumberDiv = document.getElementById('currentNumber');
const numbersListDiv = document.getElementById('numbersList');
const messageDiv = document.getElementById('message');

// Initialize
function init() {
    minRange = parseInt(minRangeInput.value);
    maxRange = parseInt(maxRangeInput.value);
    usedNumbers.clear();
    currentNumberDiv.textContent = '';
    numbersListDiv.innerHTML = '';
    messageDiv.textContent = '';
}

// Validate range
function validateRange() {
    const min = parseInt(minRangeInput.value);
    const max = parseInt(maxRangeInput.value);
    
    if (isNaN(min) || isNaN(max)) {
        showMessage('Please enter valid numbers!');
        return false;
    }
    
    if (min >= max) {
        showMessage('Min must be less than Max!');
        return false;
    }
    
    if (min < 1) {
        showMessage('Min must be at least 1!');
        return false;
    }
    
    return true;
}

// Generate random number
function generateRandomNumber() {
    if (!validateRange()) {
        return;
    }
    
    // Update range if changed
    const newMin = parseInt(minRangeInput.value);
    const newMax = parseInt(maxRangeInput.value);
    
    if (newMin !== minRange || newMax !== maxRange) {
        minRange = newMin;
        maxRange = newMax;
        usedNumbers.clear();
        numbersListDiv.innerHTML = '';
        messageDiv.textContent = '';
    }
    
    // Calculate available numbers
    const totalNumbers = maxRange - minRange + 1;
    const availableNumbers = totalNumbers - usedNumbers.size;
    
    if (availableNumbers === 0) {
        showMessage('All numbers have been used! Click RESET to start over.');
        return;
    }
    
    // Generate random number that hasn't been used
    let randomNum;
    do {
        randomNum = Math.floor(Math.random() * (maxRange - minRange + 1)) + minRange;
    } while (usedNumbers.has(randomNum));
    
    // Add to used numbers
    usedNumbers.add(randomNum);
    
    // Display current number with animation
    currentNumberDiv.textContent = randomNum;
    currentNumberDiv.style.animation = 'none';
    setTimeout(() => {
        currentNumberDiv.style.animation = 'fadeIn 0.5s ease';
    }, 10);
    
    // Add to numbers list
    addNumberToList(randomNum);
    
    // Clear message
    messageDiv.textContent = '';
    
    // Show completion message if all numbers used
    if (usedNumbers.size === totalNumbers) {
        setTimeout(() => {
            showMessage('🎉 All numbers have been generated! 🎉');
        }, 500);
    }
}

// Add number to the list
function addNumberToList(number) {
    const numberItem = document.createElement('div');
    numberItem.className = 'number-item used';
    numberItem.textContent = number;
    numbersListDiv.appendChild(numberItem);
}

// Show message
function showMessage(msg) {
    messageDiv.textContent = msg;
    messageDiv.style.animation = 'none';
    setTimeout(() => {
        messageDiv.style.animation = 'shake 0.5s ease';
    }, 10);
}

// Reset
function reset() {
    init();
    showMessage('Reset complete! Ready to pick numbers.');
    setTimeout(() => {
        messageDiv.textContent = '';
    }, 2000);
}

// Event listeners
readyBtn.addEventListener('click', generateRandomNumber);
resetBtn.addEventListener('click', reset);

// Allow Enter key to generate number
minRangeInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        generateRandomNumber();
    }
});

maxRangeInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        generateRandomNumber();
    }
});

// Initialize on page load
init();
