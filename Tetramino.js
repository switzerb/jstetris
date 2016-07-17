function Tetramino(template) {
    this.name = template.name;
    this.color = template.color;
    this.shapes = [];

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
    for (var i = 0; i < this.shapes[0].length; i++) {
        this.shapes[0][i][0] = this.shapes[0][i][0] + r;
        this.shapes[0][i][1] = this.shapes[0][i][1] + c;
    }
};

/*
     functionality: checks to see if a tetramino can move down, right or left
     parameter: takes a direction that the tetramino is trying to move
     returns: boolean that indicates whether the tetramino can move that direction or not
*/
Tetramino.prototype.canMove = function (direction) {
    for(var i = 0; i < this.shapes[0].length; i++){
        if(direction == "down") {
            if((this.shapes[0][i][0] >= ROWS-1) || (getBlock(this.shapes[0][i][0]+1, this.shapes[0][i][1]) == true)) {
                return false;
            }
        } else if (direction == "right") {
            if((this.shapes[0][i][1] >= COLS-1) || (getBlock(this.shapes[0][i][0], this.shapes[0][i][1]+1) == true)) {
                return false;
            }
        } else if (direction == "left") {
            if((this.shapes[0][i][1] <= 0) || (getBlock(this.shapes[0][i][0], this.shapes[0][i][1]-1) == true)) {
                return false;
            }
        }
    }
    return true;
};

/*
    functionality: marks the tetramino as locked into place so that no other tetramino can go there
    parameter: none
    returns: none
*/
Tetramino.prototype.place = function() {
    this.draw("fill");
    for (var i = 0; i < this.shapes[0].length; i++) {
        setBlock(this.shapes[0][i][0],this.shapes[0][i][1],true);
    }
};

Tetramino.prototype.draw = function(action) {
    for (var i = 0; i < this.shapes[0].length; i++) {
        var row = (this.shapes[0][i][0]);
        var col = this.shapes[0][i][1];
        var blockid = "block_" + row + "_" + col;
        if (action == 'fill') {
            var classname = "block active " + this.color;
        } else {
            var classname = "block active black";
        }
        document.getElementById(blockid).setAttribute("class", classname);
    }
};