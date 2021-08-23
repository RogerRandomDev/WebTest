//script for all planet defense work that gets done//
//major part of script is likely the enemy movement//
let enemies = 0
let score = 0
let baseEnemy = document.createElement("img")
baseEnemy.className="enemyBase"
baseEnemy.src="./Images/MiniGames/PlanetDefense/EnemyShip.png"
baseEnemy.width="60px"
baseEnemy.height="40px"
baseEnemy.style.imageRendering = "pixelated"
baseEnemy.style.position = "Absolute"
baseEnemy.style.height = "40px"
baseEnemy.style.width = "60px"
window.setInterval(moveEnemy,50)
function startDefense(){
    score = 0
    enemies = randRange(5,10)
    for(let i = 0; i <enemies; i++){
        let enemy = baseEnemy.cloneNode()
        document.getElementById("minigameObjects").appendChild(enemy)
        enemy.style.left = randRange(50,3000) +"px"
        enemy.style.top = randRange(50,2000) +"px"
    }
}

//enemy movement goes here//
function moveEnemy(){
    let movex = 0,movey = 0,rotation = 0;
    let pPosx = positioner.style.left.split('px')[0]-1+1, pPosy = positioner.style.top.split('px')[0]-1+1;
    for(const element of document.getElementById("minigameObjects").children){
        rotation = (Math.atan2(pPosy+40-element.style.top.split('px')[0]-1+1,pPosx-20-element.style.left.split('px')[0]-1+1)+Math.PI/2)*(180/Math.PI)
        movey = -5*Math.cos(rotation*Math.PI/180)
        movex = 5*Math.sin(rotation*Math.PI/180)
        let dist = Math.sqrt(Math.abs((pPosx-element.style.left.split('px')[0]-1+1)^2+(pPosy-element.style.top.split('px')[0]-1+1)^2))
        movey = ((dist<15?5*Math.sin(rotation*Math.PI/180):-5*Math.cos(rotation*Math.PI/180)))
        movex = ((dist<15?5*Math.cos(rotation*Math.PI/180):5*Math.sin(rotation*Math.PI/180)))
        element.style.top = element.style.top.split('px')[0]-1+1+movey+"px"
        element.style.left = element.style.left.split('px')[0]-1+1+movex+"px"
        element.style.transform = "rotate("+rotation+"deg)"
    }
}