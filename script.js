const inputs = document.querySelector(".inputs");
const resetbtn = document.querySelector(".reset-btn");
const hint = document.querySelector(".hint span");
const typingInput = document.querySelector(".typing");
const wrongLetter = document.querySelector(".wrong span");
const left = document.querySelector(".guess-left span");

let word , guess , correct =[], incorrect = [];

function randonWord(){
    //getting random object from wordlist
    let ranObj = wordList[Math.floor(Math.random() * wordList.length)];
    word = ranObj.word;

    guess=8;
    correct =[];
    incorrect = [];

    hint.innerText = ranObj.hint;
    left.innerText = guess;
    wrongLetter.innerText=incorrect;

    let html = "";

    for (let i= 0; i< word.length; i++) {
        html += `<input type="text" disabled>`;

        
    }

    inputs.innerHTML=html;

}

function initGame(e){
    let key = e.target.value;
    if (key.match(/^[A-Za-z]+$/) && !incorrect.includes(` ${key} `) && !correct.includes(key)) {
        console.log(key);
        if (word.includes(key)) { //if user input letter is found in the word
            for (let index = 0; index < word.length; index++) {
                //show matched letters
                if (word[index]=== key) {
                    correct.push(key);
                    inputs.querySelectorAll("input")[index].value=key;
                }
            }
        }
        else{
            guess--;
            incorrect.push(` ${key} `);
        }
        left.innerText = guess;
        wrongLetter.innerText=incorrect;
    }
    typingInput.value="";
    setTimeout(() => {
        if (correct.length===word.length) {
            //user guessed correct
            alert(`Congrats! You found the word ${word.toUpperCase()}`);
            randonWord(); //reset game
        }
    
        else if (guess<1) { // user failed to guess
            alert("Game Over! No more guesses left");
            for (let index = 0; index < word.length; index++) {
                //show word
                    inputs.querySelectorAll("input")[index].value=word[index];
                
            };
        };
        
    });

};
randonWord();
resetbtn.addEventListener("click" , randonWord);
typingInput.addEventListener("input", initGame);
document.addEventListener("keydown", ()=> typingInput.focus());
inputs.addEventListener("click", ()=> typingInput.focus());
