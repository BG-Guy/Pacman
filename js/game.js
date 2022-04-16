'use strict';
const WALL = '🟦';
const FOOD = '.';
const EMPTY = ' ';
const SUPER_FOOD = '🍒'
const POWER_FOOD = '🥦'
var isWon = true
var gBoard;
var gCherryOnBoard = false
var gGame = {
    score: 0,
    isOn: false,
    foodCounter: 0,
};


function init() {
    gBoard = buildBoard();
    createPacman(gBoard);
    createGhosts(gBoard);
    printMat(gBoard, '.board-container');
    gGame.isOn = true;
    console.log(gGame.foodCounter)
    setInterval(getPowerFood, 15000);

}

function buildBoard() {
    gGame.foodCounter = 0
    var SIZE = 10;
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            board[i][j] = FOOD;
            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2)) {
                board[i][j] = WALL;

            }

        
            // if the location is the pacman location
            else if (i === 6 && j === 6) continue
            
            else {
                gGame.foodCounter++
                board[i][j] = FOOD
            }

        }
    }
    board[1][1] = POWER_FOOD;
    board[8][1] = POWER_FOOD;
    board[1][8] = POWER_FOOD;
    board[8][8] = POWER_FOOD;
    gGame.foodCounter -= 4;

    return board;
}



// update model and dom
function updateScore(diff) {
    // model
    gGame.score += diff;

    //dom
    var elScore = document.querySelector('h2 span');
    elScore.innerText = gGame.score;
}

// TODO
function gameOver(isWon) {
    var elGameOverModal = document.querySelector('.game-over-modal')
    var elMessage = document.querySelector('.game-over-modal h1')
    clearInterval(gIntervalGhosts);
    gIntervalGhosts = null;
    gGame.isOn = false;
    gGame.foodCounter = 0
    
    if (!isWon) {
    elGameOverModal.style.visibility = 'visible'
    elMessage.innerHTML = 'GAME OVER'
    
    }
        else if (isWon) {
            elGameOverModal.style.visibility = 'visible'
            elMessage.innerHTML = 'VICTORIOUS'
        }
}

function newGame() {
    var elGameOverModal = document.querySelector('.game-over-modal')
    elGameOverModal.style.visibility = "hidden"
    init()
}

function powerMode () {
    gPacman.isSuper = true

    setTimeout( powerModeOff, 5000)

}

function powerModeOff(){
    gPacman.isSuper = false
    reviveGhosts()
}

function getPowerFood() {
    if (!gCherryOnBoard) {
        var pos = getEmptyPos();
        if (!pos) return;
        gBoard[pos.i][pos.j] = SUPER_FOOD;
        renderCell(pos, SUPER_FOOD);
        gCherryOnBoard = true
    }

}