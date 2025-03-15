

function addCorrectFingerStyle(keyChar, keyNode) {
    const lPinkyKeys = "qay12";
    const rPinkyKeys = "ů/p-=]['\\/";
    const lRingKeys = "wsx3";
    const rRingKeys = "ol.0";
    const lMiddleKeys = "edc4";
    const rMiddleKeys = ",ki9";
    const lIndexKeys = "rfv56tgb";
    const rIndexKeys = "ujm7nhz8";

    if (lPinkyKeys.includes(keyChar) || rPinkyKeys.includes(keyChar)) {
        keyNode.classList.add("keyPinky");
    }
    if (lRingKeys.includes(keyChar) || rRingKeys.includes(keyChar)) {
        keyNode.classList.add("keyRing");
    }
    if (lMiddleKeys.includes(keyChar) || rMiddleKeys.includes(keyChar)) {
        keyNode.classList.add("keyMiddle");
    }
    if (lIndexKeys.includes(keyChar) || rIndexKeys.includes(keyChar)) {
        keyNode.classList.add("keyIndex");
    }
}

function createKeyboard(parentId) {
    const gapSize = 5;
    const middleSize = 50;
    const rowSize = 800;
    class RowData {
        constructor(first, count, firstId, lastId) {
            this.firstSizeX = first;
            this.middleCount = count;
            this.lastSizeX = rowSize - count * middleSize - (count + 1) * gapSize - first;
            if (this.lastSizeX <= 0) { alert("Not enough space in row! Decrease middleSize"); }

            this.firstId = firstId;
            this.lastId = lastId;
        }
    }

    const rows = [];
    rows.push(new RowData(35, 12, "`", "&#x2190"));
    rows.push(new RowData(80, 12, "&#x021C4", "&#x021B5"));
    rows.push(new RowData(100, 12, "CapsLock", "&#x021B5"));
    rows.push(new RowData(120, 10, "&#x021E7", "&#x021E7"));

    const rowKeys = [];
    rowKeys.push("1234567890-=".split(''));
    rowKeys.push("qwertzuiopú)");
    rowKeys.push("asdfghjklů§\"");
    rowKeys.push("yxcvbnm,.-");

    var keyBoardDiv = document.getElementById(parentId);
    keyBoardDiv.style.width = rowSize + "px";
    keyBoardDiv.style.height = 4 * middleSize + 3 * gapSize;;

    for (var i = 0; i < rows.length; ++i) {
        var rowDiv = document.createElement("div");
        rowDiv.style.width = rowSize + "px";
        rowDiv.style.height = middleSize + "px";
        rowDiv.classList.add("keyboardRow");
        keyBoardDiv.appendChild(rowDiv);

        var rd = rows[i];
        var firstKey = document.createElement("div");
        firstKey.classList.add("key");
        firstKey.style.width = rd.firstSizeX + "px";
        firstKey.id = "key-" + rd.firstId;
        firstKey.innerHTML = "<p>" + rd.firstId + "</p>";
        rowDiv.appendChild(firstKey);
        for (var midId = 0; midId < rd.middleCount; ++midId) {
            var key = document.createElement("div");
            key.classList.add("key", "middleKey");
            key.id = "key-" + rowKeys[i][midId];
            key.innerHTML = "<p>" + rowKeys[i][midId] + "</p>";

            addCorrectFingerStyle(rowKeys[i][midId], key)

            rowDiv.appendChild(key);
        }
        var lastKey = document.createElement("div");
        lastKey.classList.add("key");
        lastKey.id = "key-" + rd.lastId;
        lastKey.style.width = rd.lastSizeX + "px";
        lastKey.innerHTML = "<p>" + rd.lastId + "</p>"
        rowDiv.appendChild(lastKey);
    }
    var rowDiv = document.createElement("div");
    rowDiv.style.width = rowSize + "px";
    rowDiv.style.height = middleSize + "px";
    rowDiv.classList.add("keyboardRow");
    keyBoardDiv.appendChild(rowDiv);

    var spaceKey = document.createElement("div");
    spaceKey.id = "key- ";
    spaceKey.classList.add("key");
    spaceKey.style.marginLeft = "30%";
    spaceKey.style.width = "40%";
    spaceKey.style.height = middleSize + "px";
    rowDiv.appendChild(spaceKey);
}



document.addEventListener('keydown', (event) => {
    const keyPressed = event.key.toLowerCase();
    const keyElement = document.getElementById(`key-${keyPressed}`);
    if (keyElement) {
        keyElement.classList.add('active');
    }
});

document.addEventListener('keyup', (event) => {
    const keyPressed = event.key.toLowerCase();
    const keyElement = document.getElementById(`key-${keyPressed}`);
    if (keyElement) {
        keyElement.classList.remove('active');
    }
});


