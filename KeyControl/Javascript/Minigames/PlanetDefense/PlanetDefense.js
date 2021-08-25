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
baseEnemy.attributes.health = 1
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
bullet.attributes.target="enemyBase"
//Portal assembler//
let portal = document.createElement("img")
portal.className="imageBase"
portal.width="80px"
portal.height="80px"
portal.style.width="80px"
portal.style.height="80px"
portal.src="./Images/MiniGames/PlanetDefense/Portal.png"
portal.id = "portal"
//now the functions//
window.setInterval(moveEnemy,50)
let canStart = true
let startpoint = [0,0]
let frame = 0
let animation
function startDefense(){
    if(canStart){
        frame = 0
        score = 0
        document.getElementById("MousePoint").setAttribute("health",100)
        enemies = randRange(5,10)
        startpoint = [randRange(1000,2000),randRange(500,1500)]
        clearInterval(movement)
        document.getElementById("ROOT").style.scrollBehavior = "smooth"
        let portalObj = portal.cloneNode()
        document.getElementById("Misc").appendChild(portalObj)
        portalObj.style.left = startpoint[0]+window.innerWidth/2+"px"
        portalObj.style.top = startpoint[1]+window.innerHeight/2+"px"
        portalObj.style.transform = "rotate(0deg) scaleX(0) scaleY(0)"
        animation = setInterval(portalanim,20)
        canStart = false
    }
}
//Animation for enemies spawning//
function portalanim(){
    frame++
    //this part is making you move at a constant rate, the reason it is long is it includes the parallax as well, dont worry about length please//
    if(frame<=40){window.scroll(((startpoint[0]-scrollX)*(frame/40)+scrollX),((startpoint[1]-scrollY)*(frame/40)+scrollY))}
    if(frame<=200){document.getElementById("portal").style.transform = "rotate("+((frame)*9)+"deg) "}
    if(frame <= 55){document.getElementById("portal").style.transform += "scaleX("+Math.max((frame-40)/15,0)+") scaleY("+Math.max((frame-40)/15,0)+") "}
    if(frame==120){placeEnemies()}
    if(frame>=135){document.getElementById("portal").style.transform += "scaleX("+Math.max(1-(frame-135)/15,0)+") scaleY("+Math.max(1-(frame-135)/15,0)+") "}
    if(frame>=160){window.scroll((((cx-window.innerWidth/2)-scrollX)*((frame-160)/40)+scrollX),(((cy-window.innerHeight/2)-scrollY)*((frame-160)/40)+scrollY))}
    if(frame==200){clearInterval(animation);loadMotion();document.getElementById("ROOT").style.scrollBehavior = "initial";document.getElementById("portal").remove()}
}
function placeEnemies(){
    for(let i = 0; i <enemies; i++){
        let enemy = baseEnemy.cloneNode()
        enemy.attributes.health = 1
        document.getElementById("minigameObjects").appendChild(enemy)
        enemy.attributes.pos = [startpoint[0]+window.innerWidth/2+randRange(-50,50),startpoint[1]+window.innerHeight/2+randRange(-50,50)]
        enemy.style.left = enemy.attributes.pos[0] +"px"
        enemy.style.top =  enemy.attributes.pos[1]+"px"
    }
}

//enemy movement goes here//
function moveEnemy(){
    let movex = 0,movey = 0,rotation = 0;
    let pPosx = cx, pPosy = cy;
    for(const element of document.getElementById("minigameObjects").children){
        rotation = (Math.atan2(pPosy+40-element.style.top.split('px')[0]-1+1,pPosx-20-element.style.left.split('px')[0]-1+1)+Math.PI/2)*(180/Math.PI)
        let dist = Math.sqrt(Math.pow(cx-element.attributes.pos[0],2)+Math.pow(cy-element.attributes.pos[1],2))
        movey = ((dist<120?(dist<100?5*Math.sin(rotation*Math.PI/180)+Math.PI/4:5*Math.sin((rotation*Math.PI/180))):5*Math.sin((rotation*Math.PI/180)-Math.PI/2)))
        movex = ((dist<120?(dist<100?5*Math.cos(rotation*Math.PI/180)+Math.PI/4:5*Math.cos((rotation*Math.PI/180))):5*Math.cos((rotation*Math.PI/180)-Math.PI/2)))
        
        let empty = (dist<300 && element.attributes.framestillshoot==0?shootBullet(rotation,[element.style.top.split('px')[0]-1+1,element.style.left.split('px')[0]-1+1],element):null)
        element.attributes.framestillshoot = (element.attributes.framestillshoot>0?element.attributes.framestillshoot-1:0)
        element.attributes.pos[0] += movex
        element.attributes.pos[1] += movey
        element.style.top = element.attributes.pos[1]+"px"
        element.style.left = element.attributes.pos[0]+"px"
        element.style.transform = "rotate("+rotation+"deg)"
        if(element.attributes.health==0){element.remove}
    }
    for(const element of document.getElementsByClassName("bullet")){
        element.attributes.framesleft--
        if(element.attributes.framesleft==0){element.remove()}
        element.attributes.position[0] -= 16*Math.sin((element.attributes.angle+90)*Math.PI/180)
        element.attributes.position[1] -= 16*Math.cos((element.attributes.angle+90)*Math.PI/180)
        element.style.top = element.attributes.position[0]+20+"px"
        element.style.left = element.attributes.position[1]+20+"px"
        for(const targets of document.getElementsByClassName(element.attributes.target)){
            let collision = collide(element,targets)
            if(collision!="none"){targets.setAttribute("health",targets.getAttribute("health")-1);element.remove()}
        }
    }
}
function shootBullet(angle,position,element){
    element.attributes.framestillshoot = 20
    let newbullet = bullet.cloneNode()
    newbullet.attributes.position = position
    newbullet.attributes.framesleft = 40
    newbullet.attributes.target="player"
    document.getElementById("Misc").appendChild(newbullet)
    newbullet.attributes.angle = angle
    newbullet.style.top = position[0]+"px"
    newbullet.style.left = position[1]+"px"
}