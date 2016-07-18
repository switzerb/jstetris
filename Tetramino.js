function Tetramino(template) {
    this.name = template.name;
    this.color = template.color;
    this.shapes = [];
    this.orientation = template.orientation;

    for(var i = 0; i < template.shapes.length; i++) {
        this.shapes[i] = template.shapes[i].slice(0);
        for(var j = 0; j < template.shapes[i].length; j++) {
            this.shapes[i][j] = template.shapes[i][j].slice(0);
        }
    }
}

/*
     functionality: moves the tetramino one step down, right or left
     parameter: takes a row and a column to indicate the coordinates of where the tetramino is moving
     returns: void
*/
Tetramino.prototype.move = function (r,c) {
    this.draw("empty");
    for(var orientation = 0; orientation < this.shapes.length; orientation ++) {
        for (var i = 0; i < this.shapes[orientation].length; i++) {
            this.shapes[orientation][i][0] = this.shapes[orientation][i][0] + r;
            this.shapes[orientation][i][1] = this.shapes[orientation][i][1] + c;
        }
    }
    this.draw("fill");
};

/*
     functionality: checks to see if a tetramino can move down, right or left
     parameter: takes a direction that the tetramino is trying to move
     returns: boolean that indicates whether the tetramino can move that direction or not
*/
Tetramino.prototype.canMove = function (direction) {
    for(var i = 0; i < this.shapes[this.orientation].length; i++){
        if(direction == "down") {
            if((this.shapes[this.orientation][i][0] >= ROWS-1) || (getBlock(this.shapes[this.orientation][i][0]+1, this.shapes[this.orientation][i][1]) == true)) {
                return false;
            }
        } else if (direction == "right") {
            if((this.shapes[this.orientation][i][1] >= COLS-1) || (getBlock(this.shapes[this.orientation][i][0], this.shapes[this.orientation][i][1]+1) == true)) {
                return false;
            }
        } else if (direction == "left") {
            if((this.shapes[this.orientation][i][1] <= 0) || (getBlock(this.shapes[this.orientation][i][0], this.shapes[this.orientation][i][1]-1) == true)) {
                return false;
            }
        }
    }
    return true;
};

/*
    function: rotates the tetramino one step left or right
    parameter: takes a direction left or right
    returns: void
 */
Tetramino.prototype.rotate = function (direction) {
    this.draw("empty");
    if (direction == "left") {
        if(this.orientation > 0) {
            this.orientation = this.orientation - 1;
        } else {
            this.orientation = 3;
        }
    } else if (direction == "right") {
        if(this.orientation < 3) {
            this.orientation = this.orientation + 1;
        } else {
            this.orientation = 0;
        }
    }
    this.draw("fill");
}


Tetramino.prototype.canRotate = function(direction) {
    var rotation = this.orientation;

    if(direction == "left"){

        if(this.orientation > 0) {
            rotation = this.orientation - 1;
        } else {
            rotation = 3;
        }

    } else if (direction == "right") {

        if(rotation < 3) {
            rotation = this.orientation + 1;
        } else {
            rotation = 0;
        }
    }

    for(var i = 0; i < this.shapes[rotation].length; i++) {
        if((this.shapes[rotation][i][1] >= COLS) || (this.shapes[rotation][i][0] >= ROWS) || (getBlock(this.shapes[rotation][i][0], this.shapes[rotation][i][1]) == true)) {
            return false;
        }
    }

    return true;
}

/*
    functionality: marks the tetramino as locked into place so that no other tetramino can go there
    parameter: none
    returns: none
*/
Tetramino.prototype.place = function() {
    for (var i = 0; i < this.shapes[this.orientation].length; i++) {
        setBlock(this.shapes[this.orientation][i][0],this.shapes[this.orientation][i][1],true);
    }
    this.draw("fill");
};

Tetramino.prototype.draw = function(action) {
    for (var i = 0; i < this.shapes[this.orientation].length; i++) {
        var row = (this.shapes[this.orientation][i][0]);
        var col = this.shapes[this.orientation][i][1];
        var blockid = "block_" + row + "_" + col;
        if (action == 'fill') {
            var classname = "block active " + this.color;
        } else {
            var classname = "block active black";
        }
        document.getElementById(blockid).setAttribute("class", classname);
    }
};

Tetramino.prototype.center = function(){
    for(var orientation = 0; orientation < this.shapes.length; orientation++) {
        for (var i = 0; i < this.shapes[orientation].length; i++) {
            this.shapes[orientation][i][1] = this.shapes[orientation][i][1] + ((COLS/2) -2);
        }
    }
}