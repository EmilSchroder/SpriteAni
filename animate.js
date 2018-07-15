var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext("2d");

// set initial position
var x = canvas.width/2;
var y = canvas.height/2;
var ballrad = 10;

//Draw the ball
function drawBall(){
    ctx.beginPath();
    ctx.arc(x,y,ballrad,0,Math.PI*2);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
}



//Function to kick it off
function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);

    drawBall();
}

draw();