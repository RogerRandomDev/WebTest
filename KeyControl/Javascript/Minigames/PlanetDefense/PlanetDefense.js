//script for all planet defense work that gets done//
//major part of script is likely the enemy movement//
let enemies = 0
let score = 0
//enemy builder//
let baseEnemy = document.createElement("img")
baseEnemy.className="enemyBase"
baseEnemy.src="./Images/MiniGames/PlanetDefense/EnemyShip.png"
baseEnemy.width="120px"
baseEnemy.height="80px"
baseEnemy.style.imageRendering = "pixelated"
baseEnemy.style.position = "Absolute"
baseEnemy.style.height = "80px"
baseEnemy.style.width = "120px"
baseEnemy.attributes.health = 10
baseEnemy.attributes.shielded = false
//enemy orb builder//
let enemyOrb = document.createElement("img")
enemyOrb.className = "enemyOrbs"
enemyOrb.src="./Images/MiniGames/PlanetDefense/EnemyOrb.png"
enemyOrb.style.imageRendering = "pixelated"
enemyOrb.style.width = "24px"
enemyOrb.style.height = "24px"
enemyOrb.style.src = "./Images/MiniGames/PlanetDefense/EnemyOrb.png"
enemyOrb.style.zIndex = 10
enemyOrb.style.position="absolute"
//bullet assembler//
let bullet = document.createElement("img")
bullet.className="bullet"
bullet.src="./Images/MiniGames/PlanetDefense/ShieldBreaker.png"
bullet.width = "24px"
bullet.height = "24px"
bullet.attributes.target="player"
bullet.style.imageRendering="pixelated"
bullet.style.position="absolute"
bullet.style.height="24px"
bullet.style.width="24px"
bullet.attributes.angle=5
//Portal assembler//
let portal = document.createElement("img")
portal.className="imageBase"
portal.width="80px"
portal.height="80px"
portal.style.width="80px"
portal.style.height="80px"
portal.src="./Images/MiniGames/PlanetDefense/Portal.png"
portal.id = "portal"
//Shield Assembler//
let shield = document.createElement("img")
shield.className="imageBase"
shield.id = "enemyShield"
shield.style.width = "240px"
shield.style.height= "240px"
shield.src="./Images/MiniGames/PlanetDefense/EnemyShield.png"
shield.style.opacity = "0.5"
shield.zIndex = '100000'
shield.style.src = "url(./Images/MiniGames/PlanetDefense/EnemyShield.png)"
//now the functions//
var moveinterval
let canStart = true
let startpoint = [0,0]
let frame = 0
let animation
let currentOrbs = 0
moveinterval = window.setInterval(moveEnemy,50)
var shieldInterval
function startDefense(){
    if(canStart){
        frame = 0
        score = 0
        document.getElementById("MousePoint").setAttribute("health",100)
        enemies = 1
        startpoint = [randRange(1000,2000),randRange(500,1500)]
        clearInterval(movement)
        document.getElementById("ROOT").style.scrollBehavior = "smooth"
        let portalObj = portal.cloneNode()
        document.getElementById("Misc").appendChild(portalObj)
        portalObj.style.left = startpoint[0]+window.innerWidth/2+"px"
        portalObj.style.top = startpoint[1]+window.innerHeight/2+"px"
        portalObj.style.transform = "rotate(0deg) scaleX(0) scaleY(0)"
        animation = setInterval(portalanim,20)
        window.clearInterval(moveinterval)
        canStart = false
    }
}
function placeEnemies(){
    for(let i = 0; i <enemies; i++){
        let enemy = baseEnemy.cloneNode()
        enemy.setAttribute("health",10)
        document.getElementById("minigameObjects").appendChild(enemy)
        enemy.attributes.pos = [startpoint[0]+window.innerWidth/2,startpoint[1]+window.innerHeight/2]
        enemy.style.left = enemy.attributes.pos[0] +"px"
        enemy.style.top =  enemy.attributes.pos[1]+"px"
        currentOrbs = 5
        enemy.setAttribute("shielded",false)
        for(let i = 0; i<currentOrbs;i++){
            let Orb = enemyOrb.cloneNode()
            document.getElementById("minigameObjects").appendChild(Orb)
            Orb.attributes.rotation = (360/currentOrbs)*i
            Orb.style.transform = "scaleX(0%) scaleY(0%)"
            Orb.style.top = 40+enemy.attributes.pos[1]+Math.sin((Orb.attributes.rotation)*Math.PI/180)*120+"px"
            Orb.style.left = 55+enemy.attributes.pos[0]+Math.cos((Orb.attributes.rotation)*Math.PI/180)*120+"px"
            Orb.attributes.orbID = i+1
        }
        let enemyShld = shield.cloneNode()
        enemyShld.attributes.timeTillDisabled = 20
        document.getElementById("minigameObjects").appendChild(enemyShld)
        enemyShld.style.opacity = '0.0'
        document.getElementById("enemyShield").style.top=enemy.attributes.pos[1]-70+"px"
        document.getElementById("enemyShield").style.left=enemy.attributes.pos[0]-50+"px"
        enemyShld.style.position = "absolute"
        enemyShld.style.zIndex = 100000
    }
}
//updates orb rotation//
function updateOrbs(){
    let i = 0
    for(var Orb of document.getElementsByClassName("enemyOrbs")){
        i+=1
        Orb.attributes.rotation = (360/currentOrbs)*i
    }
    if(currentOrbs==0){
        window.clearTimeout(shieldInterval);
        document.getElementById("enemyShield").style.opacity = 0.0;
        document.getElementById("minigameObjects").children[0].setAttribute('shielded',false)
    }
}
//enemy movement goes here//
function moveEnemy(){
    if(enemies==0 && canStart==false){canStart=true;playFinish()}
    let movex = 0,movey = 0,rotation = 0;
    let pPosx = cx, pPosy = cy;
    if(enemies>0){
    for(var element of document.getElementsByClassName("enemyBase")){
        if(element.getAttribute('health')<=0){if(currentOrbs==0){
            enemies--;
            if(enemies!=0){element.remove()}
        }else{
            element.setAttribute('health',10);
            currentOrbs--;
            document.getElementsByClassName("enemyOrbs")[0].remove();
            updateOrbs()
        }}
        rotation = Math.round((Math.atan2(pPosy+40-element.style.top.split('px')[0]-1+1,pPosx-20-element.style.left.split('px')[0]-1+1)+Math.PI/2)*(180/Math.PI)/5)*5
        let dist = Math.sqrt(Math.pow(cx-element.attributes.pos[0],2)+Math.pow(cy-element.attributes.pos[1],2))
        //movey = ((dist<120?(dist<100?5*Math.sin(rotation*Math.PI/180)+Math.PI/4:5*Math.sin((rotation*Math.PI/180))):5*Math.sin((rotation*Math.PI/180)-Math.PI/2)))
        //movex = ((dist<120?(dist<100?5*Math.cos(rotation*Math.PI/180)+Math.PI/4:5*Math.cos((rotation*Math.PI/180))):5*Math.cos((rotation*Math.PI/180)-Math.PI/2)))
        movey = ((dist<360?5*Math.sin((rotation*Math.PI/180)):5*Math.sin((rotation*Math.PI/180)-Math.PI/2)))
        movex = ((dist<360?5*Math.cos((rotation*Math.PI/180)):5*Math.cos((rotation*Math.PI/180)-Math.PI/2)))
        let empty = (dist<512 && document.getElementById("shieldDiffuser")==null && element.framestillshoot <= 0?shootBullet(rotation,[element.style.top.split('px')[0]-1+11,element.style.left.split('px')[0]-1+21],element):null)
        //let empty = (dist<300 && element.attributes.framestillshoot==0?shootBullet(rotation,[element.style.top.split('px')[0]-1+11,element.style.left.split('px')[0]-1+21],element):null)
        element.attributes.framestillshoot = (element.attributes.framestillshoot>0?(document.getElementById("shieldDiffuser")==null?element.attributes.framestillshoot-1:element.attributes.framestillshoot):0)
        element.attributes.pos[0] += movex
        element.attributes.pos[1] += movey
        element.style.top = element.attributes.pos[1]+"px"
        element.style.left = element.attributes.pos[0]+"px"
        element.style.transform = "rotate("+rotation+"deg)"
        for(var eOrbs of document.getElementsByClassName("enemyOrbs")){
            eOrbs.attributes.rotation+=5
            eOrbs.style.top = 40+element.attributes.pos[1]+Math.sin((eOrbs.attributes.rotation)*Math.PI/180)*120+"px"
            eOrbs.style.left = 55+element.attributes.pos[0]+Math.cos((eOrbs.attributes.rotation)*Math.PI/180)*120+"px"
        }
        //sets shield position//
        document.getElementById("enemyShield").style.top=element.attributes.pos[1]-70+"px"
        document.getElementById("enemyShield").style.left=element.attributes.pos[0]-50+"px"
    }
    }
    for(const element of document.getElementsByClassName("bullet")){
        element.attributes.framesleft--
        if(element.attributes.framesleft==0 && element.hasAttribute("forever") == false){element.remove()}
        let dirmult = 1
        if(element.getAttribute("forever")=="true"){dirmult = 1-((20-element.attributes.framesLeft)/20)}
        element.attributes.position[0] -= dirmult*(24*Math.sin((element.attributes.angle+90)*Math.PI/180))
        element.attributes.position[1] -= dirmult*(24*Math.cos((element.attributes.angle+90)*Math.PI/180))
        element.style.top = element.attributes.position[0]+20+"px"
        element.style.left = element.attributes.position[1]+20+"px"
        for(const targets of document.getElementsByClassName(element.attributes.target)){
            let collision = collide(element,targets)
            if(collision!="none"){if(targets.hasAttribute("shielded")){if(targets.getAttribute("shielded") == 'false'){targets.setAttribute("health",targets.getAttribute("health")-1)}}else{targets.setAttribute("health",targets.getAttribute("health")-1)};element.remove()}
        }
    }
}
function shootBullet(angle,position,element){
    element.attributes.framestillshoot = 50
    let newbullet = bullet.cloneNode()
    newbullet.attributes.position = position
    newbullet.attributes.framesleft = 80
    newbullet.attributes.target = "player"
    document.getElementById("Misc").appendChild(newbullet)
    newbullet.attributes.angle = angle
    newbullet.setAttribute("forever","true")
    newbullet.id = "shieldDiffuser"
    newbullet.style.top = position[0]+"px"
    newbullet.style.left = position[1]+"px"
}
//Finished Animation
var goalx=0,goaly=0;
function playFinish(){
    frame = 0
    clearTimeout(shieldInterval)
    animation = window.setInterval(finishAnim,50)
    clearInterval(movement)
    goaly = document.getElementById("minigameObjects").children[0].style.top.split("px")[0]-1+1
    goalx = document.getElementById("minigameObjects").children[0].style.left.split("px")[0]-1+1
}
function finishAnim(){
    frame++
    document.getElementById("minigameObjects").children[0].style.transform = ""
    if(frame<=20){window.scroll((goalx-scrollX-(window.innerWidth/2))*(frame/20)+scrollX-Math.sin(frame/2*Math.PI)*2,(goaly-scrollY-(window.innerHeight/2))*(frame/20)+scrollY-Math.sin(frame/2*Math.PI)*2)}
    if(frame>40 && frame <80){document.getElementById("minigameObjects").children[0].style.transform += "rotate("+((frame-40)/5)*360+"deg)"; window.scrollBy(Math.sin((frame-40)/2*Math.PI)*4,Math.sin((frame-40)/2*Math.PI)*4)}
    if(frame>50 && frame <80){document.getElementById("minigameObjects").children[0].style.transform += "scaleX("+(1-((frame-50)/30))*100+"%) scaleY("+(1-((frame-50)/30))*100+"%)"}
    if(frame>=80){document.getElementById("minigameObjects").children[0].style.transform +="scaleX(0%) scaleY(0%)"}
    if(frame>=80){window.scroll((((cx-window.innerWidth/2)-scrollX)*((frame-80)/20)+scrollX),(((cy-window.innerHeight/2)-scrollY)*((frame-80)/20)+scrollY))}
    if(frame>=100){for(const enemy of document.getElementById("minigameObjects").children){enemy.remove()};loadMotion();clearInterval(animation);for(orb of document.getElementsByClassName("enemyOrbs")){orb.remove()};document.getElementById("minigameObjects").children[0].remove();document.getElementById("enemyShield").remove()}
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
    if(frame>=140 && frame<180){document.getElementsByClassName("enemyOrbs")[0].style.transform = "scaleX("+(frame-140)/40+") scaleY("+(frame-140)/40+")"}
    if(frame>=145 && frame<185){document.getElementsByClassName("enemyOrbs")[1].style.transform = "scaleX("+(frame-145)/40+") scaleY("+(frame-145)/40+")"}
    if(frame>=150 && frame<190){document.getElementsByClassName("enemyOrbs")[2].style.transform = "scaleX("+(frame-150)/40+") scaleY("+(frame-150)/40+")"}
    if(frame>=155 && frame<195){document.getElementsByClassName("enemyOrbs")[3].style.transform = "scaleX("+(frame-155)/40+") scaleY("+(frame-155)/40+")"}
    if(frame>=160 && frame<200){document.getElementsByClassName("enemyOrbs")[4].style.transform = "scaleX("+(frame-160)/40+") scaleY("+(frame-160)/40+")"}
    if(frame>=240){window.scroll((((cx-window.innerWidth/2)-scrollX)*((frame-240)/40)+scrollX),(((cy-window.innerHeight/2)-scrollY)*((frame-240)/40)+scrollY))}
    if(frame==280){clearInterval(animation);;loadMotion();moveinterval=window.setInterval(moveEnemy,50);document.getElementById("ROOT").style.scrollBehavior = "initial";document.getElementById("portal").remove();shieldInterval = window.setTimeout(shieldSwap,3000-(2000*(currentOrbs/5)))}
}
//shield swapping between on and off//
function shieldSwap(){
    if(document.getElementById("minigameObjects").children[0].getAttribute('shielded')=='false'){shieldInterval = window.setTimeout(shieldSwap,4000*(currentOrbs/5))}
    document.getElementById("minigameObjects").children[0].setAttribute('shielded',(document.getElementById("minigameObjects").children[0].getAttribute('shielded')=='false'))
    document.getElementById("enemyShield").style.opacity = (document.getElementById("minigameObjects").children[0].getAttribute('shielded')=='true')*0.5
}