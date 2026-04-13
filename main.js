
//setting the color of the boxs
[...document.getElementsByClassName("color")].forEach(element => {
    element.style.backgroundColor = element.classList.item(1);
});

//setting the game name
let gameName = "Guess the word";
document.title = gameName;

document.querySelector("h1").textContent = gameName;
document.querySelector("footer").textContent = `${gameName} Game Created by Ahmed Elsaftawy`;

//mange the word
let word = "";

const words = [
    "Apple", "Beach", "Cloud", "Drink", "Earth",
    "Flame", "Glass", "Heart", "Ivory", "Juice",
    "Knife", "Lemon", "Music", "Night", "Ocean",
    "Piano", "Quiet", "River", "Stone", "Table",
    "Bread", "Candy", "Dream", "Entry", "Field",
    "Grape", "House", "Index", "Joker", "Light",
    "Money", "Novel", "Order", "Party", "Queen",
    "Radio", "Smile", "Tiger", "Under", "Voice",
    "Watch", "Youth", "Zebra", "Alarm", "Brain",
    "Chair", "Dance", "Event", "Fruit", "Ghost",
    "Ahmed"
];
word = words[Math.floor(Math.random() * words.length)].toLowerCase(); // get A random word

const messageArea = document.querySelector(".message");
// generate the inputs
let numberOfTries = 5;
let numberOfLetter = 6;
let curentTry = 1;
let numberOfHints = 2;


//manage hints 
document.querySelector(".hint span").innerHTML = numberOfHints;
const hintsBtn = document.querySelector(".hint");

hintsBtn.addEventListener("click", getHint);


function generateInputs() {
    const inputsContainer = document.querySelector(".inputs")
    for (let i = 1; i <= numberOfTries; i++) {
        const tryDiv = document.createElement("div");
        tryDiv.classList.add(`try-${i}`);
        tryDiv.innerHTML = `<span>Try ${i}</span>`
        if (i !== 1) tryDiv.classList.add("disabled-inputs");
        //make a loop for generate the inputs and putting it in divs
        for (let j = 1; j < numberOfLetter; j++) {
            const input = document.createElement("input");
            input.type = "text";
            input.id = `guess-${i}-Litter${j}`;
            input.setAttribute("maxlength", "1"); // make the max value one

            input.addEventListener("input", () => {
                //make the letters capital 
                input.value = input.value.toUpperCase()

            })

            tryDiv.appendChild(input);
        }
        inputsContainer.appendChild(tryDiv);
    }
    inputsContainer.children[0].children[1].focus();
    // Disabled inptuts exept the curent
    let inputDisabeld = document.querySelectorAll(".disabled-inputs input");
    inputDisabeld.forEach((ele) => ele.disabled = true);
    // make the inputs send the cursor to the next
    const inputs = document.querySelectorAll("input");
    inputs.forEach((ele, index) => {
        ele.addEventListener("input", function () {
            const nextInput = inputs[index + 1];
            if (nextInput) nextInput.focus();
        });
        ele.addEventListener("keydown", function (event) {
            //transform to the next input on press rightArrow
            let currentIndex = Array.from(inputs).indexOf(this);

            if (event.key == "ArrowRight") {
                const nexInput = currentIndex + 1;
                if (nexInput < inputs.length) inputs[nexInput].focus();
            }
            //transform to the back input on press leftArrow

            if (event.key == "ArrowLeft") {
                const prevInput = currentIndex - 1;
                if (prevInput >= 0) inputs[prevInput].focus();
            }


        })

    });

}

const guessBtn = document.querySelector(".check");
guessBtn.addEventListener("click", handelGuessing);

