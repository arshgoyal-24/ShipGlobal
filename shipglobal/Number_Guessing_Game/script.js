let randomNumber = Math.floor(Math.random() * 100) + 1; // Generate random number between 1 and 100
let attempts = 5; // Set the number of chances

// Function to handle the guess submission
function submitGuess() {
    const guessInput = document.getElementById('guess-input');
    const feedback = document.getElementById('feedback');
    const guess = parseInt(guessInput.value);

    // Validate input
    if (isNaN(guess) || guess < 1 || guess > 100) {
        feedback.textContent = 'Please enter a valid number between 1 and 100.';
        return;
    }

    attempts--;
    document.getElementById('attempts').textContent = `You have ${attempts} chances`;

    if (guess === randomNumber) {
        feedback.textContent = `Correct! The number was ${randomNumber}. Restarting game...`;
        feedback.style.color = 'green';
        setTimeout(restartGame, 2000); // Restart the game after 2 seconds
    } else if (guess < randomNumber) {
        feedback.textContent = 'Your number is too low!';
    } else {
        feedback.textContent = 'Your number is too high!';
    }

    // Check if no attempts are left
    if (attempts === 0) {
        feedback.textContent = `Game Over! The correct number was ${randomNumber}. Restarting game...`;
        setTimeout(restartGame, 2000); // Restart the game after 2 seconds
    }

    guessInput.value = '';
}

// Automatically restart the game by resetting variables and UI
function restartGame() {
    randomNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 5;
    document.getElementById('feedback').textContent = 'Your guess is...';
    document.getElementById('feedback').style.color = '#d9534f';
    document.getElementById('attempts').textContent = 'You have 5 chances';
}

document.getElementById('submit-guess').addEventListener('click', submitGuess);
