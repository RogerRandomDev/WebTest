document.addEventListener('keydown',keyPressed)
document.addEventListener('keyup',keyReleased)
const deg2rad = Math.PI/180
let keyspressed = [false,false,false,false]
let keycodes = {'s':0,'w':1,'a':2,'d':3}
let ismoving = false
//position variables//
var px=0,py=0;
var cx=64,cy=64;
//Gets children that have collision from collision Div//
document.addEventListener('readystatechange', event => { 
    // When window loaded ( external resources are loaded too- `css`,`src`, etc...) 
    if (event.target.readyState === "complete") {
        collObj = document.getElementById("collisionObjects").children
    }
});
//Changes if key is active or not//
function keyPressed(keyid) {
    //checks if keypressed is a key you move with, if not, does nothing//
    if(keycodes[keyid.key]!=null){if(!keyspressed[keycodes[keyid.key]]){
        MousePoint.src = "./Images/RocketMoving.gif"}
        keyspressed[keycodes[keyid.key]] = true
    }
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
window.setInterval(move,20)

function move(){
    py = (keyspressed[0] - keyspressed[1])*4
    px += (keyspressed[3] - keyspressed[2])*4
    movex = py*Math.cos((px+90)*deg2rad)
    movey = py*Math.sin((px+90)*deg2rad)
    //checks collision with all objects, could probably be more efficient to be honest, but that can be done later//
    for (let i = 0; i < collObj.length; i++){
        //checks if the shape is within 20 pixels of player before doing the math
        collisionside = (((Math.abs(MousePoint.y-collObj[i].children[0].y)-20<collObj[i].children[0].height)?((Math.abs(MousePoint.x-collObj[i].children[0].x)-20<collObj[i].children[0].width)):false)?collide(MousePoint,collObj[i].children[0],collObj[i].title.split("...")):"none")
        movey = ((collisionside=="top"&&movey>0)?0:(collisionside=="bottom"&&movey<0)?0:movey)
        movex = ((collisionside=="left"&&movex>0)?0:(collisionside=="right"&&movex<0)?0:movex)
    };
    cx += movex
    cy += movey
    cx = (Math.max(8,Math.min(3044,cx)))
    cy = (Math.max(8, Math.min(2020,cy)))
    positioner.style.top = cy + "px"
    positioner.style.left = cx + "px"
    MousePoint.style.transform = "rotate("+px+"deg"+")"
    window.scroll(Math.min(cx-window.innerWidth/2,3072-window.innerWidth),cy-window.innerHeight/2)
}

