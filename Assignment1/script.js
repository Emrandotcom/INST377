function playGame() {
    // Choices for the game
    const choices = ["rock", "paper", "scissors"];
    
    // Get user's choice
    const userChoice = document.getElementById("userChoice").value;
    document.getElementById("userChoiceBox").textContent = "You Chose: " + userChoice;

    // Get computer's random choice
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];
    document.getElementById("computerChoiceBox").textContent = "Computer Chose: " + computerChoice;

    // Determine the winner
    if (
        (userChoice === "rock" && computerChoice === "scissors") ||
        (userChoice === "paper" && computerChoice === "rock") ||
        (userChoice === "scissors" && computerChoice === "paper")
    ) {
        alert("You Win!");
        document.body.style.backgroundColor = "#2ecc71"; // Green background
    } else if (
        (computerChoice === "rock" && userChoice === "scissors") ||
        (computerChoice === "paper" && userChoice === "rock") ||
        (computerChoice === "scissors" && userChoice === "paper")
    ) {
        alert("You Lose!");
        document.body.style.backgroundColor = "#e74c3c"; // Red background
    } else {
        alert("It's a Tie!");
        document.body.style.backgroundColor = "#3498db"; // Blue background
    }
}
