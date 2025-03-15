var inputField = document.getElementById("userInput");
var wordContainerNode = document.getElementById("wordContainer");
var hasPulsed = false;
var excersiseWord = "";
var currentCharInd = 0;
var guessedWord = "";

var wordIsCorrect = true;

var Stats = {
    badCharCount: 0,
    totalCharCount: 0,
    badWordCount: 0,
    totalWordCount: 0,
    backspaceCount: 0
};

function redrawWords() {
    console.log("REDRAWING WORDS");
    
    fuckedUpCharInds = new Set();

    currentCharInd = 0;

    //! scroll up
    wordContainerNode.scrollTop = 0;

    //! get exc. text from localStorage
    var currExcId = localStorage.getItem("CurrExcId");
    excersiseWord = localStorage.getItem("ExcText" + currExcId);
    console.log("CURRENT EXC: " + excersiseWord)
    Stats.totalCharCount += excersiseWord.length;    

    //! clear input
    inputField.value = "";
    document.getElementById("wtf").textContent = "";
    
    wordContainerNode.innerHTML = "";
    guessedWord = "";
    text = excersiseWord.trim();
    var pars = text.split('\n');

    var paragraphs = document.createElement("p");
    paragraphs.classList.add("paragraph");
    var text = "\u00A0\u00A0\u00A0\u00A0";

    var letterInd = 0;
    for (var pInd = 0; pInd < pars.length; ++pInd) {
        var subwords = pars.at(pInd).split(" ");

        for (var sInd = 0; sInd < subwords.length; ++sInd) {
            var word = subwords.at(sInd);

            for (var i = 0; i < word.length; ++i) {
                var letter = word.at(i);
                text += "<span id=l" + letterInd + ">" + letter + "</span>";
                letterInd++;
            }
            if (word.endsWith('\n')) {
            } else {
                text += "<span id=l" + letterInd + ">" + ' ' + "</span>";
                letterInd++;
            }
        }
        // text += "<br></br>";
        paragraphs.innerHTML = text;
        wordContainerNode.appendChild(paragraphs);
        paragraphs = document.createElement("p");
        text = "\u00A0\u00A0\u00A0\u00A0";
        console.log("SPACE POS: " + letterInd - 1);
    }

    paragraphs.innerHTML = text;
    wordContainerNode.appendChild(paragraphs);

    inputField.focus();
    document.getElementById("l0").classList.add("currentLetter");
}

