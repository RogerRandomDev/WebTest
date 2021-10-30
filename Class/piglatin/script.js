


function translatePigLatin() {
    let str = document.getElementById("Translate").value
    let vowels = ['a', 'e', 'i', 'o', 'u'];
    let newStr = "";
    const words = str.split(" ")
    for(string of words){
        let out = ""
        if (vowels.indexOf(string[0]) > -1) {
            out = string + "way";
        } else {
            let firstMatch = string.match(/[aeiou]/g) || 0;
            let vowel = string.indexOf(firstMatch[0]);
            out = string.substring(vowel) + string.substring(0, vowel) + "ay";
        }
        newStr += " " + out
    }
    document.getElementById("Output").value = newStr
}