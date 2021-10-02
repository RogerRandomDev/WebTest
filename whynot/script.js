var answers = 0
const answerresponse = ["D:<","a little better than baby","pathetic","not pathetic but... PATHETIC","you could do better","you win this time..."]


function submits() {
    answers = 0;
    if(document.getElementById("1+1").value==2) answers+=1;
    if(document.getElementById("-1+1").value==0) answers+=1;
    if(document.getElementById("teach").value.toLowerCase()=="google") answers+=1;
    if(document.getElementById("butter").value.toLowerCase()=="suffering") answers+=1;
    if(document.getElementById("life").value==42) answers+=1;
    updateanswers()
}
function updateanswers() {
    document.getElementById("answers").innerHTML = "Correct Answers:"+answers+"/5\n"
    document.getElementById("answers").innerHTML += "Grade: "+(answers/5)*100+"%\n"
    document.getElementById("answers").innerHTML += "You are rated as:"+answerresponse[answers]

}