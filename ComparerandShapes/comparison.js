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
                    surfacearea = 6*inputval
                    volume = inputval*inputval*inputval
                }
                console.log("Perimeter/Circumference: "+PC+"\nArea: "+area+"\nVolume: "+volume+"\nSurfaceArea: "+surfacearea+"\n")
                document.getElementById("output").value+="Perimeter/Circumference: "+PC+"\nArea: "+area+"\nVolume: "+volume+"\nSurfaceArea: "+surfacearea+"\n\n"
            }
        }

}