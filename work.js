let lastnum = 0;
let curnum = 0;
console.log("")
randnum: for(let i = 0; i < 6; i++){
    do{
        curnum = Math.min(Math.round(Math.random()*9))+1;
    }while(curnum == lastnum);
    lastnum = curnum;
    console.log(lastnum)
};
console.log("1 to 1000:")
let val = 0;
for(let i = 0; i <= 1000; i++){
    val += i;
}
console.log(val);
console.log('every odd from 93 to 845:');
val = 0;
for(let i = 93; i <= 845; i=i+2){
    val += i;
}
console.log(val);
console.log('every num divisible by six up to 400 added:');
val = 0;
for(let i = 1; i <= 400; i++){
    if(i%6 == i/6){
        val += i
    }
}
console.log(val)
