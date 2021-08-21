const planetparts = {
    "rock":["./Images/PlanetParts/RockyPlanet.png","./Images/PlanetParts/RockyPlanet0.png"],
    "gas":["./Images/PlanetParts/GasPlanet.png","./Images/PlanetParts/GasPlanet0.png"],
    "land":["./Images/PlanetParts/LandPlanet.png","./Images/PlanetParts/LandPlanet0.png"],
    "sizes":{"rock":[40,60],"gas":[70,120],"land":[50,80]}
}
const colorsets = {
    "rock":[[[4,100000,45],[0,100,-45]],
    [[4,50,-45],[100,100,-45]]],
    "gas":[[[63.7,940,180],[63.7,94,180]],
    [[63.7,940,100],[63.7,94,130]]],
    "land":[[[73.5,1000,240],[64.7,10000,-300]],
    [[25,5000,180],[20,2000,-75]],
    [[20,2000,100],[25,5000,75]]]
}
//goes to all the planets to generate and makes them//
function grabplanets(){
    for(let i = 0; i < document.getElementsByClassName("generateplanet").length; i ++){
        createPlanet(document.getElementsByClassName("generateplanet")[i].id)
    }
}

//yes, not the best, but it works and i can fix this later for more ease of use//
function createPlanet(objectID){
    let planet = document.getElementById(objectID)
    const partholder = document.createElement("div")
    const planetbase = document.createElement("img")
    const planetpart0 = document.createElement("img")
    const textbelow = document.createElement("div")
    const text = document.createTextNode(planet.title.split(",")[1])
    textbelow.appendChild(text)
    partholder.style.position = "absolute"
    planetbase.position="absolute"
    planetbase.style.margin = "0 auto"
    let colorsetup = planetRange(0,colorsets[planet.title.split(",")[0]].length-1,planet)
    planetbase.style.zIndex = 100
    planetpart0.style.zIndex = 101
    planetpart0.style.position = "absolute"

    planetbase.style.top=planet.style.top
    planetbase.style.left=planet.style.left
    planetbase.src = planetparts[planet.title.split(",")[0]][0]
    planetpart0.src = planetparts[planet.title.split(",")[0]][1]
    planetbase.width = planetRange(planetparts["sizes"][planet.title.split(",")[0]][0],planetparts["sizes"][planet.title.split(",")[0]][1],planet)
    planetbase.height = planetbase.width
    planetpart0.width = planetbase.width;planetpart0.height = planetbase.width
    planetbase.style.imageRendering = "pixelated"
    planetpart0.style.imageRendering = "pixelated"
    planetpart0.style.top="-"+planetbase.width-4+"px"
    planet.width = planetbase.width + "px"
    planet.height = planetbase.width + "px"
    textbelow.className = "spacetext"
    textbelow.style.position = "relative"
    textbelow.style.width = planetbase.width*5+"px"
    textbelow.style.left = "-"+planetbase.width*2+"px"
    partholder.appendChild(planetpart0)
    planet.appendChild(planetbase)
    planet.appendChild(partholder)
    planet.appendChild(textbelow)
    planet.style.filter = "sepia("+colorsets[planet.title.split(",")[0]][colorsetup][0][0]+"%) saturate("+colorsets[planet.title.split(",")[0]][colorsetup][0][1]+"%) hue-rotate("+colorsets[planet.title.split(",")[0]][colorsetup][0][2]+"deg)"
    partholder.style.filter = "sepia("+colorsets[planet.title.split(",")[0]][colorsetup][1][0]+"%) saturate("+colorsets[planet.title.split(",")[0]][colorsetup][1][1]+"%) hue-rotate("+colorsets[planet.title.split(",")[0]][colorsetup][1][2]+"deg)"
    setCollision()
}


//random number in set range for purposes here//
function planetRange(min, max,planet) {
    let range = Math.abs(Math.sin(planet.style.top.split("px")[0]*planet.style.left.split("px")[0]/2))*(max-min)+min
    return Math.round(range)
}
function randRange(min,max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}