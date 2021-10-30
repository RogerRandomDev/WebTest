

function toCamelCase(str){
    let input = str.split("_")
    if (str.includes('-')){
        input = str.split('-')
    }
    let out = '';
    for(let i = 0; i < input.length; i++){
        if(i > 0){
            out += input[i].slice(0,1).toUpperCase() + input[i].slice(1,input[i].length).toLowerCase()
        }else{
            out += input[i]
        }
    }
    return out;
}