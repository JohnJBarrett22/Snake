const cvs = document.getElementById("gameBox");
const ctx = cvs.getContext("2d");

const box = 32;

//Initialize images
let foodImg = new Image();
foodImg.src = "images/food.png";
let ground = new Image();
ground.src = "images/ground.png";

//Initialize audio
let dead = new Audio();
dead.src = "audio/dead.mp3";
let down = new Audio();
down.src = "audio/down.mp3";
let eat = new Audio();
eat.src = "audio/eat.mp3";
let left = new Audio();
left.src = "audio/left.mp3";
let right = new Audio();
right.src = "audio/right.mp3";
let up = new Audio();
up.src = "audio/up.mp3";

let snake = [];
snake[0] = {
    x : 9 * box,
    y : 10 * box
}
let food = {
    x : Math.floor(Math.random()*17+1) * box,
    y : Math.floor(Math.random()*15+3) * box
}   

let score = 0;

document.addEventListener("keydown", direction);

let d;

function direction(event){
    if(event.keyCode == 37 && d != "RIGHT"){
        d = "LEFT";
    } else if(event.keyCode == 39 && d != "LEFT"){
        d = "RIGHT";
    } else if(event.keyCode == 38 && d != "DOWN"){
        d = "UP";
    } else if(event.keyCode == 40 && d != "UP"){
        d = "DOWN";
    }
}

function draw(){
    ctx.drawImage(ground,0,0);
    for(let i=0; i < snake.length; i++){
        ctx.fillStyle = ( i == 0 )? "green" : "white";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);

        ctx.strokeStyle = "red";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }
    ctx.drawImage(foodImg, food.x, food.y);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    snake.pop();

    if(d == "LEFT") snakeX -= box;
    if(d == "RIGHT") snakeX += box;
    if(d == "UP") snakeY -= box;
    if(d == "DOWN") snakeY += box;

    let newHead = {
        x : snakeX,
        y : snakeY
    }

    snake.unshift(newHead);

    ctx.fillStyle = "white";
    ctx.font = "45px Changa one";
    ctx.fillText(score, 2*box, 1.6*box);
}

let game = setInterval(draw,100);