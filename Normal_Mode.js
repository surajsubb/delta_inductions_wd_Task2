var ctx;
var background_colour = 'rgb(255,255,255)';
var height=600;
var width=400;
var x=165;
var y=585;
var ball_colour = 'rgb(255,0,0)';
var radius = 15;
var dx=5;
var dy=5;
var speed = 0;
var bottom=585;
var diff=45;
var up=bottom-diff;
var rightKey = false;
var leftKey = false;
var upKey = false;
var incircle = false;
var circleTotal = 2,
	circles = [ ],
	concircles = [ ],
	circle_x = 165,
	circle_y = 100,
	circle_r1 = 90,
	circle_r2 = 100,
	circle_vertical_speed = 5,
	circle_horizontal_speed = 5,
	circle_rotate=0,
	colour1 = 'rgb(255,0,0)',
	colour2 = 'rgb(0,0,255)';
var highScore = 0;
var game = 1;
var new_colour = 0;
var change_colour = 500;
var pp =1;
var lower_speed = 1;
var upper_speed = 2;
var height = 1000;
function init(){
	const canvas = document.getElementById("canvas");
	ctx= canvas.getContext('2d');
	clear_canvas();
	ctx.beginPath();
	ctx.fillStyle = ball_colour ;
	ctx.arc(x,y,radius,0,Math.PI*2,true);
	ctx.closePath();
	ctx.fill();
	generate_concircles();
	draw_concircles();
	set_to_zero();
	init.drawball = setInterval(draw_ball,1);
	init.rotate = setInterval(rotate_concircles,30);
	init.collision = setInterval(collision_detection,1);
	init.newPosition = setInterval(new_position,5);
	init.high_scores = setInterval(highscore,5);
	init.storescore = setInterval(store_score,5);
	document.addEventListener('keydown', keyDown, false);
	document.addEventListener('keyup', keyUp, false);
	ctx.lineWidth = 2;
	ctx.beginPath();
    ctx.moveTo(330,0);
    ctx.lineTo(330, 600);
    ctx.stroke();
	ctx.clearRect(350,200,500,150);
	ctx.fillStyle = "black";
	ctx.font = '20px serif';
	ctx.fillText("Press X to Pause",350,300);
}
function clear_canvas(){
	const canvas = document.getElementById("canvas");
	ctx= canvas.getContext('2d');
	ctx.clearRect(0,0, width,height);
}
function draw_ball(){
	if( highScore > change_colour){
		newColour();
		change_colour+=500;
	}
	const canvas = document.getElementById("canvas");
	ctx= canvas.getContext('2d');
	ctx.fillStyle = ball_colour ;
	ctx.beginPath();
	ctx.arc(x,y,radius,0,Math.PI*2,true);
	ctx.closePath();
	ctx.fill();
}
function jump(){
	upKey=true;
	//document.getElementById("jump").disabled = true;
	const canvas = document.getElementById("canvas");
	ctx= canvas.getContext('2d');
	var jump_sound = document.getElementById('jump_sound');
	jump_sound.pause();
	jump_sound.currentTime = 0;
	jump_sound.play();
	jump.move=setInterval(draw,20);
}
function draw(){
	//context.globalCompositeOperation = 'destination-out'
	if(y>=300){
		ctx.clearRect(x-15,y-15,30,30);
		y-=dy;
		//highscore();
		ctx.fillStyle = ball_colour ;
		ctx.beginPath();
		ctx.arc(x,y,radius,0,Math.PI*2,true);
		ctx.closePath();
		ctx.fill();
	}
	if(y<300){
		ctx.clearRect(x-15,y-15,30,30);
		y=300;
		ctx.fillStyle = ball_colour ;
		ctx.beginPath();
		ctx.arc(x,y,radius,0,Math.PI*2,true);
		ctx.closePath();
		ctx.fill();
		dy=-dy;
		speed = 1;
		if(incircle == true ){
			incircle = false;
			clearInterval(verticalmove_concircles.m);
		}
		verticalmove_concircles();
	}
	if ( y==up && speed == 0){
		dy=-dy;
		speed = 1;
	}	
	if ( speed == 1 && y == 585){
		y-=dy;
		dy = 5;
		speed=0;
		ctx.clearRect(x-15,y-15,30,30);
		ctx.fillStyle = ball_colour ;
		ctx.beginPath();
		y-=5;
		ctx.arc(x,y,radius,0,Math.PI*2,true);
		ctx.closePath();
		ctx.fill();
		//document.getElementById("jump").disabled = false;
		clearInterval(jump.move);
		upKey=false;
		up=y-diff;
	}
	
}
/*function left(){
	const canvas = document.getElementById("canvas");
	const ctx = canvas.getContext('2d');
	ctx.clearRect(x-15,y-15,30,30);
	ctx.beginPath();
	ctx.fillStyle = ball_colour ;
	if(x==15){
	}
	else{
		x-=30;
	}
	ctx.arc(x,y,radius,2 * Math.PI,false);
	ctx.closePath();
	ctx.fill();
}
function right(){
	const canvas = document.getElementById("canvas");
	const ctx = canvas.getContext('2d');
	ctx.clearRect(x-15,y-15,30,30);
	ctx.beginPath();
	ctx.fillStyle = ball_colour ;
	if(x==315){
	}
	else{
		x+=30;
	}
	ctx.arc(x,y,radius,2 * Math.PI,false);
	ctx.closePath();
	ctx.fill();
}*/
function keyDown(e) {
  /*if (e.keyCode == 39){
	  right();
  }
  else if (e.keyCode == 37){
	 left();
  }*/
  if (e.keyCode == 38){
	if(upKey == true && game == 1){
		/*if(incircle == true && y <= 300 ){
			incircle = false;
			clearInterval(verticalmove_concircles.m);
		}*/
		clearInterval(jump.move);
		bottom=y;
		speed=0;
		dy=5;
		up=bottom-diff;
		jump();
	}
	else if (game == 1){
		jump();
	}
  }
  else if (e.keyCode == 88){
	  if(pp == 0){
		//alert("play");
		game = 1;
		init.drawball = setInterval(draw_ball,1);
		init.rotate = setInterval(rotate_concircles,30);
		jump.move = setInterval(draw,20)
		pp = 1;
		var ctx = document.getElementById('canvas').getContext('2d');
		ctx.clearRect(350,200,200,150);
		ctx.fillStyle = "black";
		ctx.font = '20px serif';
		ctx.fillText("Press X to Pause",350,300);
	}
	else{
		clearInterval(init.draw_ball);
		clearInterval(init.rotate);
		clearInterval(jump.move);
		game = 0;
		pp = 0;
		var ctx = document.getElementById('canvas').getContext('2d');
		ctx.clearRect(350,200,500,150);
		ctx.fillStyle = "black";
		ctx.font = '20px serif';
		ctx.fillText("Press X to Play",350,300);
		  
	  }
  }
}
/*function generate_circles(){
	for ( i = 0; i<circleTotal; i++){
		circle_horizontal_speed=random(1,6);
		circles.push([circle_x,circle_y,circle_r,circle_vertical_speed,circle_horizontal_speed]);
		circle_y += 90;
	}
}
function draw_circles(){
	const canvas = document.getElementById("canvas");
	ctx= canvas.getContext('2d');
	for(var i = 0; i < circleTotal; i++){
		ctx.beginPath();
		ctx.fillStyle = ball_colour ;
		ctx.arc(circles[i][0],circles[i][1],circle_r,0,Math.PI*2,true);
		ctx.closePath();
		ctx.fill();
		
	}
}
function vertical_move_circles(){
	//const canvas = document.getElementById("canvas");
	//ctx= canvas.getContext('2d');
	let i = 0;
	incircle = true;
 	vertical_move_circles.m=setInterval(function() {
		if(i == 8 || incircle == false || ( y<300)){
			clearInterval(vertical_move_circles.m);
		}
		for( var j = 0; j < circleTotal; j++){
			ctx.clearRect(circles[j][0]-15,circles[j][1]-15,30,30);
			circles[j][1]+=circle_horizontal_speed;
			draw_circles();
		}
		i++;
	},5);
}

function horizontal_move_circles(){
	let i = 0;
 	horizontal_move_circles.m=setInterval(function() {
		/*if(i == 8 || incircle == false ){
			clearInterval(vertical_move_circles.m);
		}
		for( var j = 0; j < circleTotal; j++){
			if(circles[j][0] >= 315 || circles[j][0] <= 15){
				circles[j][4]=-circles[j][4];
			}
			ctx.clearRect(circles[j][0]-15,circles[j][1]-15,30,30);
			circles[j][0]+=circles[j][4];
			draw_circles();
		}
		i++;
	},30);	
}*/
function generate_concircles(){
	const canvas = document.getElementById("canvas");
	ctx= canvas.getContext('2d');
	for ( i = 0; i<circleTotal; i++){
		var circle_rotate_speed=random(lower_speed,upper_speed);
		var circle_r1 = random(70,80);
		var circle_r2 = random(90,100);
		concircles.push([circle_x,circle_y,circle_r1,circle_r2,circle_vertical_speed,circle_rotate,colour1,colour2,circle_rotate_speed]);
		circle_y -= 400;
	}
	circle_y = 100;
}
function destroy_circles(){
	for ( i = 0; i<circleTotal; i++){
		concircles.pop();
	}
}
function draw_concircles(){
	var ctx = document.getElementById('canvas').getContext('2d');
	for(var i=0;i<circleTotal;i++){
		ctx.beginPath(); 
		ctx.fillStyle = colour1;
		ctx.arc(concircles[i][0], concircles[i][1], concircles[i][3], concircles[i][5], Math.PI+concircles[i][5], true);
		ctx.arc(concircles[i][0], concircles[i][1], concircles[i][2], concircles[i][5], Math.PI+concircles[i][5], true);
		ctx.closePath();
		ctx.fill('evenodd');
		
		ctx.fillStyle=colour2;
		ctx.beginPath();
		ctx.arc(concircles[i][0], concircles[i][1], concircles[i][3], Math.PI+concircles[i][5], 2*Math.PI+concircles[i][5], true);
		ctx.arc(concircles[i][0], concircles[i][1], concircles[i][2], Math.PI+concircles[i][5], 2*Math.PI +concircles[i][5], true);
		ctx.fill('evenodd');
		ctx.closePath();
		ctx.fillStyle = 'rgb(255,255,255)';
		ctx.beginPath();
		ctx.arc(concircles[i][0], concircles[i][1], concircles[i][2], 0, 2*Math.PI);
		ctx.closePath();
		ctx.fill();
	}
}
function rotate_concircles(){
	for(var i=0;i<circleTotal;i++){
		concircles[i][5]+=(concircles[i][8]*(Math.PI/180));
		ctx.clearRect(concircles[i][0]-concircles[i][3],concircles[i][1]-concircles[i][3],2*concircles[i][3],2*concircles[i][3]);
	}
	draw_concircles();
}
function verticalmove_concircles(){
	let i = 0;
	incircle = true;
 	verticalmove_concircles.m=setInterval(function() {
		//alert(i);
		if(i == 10 || incircle == false || ( y<300)){
			clearInterval(verticalmove_concircles.m);
		}
		for( var j = 0; j < circleTotal; j++){
			ctx.clearRect(concircles[j][0]-concircles[j][3],concircles[j][1]-concircles[j][3]-5,2*concircles[j][3],2*concircles[j][3]);
			concircles[j][1]+=circle_vertical_speed;
			draw_concircles();
		}
		highscore();
		i++;
	},5);
}
function random(mn, mx) {  
            return Math.floor(Math.random() * (mx - mn)) + mn;  
}
function keyUp(e) {
  if (e.keyCode == 39) rightKey = false;
  else if (e.keyCode == 37) leftKey = false;
  if (e.keyCode == 38) incircle = false;
}

