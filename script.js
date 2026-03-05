const Gameboard = (function () { 
    let board = [["e", "e", "e"], 
                 ["e", "e", "e"],
                 ["e", "e", "e"]];   
    const markSpot = (row, col, player) => {
        if(row >= 0 && row < board.length &&
           (col >= 0 && row < board.length) &&
           (board[row][col] != "x" && board[row][col] != "o")){
            if(player == "P0"){
                board[row][col] = "x";
            }else if(player == "P1"){
                board[row][col] = "o";
            }
        }
        checkWin();
    }

    const clearBoard = () => {
        for(let row = 0; row < board.length; row++){
            for(let col = row; col < board.length; col++){
                board[row][col] = "e";
            }
        }
    }

    const printBoard = () => {
        console.log(board.map(row => row.join(' ')).join('\n'));
    }

    const checkWin = () => {

    }

    return {markSpot, clearBoard, printBoard};
})

function createPlayer(inputName, id){
    const name = inputName;
    let wins = 0;
    
    const getName = () => name;
    const getId = () => "P" + id;
    const getWins = () => wins;
    const addWin = () => {wins += 1;}
    const resetWins = () => {wins = 0;}

    getId();
    return {getName, getId, getWins, addWin, resetWins}
}

const board = new Gameboard;
const p0 = createPlayer("Jane Doe", 0);
const p1 = createPlayer("John Doe", 1);

board.markSpot(0, 0, p0.getId());
board.markSpot(0, 1, p0.getId());
board.markSpot(0, 2, p0.getId());
board.markSpot(2, 1, p1.getId());
board.printBoard();