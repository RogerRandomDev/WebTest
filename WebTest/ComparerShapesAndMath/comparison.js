/*
    Unit 2 
    Comparing Data 
    
    Name: Roger Grange
    Date: 8/19/21
    
    Filename: comparison.js
*/

//YOUR CODE HERE
let mode = 'compare'
function setmode(newmode){mode=newmode}

//HELP FOR USING THEM: to separate compares: use a comma in between, and enter between each new set
//for using the SHAPES, enter shape name first, circle or square, then value, enter before each new set
function compare(){
        let inputs = document.getElementById('input').value.split("\n")
        document.getElementById("output").value = ""
        if(mode=="compare"){
            for(let i = 0; i < inputs.length; i++){
                let type0 = inputs[i].split(",")[0]
                let type1 = inputs[i].split(",")[1]
                let try0 = parseFloat(type0);
                let try1 = parseFloat(type1);
                try0 = (try0==type0?try0:type0==="true");
                try1 = (try1==type1?try1:type1==="true");
                //WHY WAS THIS SO HARD TO FIGURE OUT? no really, the solution makes sense but HOW DID IT TAKE SO LONG//
                try0 = (typeof(try0)=="boolean"?(type0=="true"?try0:(type0=="false"?try0:type0)):parseFloat(type0)!=NaN?parseFloat(type0):type0)
                try1 = (typeof(try1)=="boolean"?(type1=="true"?try0:(type1=="false"?try1:type1)):parseFloat(type1)!=NaN?parseFloat(type1):type1)
                type0 = try0
                type1 = try1
                let triE = (type0===type1)
                let duaE = (type0==type1)
                console.log("("+type0+")" + typeof(type0) + "==" + "("+type1+")" + typeof(type1) + ":   " + duaE)
                console.log("("+type0+")" + typeof(type0) + "===" + "("+type1+")" + typeof(type1) + ":   " + triE)
                document.getElementById("output").value+="("+type0+")" + typeof(type0) + "==" + "("+type1+")" + typeof(type1) + ":   " + duaE + "\n"
                document.getElementById("output").value+="("+type0+")" + typeof(type0) + "===" + "("+type1+")" + typeof(type1) + ":   " + triE + "\n"
            }
    }
        if(mode=="shapes"){
            for(let i = 0; i < inputs.length; i++){
                let PC = 0, area = 0, volume = 0, surfacearea = 0;
                let inputval = inputs[i].split(",")[1]
                if(inputs[i].split(",")[0]=="circle"){
                    PC = inputval*2*Math.PI
                    area = inputval*(Math.PI*Math.PI)
                    volume = (4/3)*Math.PI*(inputval*inputval*inputval)
                    surfacearea = 4*Math.PI*(inputval*inputval)
                }
                if(inputs[i].split(",")[0]=="square"){
                    PC =4*inputval
                    area = inputval*inputval
                    volume = inputval*inputval*inputval
                    surfacearea = 6*inputval
                }
                console.log("Perimeter/Circumference: "+PC+"\nArea: "+area+"\nVolume: "+volume+"\nSurfaceArea: "+surfacearea+"\n")
                document.getElementById("output").value+="Perimeter/Circumference: "+PC+"\nArea: "+area+"\nVolume: "+volume+"\nSurfaceArea: "+surfacearea+"\n\n"
            }
        }
        if(mode=="points"){
            for(i of inputs){
                let output = []
                let input = [0,0,0,0]
                (1,2)(3,4)
                input[0] = parseFloat(i.split("(")[1].split(")")[0].split(",")[0])
                input[1] = parseFloat(i.split("(")[1].split(")")[0].split(",")[1])
                input[2] = parseFloat(i.split("(")[2].split(")")[0].split(",")[0])
                input[3] = parseFloat(i.split("(")[2].split(")")[0].split(",")[1])
                let difx=(input[2]-input[0])
                let dify=(input[3]-input[1])
                output = Math.sqrt(difx*difx+dify*dify)
                document.getElementById("output").value+=output+"\n"
                
            }
        }
        if(mode=="hypotenuse"){
            for(i of inputs){
                let output = 0
                let input0 = 0
                let input1 = 0
                
                input0 = parseFloat(i.split(",")[0])
                input1 = parseFloat(i.split(",")[1])
                output = Math.sqrt(input0*input0+input1*input1)
                document.getElementById("output").value+=output+"\n"
            }
        }
        if(mode=="remainder"){
            for(i of inputs){
                let output = 0
                output = parseFloat(i.split(",")[0]) % parseFloat(i.split("%")[1])
                document.getElementById("output").value+=(parseFloat(i.split(",")[0])-output)+"R"+output+"\n"
            }
        }
}