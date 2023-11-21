let currentExercise;

function generateRandomExercise() {
    currentExercise = pythonRules.variableAssignment;
    const generatedValue = currentExercise.generateValue();
    console.log("Generated Value:", generatedValue); // Debugging

    currentExercise.expectedValue = generatedValue;
    const fullExerciseText = currentExercise.template.replace('${value}', generatedValue);
    console.log("Full Exercise Text:", fullExerciseText); // Debugging

    return fullExerciseText;
}

function updatePrompt() {
    const exerciseText = generateRandomExercise();
    const promptDisplay = document.getElementById('prompt');
    promptDisplay.textContent = `// ${exerciseText}`;
}

function checkAnswer() {
    const userCode = document.getElementById('codeInput').value;
    const feedback = document.getElementById('feedback');
    const isValid = currentExercise.validate(userCode, currentExercise.expectedValue);

    if (isValid) {
        feedback.textContent = "Correct! Well done.";
        document.getElementById('codeInput').value = '';
        updatePrompt();
    } else {
        feedback.textContent = "That's not right. Try again!";
    }
}

// Initialize the first exercise when the page loads
document.addEventListener('DOMContentLoaded', () => {
    updatePrompt();
    const codeInput = document.getElementById('codeInput');
    codeInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent default to avoid adding a new line in textarea
            checkAnswer();
        }
    });
});