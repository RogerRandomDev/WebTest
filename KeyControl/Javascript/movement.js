document.addEventListener('keydown',keyPressed)
document.addEventListener('keyup',keyReleased)
document.addEventListener('mousemove',mousePos)
document.addEventListener('mousedown',mousePressed)
document.addEventListener('mouseup',mouseReleased)
window.setInterval(updateBullets,50)
const deg2rad = Math.PI/180
let framesTillShoot = 0
let keyspressed = [false,false,false,false]
let keycodes = {'s':0,'w':1,'a':2,'d':3}
let ismoving = false
let isShooting = false
let ammoLeft = 25
const maxAmmo = 25
var ammoregen
var ammoregendelay

//position variables//
var px=0,py=0;
var cx=1024,cy=1024;
let mouseposX = 0,mouseposY = 0,mousebaseX=0,mousebaseY=0;
var movement
let rapidjump = true
let Pbullet = document.createElement("img")
Pbullet.className="bullet"
Pbullet.src="./Images/MiniGames/PlanetDefense/ShipBullet.png"
Pbullet.width = "8px"
Pbullet.height = "8px"
Pbullet.style.imageRendering="pixelated"
Pbullet.style.position="absolute"
Pbullet.style.height="8px"
Pbullet.style.width="8px"
Pbullet.attributes.angle=5
Pbullet.attributes.target="enemyBase"
//Gets children that have collision from collision Div//
document.addEventListener('readystatechange', event => { 
    // When window loaded ( external resources are loaded too- `css`,`src`, etc...) 
    if (event.target.readyState === "complete") {
        collObj = document.getElementById("collisionObjects").children
        movement = window.setInterval(move,40)
        document.getElementById("Bottom").style.top=window.innerHeight-80+"px"
        document.getElementById("Bottom").style.left = -window.innerWidth-128+"px"
        document.getElementById("Bottom").style.width = window.innerWidth/0.75-16+"px"
        document.getElementById("Bottom").style.height = 64+"px"
    }
});
//update Bullets//
//Bullet Updates//
function updateBullets(){
    for(const element of document.getElementsByClassName("bullet")){
        
        element.setAttribute("framesleft",element.getAttribute("framesleft")-1)
        if(element.getAttribute("framesleft")<=-40 && element.hasAttribute("forever") == false){element.remove()}
        
        let dirmult = 1
        if(element.hasAttribute("forever")){dirmult = Math.max(1-(Math.abs(element.getAttribute('framesLeft'))-15)/25,0)}
        
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
//Checks mouse position//
function mousePos(pos){
    mousebaseX=pos.clientX
    mousebaseY=pos.clientY-64
}
//mouse functions//
function mousePressed(id){
    if(id.which == 1){
        isShooting = true
        window.clearInterval(ammoregen)
        if(ammoregendelay !=-100){window.clearInterval(ammoregendelay);ammoregendelay=-100}
    }
}
function mouseReleased(id){
    if(id.which == 1){
        isShooting = false
        ammoregendelay = window.setTimeout(function() {if(!isShooting){ammoregen = window.setInterval(regenAmmo,25)}},1000)
    }
}
//Ammo regeneration//
function regenAmmo(){if(!isShooting && ammoLeft < maxAmmo){ammoLeft++;document.getElementById("ammo").textContent="AMMO:\n"+ammoLeft+"/"+maxAmmo}}
ammoregen = window.setInterval(regenAmmo,25)

//Changes if key is active or not//
function keyPressed(keyid) {
    //checks if keypressed is a key you move with, if not, does nothing//
    if(keycodes[keyid.key]!=null){if(!keyspressed[keycodes[keyid.key]]){
        MousePoint.src = "./Images/RocketMoving.gif"}
        keyspressed[keycodes[keyid.key]] = true
    }
    if(keyid.key=="e" && TextArea.textContent !="a"){
        for(let i = 0; i < collObj.length; i++){
            collisionside = (((Math.abs(MousePoint.y-collObj[i].children[0].y)-20<collObj[i].children[0].height)?((Math.abs(MousePoint.x-collObj[i].children[0].x)-20<collObj[i].children[0].width)):false)?collide(MousePoint,collObj[i].children[0],collObj[i].title.split(",")):"none")
            if(collisionside !="none"){enterPlanet(collObj[i].title.split(","))}
        }
    }
    if(keyid.key==" " && rapidjump){
        let rotMult = keyspressed.slice(2,4).filter((v) => (v==true)).length
        let rotChange = -(keyspressed[0]*180)
        if(rotMult!=0){rotChange+=(-keyspressed[2]*90/rotMult)+(keyspressed[3]*90/rotMult)}
        cx += 512*Math.cos((faceAngle-90+rotChange)*deg2rad)
        cy += 512*Math.sin((faceAngle-90+rotChange)*deg2rad)
        rapidjump=false
        window.setTimeout(function(){rapidjump=true},1500)
    }
}
//loads player base function//
function loadMotion(){
    movement = window.setInterval(move,40)
}
//updates collision objects when called, needed as planets are set up by script, so this is called after they are made//
function setCollision(){
    collObj = document.getElementById("collisionObjects").children
}
function keyReleased(keyid) {
    keyspressed[keycodes[keyid.key]] = false
    ismoving = false
    if(keyspressed[0]) {ismoving=true}
    if(keyspressed[1]) {ismoving=true}
    if(keyspressed[2]) {ismoving=true}
    if(keyspressed[3]) {ismoving=true}
    if(ismoving==false){MousePoint.src="./Images/Rocket.png"}
}


//Runs functions every set period of time//
let movey = 0
let movex = 0
let collisionside = "none"
let faceAngle = 0
function move(){
    faceAngle = (Math.atan2(cx-mouseposX,mouseposY-cy)*180/Math.PI)-180
    if(framesTillShoot>0){framesTillShoot--}
    //fires shot if it can//
    if(isShooting && framesTillShoot==0 && ammoLeft>0){shootBullets(faceAngle,[cy+40,cx-7.5],null);document.getElementById("ammo").textContent="AMMO:\n"+ammoLeft+"/"+maxAmmo}
    
    //sets motion amount you can do
    py = Math.min((keyspressed[0] - keyspressed[1]),0.875)*(1-(Math.abs((keyspressed[3] - keyspressed[2]))/3))*10
    px = (keyspressed[3] - keyspressed[2])*(1-(Math.abs((keyspressed[0] - keyspressed[1]))/3))*8
    movex = py*Math.cos((faceAngle+90)*deg2rad)+px*Math.sin((faceAngle+90)*deg2rad)
    movey = py*Math.sin((faceAngle+90)*deg2rad)-px*Math.cos((faceAngle+90)*deg2rad)
    
    
    //checks collision with all objects, could probably be more efficient to be honest, but that can be done later//
    TextArea.style.color = "rgba( 75, 75, 75, 0)"
    TextArea.textContent = "a"
    for (let i = 0; i < collObj.length; i++){
        //checks if the shape is within 20 pixels of player before doing the math
        collisionside = (((Math.abs(MousePoint.y-collObj[i].children[0].y)-20<collObj[i].children[0].height)?((Math.abs(MousePoint.x-collObj[i].children[0].x)-20<collObj[i].children[0].width)):false)?collide(MousePoint,collObj[i].children[0],collObj[i].title.split(",")):"none")
    };
    
    //applies motion to position//
    cx += movex;
    cy += movey;
    cx = (Math.max(8,Math.min(4096/0.75,cx)))
    cy = (Math.max(8, Math.min(2128,cy)))
    positioner.style.top = cy + "px"
    positioner.style.left = cx + "px"
    
    //rotates player//
    MousePoint.style.transform = "rotate("+faceAngle+"deg"+")"
    
    //scrolls to keep centered except at edges of game area//
    window.scrollBy(lerp(scrollX,cx*0.75-window.innerWidth/2,0.25)-scrollX,(lerp(scrollY,cy*0.75-window.innerHeight/2,0.25)-scrollY))
    window.scroll(Math.min(scrollX,3096-window.innerWidth/0.75),Math.min(scrollY,2048-window.innerHeight/0.75))
    mouseposX=(mousebaseX+scrollX)/0.75;mouseposY=(mousebaseY+scrollY)/0.75
    document.getElementById("Bottom").style.top=(scrollY+window.innerHeight)/0.75-80+"px"
    document.getElementById("Bottom").style.left=scrollX/0.75+"px"
    //sets background parallax effect for 2 layers, used three before, was a bit unecessary as it looked fine otherwise//
    document.getElementById("Parallax").children[0].style.top = -scrollY*0.0625-32+"px"
    document.getElementById("Parallax").children[0].style.left = -scrollX*0.0625-32+"px"
    document.getElementById("Parallax").children[1].style.left = -scrollX*0.03125-332+"px"
    document.getElementById("Parallax").children[1].style.top = -scrollY*0.03125-432+"px"
}

//Fires bullets//
function shootBullets(angle,position,element){
    ammoLeft--
    framesTillShoot = 2
    let newbullet = Pbullet.cloneNode()
    newbullet.attributes.angle = angle
    newbullet.style.top = position[0]+"px"
    newbullet.style.left = position[1]+"px"
    newbullet.attributes.position = position
    newbullet.attributes.framesleft = 80
    newbullet.attributes.target="enemyBase"
    document.getElementById("Misc").appendChild(newbullet)
}
//interpolation function
function lerp(Pos1,Pos2,Value){return Pos1 * (1 - Value) + Pos2 * Value}