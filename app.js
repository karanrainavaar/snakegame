let lastRenderTime = 0;
let snakeSpeed = 6;
let snakeBody = [{x:6,y:9}];
let gameBoard = document.querySelector(".game-board");
let food = {x:11,y:8};
let inputDirection = {x:0,y:0};
let lastInputDirection = {x:0,y:0};
let score = 0;
let liveScore = document.querySelector("h2");
let foodSound = new Audio("audio/food.mp3");
let gameOverSound = new Audio("audio/gameover.mp3");
let moveSound = new Audio("audio/move.mp3");



//Recursive function for animation
function main(currentTime){
    window.requestAnimationFrame(main);
    if((currentTime - lastRenderTime)/1000 < 1/snakeSpeed){
        return;
    }
    lastRenderTime = currentTime;
    update();
    draw();
}

//function to draw snake,food
function draw(){
    drawSnake();
    drawFood();
}


function drawSnake(){
    gameBoard.innerHTML = "";
    snakeBody.forEach((bodyParts,index) => {
        let snakeElement = document.createElement("div");
        snakeElement.style.gridRowStart = bodyParts.y;
        snakeElement.style.gridColumnStart = bodyParts.x;
        if(index === 0){
            snakeElement.classList.add("snake-head");
        }else{
            snakeElement.classList.add("snake-body");
        }
        gameBoard.appendChild(snakeElement);
    })
}


function drawFood(){
    let foodElement = document.createElement("div");
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add("food");
    gameBoard.appendChild(foodElement);
}

//function to update snake,food
function update(){

    if(isCollide(snakeBody)){
            gameOverSound.play();
            alert("Game Over! Press any key to start the game");
            inputDirection = {x:0,y:0};
            snakeBody = [{x:6,y:9}];
            score = 0;
            liveScore.innerHTML = `Score : ${0}`;
    }

    updateSnake();
    updateFood();
}


function updateSnake(){
    let findInputDir = getInputDir();

    for(let i = snakeBody.length - 2; i >= 0; i--){
        snakeBody[i+1] = {...snakeBody[i]};
    }
    snakeBody[0].x += findInputDir.x;
    snakeBody[0].y += findInputDir.y;
}


function getInputDir(){
    lastInputDirection = inputDirection;
    return inputDirection;
}

//function to update food when snakehead = food position
function updateFood(){
    if(food.x === snakeBody[0].x && food.y === snakeBody[0].y){
        foodSound.play();
        score +=1;
        liveScore.innerHTML = `Score : ${score}`;
        snakeBody.unshift({x:snakeBody[0].x + inputDirection.x, y:snakeBody[0].y + inputDirection.y});
        food.x = Math.floor(Math.random() * 19) + 1;
        food.y = Math.floor(Math.random() * 19) + 1;
    }
}

//function for snake collide with wall,himself
function isCollide(){
    for(let i = 1; i < snakeBody.length; i++){
        if(snakeBody[i].x === snakeBody[0].x && snakeBody[i].y === snakeBody[0].y){
            return true;
        };
    };

    if(snakeBody[0].x >= 21 || snakeBody[0].x <= 0 || snakeBody[0].y >= 21 || snakeBody[0].y <= 0){
        return true;
    };
}


window.requestAnimationFrame(main);

//game-controls
window.addEventListener("keydown",(event) => {
    switch(event.key){

        case "ArrowUp":
            if(lastInputDirection.y !== 0){
                break;
            }
            inputDirection.x = 0;
            inputDirection.y = -1;
            moveSound.play();
            break;

        case "ArrowDown":
            if(lastInputDirection.y !== 0){
                break;
            }
            inputDirection.x = 0;
            inputDirection.y = 1;
            moveSound.play();
            break;

        case "ArrowLeft":
            if(lastInputDirection.x !== 0){
                break;
            }
            inputDirection.x = -1;
            inputDirection.y = 0;
            moveSound.play();
            break;

        case "ArrowRight":
            if(lastInputDirection.x !== 0){
                break;
            }
            inputDirection.x = 1;
            inputDirection.y = 0;
            moveSound.play();
            break;

        default:
            break;
    }
})