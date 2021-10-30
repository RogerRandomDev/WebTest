const MaxNumber = 1000
function power(){
    let out = Math.round(Math.random()*MaxNumber)
    console.log(Math.pow(out,2))
}
function square(){
    let out = Math.round(Math.random()*MaxNumber)
    console.log("perfect root: "+out+" the square is: "+Math.pow(out,2))
}
const eightBallValCount = 8
const eightBallVals = [
    "Go look and a mirror and ask yourself that again.",
    "Sure, why not",
    "I'm not omnipotent, go get a lottery ticket and pray",
    "Yes",
    "No",
    "Perhaps",
    "Don't count on it",
    "Meh",
    "Ask again later."
]
function slope(){
    let output = eightBallVals[Math.round(Math.random()*eightBallValCount)]
    console.log(output)
}