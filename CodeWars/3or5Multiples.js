
function solution(number){
    let out = 0;
    for(let i = 0; i < number; i++){
        if(i%3 == 0){
            out += i;
        }else if(i%5 == 0){
            out += i;
        }
    }
    return out;
}
console.log(solution(30))