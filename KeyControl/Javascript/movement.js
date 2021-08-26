document.addEventListener('keydown',keyPressed)
document.addEventListener('keyup',keyReleased)
const deg2rad = Math.PI/180
let keyspressed = [false,false,false,false]
let keycodes = {'s':0,'w':1,'a':2,'d':3}
let ismoving = false
//position variables//
var px=0,py=0;
var cx=1024,cy=1024;
var movement
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
        movement = window.setInterval(move,20)
    }
});
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
    if(keyid.key==" "){
        shootBullets(px,[cy+40,cx-7.5],null)
    }
}
function loadMotion(){
    movement = window.setInterval(move,20)
}
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

function move(){

    py = (keyspressed[0] - keyspressed[1])*4
    px += (keyspressed[3] - keyspressed[2])*4
    movex = py*Math.cos((px+90)*deg2rad)
    movey = py*Math.sin((px+90)*deg2rad)
    //checks collision with all objects, could probably be more efficient to be honest, but that can be done later//
    for (let i = 0; i < collObj.length; i++){
        //checks if the shape is within 20 pixels of player before doing the math
        collisionside = (((Math.abs(MousePoint.y-collObj[i].children[0].y)-20<collObj[i].children[0].height)?((Math.abs(MousePoint.x-collObj[i].children[0].x)-20<collObj[i].children[0].width)):false)?collide(MousePoint,collObj[i].children[0],collObj[i].title.split(",")):"none")
        movey = ((collisionside=="top"&&movey>0)?0:(collisionside=="bottom"&&movey<0)?0:movey)
        movex = ((collisionside=="left"&&movex>0)?0:(collisionside=="right"&&movex<0)?0:movex)
    };
    cx += movex
    cy += movey
    cx = (Math.max(8,Math.min(3044,cx)))
    cy = (Math.max(8, Math.min(1980,cy)))
    positioner.style.top = cy + "px"
    positioner.style.left = cx + "px"
    MousePoint.style.transform = "rotate("+px+"deg"+")"
    window.scroll(Math.min(cx-window.innerWidth/2,3072-window.innerWidth),Math.min(cy-window.innerHeight/2,2056-window.innerHeight))
    
    //sets background parallax effect for 2 layers, used three before, was a bit unecessary as it looked fine otherwise//
    document.getElementById("Parallax").children[0].style.top = -scrollY*0.0625-32+"px"
    document.getElementById("Parallax").children[0].style.left = -scrollX*0.0625-32+"px"
    document.getElementById("Parallax").children[1].style.left = -scrollX*0.03125-332+"px"
    document.getElementById("Parallax").children[1].style.top = -scrollY*0.03125-432+"px"
}

function shootBullets(angle,position,element){
    if(element != null){element.attributes.framestillshoot = 50}
    let newbullet = Pbullet.cloneNode()
    newbullet.attributes.angle = angle
    newbullet.style.top = position[0]+"px"
    newbullet.style.left = position[1]+"px"
    newbullet.attributes.position = position
    newbullet.attributes.framesleft = 40
    newbullet.attributes.target="enemyBase"
    document.getElementById("Misc").appendChild(newbullet)
}