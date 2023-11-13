function playGame() {

    const choices = ["rock", "paper", "scissors"];
    
    const userChoice = document.getElementById("userChoice").value;
    document.getElementById("userChoiceBox").textContent = "You Chose: " + userChoice;

    const computerChoice = choices[Math.floor(Math.random() * choices.length)];
    document.getElementById("computerChoiceBox").textContent = "Computer Chose: " + computerChoice;

    if (
        (userChoice === "rock" && computerChoice === "scissors") ||
        (userChoice === "paper" && computerChoice === "rock") ||
        (userChoice === "scissors" && computerChoice === "paper")
    ) {
        alert("You Win!");
        document.body.style.backgroundColor = "#2ecc71";
    } else if (
        (computerChoice === "rock" && userChoice === "scissors") ||
        (computerChoice === "paper" && userChoice === "rock") ||
        (computerChoice === "scissors" && userChoice === "paper")
    ) {
        alert("You Lose!");
        document.body.style.backgroundColor = "#e74c3c";
    } else {
        alert("It's a Tie!");
        document.body.style.backgroundColor = "#3498db";
    }
}

function validateForm() {
    var bigTextboxValue = document.getElementById("bigTextbox").value;
    
    var specialChars = /[*|\":<>[\]{}`\\()';@&$]/;
    
    if (specialChars.test(bigTextboxValue)) {
        alert("Big Textbox cannot contain special characters.");
    } else {
        alert("Form submitted successfully!");
    }
}