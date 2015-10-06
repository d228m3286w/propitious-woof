var holdon = new Audio('sounds/holdon.wav');
var coon = new Audio('sounds/racoon.wav');
var dead = new Audio('sounds/dead.wav');

function Adventure(startX, startY, endX, endY, bound) {
	this.coord = new Thing(startX, startY);
	this.start = new Thing(startX, startY);
	this.end = new Thing(endX, endY, this, this.endAction, "retire.png");
    this.burns = new Thing(endX-1, endY-1, this, this.burnsAction, "burns.jpg");
	this.stuff = [this.burns, this.end];
    this.bound = bound;
	this.isGhost = false;

}

Adventure.prototype.endAction = function(xChange, yChange) {
    this.adventure.hideAbe();
    this.adventure.coord.x += xChange;
    this.adventure.coord.y += yChange;
    alert("Whuuthaa!!??");
    this.adventure.killAbe();
    dead.play();
};

Adventure.prototype.burnsAction = function(xChange, yChange) {
    alert("You're fired!");
    reset();
}

Adventure.prototype.atPosition = function(xChange, yChange, position) {
    return this.coord.x + xChange === position.x && this.coord.y + yChange === position.y;
};

Adventure.prototype.mov = function(xChange, yChange) {
	if (this.movStuff(xChange, yChange)) {}
	else if ((this.coord.x + xChange) < 0 || (this.coord.x + xChange) >= this.bound) {
        holdon.play();
        alert("D'oh!!!");
    }
    else if ((this.coord.y + yChange) < 0 || (this.coord.y + yChange) >= this.bound) {
        coon.play();
        alert("D'oh!!!");
    }
    else {
 		this.hideAbe();
        this.coord.x += xChange;
        this.coord.y += yChange;
		this.movAbe();
	};
}

Adventure.prototype.movStuff = function(xChange, yChange) {
    for (var i = 0; i < this.stuff.length; i++) {
        if(!this.isGhost && this.atPosition(xChange, yChange, this.stuff[i])) {
            this.stuff[i].action(xChange, yChange);
            return true;
        }
    }
    return false;
};

Adventure.prototype.getID = function(param) {
    return param.x.toString() + param.y.toString();
};


//Adding a function to replace the winning cell with a picture of dead Abe Simpson
Adventure.prototype.killAbe = function () {
    document.getElementById(this.getID(this.coord)).innerHTML = this.makeImageElement("dead.jpg");
    this.isGhost = true;
};

Adventure.prototype.place = function(marap) {
  var imageElement = this.makeImageElement(marap.image);
  document.getElementById(this.getID(marap)).innerHTML = imageElement;


}
    
Adventure.prototype.movAbe = function() {
    if (myAdventure.isGhost) {
        imageElement = this.makeImageElement("ghost.png");
    } else {
        imageElement = this.makeImageElement("small_abe.png");
    }
    document.getElementById(this.getID(this.coord)).innerHTML = imageElement;
};

Adventure.prototype.makeImageElement = function(image) {
    return "<img class=\"img-responsive center-block\" src=\"img/"
        + image + "\"></img>";
}

Adventure.prototype.hideAbe = function () {
    document.getElementById(this.getID(this.coord)).innerHTML = "";
};

Adventure.prototype.generateGrid = function() {
    for (var row = 0; row < this.bound; row++) {
        document.write("<tr class=\"row\">\n");

        for (var col = 0; col < this.bound; col++) {
            document.write(" <td id=\"" + col + row + 
                "\" class=\"cell\"></td>\n");
        }
        document.write("</tr>");
    }
    this.reset();
};

Adventure.prototype.reset = function() {
    this.hideAbe();
    this.coord.x = this.start.x;
    this.coord.y = this.start.y;
    this.isGhost = false;
    this.movAbe();
    for (var i = 0; i < this.stuff.length; i++) {
        this.place(this.stuff[i]); 
    }   
}

function Thing(x, y, adventure, action, image) {
    this.x = x;
    this.y = y;
    this.adventure = adventure;
    this.action = action;
    this.image = image;
}