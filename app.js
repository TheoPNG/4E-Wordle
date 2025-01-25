console.log('Hello World');
letter=["S","T","A","G","E"];
selectedRow =1;
document.addEventListener("keydown", function(event) {
    if (event.key == "Enter"&&document.getElementsByClassName("full").length == 4){
        
        checkSubmission();
    }
    else if (/^[a-zA-Z]$/.test(event.key)){
        document.getElementById(`${selectedRow}current-key`).innerHTML = event.key;
    
    if(document.getElementById(`${selectedRow}current-key`) != null){
    og = document.getElementById(`${selectedRow}current-key`);
    console.log("Set innerhtml");
    document.getElementById(`${selectedRow}current-key`).innerHTML = event.key.toUpperCase();
    console.log("Set innerhtml");
    document.getElementById(`${selectedRow}current-key`).id = "p";
    console.log("Changed id");
    
    if (og.nextElementSibling.id != "last"){
        og.nextElementSibling.id = `${selectedRow}current-key`;
        console.log("Set next child");
    }
    else{
        og.nextElementSibling.id = `${selectedRow}current-key`;
    }
    document.getElementById("p").className = "full";
    document.getElementById("p").removeAttribute("id");
    console.log("Removed id");
    console.log(`Key pressed: ${event.key}`);
}}
});
const checkSubmission = () => {
    document.getElementById('p').className = "full";
    let list = document.getElementById(`row${selectedRow}`).children;
    let h = list.length;
    let count = 0;

    // Copy of the target word as an array
    let targetWord = [...letter]; // ['S', 'T', 'A', 'G', 'E']
    let guessedWord = Array.from(list).map(el => el.innerHTML); // User's guessed word

    // First pass: Mark CORRECT (Green)
    for (let i = 0; i < h; i++) {
        if (guessedWord[i] === targetWord[i]) {
            list[i].className = "CORRECT";
            targetWord[i] = null; // Remove from available letters
            guessedWord[i] = null; // Prevent double marking
            count++;
        }
    }

    // Second pass: Mark CLOSE (Yellow)
    for (let i = 0; i < h; i++) {
        if (guessedWord[i] && targetWord.includes(guessedWord[i])) {
            list[i].className = "CLOSE";
            targetWord[targetWord.indexOf(guessedWord[i])] = null; // Remove first occurrence
        } else if (guessedWord[i]) {
            list[i].className = "WRONG"; // Mark incorrect letters
        }
    }

    selectedRow++;
    if (count == 5) {
        win();
    }
};
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
async function win(){
    await sleep(50);
    alert("You win!");
    document.getElementById(`${selectedRow}current-key`).id = "NOTHING";
}