function collision_detection(){
	//alert("hello word");
	var ctx = document.getElementById('canvas').getContext('2d');
	var i=0;
	var imgData1 = ctx.getImageData(x,y-17,2,2);
	var colour_front = "rgb("+ imgData1.data[0] + "," + imgData1.data[1]  + "," + imgData1.data[2] + ")";
	var imgData2 = ctx.getImageData(x,y+17,2,2);
	var colour_back = "rgb("+ imgData2.data[0] + "," + imgData2.data[1]  + "," + imgData2.data[2] + ")";
			
	if((colour_front != ball_colour && colour_front != "rgb(0,0,0)" && colour_front != background_colour) || (colour_back != ball_colour && colour_back != "rgb(0,0,0)" && colour_back != background_colour)){
		//alert("hello");
		ctx.clearRect(0,0,329,600);
		clearInterval(verticalmove_concircles.m);
		clearInterval(jump.move);
		clearInterval(init.rotate);
		clearInterval(init.collision);
		clearInterval(init.draw_ball);
		radius = 0;
		destroy_circles();
		game=0;
		var jump_sound1 = document.getElementById('jump_sound');
		jump_sound1.pause();
		document.getElementById('error').play();
		restart_button();
	}
}

function new_position(){
	var i=0;
	//alert("hello word");
 	for( i = 0; i < circleTotal; i++){
		if( concircles[i][1] >= 600+concircles[i][3]){
			var circle_rotate_speed=random(lower_speed,upper_speed);
			concircles[i][1] = -200;
			concircles[i][8] = circle_rotate_speed;
		}
	}
	
}
function newColour(){
	/*var red = random(0,255);
	var green = random(0,255);
	var blue = random(0,255);
	ball_colour = "rgb("+red+ "," + green  + "," + blue+ ")";
	colour1 = ball_colour;
	colour2 = "rgb("+ 255-red + "," + 255-green  + "," + 255-blue + ")";
	//new_colour = 0;*/
}
function highscore(){
	if(highScore >= 285){
		clearInterval(init.high_scores);
		highScore+=5;
		
	}
	if(585-highScore > y){
		highScore = 585-y;
		//height = y;
	}
	if(highScore > height){
		upper_speed+=1;
		lower_speed+=1;
		height+=1000;
	}
	var ctx = document.getElementById('canvas').getContext('2d');
	ctx.clearRect(350,0,500,100);
	ctx.fillStyle = "black";
	//ctx.textAlign = "right";
	ctx.font = '20px serif';
	ctx.fillText("Score: "+ highScore, 350,50);
	ctx.fillText("High Score: "+localStorage.getItem("highscore"),350,70);
}
function store_score(){
	
	let temp = localStorage.getItem("highscore");
	if((highScore >= temp )||(temp === "0")){
		if(highScore >285){
			localStorage.setItem("highscore",highScore+5);
		}
		else{
			localStorage.setItem("highscore",highScore);
		}
	}
}

