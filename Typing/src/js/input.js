
var currentDirId = -1;
var excersiseWord = "";

function finishExcercise() {
    var currentExcId = parseInt(localStorage.getItem("CurrExcId"));
    var subExcCount = localStorage.getItem("SubExcCount");

    currentExcId++;
    if (currentExcId >= subExcCount)// finished all excercises
    {
        alert("You have finished the excercise");
        localStorage.setItem("CurrExcId", 0);

        // excStateArray[currentDirId].bestAccuracy = Math.max(excStateArray[currentDirId].bestAccuracy,
        //     1. - Stats.badCharCount / excersiseWord.length);

        window.location.href = "index.html"
        addExcDataToRect(currentDirId);
    } else {
        alert("Your accuracy is: " + (1. - Stats.badCharCount / excersiseWord.length) * 100 + " %");

        localStorage.setItem("CurrExcId", currentExcId);
        redrawWords();
    }
}

function parseComposition(event) {

    event.inputType = "insertText";
    event.target.value = event.data;
    console.log("COMP END: " + event.data)
    parseInput(event);
}
function parseInput(event) {
    if (event.inputType === "insertCompositionText") { return; }

    //! read settings
    var moveOnFailure = (localStorage.getItem("AllowErrors") === "true")
    var canUseBackspace = (localStorage.getItem("BackspaceOn") === "true")

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
    } else {
        guessedWord += event.target.value;
    }

    var currentChar = excersiseWord.at(currentCharInd);
    Stats.totalCharCount++;

    //! scroll appropriately
    var wordContainerNode = document.getElementById("wordContainer");
    var topPos0 = wordContainerNode.offsetTop;
    var topPos = document.getElementById("l" + currentCharInd).offsetTop;
    wordContainerNode.scrollTop = topPos - topPos0 - wordContainerNode.offsetHeight / 2;

    if (guessedWord.endsWith(currentChar)) {
        if (currentChar === ' ') //! finish writing a word
        {
            wordIsCorrect = true;
        }
        var successLetterNode = document.getElementById("l" + currentCharInd);
        successLetterNode.classList.remove("currentLetter");

        if (fuckedUpCharInds.has(currentCharInd)) {
            successLetterNode.classList.replace("failureLetter", "correctedLetter");
            fuckedUpCharInds.delete(currentCharInd);
        } else {
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
    var letterNode = document.getElementById("l" + currentCharInd);
    letterNode.classList.add("failureLetter");
    
    //! if failure does not move me to next letter then make current letter red
    if (!moveOnFailure) {
        Stats.badCharCount++;
    } else {
        letterNode.classList.remove("currentLetter");
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
    var newExcerciseWord = document.getElementById('ownExcInput').value
    startExcerciseFromWord(newExcerciseWord)
    redrawWords();
    currentCharInd = 0;
    guessedWord = "";
    document.getElementById('userInputText').style.visibility = 'hidden';
    document.getElementById('userInput').value = '';
    document.getElementById('userInput').focus();
}

function onToggleBackspace(event) {
    var canUseBackspace = document.getElementById("userToggleBackspace").checked;
    localStorage.setItem("BackspaceOn", canUseBackspace)
    document.getElementById('userInput').focus();
}
function onToggleErrors(event) {
    var canMakeErrors = document.getElementById("userToggleErrors").checked;
    localStorage.setItem("AllowErrors", canMakeErrors)
    document.getElementById('userInput').focus();
}



function addEvents() {

    var submitTextInputButton = document.getElementById("submitTextButton");
    submitTextInputButton.addEventListener("click", onUserSubmitTextInput);

    var inputTextButtonNode = document.getElementById("buttonInputText");
    inputTextButtonNode.addEventListener("click", onUserTextInputClick);

}

function addExcEvents() {
    // // Detect user typing and store input in variable
    var typingAreaNode = document.getElementById("typingArea");
    typingAreaNode.addEventListener("input", parseInput);
    typingAreaNode.addEventListener("compositionend", parseComposition);


    var toggleBackspaceButton = document.getElementById("userToggleBackspace");
    toggleBackspaceButton.addEventListener("change", onToggleBackspace);
    
    var toggleErrors = document.getElementById("userToggleErrors");
    toggleErrors.addEventListener("change", onToggleErrors);
}