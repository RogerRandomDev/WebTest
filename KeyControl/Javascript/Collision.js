let r1h = 40, r1w=40;
const collisionTypeInfo = {
"Supply":"Press E to land on: ",
"HOME":"Press E to land on: ",
"INFO":"Press E to land on: ",
"Defense":"Press E to enter PLANET DEFENSE for: "
}
function collide(r1,r2,texttoshow){
    //Does check for if it is a round collision or not, and uses respective formula//
    var dx=(r1.x+r1w/2)-(r2.x+r2.width/2);
    var dy=(r1.y+r1h/2)-(r2.y+r2.height/2);
    var width=(r1w+r2.width)/2;
    var height=(r1h+r2.height)/2;
    //
    var crossWidth=width*dy;
    var crossHeight=height*dx;
    var collision='none';
    if(Math.abs(dx)<=width && Math.abs(dy)<=height){
        if(crossWidth>crossHeight){
            collision=(crossWidth>(-crossHeight))?'bottom':'left';
        }else{
            collision=(crossWidth>-(crossHeight))?'right':'top';
        }
    }
    //if colliding, sets the text color and text on top of the screen to tell you if you can do certain actions//
    if (collision != "none"){
        TextArea.style.color = "rgba( 75, 75, 75, 1)";
        TextArea.textContent = collisionTypeInfo[texttoshow[2]] + texttoshow[1]
    }else{
        if(collision =="none"){
        TextArea.style.color = "rgba( 75, 75, 75, 0)"
        TextArea.textContent = "a"}
    }
    return(collision);
}
