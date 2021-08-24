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
//bullet assembler//
let bullet = document.createElement("img")
bullet.className="bullet"
bullet.src="./Images/MiniGames/PlanetDefense/ShipBullet.png"
bullet.width = "8px"
bullet.height = "8px"
bullet.style.imageRendering="pixelated"
bullet.style.position="absolute"
bullet.style.height="8px"
bullet.style.width="8px"
bullet.attributes.angle=5
bullet.attributes.shooter="enemy"
//now the functions//
window.setInterval(moveEnemy,50)
let canStart = true
function startDefense(){
    if(canStart){
        score = 0
        enemies = randRange(5,10)

        for(let i = 0; i <enemies; i++){
            let enemy = baseEnemy.cloneNode()
            document.getElementById("minigameObjects").appendChild(enemy)
            enemy.style.left = randRange(50,3000) +"px"
            enemy.style.top = randRange(50,2000) +"px"
        }
        canStart = false
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
        let empty = (dist<15 && element.attributes.framestillshoot==0?shootBullet(rotation,[element.style.top.split('px')[0]-1+1,element.style.left.split('px')[0]-1+1],element):null)
        element.attributes.framestillshoot = (element.attributes.framestillshoot>0?element.attributes.framestillshoot-1:0)
        element.style.top = element.style.top.split('px')[0]-1+1+movey+"px"
        element.style.left = element.style.left.split('px')[0]-1+1+movex+"px"
        element.style.transform = "rotate("+rotation+"deg)"
    }
    for(const element of document.getElementsByClassName("bullet")){
        element.attributes.framesleft--
        if(element.attributes.framesleft==0){element.remove()}
        element.attributes.position[0] += 8*Math.sin((element.attributes.angle+90)*Math.PI/180)
        element.attributes.position[1] += 8*Math.cos((element.attributes.angle+90)*Math.PI/180)
        element.style.top = element.attributes.position[0]+"px"
        element.style.left = element.attributes.position[1]+"px"
    }
}
function shootBullet(angle,position,element){
    element.attributes.framestillshoot = 10
    let newbullet = bullet.cloneNode()
    newbullet.attributes.position = position
    newbullet.attributes.framesleft = 40
    document.getElementById("Misc").appendChild(newbullet)
    newbullet.attributes.angle = angle
    newbullet.style.top = position[0]+"px"
    newbullet.style.left = position[1]+"px"
}