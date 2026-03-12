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
        statustext.textContent = "Tied game. " + p1.getName() + " has " + state.getP1WinCount() + 
                                 " wins and " + p2.getName() + " has " + state.getP2WinCount() + " win(s).";
        statustext.style.color = "black";
        state.gameEnd("Tie");
        clearBoard();
        render.displayBoard(board);
    }

    const handleWin = () => {
        if(p1Win){
            statustext.style.color = "blue";
            state.gameEnd("P1");
            statustext.textContent = p1.getName() + " wins! " + p1.getName() + " has " + state.getP1WinCount() + " win(s).";
        }else if(p2Win){
            statustext.style.color = "red";
            state.gameEnd("P2");
            statustext.textContent = p2.getName() + " wins! " + p2.getName() + " has " + state.getP2WinCount() + " win(s).";
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

    const resetWins = () => {
        p1WinCount = 0;
        p2WinCount = 0;
    }

    const setP1Turn = (flag) => p1Turn = flag;
    const setGameEnded = (flag) => {gameEnded = flag;}
    const gameEnd = (winner) => {
        p1Turn = false;
        if(winner == "P1"){
            p1WinCount += 1;
        }else if(winner == "P2"){
            p2WinCount += 1;
        }
        gameEnded = false;
    }
    const nextTurn = () => {p1Turn = !p1Turn;}

    return {getP1Turn, getGameEnded, getP1WinCount, getP2WinCount, resetWins, setP1Turn, setGameEnded, gameEnd, nextTurn}
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
                            state.nextTurn();
                        }
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
    let name = inputName;
    const getName = () => name;
    const getId = () => "P" + id;
    const setName = (newName) => name = newName;

    getId();
    return {getName, getId, setName}
}

const gameboard = new Gameboard;
const render = new RenderHandler; 
const state = new StateManager;

const p1 = createPlayer("Player 1", 1);
const p2 = createPlayer("Player 2", 2);

const changeNamesPopup = document.querySelector("dialog");
const buttonWrapper = document.getElementById("button-wrapper");
const changeButton = document.createElement("button");
const saveNamesButton = document.getElementById("submit-button");
const resetBoardButton = document.createElement("button");
const resetGameButton = document.createElement("button");
changeButton.textContent = "Change Name";
changeButton.addEventListener("click", () => {
    changeNamesPopup.showModal();
});

saveNamesButton.addEventListener("click", () => {
    p1.setName(document.getElementById("p1-name-change").value);
    p2.setName(document.getElementById("p2-name-change").value);

    if(state.getP1Turn()){
        turntext.textContent = p1.getName() + "'s turn."
    }else{
        turntext.textContent = p2.getName() + "'s turn."
    }

    if(state.getGameEnded()){
        if(state.getP1Turn()){
            statustext.textContent = p1.getName() + "'s turn."
        }else{
            statustext.textContent = p2.getName() + "'s turn."
        }
    }

    changeNamesPopup.close();
});

resetGameButton.textContent = "Reset Wins";
resetGameButton.addEventListener("click", () => {
    state.resetWins(); 
});

resetBoardButton.textContent = "Reset Board";
resetBoardButton.addEventListener("click", () => {
    turntext.textContent = p1.getName() + "'s turn."
    turntext.style.color = "blue";
    state.setP1Turn(true);
    gameboard.clearBoard();
    render.displayBoard(gameboard.getBoard());    
});

buttonWrapper.appendChild(resetGameButton);
buttonWrapper.appendChild(resetBoardButton);
buttonWrapper.appendChild(changeButton);  

const text_wrapper = document.getElementById("text-wrapper");
const statustext = document.createElement("p");
const turntext = document.createElement("p");
turntext.textContent = p1.getName() + "'s turn.";
turntext.style.color = "blue";
text_wrapper.appendChild(statustext);
text_wrapper.appendChild(turntext);

render.displayBoard(gameboard.getBoard());