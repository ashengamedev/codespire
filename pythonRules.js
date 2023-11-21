// Generate a random number within a range
function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Wordlist
const wordlist = ['apple', 'banana', 'cherry', 'date', 'elderberry'];

// Choose random word
function getRandomWord() {
    const randomIndex = Math.floor(Math.random() * wordlist.length);
    return wordlist[randomIndex]
}

// Generating random exercise values
function generateRandomExerciseValue(type) {
    switch (type) {
        case 'number':
            return generateRandomNumber(1, 100).toString();
        case 'string':
            return `'${getRandomWord()}'`;
        case 'list':
            return generateRandomList();
        case 'dict':
            return generateRandomDict();
        // Add more cases for other types here, like 'multiple vaiables' etc
        default:
            console.error("Invalid type specified:", type);
            return null;
    }
}

function generateRandomList() {
    const listLength = generateRandomNumber(3, 5);
    return '[' + Array.from({ length: listLength }, () => generateRandomExerciseValue('number')).join(', ') + ']';
}

function generateRandomDict() {
    const dictLength = generateRandomNumber(2, 4);
    let dict = '{';
    for (let i = 0; i < dictLength; i++) {
        dict += `${i === 0 ? '' : ', '}'${getRandomWord()}': ${generateRandomExerciseValue('number')}`;
    }
    return dict + '}';
}

function generateExercise(valueType) {
    return generateRandomExerciseValue(valueType); // Just return the value
}


// Python-specific validation logic for...
// When running with a server...
// export const pythonRules = {
const pythonRules = {
    variableAssignment: {
        template: "Create a variable and assign it the value ${value}.",
        generateValue: () => generateExercise('number'),  // This should call generateExercise
        validate: function(userCode, expectedValue) {
            // Regex pattern: valid Python variable name, optional spaces, '=', optional spaces, expected value
            const pattern = /^[a-zA-Z_]\w*\s*=\s*(\d+|'[^']*')$/;
            return pattern.test(userCode.trim());
        }
    },
    // Create string variable assignment here
    listCreation: {
        // Still need to randomize list name as well
        template: "Create a list named 'myList' containing the values ${values}.",
        generateValue: () => generateRandomExerciseValue('list'),
        validate: function(userCode, expectedValues) {
            // Validation logic, regex
        }
    },
    dictCreation: {
        template: "Create a dictionary with the ${values}.",
        generateValue: () => generateRandomExerciseValue('dict'),
        validate: function(userCode, expectedValues) {
            // Validation logic, regex
        }
    },
    // doubleVariableAssignment ... x, y = 100
    // Other exercise templates...
};