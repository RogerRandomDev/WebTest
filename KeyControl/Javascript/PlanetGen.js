const planetparts = {
    "rock":["./Images/PlanetParts/RockyPlanet.png","./Images/PlanetParts/RockyPlanet0.png","./Images/PlanetParts/RockyPlanet1.png","./Images/PlanetParts/RockyPlanet2.png"],
    "gas":["./Images/PlanetParts/GasPlanet.png","./Images/PlanetParts/GasPlanet0.png","./Images/PlanetParts/GasPlanet1.png","./Images/PlanetParts/GasPlanet2.png"],
    "land":["./Images/PlanetParts/LandPlanet.png","./Images/PlanetParts/LandPlanet0.png","./Images/PlanetParts/LandPlanet1.png","./Images/PlanetParts/LandPlanet2.png"],
    "sizes":{"rock":[40,60],"gas":[70,120],"land":[50,80]}
}
const colorsets = {
    "rock":[[[4,100000,45],[0,100,-45]],
    [[4,50,-45],[100,100,-45]]],
    "gas":[[[10,10000,75],[10,10,0]],
    [[10,10000,-45],[10,10,45]]],
    "land":[[[5,125,45],[0,155,-45]],
    []],
}
function createPlanet(objectID){
    let planet = document.getElementById(objectID)
    const partholder = document.createElement("div")
    const planetbase = document.createElement("img")
    const planetpart0 = document.createElement("img")
    const planetpart1 = document.createElement("img")
    const planetpart2 = document.createElement("img")
    partholder.style.display = "inline"
    planetbase.style.margin = "0 auto"
    let colorsetup = planetRange(0,1,planet)
    planetbase.style.zIndex = 100
    planetpart0.style.zIndex = 101
    planetpart1.style.zIndex = 102
    planetpart2.style.zIndex = 103
    planetbase.src = planetparts[planet.title][0]
    planetpart0.src = planetparts[planet.title.split(",")[0]][1]
    planetpart1.src = planetparts[planet.title.split(",")[0]][2]
    planetpart2.src = planetparts[planet.title.split(",")[0]][3]
    planetbase.width = planetRange(planetparts["sizes"][planet.title.split(",")[0]][0],planetparts["sizes"][planet.title.split(",")[0]][1],planet)
    planetbase.height = planetbase.width
    planetpart0.width = planetbase.width;planetpart0.height = planetbase.width
    planetpart1.width = planetbase.width;planetpart1.height = planetbase.width
    planetpart2.width = planetbase.width;planetpart2.height = planetbase.width
    planetbase.style.imageRendering = "pixelated"
    planetpart0.style.imageRendering = "pixelated"
    planetpart1.style.imageRendering = "pixelated"
    planetpart2.style.imageRendering = "pixelated"
    planetpart0.style.position = "relative"
    planetpart0.style.left = "-"+planetbase.width+"px"
    planetpart1.style.position = "relative"
    planetpart1.style.left = "-"+planetbase.width*2+"px"
    planetpart2.style.position = "relative"
    planetpart2.style.left = "-"+planetbase.width*3+"px"
    partholder.appendChild(planetpart0)
    partholder.appendChild(planetpart1)
    partholder.appendChild(planetpart2)
    planet.appendChild(planetbase)
    planet.appendChild(partholder)
    
    planet.style.filter = "sepia("+colorsets[planet.title.split(",")[0]][colorsetup][0][0]+"%) saturate("+colorsets[planet.title.split(",")[0]][colorsetup][0][1]+"%) hue-rotate("+colorsets[planet.title.split(",")[0]][colorsetup][0][2]+"deg)"
    partholder.style.filter = "sepia("+colorsets[planet.title.split(",")[0]][colorsetup][1][0]+"%) saturate("+colorsets[planet.title.split(",")[0]][colorsetup][1][1]+"%) hue-rotate("+colorsets[planet.title.split(",")[0]][colorsetup][1][2]+"deg)"
    setCollision()
}


//random number in set range for purposes here//
function planetRange(min, max,planet) {
    let range = Math.abs(Math.sin(planet.style.top.split("px")[0]*planet.style.left.split("px")[0]*58))*(max-min)+min
    return Math.round(range)
}
function randRange(min,max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}