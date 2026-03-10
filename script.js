var p1Turn = true; 

const Gameboard = (function () { 
    let board = [["e", "e", "e"], 
                 ["e", "e", "e"],
                 ["e", "e", "e"]];  
    let p1Win = false;
    let p2Win = false;

    const getBoard = () => {return board};

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
            for(let col = 0; col < board.length; col++){
                board[row][col] = "e";
            }
        }
        return;
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

    const checkTie = () => {
        for(let i = 0; i < board.length; i++){
            for(let j = 0; j < board.length; j++){
                if(board[i][j] == "e"){
                    return;
                }
            }
        }
        console.log("Tie detected");
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

        checkTie();
    }

    return {getBoard, markSpot, clearBoard};
})

const RenderHandler = (function()  {
    const displayBoard = (board) => {
        const board_grid = document.getElementById("board-grid");
        
        if(board_grid.childElementCount > 0){
            while(board_grid.firstChild){
                board_grid.removeChild(board_grid.lastChild);
            }
        }

        for(let i = 0; i < board.length; i++){
            for(let j = 0; j < board.length; j++){
                const space = document.createElement("div");
                space.setAttribute("class", "row" + i);
                if(board[i][j] != "e"){
                    space.textContent = board[i][j];
                }else{
                    space.setAttribute("class", "row" + i + " unmarked")
                    space.textContent = " ";
                }

                space.addEventListener("click", () =>{
                    if(p1Turn){
                        space.textContent = "x";
                        gameboard.markSpot(i, j, p1.getId());
                    }else{
                        space.textContent = "o";
                        gameboard.markSpot(i, j, p2.getId());
                    }    
                    p1Turn = !p1Turn
                    space.setAttribute("class", "row" + i);
                })

                board_grid.appendChild(space);
            }
        }
    }
    return {displayBoard};
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

const gameboard = new Gameboard;
const render = new RenderHandler; 
const p1 = createPlayer("Jane Doe", 1);
const p2 = createPlayer("John Doe", 2);
render.displayBoard(gameboard.getBoard());