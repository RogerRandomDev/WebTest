var box0 = [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31]
var box1 = [2,3,6,7,10,11,14,15,18,19,22,23,26,27,30,31]
var box2 = [4,5,6,7,12,13,14,15,20,21,22,23,28,29,30,31]
var box3 = [8,9,10,11,12,13,14,15,24,25,26,27,28,29,30,31]
var box4 = [16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]
let input = prompt("type a number between 1 and 31")
while(isNaN(parseInt(input)) || parseInt(input) > 31 || parseInt(input) < 1){
    input = prompt("not an option, try again")
}
var output = ""
input = parseInt(input)
if(box4.includes(input)){
    output+="1"
}else{
    output+="0"
}
if(box3.includes(input)){
    output+="1"
}else{
    output+="0"
}
if(box2.includes(input)){
    output+="1"
}else{
    output+="0"
}
if(box1.includes(input)){
    output+="1"
}else{
    output+="0"
}
if(box0.includes(input)){
    output+="1"
}else{
    output+="0"
}
console.log(output)