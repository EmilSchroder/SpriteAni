var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext("2d");

// set initial position
var ballX = canvas.width/2;
var ballY = canvas.height/2;
var ballRad = 10;

//Starting postions for directional buttons
var leftPressed = false;
var rightPressed = false;
var upPressed = false;
var downPressed = false;

//Logging the key strokes for diagonal movement
var keymap ={};


//Listen for button pushes
document.addEventListener("keydown",keyHandler, false);
document.addEventListener("keyup", keyHandler, false);

function keyHandler(evt){
    keymap[evt.keyCode] = (evt.type == 'keydown');
}

//Draw the ball
function drawBall(){
    ctx.beginPath();
    ctx.arc(ballX,ballY,ballRad,0,Math.PI*2);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
}

//move the ball
function moveBall(){
    if (rightPressed && ballX + ballRad < canvas.width){
        ballX += 7;
    } else if (leftPressed && ballX - ballRad > 0){
        ballX -= 7;
    } else if (upPressed && ballY - ballRad > 0){
        ballY -=7;
    } else if (downPressed && ballY + ballRad < canvas.height){
        ballY +=7;
    }
}



//Function to kick it off
function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);

    drawBall();
    moveBall();

    requestAnimationFrame(draw);
}

draw();