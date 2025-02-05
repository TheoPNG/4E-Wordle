

const date = new Date();
// console.log(date.getMonth()+1+" "+date.getDate()+" "+date.getFullYear());
function getFormattedDate() {
    const today = new Date();
    const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
    return today.toLocaleDateString('en-US', options).replace(/,/g, '').trim();
}
async function isRealWord(word) {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    if (response.ok) {
        const data = await response.json();
        return data && data.length > 0;
    } else {
        return false;
    }
}

async function fetchCSV(url) {
    try {
        const response = await fetch(url);
        const data = await response.text();
        // console.log("CSV Data:", data);
        return data; // <-- Ensure it returns the text
    } catch (error) {
        console.error('Error fetching CSV:', error);
        return null;
    }
}
async function processCSV() {
    const doc = await fetchCSV('https://theopng.github.io/4E-Wordle/nothingToSeeHere.csv');
    if (!doc) {
        console.error("CSV data could not be retrieved.");
        return;
    }
    // console.log(findFirstMatchingItem(doc));
}

async function processCSV() {
    const doc = await fetchCSV('https://theopng.github.io/4E-Wordle/nothingToSeeHere.csv');
    if (!doc) {
        console.error("CSV data could not be retrieved.");
        return;
    }

    console.log("CSV Data Successfully Retrieved.");
    
    const word = findFirstMatchingItem(doc);
    return word ? word.split('') : [];

    console.log("Matching Word:", word);
    console.log("Letter Array:", letter);
}

// Call the function properly
processCSV();
// Function to parse CSV and find the first matching item
function findFirstMatchingItem(csvText) {
    const todayDate = getFormattedDate(); // Example: "Fri Jan 31 2025"
    const lines = csvText.trim().split("\n");
    // console.log(todayDate)
    for (let line of lines) {
        
        let [word, date] = line.split(",");
        // console.log(date, todayDate);
        if (date && date.trim() === todayDate) {
            return word.trim() || "(No word assigned)";
            
        }
    }
    return "No match found for today's date";
}
// const word = findFirstMatchingItem(doc.toString());
async function initGame() {
    letter = await processCSV(); // Wait for processCSV() to finish
    console.log("Letter Array:", letter);
}

initGame(); // Run it asynchronously
selectedRow = 1;



document.addEventListener("keydown", async function(event) {

    // Convert HTMLCollection to an array and extract text content

    if (event.key == "Enter") {
        const fullElements = document.getElementsByClassName("full");

        // Ensure the word is exactly 4 letters long
        if (fullElements.length !== 4) {
            alert("Please fill in all the letters");
            // Stop execution
        } else if (document.getElementById("p") == null) {
            alert("Please fill in all the letters");
        }


        // Convert HTMLCollection to a string
        const word = Array.from(fullElements).map(el => el.innerHTML).join("") + document.getElementById("p").innerHTML;

        // Check if it's a real word
        const isValid = await isRealWord(word);

        // console.log(`Is "${word}" a valid word?`, isValid);

        if (isValid && fullElements.length == 4) {
            checkSubmission(); // Proceed if it's a valid word
        } else {
            alert("Not a valid word, try again!");
        }
    } else if (/^[a-zA-Z]$/.test(event.key)) {
        document.getElementById(`${selectedRow}current-key`).innerHTML = event.key;

        if (document.getElementById(`${selectedRow}current-key`) != null) {
            og = document.getElementById(`${selectedRow}current-key`);
            //("Set innerhtml");
            document.getElementById(`${selectedRow}current-key`).innerHTML = event.key.toUpperCase();
            //("Set innerhtml");
            document.getElementById(`${selectedRow}current-key`).id = "p";
            //("Changed id");

            if (og.nextElementSibling.id != "last") {
                og.nextElementSibling.id = `${selectedRow}current-key`;
                //("Set next child");
            } else {
                og.nextElementSibling.id = `${selectedRow}current-key`;
            }
            document.getElementById("p").className = "full";
            document.getElementById("p").removeAttribute("id");
            //("Removed id");
            //(`Key pressed: ${event.key}`);

        }
    } else if (event.key == "Backspace") {

        // console.log(`${selectedRow}current-key`);
        if(document.getElementById(`p`) != null){
        currentActive= document.getElementById(`p`);
        currentActive.innerHTML = "";
        currentActive.id = `${selectedRow}current-key`;
        // currentActive.removeAttribute("id");
        }
        else{
        currentActive = document.getElementById(`${selectedRow}current-key`);

        currentActive.previousElementSibling.innerHTML = "";
        currentActive.previousElementSibling.id = `${selectedRow}current-key`;
        currentActive.removeAttribute("id");
        }
        // console.log(currentActive);
        
    };
});
const checkSubmission = async () => {
    document.getElementById('p').className = "full";
    var els = document.getElementsByClassName('full'),
        i = els.length;
    while (i--) {
        els[i].className = 'COMPLETED';
    }

    count = 0;
    var list = document.getElementById(`row${selectedRow}`).children,
        h = list.length;

    var hasBeen = [false, false, false, false, false];

    for (let i = 0; i < h; i++) {
        let activeChoice = list[i].innerHTML;

        let newColor;
        if (!letter.includes(activeChoice)) {
            newColor = "rgba(0, 0, 0, 0.29)"; // WRONG
        } else if (letter[i] == activeChoice) {
            newColor = "rgb(20, 50, 120)"; // CORRECT
            count++;
        } else if (activeChoice != list[letter.indexOf(activeChoice)].innerHTML && !hasBeen[letter.indexOf(activeChoice)]) {
            newColor = "rgba(70, 120, 180, 0.655)"; // CLOSE
            hasBeen[letter.indexOf(activeChoice)] = true;
        } else {
            newColor = "rgba(0, 0, 0, 0.29)"; // WRONG
            
        }

        // Set CSS variable for background color change
        list[i].style.setProperty("--new-bg", newColor);
        

        // Add flip animation
        list[i].classList.add("flip");

        await sleep(300); // Wait for the flip to progress before moving to the next tile
    }

    document.getElementById("p").id = "";
    selectedRow++;

    if (count == 5) {
        win();
    }
};

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function win() {
    await sleep(50);
    alert("You win!");
    document.getElementById(`${selectedRow}current-key`).id = "NOTHING";
}