let typ = "b"
function settype(t){typ = t}
(function(){

    var ConvertBase = function (num) {
        return {
            from : function (baseFrom) {
                return {
                    to : function (baseTo) {
                        return parseInt(num, baseFrom).toString(baseTo);
                    }
                };
            }
        };
    };

    ConvertBase.bin2dec = function (num) {
        return ConvertBase(num).from(2).to(10);
    };

    ConvertBase.bin2hex = function (num) {
        return ConvertBase(num).from(2).to(16);
    };

    ConvertBase.dec2bin = function (num) {
        return ConvertBase(num).from(10).to(2);
    };

    ConvertBase.dec2hex = function (num) {
        return ConvertBase(num).from(10).to(16);
    };

    ConvertBase.hex2bin = function (num) {
        return ConvertBase(num).from(16).to(2);
    };
    ConvertBase.hex2dec = function (num) {
        return ConvertBase(num).from(16).to(10);
    };
    
    this.ConvertBase = ConvertBase;
    
})(this);

function runcheck(){
let baseval = document.getElementById('Textfill').value.toString().split(" ")

let bOut = []
let dOut = []
let hOut = []
for(let i = 0, type=typ; i < baseval.length; i++){
    if(type.toLowerCase() == 'b'){
        dOut[i] = ConvertBase.bin2dec(baseval[i])
        hOut[i] = ConvertBase.bin2hex(baseval[i])
        bOut[i] = baseval[i]
    }
    if(type.toLowerCase() == 'h'){
        dOut[i] = ConvertBase.hex2dec(baseval[i])
        bOut[i] = ConvertBase.hex2bin(baseval[i])
        hOut[i] = baseval[i]
    }
    if(type.toLowerCase() == 'd'){
        bOut[i] = ConvertBase.dec2bin(baseval[i])
        hOut[i] = ConvertBase.dec2hex(baseval[i])
        dOut[i] = baseval[i]
    }
}
document.getElementById('Textsection').textContent = "Binary: "+bOut+"\nDecimal: "+dOut+"\nHexadecimal: "+hOut
}