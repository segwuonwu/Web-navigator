const Stack = require('./stack.js');
const prompt = require('prompt-sync')();
// ------------------------------
// Initialization
// ------------------------------
const backPages = new Stack();
const nextPages = new Stack();
let currentPage = 'www.google.com';

// ------------------------------
// Helper Functions
// ------------------------------
const showCurrentPage = (action) => {
    console.log(`\n${action}`);
    console.log(`Current page = ${currentPage}`);
    console.log(`Back page = ${backPages.peek()}`);
    console.log(`Next page = ${nextPages.peek()}`);
}

const newPage = (page) => {
    backPages.push(currentPage);
    currentPage = page;
    while (!nextPages.isEmpty()) {
        nextPages.pop();
    }

    showCurrentPage(`NEW: `);
}

const backPage = () => {
    nextPages.push(currentPage);
    currentPage = backPages.pop();
    showCurrentPage(`BACK: `);
}

const nextPage = () => {
    backPages.push(currentPage);
    currentPage = nextPages.pop();
    showCurrentPage(`NEXT: `);
}

/*
 * The following strings are used to prompt the user
 */
const baseInfo = '\nEnter a url';
const backInfo = 'B|b for back page';
const nextInfo = 'N|n for next page';
const quitInfo = 'Q|q for quit';
const question = 'Where would you like to go today? '

// ------------------------------
// User Interface Part 1
// ------------------------------
let finish = false;
let showBack = false;
let showNext = false;
showCurrentPage('DEFAULT: ');
while (finish === false) {
    let instructions = baseInfo;
    if (!backPages.isEmpty()) {
        instruction = `${instructions}, ${backInfo}`;
        showBack = true;
    } else {
        showBack = false;
    }

    if (!nextPages.isEmpty()) {
        instruction = `${instructions}, ${nextInfo}`;
        showNext = true;
    } else {
        showNext = false;
    }

    instruction = `${instructions}, ${quitInfo}`;
    console.log(instruction);

    // ------------------------------
    // User Interface Part 2
    // ------------------------------
    const answer = prompt(question);
    const lowerCaseAnswer = answer.toLowerCase();
    if ((lowerCaseAnswer !== 'n') && (lowerCaseAnswer !== 'b') && (lowerCaseAnswer !== 'q')) {
        // create a new page based on the url
        newPage(answer);
    } else if ((showNext === true) && (lowerCaseAnswer === 'n')) {
        // navigate forward a page
        nextPage();
    } else if ((showBack === true) && (lowerCaseAnswer === 'b')) {
        // navigate back a page
        backPage();
    } else if (lowerCaseAnswer === 'b') {
        // invalid input to a non-available option
        console.log('Cannot go back a page. Stack is empty.');
    } else if (lowerCaseAnswer === 'n') {
        // invalid input to a non-available option
        console.log('Cannot go to the next page. Stack is empty.');
    } else if (lowerCaseAnswer === 'q') {
        // quit the program
        finish = true;
    }
}