(function(){
    self.Board = function(width,height){
        this.width = width;
        this.height = height;
        this.playing = false;
        this.game_over = false;
        this.Bars = [];
        this.ball = null;
    }
    self.Board.prototype = {
        get elements(){
            var elements = this.bar;
            elements.push(ball);
            return elements
        }
    }
})();

(function(){
    self.BoardView = function(canvas,board){
        this.canvas = canvas;
        this.canvas.width = board.width;
        this.canvas.height = board.height;
        this.ctx = board;
        this.ctx = canvas.getContex("2d");
    }
})()

window.addEventListener("load", main)

function main(){
    var board = new Board(700,390);
    console.log(board)
    var canvas = document.getElementById("canvas");
    var board_view = new BoardView(canvas,board);
    console.log(board_view)
}

/* if (this.y <= 10) {
    this.speed_y = -this.speed_y;
    this.bounce_angle = -this.bounce_angle;
}
if (this.y >= 390) {
    this.speed_y = -this.speed_y;
    this.bounce_angle = -this.bounce_angle;
} */