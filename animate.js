var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext("2d");

// set initial position
var x = canvas.width/2;
var y = canvas.height/2;
var ballrad = 10;

//Starting postions for directional buttons
var leftPressed = false;
var rightPressed = false;
var upPressed = false;
var downPressed = false;

//Listen for button pushes
document.addEventListener("keydown",keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

//what happens when button pushed
function keyDownHandler(evt){
    if (evt.keyCode === 65){
        leftPressed = true;
    } else if (evt.keyCode===68){
        rightPressed = true;
    } else if (evt.keyCode===87){
        upPressed = true;
    } else if (evt.keyCode===83){
        downPressed = true;
    }
}

//what happen when button release
function keyDownHandler(evt){
    if (evt.keyCode === 65){
        leftPressed = false;
    } else if (evt.keyCode===68){
        rightPressed = false;
    } else if (evt.keyCode===87){
        upPressed = false;
    } else if (evt.keyCode===83){
        downPressed = false;
    }
}



//Draw the ball
function drawBall(){
    ctx.beginPath();
    ctx.arc(x,y,ballrad,0,Math.PI*2);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
}

//move the ball
function moveBall(){
    
}



//Function to kick it off
function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);

    drawBall();
    moveBall();
}

draw();