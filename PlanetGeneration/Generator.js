const deg2rad = Math.PI/180
function generatePlanet(planetradius,land, water, cutoff, strength, scale) {
    noise.seed(Math.round(Math.random()*10000))
    let canvas = document.getElementById('Canvas')
    var context = canvas.getContext('2d')
    context.globalCompositeOperation = 'color';
    context.beginPath();
    for(let y = -planetradius; y < planetradius; y+=0.75){
        for(let x = -Math.sqrt(planetradius*planetradius - y*y); x < Math.sqrt(planetradius*planetradius - y*y); x++){
            var col = Math.abs(noise.perlin2((x/10 + (Math.sin(noise.perlin2(x*2+5431,y*2+5331)*Math.PI*2)*y/5)/10*strength)/scale,(y/10 + (Math.sin(noise.perlin2(x*2+5431,y*2+5331)*Math.PI*2)*y/5)/10*strength)/scale))
            col *= cutoff
            col = Math.round(col)
            col *= 256/cutoff
            if(col > 204.5){context.fillStyle = "rgba("+col*land[0]+","+col*land[1]+","+col*land[2]+",1)"}else{
                context.fillStyle = "rgba("+255*water[0]+","+255*water[1]+","+255*water[2]+",1)"
            }
            context.fillRect( canvas.width/2 + x, canvas.height/2 + y, 1, 1)
    
    }};
}
generatePlanet(32,[0.25,0.9,0.5],[0.125,0.25,0.79],1.1,0.125,1)