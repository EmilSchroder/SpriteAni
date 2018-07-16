

//Set up the canvas and context

var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext("2d");

// set initial position
var mainBall = {x: canvas.width/2,y:canvas.height/2}
var ballRad = 10;

// set obsticle position
var obNum = 10;
var obRad = 10;
var markCount = 0;

var obstic = [];
for (let i=0; i<obNum;i++){
    obstic[i] = {x:Math.random()*550+20,y:Math.random()*550+20,marked:0};
}


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

//Score things
var startTime = new Date();
var score = 10000;
var scorePreserve = 0;

//Listen for button pushes
document.addEventListener("keydown",keyHandler, false);
document.addEventListener("keyup", keyHandler, false);

//What happens when key pushed or released
function keyHandler(evt){
    keymap[evt.key] = (evt.type == 'keydown');
}


//Movement parameters
function isLeft(){
    if (keymap["a"] && mainBall.x - ballRad > 0){
        mainBall.x -= 5;
    }
}

function isRight(){
    if (keymap["d"] && mainBall.x + ballRad < canvas.width){
        mainBall.x +=5;
    }
}

function isUp(){
    if (keymap["w"] && mainBall.y - ballRad > 0){
        mainBall.y -=5;
    }
}

function isDown(){
    if (keymap["s"] && mainBall.y + ballRad < canvas.height){
        mainBall.y +=5;
    }
}

function colWithOb(){
    for (let k=0; k<obNum; k++){
        //run through x,y distances bwt ball and obs
        let dx = obstic[k].x - mainBall.x;
        let dy = obstic[k].y - mainBall.y;
        //use Pythag to find actual distance
        let distance = Math.sqrt(dx*dx + dy*dy);

        if (distance < ballRad+obRad){
            obstic[k].marked = 1;
        }
    }
    setTimeout(winCond, 1000);

}

function winCond(){

    for (let l=0; l<obNum; l++){
        if (obstic[l].marked == 1){
            markCount++;    
            if (markCount==obNum){
             gameOverScreen();
            }
        }
    }
    markCount = 0;
}

//Update score
function updateScore(){
    let endTime = new Date();
    if (score<=0){
        score = 0;
    } else {
    score = 10000 - (endTime - startTime)
    }
}

//Draw score
function drawScore(){
    ctx.font = "30px Ariel";
    ctx.fillStyle = "#000000";
    ctx.fillText(String(score),20,80);
}


//Draw the ball
function drawBall(){
    ctx.beginPath();
    ctx.arc(mainBall.x,mainBall.y,ballRad,0,Math.PI*2);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
}

//Draw an obsticle
function drawObsticle(){
    //go through all our obsticles
    for (let j=0; j<obNum; j++){

        ctx.beginPath();
        ctx.arc(obstic[j].x, obstic[j].y,obRad,0,Math.PI*2);

        if (obstic[j].marked == 0){
            ctx.fillStyle = "green";
        } else {
            ctx.fillStyle = "red";
        }
        
        ctx.fill();
        ctx.closePath();

    }
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
    
    
    moveBall();
    colWithOb();
    updateScore();

    drawBall();
    drawObsticle();
    drawScore();

    requestAnimationFrame(draw);
}

function gameOverScreen(){

if (scorePreserve<1){

let finalScore = score;
document.getElementsByClassName("scoreKeep")[0].innerHTML = "Score : " + finalScore;
document.getElementsByClassName("reset")[0].style.visibility = "visible";
document.getElementsByClassName("reset")[0].innerHTML = "Reset";
document.getElementsByClassName("reset")[0].onclick = function(){
    document.location.reload();
}
scorePreserve++;
    }
}

draw();