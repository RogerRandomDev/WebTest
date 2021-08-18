document.addEventListener('keydown',keyPressed)
document.addEventListener('keyup',keyReleased)
const deg2rad = Math.PI/180
let keyspressed = [false,false,false,false]
let keycodes = {'s':0,'w':1,'a':2,'d':3}
let ismoving = false
//position variables//
var px=0,py=0;
var cx=64,cy=64;
//Changes if key is active or not//
function keyPressed(keyid) {
    if(!keyspressed[keycodes[keyid.key]]){MousePoint.src = "RocketMoving.gif"}
    keyspressed[keycodes[keyid.key]] = true
}

function keyReleased(keyid) {
    keyspressed[keycodes[keyid.key]] = false
    ismoving = false
    if(keyspressed[0]) {ismoving=true}
    if(keyspressed[1]) {ismoving=true}
    if(keyspressed[2]) {ismoving=true}
    if(keyspressed[3]) {ismoving=true}
    if(ismoving==false){MousePoint.src="Rocket.png"}
}


//Runs functions every set period of time//

window.setInterval(function(){
    py = (keyspressed[0] - keyspressed[1])*4
    px += (keyspressed[3] - keyspressed[2])*4
    cx += py*Math.cos((px+90)*deg2rad)
    cy += py*Math.sin((px+90)*deg2rad)
    cx = Math.max(4,cx)
    cx = Math.min(1504,cx)
    cy = Math.min(700,cy)
    cy = Math.max(4, cy)
    positioner.style.top = cy + "px"
    positioner.style.left = cx + "px"
    MousePoint.style.transform = "rotate("+px+"deg"+")"
},20)