function handelGuessing() {
    let sucsess = true;
    for (let i = 1; i < numberOfLetter; i++) {
        const inputField = document.querySelector(`#guess-${curentTry}-Litter${i}`);

        const letter = inputField.value.toLowerCase();
        const actuallLetter = word[i - 1];
        // game logic
        if (actuallLetter == letter) {
            //letter is correct and in thre right place
            inputField.classList.add("yes_in_place");
        } else if (word.includes(letter) && letter != "") {
            //letter is correct and in thre wrong place
            inputField.classList.add("not_in_place");
            sucsess = false;
        } else {
            //letter is not correct
            inputField.classList.add("no");
            sucsess = false;
        }
    }
    if (sucsess) {
        //if the user get the word
        messageArea.innerHTML = `<span>Winner</span>`;
        if (numberOfHints == 2) {
            messageArea.innerHTML = `<p><span>Congratulations!</span> you did not use hints</p>`;

        }
        //disable hit button
        hintsBtn.disabled = true;
        if (hintsBtn.disabled) hintsBtn.style.cssText = "background-color:grey;cursor:not-allowed"
        //disabled the divs
        const divs = document.querySelectorAll(".inputs div");
        divs.forEach((ele) => ele.classList.add("disabled-inputs"));

        // disable the check button
        guessBtn.disabled = true;
        if (guessBtn.disabled) guessBtn.style.cssText = "background-color:grey;cursor:not-allowed";
        //disable the hint button
        if (hintsBtn.disabled) hintsBtn.style.cssText = "background-color:grey;cursor:not-allowed";
        //make the reset button 
        const resetBtn = document.querySelector(".reset");
        resetBtn.textContent = "Play Again";
        resetBtn.style.display = "block";
        resetBtn.addEventListener("click", () => window.location.reload());

    } else {
        //[1]disabeld all the divs
        const divs = document.querySelectorAll(".inputs div");
        divs.forEach((ele) => ele.classList.add("disabled-inputs"));
        // make all the inputs disabled
        const currentTryEle = document.querySelectorAll(`.try-${curentTry} input`);
        currentTryEle.forEach((ele) => ele.disabled = true);
        // make all the inputs in the next try active 
        curentTry++;

        const nexTryInputs = document.querySelectorAll(`.try-${curentTry} input`);
        nexTryInputs.forEach((ele) => ele.disabled = false);
        let el = document.querySelector(`.try-${curentTry}`);
        if (el) {
            document.querySelector(`.try-${curentTry}`).classList.remove("disabled-inputs");
            el.children[1].focus();
        } else {
            // disable the check button
            guessBtn.disabled = true;
            if (guessBtn.disabled) guessBtn.style.cssText = "background-color:grey;cursor:not-allowed";
            messageArea.innerHTML = `you lost the word is <span>${word}</span>`;
            // disabled the hint button 
            hintsBtn.disabled = true;
            if (hintsBtn.disabled) hintsBtn.style.cssText = "background-color:grey;cursor:not-allowed";
            //make the reset button 
            const resetBtn = document.querySelector(".reset");
            resetBtn.textContent = "Play Again";
            resetBtn.style.display = "block";
            resetBtn.addEventListener("click", () => window.location.reload());
        }


        // another try to solve it it works 
        //[2]make the nex try div active
        // divs.forEach((ele) => {
        //     if (ele.classList.item(0) == `try-${curentTry}`) {
        //         ele.classList.replace("disabled-inputs", "active")
        //         console.log(ele.children.length);
        //         for (let i = 1; i < numberOfLetter; i++) {
        //             const inputField = document.querySelector(`#guess-${curentTry}-Litter${i}`);
        //             inputField.disabled = false;
        //         }
        //     }
        // });

    }
}

//manage hints function
function getHint() {
    if (numberOfHints > 0) {
        // make the hint of number get minced 
        numberOfHints--;
        document.querySelector(".hint span").innerHTML = numberOfHints;
        let curentElmentInputs = document.querySelectorAll(`.try-${curentTry} input`);
        const emptyInputs = Array.from(curentElmentInputs).filter((ele) => ele.value == "");
        if (emptyInputs.length > 0) {
            //make a random Index for the input
            const randomIndex = Math.floor(Math.random() * emptyInputs.length);
            //make a random input ot fill it
            const randomInput = emptyInputs[randomIndex];
            const indexToFill = Array.from(curentElmentInputs).indexOf(randomInput);
            //put the value in the random input
            if (indexToFill !== -1) randomInput.value = word[indexToFill].toUpperCase();
        }

    }
    if (numberOfHints === 0) {
        hintsBtn.disabled = true;
        if (hintsBtn.disabled) hintsBtn.style.cssText = "background-color:grey;cursor:not-allowed";
    }

}

function handleBackSpace(event) {
    if (event.key == "Backspace") {
        const Inputs = document.querySelectorAll(`.try-${curentTry} input`);
        const activeInputIndex = Array.from(Inputs).indexOf(document.activeElement);
        if (activeInputIndex > 0) {
            const currentInput = Inputs[activeInputIndex];
            const prevInput = Inputs[activeInputIndex - 1];
            currentInput.value = "";
            prevInput.value = "";
            if (prevInput) prevInput.focus();

        }
    }
}

window.addEventListener("keydown", handleBackSpace);

window.addEventListener("load", function () {

    generateInputs();
})
