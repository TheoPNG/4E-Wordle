letter=["C","R","I","S","P"];
selectedRow =1;
document.addEventListener("keydown", function(event) {
    if (event.key == "Enter"&&document.getElementsByClassName("full").length == 4){
        
        checkSubmission();
    }
    else if (/^[a-zA-Z]$/.test(event.key)){
        document.getElementById(`${selectedRow}current-key`).innerHTML = event.key;
    
    if(document.getElementById(`${selectedRow}current-key`) != null){
    og = document.getElementById(`${selectedRow}current-key`);
    //("Set innerhtml");
    document.getElementById(`${selectedRow}current-key`).innerHTML = event.key.toUpperCase();
    //("Set innerhtml");
    document.getElementById(`${selectedRow}current-key`).id = "p";
    //("Changed id");
    
    if (og.nextElementSibling.id != "last"){
        og.nextElementSibling.id = `${selectedRow}current-key`;
        //("Set next child");
    }
    else{
        og.nextElementSibling.id = `${selectedRow}current-key`;
    }
    document.getElementById("p").className = "full";
    document.getElementById("p").removeAttribute("id");
    //("Removed id");
    //(`Key pressed: ${event.key}`);
}}
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
for (let i = 0; i < h; i++) {  // Iterate from 0 to h-1
    let activeChoice = list[i].innerHTML;

    if(!letter.includes(activeChoice)){

            list[i].className = "WRONG";
        
    }
    else if (letter[i]==activeChoice) {
        
        list[i].className = "CORRECT";
        count++;
    } 
    else if (activeChoice!=list[letter.indexOf(activeChoice)].innerHTML&&!hasBeen[letter.indexOf(activeChoice)]){
        list[i].className = "CLOSE";
        hasBeen[letter.indexOf(activeChoice)] = true;
        console.log(list[letter.indexOf(activeChoice)].innerHTML);
        console.log(letter[letter.indexOf(activeChoice)]);
        
    } 
    else{
        list[i].className = "WRONG";
    }
    
}
document.getElementById("p").id = "";
    selectedRow ++;
if(count==5){

    win();
}
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
async function win(){
    await sleep(50);
    alert("You win!");
    document.getElementById(`${selectedRow}current-key`).id = "NOTHING";
}
