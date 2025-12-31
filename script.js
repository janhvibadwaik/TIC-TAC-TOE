document.getElementById("player1").addEventListener("input", function () {
    const name = this.value.trim() || "Player 1";
    document.getElementById("symbol-text").innerText =
        name + ", choose your symbol:";
});

let currentPlayer = 1;
let selectedSymbol = 1;
let gameOver = false;
const boardElement = document.getElementById("board");
const currentPlayerText = document.getElementById("text-current-player");
const board = [-1,-1,-1,-1,-1,-1,-1,-1,-1];

let playerNames = {
    1: "X",
    0: "O"
};

function chooseSymbol(symbol){
    selectedSymbol = symbol;
    currentPlayer = symbol;
    gameOver = false;

    document.getElementById("btnX").classList.remove("active");
    document.getElementById("btnO").classList.remove("active");

    if(symbol == 1){
        document.getElementById("btnX").classList.add("active");
    } else {
        document.getElementById("btnO").classList.add("active");
    }

    resetGame();
}

function setPlayers(){
    const p1 = document.getElementById("player1").value || "Player 1";
    const p2 = document.getElementById("player2").value || "Player 2";

    if(selectedSymbol == 1){
        playerNames[1] = p1;
        playerNames[0] = p2;
    } else {
        playerNames[0] = p1;
        playerNames[1] = p2;
    }
}

function renderBoard(){
    boardElement.innerHTML = "";
    setPlayers();

    for(let i = 0; i < board.length; i++){
        const imgName = board[i] == 1 ? "cross.png" : board[i] == 0 ? "circle.png" : "";
        boardElement.innerHTML += `
            <div class="box" onclick="boxClicked(${i})">
                <img src="${imgName}" class="tile-icon">
            </div>`;
    }

    if(!gameOver){
        currentPlayerText.innerText = `${playerNames[currentPlayer]}, it’s your turn`;
    }
}

renderBoard();

function boxClicked(index){
    if(gameOver) return;
    if(board[index] != -1){
        alert("Box already occupied");
        return;
    }

    board[index] = currentPlayer;
    renderBoard();

    if(checkWinner()){
        gameOver = true;
        return;
    }

    currentPlayer = currentPlayer == 1 ? 0 : 1;
    renderBoard();
}

function checkWinner(){
    const wins = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ];

    for(let w of wins){
        const [a,b,c] = w;
        if(board[a] != -1 && board[a] === board[b] && board[b] === board[c]){
            setTimeout(() => {
                alert(playerNames[board[a]] + " is the Winner 🎉");
            }, 50);
            return true;
        }
    }

    if (board.every(function(cell) {
        return cell != -1;})) {
        setTimeout(function() {
            alert("It's a Draw!");}, 50);
        gameOver = true;
        return true;
    }

    return false;

}

function resetGame(){
    for(let i = 0; i < board.length; i++){
        board[i] = -1;
    }
    gameOver = false;
    renderBoard();
}
