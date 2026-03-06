const Gameboard = (function () { 
    let board = [["e", "e", "e"], 
                 ["e", "e", "e"],
                 ["e", "e", "e"]];  
    let p1Win = false;
    let p2Win = false;

    const markSpot = (row, col, player) => {
        if((row >= 0 && row < board.length) &&
           (col >= 0 && col < board.length) && 
           (board[row][col] != "x" && board[row][col] != "o")){
            if(player == "P1"){
                board[row][col] = "x";
            }else if(player == "P2"){
                board[row][col] = "o";
            }
            checkWin();
        }
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

    const checkHorizontalWin = () => {
        for(let i = 0; i < board.length; i++){
            p1Win = true;
            p2Win = true;
            for(let j = 0; j < board.length; j++){
                const current = board[i][j];
                if(current == "e" ){
                    p1Win = false;
                    p2Win = false;
                    continue;
                }else if(current == "x"){
                    p2Win = false;
                }else if(current == "o"){
                    p1Win = false;
                }
            }
            if(p1Win || p2Win){
                return true;
            }
        }
        return false; 
    }

    const checkVerticalWin = () =>{
        for(let i = 0; i < board.length; i++){
            p1Win = true;
            p2Win = true;
            for(let j = 0; j < board.length; j++){
                const current = board[j][i];
                if(current == "e" ){
                    p1Win = false;
                    p2Win = false;
                    continue;
                }else if(current == "x"){
                    p2Win = false;
                }else if(current == "o"){
                    p1Win = false;
                }
            }   
            if(p1Win || p2Win){
                return true;
            }
        }
        return false; 
    }

    const checkDiagonalWin = () => {
        p1Win = true;
        p2Win = true;
        for(let i = 0; i < board.length; i++){
            const current = board[i][i];
            if(current == "e" ){
                    p1Win = false;
                    p2Win = false;
                    break;
                }else if(current == "x"){
                    p2Win = false;
                }else if(current == "o"){
                    p1Win = false;
            }
        }

        if(p1Win || p2Win){
            return true;
        }else{
            p1Win = true;
            p2Win = true;
        }

        for(let i = 0; i < board.length; i++){
            const current = board[i][2 - i];
            if(current == "e" ){
                    p1Win = false;
                    p2Win = false;
                    break;
                }else if(current == "x"){
                    p2Win = false;
                }else if(current == "o"){
                    p1Win = false;
            }
        }

        if(p1Win || p2Win){
            return true;
        }else{
            p1Win = true;
            p2Win = true;
        }

        return false; 
    }

    const printWin = () => {
        if(p1Win){
            console.log("Player 1 won.")
        }else if(p2Win){
            console.log("Player 2 won.");
        }
        return;
    }

    const checkWin = () => {
        let win = false;
        win = checkHorizontalWin();
        if(win){
            printWin();
            return;
        }

        win = checkVerticalWin();
        if(win){
            printWin();
            return;
        }

        win = checkDiagonalWin();
        if(win){
            printWin();
            return;
        }
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
const p1 = createPlayer("Jane Doe", 1);
const p2 = createPlayer("John Doe", 2);

board.markSpot(0, 2, p1.getId());
board.markSpot(1, 1, p1.getId());
board.markSpot(2, 0, p1.getId());
board.printBoard();