//! fetch exc. metadata
async function readWordsFile() {
    var data;
    try {
        const response = await fetch("../../czechWords.json");
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        data = await response.json();
    } catch (error) {
        console.error(error.message);
    }
    return data;
}

var triGram2Id = {}
var triGrams = []
var triGramsDist = []

var letters = "asdfghjkl"

function isAllowed(word)
{
    var allowed = true;
    for (var i = 0; i < word.length; ++i) {
        allowed = allowed && (letters.includes(word.at(i)));
    }
    return allowed;
}


function generateExc() {

    //! extract allowed letters
    var allowedNode = document.getElementById("allowedChars");
    letters = allowedNode.value;

    Promise.resolve(readWordsFile()).then(words => {
        words.forEach(el => {

            var word = el.word
            var wordCount = el.count;

            for (var i = 0; i < word.length - 3; ++i) {
                var nGram = word.slice(i, i + 3);
                if(!isAllowed(nGram))
                {
                    continue;
                }
                if (!(nGram in triGram2Id)) {
                    triGram2Id[nGram] = triGrams.length
                    triGrams.push(nGram)
                    triGramsDist.push(wordCount)
                } else {
                    var id = triGram2Id[nGram];
                    triGramsDist[id] += wordCount;
                }
            }
        });

        var sum = 0;
        triGramsDist.forEach(val =>{
            sum += val;
        })
        var triGramsDistN = triGramsDist.map(val =>{
            return val / parseFloat(sum);
        })
        var triGramsDistCum = triGramsDistN;
        for (var i = 1; i < triGramsDist.length; ++i) {
            triGramsDistCum[i] = triGramsDistCum[i-1] + triGramsDistN[i];
        }

        var excWord = "";
        for (var i = 0; i < 20; ++i) {
            
            var goal = Math.random();
            var k = 0;
            while(goal > triGramsDistCum[k])
            {
                k++;
            }
            excWord += triGrams[k] + " "
        }
        
        startExcerciseFromWord(excWord.trim())
    });

}