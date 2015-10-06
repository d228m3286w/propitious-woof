var myAdventure;

var movDown = function() {
    myAdventure.mov(0, 1);
};

var movUp = function() {
    myAdventure.mov(0, -1);
};

var movLeft = function() {
    myAdventure.mov(-1, 0);
};

var movRight = function() {
    myAdventure.mov(1, 0);
};

var setup = function() {
    var adventureSize = Math.floor(3 + Math.random()*8);
    myAdventure = new Adventure(0, 0, adventureSize-1, adventureSize-1, adventureSize);
    myAdventure.generateGrid();
};

var reset = function() {
    myAdventure.reset();
}

document.onkeydown = function(e) {
    switch (e.keyCode) {
        case 37:
            movLeft();
            break;
        case 38:
            movUp();
            break;
        case 39:
            movRight();
            break;
        case 40:
            movDown();
            break;
        case 32:
            reset();
            break;
    }
};