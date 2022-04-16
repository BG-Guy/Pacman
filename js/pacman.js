'use strict';
var pacman = '<img src="img/Pacman1.png"></img>';

var gPacman;

function getgPacman () {
    return gPacman
}

function createPacman(board) {
    gPacman = {
        location: {
            i: 6,
            j: 6
        },
        isSuper: false
    };
    let left = 3
    board[gPacman.location.i][gPacman.location.j] = getPacmanHTML(left);
}

function movePacman(ev) {
    if (!gGame.isOn) return;
    // use getNextLocation(), nextCell
    var nextLocation = getNextLocation(ev);
    var nextCellContent = gBoard[nextLocation.i][nextLocation.j];
    // return if cannot move
    if (nextCellContent === WALL) return;
    // hitting a ghost?  call gameOver
    if (nextCellContent === GHOST) {
        if (gPacman.isSuper) {
            var location = {i:nextLocation.i, j:nextLocation.j}
           killGhost(location)
        }
        else gameOver(!isWon)
        
        // gPacman.isSuper = false ? gameOver()
        // : gGhosts.splice(currGhost.id, 1)  

    }

    if (nextCellContent === FOOD) collectFood()

    if (nextCellContent === POWER_FOOD) {
        if (!gPacman.isSuper) powerMode()
        else return
    }

    if (nextCellContent === SUPER_FOOD) updateScore(15)   
    

    // if (gGame.foodCounter === 0) gameWon()

    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;
    // update the DOM
    renderCell(gPacman.location, EMPTY);
    // Move the pacman
    gPacman.location = nextLocation;
    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = pacman;
    // update the DOM
    renderCell(gPacman.location, pacman);
}


function getNextLocation(ev) {
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    };
    // figure out nextLocation
    switch (ev.key) {
        case 'ArrowDown':
            nextLocation.i++;
            let down = 4
            getPacmanHTML(down)
            break;
        case 'ArrowUp':
            nextLocation.i--;
            let up = 2
            getPacmanHTML(up)
            break;
        case 'ArrowLeft':
            nextLocation.j--;
            let left = 3
            getPacmanHTML(left)
            break;
        case 'ArrowRight':
            nextLocation.j++;
            let right = 1
            getPacmanHTML(right)
            break;
    }

    return nextLocation;
}

function getPacmanHTML(direction) {
    pacman = `<img src="img/Pacman${direction}.png"></img>`;
    return pacman
}



function collectFood() {
    updateScore(1) 
    gGame.foodCounter--
    console.log(gGame.foodCounter)
    if (gGame.foodCounter === 0) gameOver(isWon)
    return

}