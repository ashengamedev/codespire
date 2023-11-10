const prompts = [
    {
        text: "Create a variable to store the integer 5",
        answer: "x = 5"
    },
    {
        text: "Create a list with the values 1, 2, and 3.",
        answer: "x = [1, 2, 3]"
    }
    // Add more prompts here
];

let currentPrompt;

function getRandomPrompt() {
    const randomIndex = Math.floor(Math.random() * prompts.length);
    return prompts[randomIndex];
}

function updatePrompt() {
    currentPrompt = getRandomPrompt();
    const promptDisplay = document.getElementById('prompt');
    promptDisplay.textContent = `// ${currentPrompt.text}`;
}

function checkAnswer() {
    const userCode = document.getElementById('codeInput').value;
    const feedback = document.getElementById('feedback');

    if (userCode.includes(currentPrompt.answer)) {
        feedback.textContent = "Correct! Well done.";
        // Clear the user input and update to a new prompt
        document.getElementById('codeInput').value = '';
        updatePrompt();
    } else {
        feedback.textContent = "That's not quite right. Try again!";
        // Optionally, you might want to clear the input even if they're wrong, or leave it for them to correct
        // document.getElementById('codeInput').value = '';
    }
}

// Init the first prompt when the page loads
updatePrompt();

//Add event listener to handle Enter key submissions
document.getElementById('codeInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent default to avoid adding a new line in textarea
        checkAnswer();
    }

});