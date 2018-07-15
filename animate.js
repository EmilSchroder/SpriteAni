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
var keymap ={
    "a": false,
    "d": false,
    "s": false,
    "w": false
};


/*function keycoderet(letter){
    var letlist = {
        "a": 65,
        "d": 68,
        "w": 87,
        "s": 83
    };
    return letlist[letter];
}*/

//Listen for button pushes
document.addEventListener("keydown",keyHandler, false);
document.addEventListener("keyup", keyHandler, false);

function keyHandler(evt){
    keymap[evt.key] = (evt.type == 'keydown');
}

function isLeft(){
    if (keymap["a"] && ballX - ballRad > 0){
        ballX -= 5;
    }
}

function isRight(){
    if (keymap["d"] && ballX + ballRad < canvas.width){
        ballX +=5;
    }
}

function isUp(){
    if (keymap["w"] && ballY - ballRad > 0){
        ballY -=5;
    }
}

function isDown(){
    if (keymap["s"] && ballY + ballRad < canvas.height){
        ballY +=5;
    }
}



//Draw the ball
function drawBall(){
    ctx.beginPath();
    ctx.arc(ballX,ballY,ballRad,0,Math.PI*2);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
}

function moveBall(){
    isLeft();
    isRight();
    isDown();
    isUp();
}



//Function to kick it off
function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);

    drawBall();
    moveBall();

    requestAnimationFrame(draw);
}

draw();