function set_to_zero(){
	if(localStorage.getItem("highscore") == null){
			localStorage.setItem("highscore", "0");
	}
}

function restart_button(){
	const canvas = document.getElementById("canvas");
	ctx= canvas.getContext('2d');
	ctx.clearRect(65,275,200,50);
	ctx.beginPath();
	ctx.rect(65,275,200,50);
	ctx.stroke();
	ctx.fillStyle = "black";
	ctx.textAlign = "centre";
	ctx.font = '40px serif';
	//ctx.fillText("Score: "+ highScore, 350,50);
	ctx.fillText("Restart",110,310,200);
	
}
var rect = {
    x:65,
    y:275,
    width:200,
    height:50
};
function isInside(pos, rect){
    if (pos.x > rect.x && pos.x < rect.x+rect.width && pos.y < rect.y+rect.height && pos.y > rect.y){
		return true;
	}
	else{
		return false;
	}
}
function MousePos(canvas, event) {
	var rect = canvas.getBoundingClientRect();
	return {
		x: event.clientX - rect.left,
		y: event.clientY - rect.top
	};
}
document.addEventListener('click', function(e) {
	const canvas = document.getElementById('canvas');
	debugger;
	var context = canvas.getContext('2d');
	var mousePos = MousePos(canvas, e);
    if (isInside(mousePos,rect)) {
        restart();
    }
}, false);

function restart(){
	change_colour = 500;
	circle_x = 165;
	circle_y = 100;
	circle_r1 = 90;
	circle_r2 = 100;
	circle_rotate=0;
	highScore = 0;
	colour1 = 'rgb(255,0,0)';
	colour2 = 'rgb(0,0,255)';
	x=165;
	y=585;	
	radius = 15;
	dy = 5;
	ball_colour = 'rgb(255,0,0)';
	speed = 0;
	bottom=585;
	diff=45;
	up=bottom-diff;
	rightKey = false;
	leftKey = false;
	upKey = false;
	incircle = false;
	game = 1;
	init();
	document.getElementById("canvas").style.display = "block";
}
window.onload = init;


	
	
