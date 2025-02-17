
var currentDirId = -1;
var currentExcId = 0;
var excersiseWord = "";

function finishExcercise() {
    currentExcId++;
    if (currentExcId >= metadata[currentDirId]["count"])// finished all excercises
    {
        currentExcId = 0;
        document.getElementById("Excercise").style.visibility = "hidden";
        document.getElementById("excercises").classList.remove("invisibleContainer");
        // setAnimation(document.getElementById("excercises"), "appearAnimation", 600, "excContainer")

        excStateArray[currentDirId].bestAccuracy = Math.max(excStateArray[currentDirId].bestAccuracy,
            1. - Stats.badCharCount / excersiseWord.length);
        addExcDataToRect(currentDirId);
    } else {
        alert("Your accuracy is: " + (1. - Stats.badCharCount / excersiseWord.length) * 100 + " %");
        startExcercise(metadata[currentDirId]["dir"], currentExcId);
    }
}


function parseInput(event) {
    if (event.inputType === "deleteContentBackward") {
        if (!canUseBackspace) {
            console.log("HIT BACKSPACE BUT OFF");
            return;
        }
        Stats.backspaceCount++;

        var currentLetterNode = document.getElementById("l" + currentCharInd);
        currentLetterNode.classList.remove("currentLetter");
        currentCharInd = Math.max(0, currentCharInd - 1);
        var nextLetterNode = document.getElementById("l" + currentCharInd);
        nextLetterNode.classList.add("currentLetter");
        return;
    }

    if (event.inputType === "insertLineBreak") {
        console.log("ENTERED PARAGRAPH");
        guessedWord += '\n';
        document.getElementById("wtf").innerHTML += '<br></br>';
    } else {
        guessedWord += event.target.value;
        document.getElementById("wtf").innerHTML += guessedWord.at(guessedWord.length - 1);
    }

    var targetWordLength = excersiseWord.length;
    var currentChar = excersiseWord.at(currentCharInd);
    Stats.totalCharCount++;


    if (guessedWord.endsWith(currentChar)) {

        if (currentChar === ' ') //! finish writing a word
        {
            console.log("SUCCESS WORD");
            wordIsCorrect = true;
        }
        console.log("SUCCESS");
        var successLetterNode = document.getElementById("l" + currentCharInd);
        successLetterNode.classList.remove("currentLetter");

        if(fuckedUpCharInds.has(currentCharInd))
        {
            successLetterNode.classList.replace("failureLetter", "correctedLetter");
            fuckedUpCharInds.delete(currentCharInd);
        }else{
            successLetterNode.classList.add("successLetter");
        }
        
        currentCharInd++;
        if (currentCharInd >= excersiseWord.length) {// excercise finished
            finishExcercise();
        }
        var nextLetterNode = document.getElementById("l" + currentCharInd);
        nextLetterNode.classList.add("currentLetter");

        return;
    }

    fuckedUpCharInds.add(currentCharInd);
    
    if (moveOnFailure) {
        Stats.badCharCount++;

        console.log("FAILED");
        var letterNode = document.getElementById("l" + currentCharInd);
        letterNode.classList.remove("currentLetter");
        letterNode.classList.add("failureLetter");

        currentCharInd++
        var nextLetterNode = document.getElementById("l" + currentCharInd);
        nextLetterNode.classList.add("currentLetter");
    }
    wordIsCorrect = false;

    if (currentCharInd >= excersiseWord.length) {
        finishExcercise();
    }
};

function onUserTextInputClick() {
    var elementVisibility = document.getElementById('userInputText').style.visibility;
    if (elementVisibility === 'visible') {
        document.getElementById('userInputText').style.visibility = 'hidden';
        document.getElementById('userInput').focus();    
    } else {
        document.getElementById('userInputText').style.visibility = 'visible';
    }
}

function onUserSubmitTextInput() {
    startExcerciseFromWord(newExcerciseWord)
    redrawWords();
    currentCharInd = 0;
    guessedWord = "";
    document.getElementById('userInputText').style.visibility = 'hidden';
    document.getElementById('userInput').value = '';
    document.getElementById('userInput').focus();
}

function onToggleBackspace(event) {
    canUseBackspace = document.getElementById("userToggleBackspace").checked;
    document.getElementById('userInput').focus();
}

function onUserTextInput(event) {
    newExcerciseWord = event.target.value;
}

function addEvents() {
    // // Detect user typing and store input in variable
    var typingAreaNode = document.getElementById("typingArea");
    typingAreaNode.addEventListener("input", parseInput);

    var submitTextInputButton = document.getElementById("submitTextButton");
    submitTextInputButton.addEventListener("click", onUserSubmitTextInput);

    var inputTextButtonNode = document.getElementById("buttonInputText");
    inputTextButtonNode.addEventListener("click", onUserTextInputClick);

    var typingAreaNode = document.getElementById("userInputText");
    typingAreaNode.addEventListener("input", onUserTextInput);

    var toggleBackspaceButton = document.getElementById("userToggleBackspace");
    toggleBackspaceButton.addEventListener("change", onToggleBackspace);
}