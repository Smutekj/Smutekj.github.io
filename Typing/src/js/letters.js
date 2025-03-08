const inputField = document.getElementById("userInput");
const wordNode = document.getElementById("rectangle");
const wordContainerNode = document.getElementById("wordContainer");
const words = ["jjjjffff"];
var currentWordInd = 0;
var currentCharInd = 0;
const currentWord = words[currentWordInd];
var guessedWord = "";
const wtfNode = document.getElementById("word");
var outputText = "";
var hasPulsed = false;

// // // Detect user typing and store input in variable
// document.addEventListener("input", (event) => {
//     guessedWord = event.target.value;
//     if (event.inputType === "deleteContentBackward") {
//         guessedWord = "";
//         event.target.value = "";
//     }
//     document.getElementById("wtf").innerHTML = guessedWord;

//     // if (userText.endsWith(' ')) {
//     //     event.target.value = "";
//     //     if (userText === currentWord + " ") {
//     //         guessedWord = "";
//     //         currentWordInd++;
//     //         if (currentWordInd >= words.length) {
//     //             alert("Ran out of words!");
//     //         }
//     //     }
//     // }
// });


function redrawWords() {
    wordContainerNode.innerHTML = "";
    words.forEach(function callback(word, index) {

        //! add letters of the word as paragraphs
        for (var letterInd = 0; letterInd < word.length; ++letterInd) {


            var node = document.createElement("div");
            node.className = "letterRect";
            node.id = "l" + letterInd;
            wordContainerNode.appendChild(node);
            var letterNode = document.createElement("p");
            letterNode.innerHTML = word.at(letterInd);
            node.appendChild(letterNode);

            if (letterInd < currentCharInd) {

                node.className = "currentWord";
            }



        }
        // wordContainerNode.appendChild(wordRect);
    }
    );
}
redrawWords();


var totalHitCount = 0;
var letterMistakeCount = 0;


function setAnimation(node, animationId, time, finalId = "")
{
    node.classList.add(animationId);
    node.style.setProperty("-webkit-animation-duration", time + "ms");
    setTimeout(() => {
        node.classList.remove(animationId);
        if(finalId.length > 0)
        {
            node.classList.add(finalId); 
        }
    }, time); // Match animation duration 
}


document.addEventListener("keydown", (event) => {
    // if (event.key == " " || event.code == "Space" || event.keyCode == 32) {

    //     return;
    // }
    targetChar = words[0].at(currentCharInd);
    console.log("current ind is: " + currentCharInd);
    console.log("tasrget char is: " + targetChar);

    if (event.key.length === 1) {
        // guessedWord += event.key;
        var letterNode = document.getElementById("l" + currentCharInd);
        if (targetChar === event.key) {

            letterNode.classList.remove("activeLetter");
            setAnimation(letterNode, "pulsate", 250, "successLetter");

            currentCharInd++;
            if (currentCharInd >= word.length) {
                console.log("Finished");
                return;
            }
            var newLetterNode = document.getElementById("l" + currentCharInd);
            setAnimation(newLetterNode, "activateLetter", 250, "activeLetter");
            
            //! next wrongly guessed letter can pulse
            hasPulsed = false;
        } else {
            if (!hasPulsed) {
                hasPulsed = true;
                setAnimation(newLetterNode, "pulsateBad", 600);
                setTimeout(() => {
                    hasPulsed = false;
                }, 600);
            }
            letterMistakeCount++;
            var accResult = document.getElementById("accuracyResult");
            accResult.innerHTML = "Mistakes: " + letterMistakeCount;
        }
        totalHitCount++;
    }
    console.log(currentWordInd);

});


// =kkeaff// Handle composed characters using 'compositionend' event
// document.addEventListener("compositionend", (event) => {
//     console.log(`You typed: ${event.data}`);
//     guessedWord += event.data;
// });

document.addEventListener("keyup", (event) => {
    // rectangle.classList.remove("pulsate");
});