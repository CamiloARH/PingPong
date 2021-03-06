var marcador1 = document.getElementById("Puntaje1");
var marcador2 = document.getElementById("Puntaje2");

(function(){
	self.Board = function(width,height){
		this.width = width;
		this.height = height;
		this.playing = false;
		this.game_over = false;
		this.bars = [];
		this.ball = null;
		this.playing = false;
	}

	self.Board.prototype = {
		get elements(){
			var elements = this.bars.map(function(bar){ return bar; });
			elements.push(this.ball);
			return elements;
		}
	}
})();

(function(){
	self.Ball = function(x,y,radius,board){
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.speed_y = 0;
		this.speed_x = 3;
		this.board = board;
		this.direction = -1;
		this.bounce_angle = 0;
		this.max_bounce_angle = Math.PI / 12;
		this.speed = 5;

		board.ball = this;
		this.kind = "circle";
			
	}
	
	self.Ball.prototype = {
		move: function(){
			this.x += (this.speed_x * this.direction);
			this.y += (this.speed_y);
			if (this.y <= 10) {
				this.speed_y = -this.speed_y;
				this.bounce_angle = -this.bounce_angle;
			}
			if (this.y >= 390) {
				this.speed_y = -this.speed_y;
				this.bounce_angle = -this.bounce_angle;
			}

			if (ball.x <= 0){
				ball.x= 790;
				score2 += 1
1
			}
			if (ball.x >=800){
				ball.x= 10;
				score1 += 1
			}
		
			marcador1.innerHTML = "Jugador 1: " + score1;
			marcador2.innerHTML = "Jugador 2: " + score2;
		},

		
		get width(){
			return this.radius * 2;
		},
		get height(){
			return this.radius * 2;
		},
		collision: function(bar){
			var relative_intersect_y = ( bar.y + (bar.height / 2) ) - this.y;
			var normalized_intersect_y = relative_intersect_y / (bar.height / 2);
			this.bounce_angle = normalized_intersect_y * this.max_bounce_angle;
			this.speed_y = this.speed * -Math.sin(this.bounce_angle);
			this.speed_x = this.speed * Math.cos(this.bounce_angle);

			if(this.x > (this.board.width / 2)) this.direction = -1;
			else this.direction = 1;
			
		}
	}
})();
(function(){
	self.Bar = function(x,y,width,height,board){
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.board = board;
		this.board.bars.push(this);
		this.kind = "rectangle";
		this.speed = 10;
	}

	self.Bar.prototype = {
		down: function(){
			this.y += this.speed;
		},
		up: function(){
			this.y -= this.speed;
		},
		toString: function(){
			return "x: "+ this.x +" y: "+ this.y ;
		}
	}
})();

(function(){
	self.BoardView = function(canvas,board){
		this.canvas = canvas;
		this.canvas.width = board.width;
		this.canvas.height = board.height;
		this.board = board;
		this.ctx = canvas.getContext("2d");
	}

	self.BoardView.prototype = {
		clean: function(){
			this.ctx.clearRect(0,0,this.board.width,this.board.height);
		},
		draw: function(){
			for (var i = this.board.elements.length - 1; i >= 0; i--) {
				var el = this.board.elements[i];
                this.ctx.fillStyle = "white";
				draw(this.ctx,el);
			};
		},
		check_collisions: function(){
			for (var i = this.board.bars.length - 1; i >= 0; i--) {
				var bar = this.board.bars[i];
				if(hit(bar, this.board.ball)){
					this.board.ball.collision(bar);
				}
			};
		},
		play: function(){
			if(this.board.playing){
				this.clean();
				this.draw();
				this.check_collisions();
				this.board.ball.move();	
			}
		}
	}

	function hit(a,b){
		
		var hit = false;
		
		if(b.x + b.width >= a.x && b.x < a.x + a.width){
		  if(b.y + b.height >= a.y && b.y < a.y + a.height)
				hit = true;
		}
		
		if(b.x <= a.x && b.x + b.width >= a.x + a.width){
			if(b.y <= a.y && b.y + b.height >= a.y + a.height)
				hit = true;
		}
	
		if(a.x <= b.x && a.x + a.width >= b.x + b.width){
			if(a.y <= b.y && a.y + a.height >= b.y + b.height)
				hit = true;
		}
		
		return hit;
	}

	function draw(ctx,element){
		switch(element.kind){
			case "rectangle":
				ctx.fillRect(element.x,element.y,element.width,element.height);
				break;
			case "circle": 
				ctx.beginPath();
				ctx.arc(element.x,element.y,element.radius,0,7);
				ctx.fill();
				ctx.closePath();
				break;
		}	
	}
})();
var score1=0;
var score2=0;
var board = new Board(800,400);
var bar = new Bar(2,130,20,100,board);
var bar_2 = new Bar(778,130,20,100,board);
var canvas = document.getElementById('canvas');
var board_view = new BoardView(canvas,board);
var ball = new Ball(400, 180, 10,board);
var puntaje1 = new component("16px", "Consolas", "white", 200, 25, "text");
var puntaje2 = new component("16px", "Consolas", "white", 410, 25, "text");

document.addEventListener("keydown",function(ev){
	if (ev.keyCode == 38) {
		ev.preventDefault();
		if (bar_2.y >= 10) {
			bar_2.up(); 
		}
	}
	else if (ev.keyCode == 40) {
		ev.preventDefault();
		if (bar_2.y <= 290) {
			bar_2.down(); 
		}
	}
	else if (ev.keyCode == 87) {
		//Tecla W
		ev.preventDefault();
		if (bar.y >= 10) {
			bar.up(); 
		}
	}
	else if (ev.keyCode == 83) {
		//tecla S
		ev.preventDefault();
		if (bar.y <= 290) {
			bar.down(); 
		}
	} else if (ev.keyCode == 32) {
		ev.preventDefault();
		board.playing = !board.playing;
	}
});

board_view.draw();
window.requestAnimationFrame(controller);

function controller(){
	board_view.play();
	requestAnimationFrame(controller);
}

function component(width, height, color, x, y, type) {
	this.type = type;
	this.width = width;
	this.height = height;
	this.x = x;
	this.y = y;
	this.speedX = 0;
	this.speedY = 0;
	
}
/* puntaje1.text = "Jugador 1: " + score1;
console.log(puntaje1.text)

puntaje2.text = "Jugador 2: " + score2;
console.log(puntaje2.text) */