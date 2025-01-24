console.log('Hello World');
letter=["P","E","N","N","Y"];
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
    var els = document.getElementsByClassName('full'),
        i = els.length;
    while (i--) {
        els[i].className = 'COMPLETED';
}       
count = 0
// console.log(document.getElementById('row1').children);
var list = document.getElementById(`row${selectedRow}`).children,

     h = list.length;
console.log(list[h]);
console.log(h);
while (h--) {
    console.log(list[h].innerHTML);
    if (list[h].innerHTML==letter[h]){
        list[h].className="CORRECT";
        count++;
    }
    else if(letter.includes(list[h].innerHTML)){
        list[h].className="CLOSE";
    }
    else{
        list[h].className="WRONG";
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
