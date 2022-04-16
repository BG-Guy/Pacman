'use strict';
const GHOST = '&#9781;';

var gGhosts = [];
var gDeadGhosts = []
var gIntervalGhosts;

function createGhost(board, pos) {
    var ghost = {
        location: {
            i: pos,
            j: pos
        },
        currCellContent: FOOD,
        color: randColor()
    };

    gGhosts.push(ghost);
    //model
    board[ghost.location.i][ghost.location.j] = getGhostHTML(ghost);
}

// 3 ghosts and an interval
function createGhosts(board) {
    gGhosts = [];
    createGhost(board, 3, 0);
    createGhost(board, 4, 1);
    createGhost(board, 5, 2);
    gIntervalGhosts = setInterval(moveGhosts, 1000);
}

// loop through ghosts
function moveGhosts() {
    if (gGhosts.length) {
    for (var i = 0; i < gGhosts.length; i++) {
        moveGhost(gGhosts[i]);
        }
    }
}

function moveGhost(ghost) {
    // figure out moveDiff, nextLocation, nextCell
    var moveDiff = getMoveDiff();
    var nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j
    };
    var nextCellContent = gBoard[nextLocation.i][nextLocation.j];

    // return if cannot move
    if (nextCellContent === WALL) return;
    
    if (nextCellContent === GHOST) return;

    if (nextCellContent === SUPER_FOOD) return;
    // hitting a pacman?  call gameOver
    if (nextCellContent === pacman) {
        if (gPacman.isSuper) return
        gameOver(!isWon);
        // return;
    }

    // update the model
    console.log(ghost)
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent;
    // update the DOM
    renderCell(ghost.location, ghost.currCellContent);
    // Move the ghost
    ghost.location = nextLocation;
    
    ghost.currCellContent = nextCellContent;
    // update the model
    gBoard[ghost.location.i][ghost.location.j] = GHOST;
    // update the DOM
    renderCell(ghost.location, getGhostHTML(ghost));
}

function getMoveDiff() {
    var randNum = getRandomIntInclusive(0, 100);
    if (randNum < 25) {
        return { i: 0, j: 1 };
    } else if (randNum < 50) {
        return { i: -1, j: 0 };
    } else if (randNum < 75) {
        return { i: 0, j: -1 };
    } else {
        return { i: 1, j: 0 };
    }
}

function getGhostHTML(ghost) {
    return `<span style = "color: #${!gPacman.isSuper ? ghost.color : '0000FF' }">${GHOST}</span>`;
}

function reviveGhosts() {
    console.log('reviveGhosts()');
    gGhosts.push(...gDeadGhosts)
    gDeadGhosts = []
}

function killGhost(location) {
    console.log('killGhost, location:', location);

    for (var i = 0; i < gGhosts.length - 1; i++){
        var currGhost = gGhosts[i]
        if (currGhost.location.i === location.i && currGhost.location.j === location.j){
            break
        }
    }

    var killdedGhost = gGhosts.splice(i, 1)[0]
    gDeadGhosts.push(killdedGhost)
}