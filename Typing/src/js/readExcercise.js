//! fetch exc. metadata
async function getExcercMetadata() {
    var data;
    try {
        const response = await fetch(excerciseDir + "metadata.json");
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        data = await response.json();
    } catch (error) {
        console.error(error.message);
    }
    return data;
}

async function readExcercise(dir) {
    try {
        console.log("READING: " + excerciseDir + dir + "/exc0.json");
        const response = await fetch(excerciseDir + dir + "/exc0.json");
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        excsJson = await response.json();
    } catch (error) {
        console.error(error.message);
    }

    return excsJson;
}
