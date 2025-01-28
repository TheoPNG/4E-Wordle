letter = ["F", "R", "U", "I", "T"];
selectedRow = 1;


async function isRealWord(word) {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    if (response.ok) {
        const data = await response.json();
        return data && data.length > 0;
    } else {
        return false;
    }
}

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

        console.log(`Is "${word}" a valid word?`, isValid);

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
        console.log(currentActive);
        
    };
});
const checkSubmission = () => {
    document.getElementById('p').className = "full";
    var els = document.getElementsByClassName('full'),
        i = els.length;
    while (i--) {
        els[i].className = 'COMPLETED';
    }
    count = 0
    // //(document.getElementById('row1').children);
    var list = document.getElementById(`row${selectedRow}`).children,
        h = list.length;

    //(list[h]); // Debugging statement (but note: list[h] is undefined because h is the length)
    //(h);
    var hasBeen = [false, false, false, false, false];
    for (let i = 0; i < h; i++) { // Iterate from 0 to h-1
        let activeChoice = list[i].innerHTML;

        if (!letter.includes(activeChoice)) {

            list[i].className = "WRONG";

        } else if (letter[i] == activeChoice) {

            list[i].className = "CORRECT";
            count++;
        } else if (activeChoice != list[letter.indexOf(activeChoice)].innerHTML && !hasBeen[letter.indexOf(activeChoice)]) {
            list[i].className = "CLOSE";
            hasBeen[letter.indexOf(activeChoice)] = true;
            //(list[letter.indexOf(activeChoice)].innerHTML);
            //(letter[letter.indexOf(activeChoice)]);

        } else {
            list[i].className = "WRONG";
        }

    }
    document.getElementById("p").id = "";
    selectedRow++;
    if (count == 5) {

        win();
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function win() {
    await sleep(50);
    alert("You win!");
    document.getElementById(`${selectedRow}current-key`).id = "NOTHING";
}