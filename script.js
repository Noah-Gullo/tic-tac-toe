const Gameboard = (function () {
    let board = [false, false, false, 
                   false, false, false,
                   false, false, false];

    const markIndex = (index) => {
        board[index] = true; 
    }

    const clearBoard = () => {
        board = [false, false, false,
                 false, false, false,
                 false, false, false];
    }

    return {board, markIndex, clearBoard};
})

function createPlayer(inputName){
    const name = inputName;
    let wins = 0;
    
    const getName = () => name;
    const getWins = () => wins;
    const addWin = () => {wins += 1;}
    const resetWins = () => {wins = 0;}
    return {getName, getWins, addWin, resetWins}
}

const g1 = new Gameboard();

const player1 = createPlayer("P1");
const player2 = createPlayer("P2");

console.log(player1.getName());
console.log(player2.getName());
player1.addWin();
console.log(player1.getWins());
player1.addWin();
console.log(player1.getWins());
player1.resetWins();
console.log(player1.getWins());