const Gameboard = (function () { 
    let board = ["e", "e", "e", 
                 "e", "e", "e",
                 "e", "e", "e"];   
    const markIndex = (index, player) => {
        if(index >= 0 && index < 9 &&
           (board[index] != "x" && board[index] != "o")){
            if(player == "P0"){
                board[index] = "x";
            }else if(player == "P1"){
                board[index] = "o";
            }
        }
    }

    const clearBoard = () => {
        for(let i = 0; i < board.length; i++){
            board[i] = false;
        }
    }

    const printBoard = () => {
        for(let i = 0; i < board.length; i += 3){
            console.log(board.slice(i, i + 3).join(" | "));
            console.log("");
        }
    }

    const checkWin = () => {

    }

    return {markIndex, clearBoard, printBoard, checkWin};
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
