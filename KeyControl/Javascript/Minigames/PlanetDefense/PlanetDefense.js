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
function startDefense(){
    score = 0
    enemies = randRange(5,10)
    for(let i = 0; i <enemies; i++){
        baseEnemy.cloneNode()
    }
}
