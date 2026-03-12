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
            
            if(statustext.textContent != ""){
                statustext.textContent = "";
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
        statustext.textContent = "Tied game.";
        statustext.style.color = "black";
        state.gameEnd("Tie");
        clearBoard();
        render.displayBoard(board);
    }

    const handleWin = () => {
        if(p1Win){
            statustext.textContent = "Player 1 wins!";
            statustext.style.color = "blue";
            state.gameEnd("P1");
        }else if(p2Win){
            statustext.textContent = "Player 2 wins!";
            statustext.style.color = "red";
            state.gameEnd("P2");
        }
        clearBoard();
        render.displayBoard(board);
    }

    const checkWin = () => {
        let win = false;
        win = checkHorizontalWin();
        if(win){
            handleWin();
            return;
        }

        win = checkVerticalWin();
        if(win){
            handleWin();
            return;
        }

        win = checkDiagonalWin();
        if(win){
            handleWin();
            return;
        }

        checkTie();
    }

    return {getBoard, markSpot, clearBoard};
})

const StateManager = (function () {
    let p1Turn = true; 
    let gameEnded = false;
    let p1WinCount = 0;
    let p2WinCount = 0;

    const getP1Turn = () => p1Turn;
    const getGameEnded = () => gameEnded;
    const getP1WinCount = () => p1WinCount;
    const getP2WinCount = () => p2WinCount;

    const setGameEnded = (flag) => {setGameEnded = flag;}
    const gameEnd = (winner) => {
        p1Turn = true;
        gameEnded = true;
        if(winner == "P1"){
            p1WinCount += 1;
        }else if(winner == "P2"){
            p2WinCount += 1;
        }
    }
    const nextTurn = () => {p1Turn = !p1Turn;}

    return {getP1Turn, getGameEnded, getP1WinCount, getP2WinCount, setGameEnded, gameEnd, nextTurn}
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
                    if((i >= 0 && i < board.length) &&
                       (j>= 0 && j < board.length) && 
                       (board[i][j] != "x" && gameboard.getBoard()[i][j] != "o")){     
                        /*if(state.getP1Turn()){
                            space.textContent = "x";
                            space.style.color = "blue";
                            turntext.textContent = p2.getName() + "'s turn.";
                            turntext.style.color = "red"
                            gameboard.markSpot(i, j, p1.getId());
                        }else{
                            space.textContent = "o";
                            space.style.color = "red";
                            turntext.textContent = p1.getName() + "'s turn.";
                            turntext.style.color = "blue";
                            gameboard.markSpot(i, j, p2.getId());
                        } */

                        if(state.getP1Turn()){
                            gameboard.markSpot(i, j, p1.getId());
                        }else{
                            gameboard.markSpot(i, j, p2.getId());
                        }
                        
                        if(state.getGameEnded()){ 
                           state.setGameEnded(false);
                        }else{
                            if(state.getP1Turn()){
                                space.textContent = "x";
                                space.style.color = "blue";
                                turntext.textContent = p2.getName() + "'s turn.";
                                turntext.style.color = "red"
                            }else{
                                space.textContent = "o";
                                space.style.color = "red";
                                turntext.textContent = p1.getName() + "'s turn.";
                                turntext.style.color = "blue";
                            }
                        }
                        
                        state.nextTurn();
                        space.setAttribute("class", "row" + i);
                    }
                })

                board_grid.appendChild(space);
            }
        }
    }
    return {displayBoard};
})

function createPlayer(inputName, id, symbol){
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
const state = new StateManager;

const p1 = createPlayer("Player 1", 1);
const p2 = createPlayer("Player 2", 2);

const button_wrapper = document.getElementById("button-wrapper");
const change_button = document.createElement("button");
const reset_button = document.createElement("button");
change_button.textContent = "Change Name"
reset_button.textContent = "Reset Board";
button_wrapper.appendChild(reset_button);
button_wrapper.appendChild(change_button);  

const text_wrapper = document.getElementById("text-wrapper");
const statustext = document.createElement("p");
const turntext = document.createElement("p");
turntext.textContent = p1.getName() + "'s turn.";
turntext.style.color = "blue";
text_wrapper.appendChild(statustext);
text_wrapper.appendChild(turntext);

render.displayBoard(gameboard.getBoard());