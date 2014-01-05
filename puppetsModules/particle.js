define(["../loader/libraries/puppets", "../libraries/noise", "./circleRendering"], function(Puppets, Perlin){
    
    Puppets.component("perlinMovement", function(data){
        return {
            seeds : data.seeds || [Math.random(),Math.random(),Math.random()],
            increments : data.increments || [Math.random()*0.01,Math.random()*0.01,Math.random()*0.01],
            widthMap : data.widthMap || [0, 1],
            heightMap : data.heightMap || [0, 1],
        }
    });

    Puppets.system("perlinMovement", function(perlinMovement, position, renderCircle){
        var noiseX = Perlin.noise(perlinMovement.seeds[0], perlinMovement.seeds[1], perlinMovement.seeds[2]);
        var noiseY = Perlin.noise(perlinMovement.seeds[2], perlinMovement.seeds[1], perlinMovement.seeds[0]);
        position.x = Perlin.map_range(noiseX, 0.2, 0.8, perlinMovement.widthMap[0], perlinMovement.widthMap[1]);
        position.y = Perlin.map_range(noiseY, 0.2, 0.8, perlinMovement.heightMap[0], perlinMovement.heightMap[1]);

        for(var i = 0; i < perlinMovement.seeds.length; i++){
            perlinMovement.seeds[i] += perlinMovement.increments[i];
        };
    }, {
        components : ["perlinMovement", "position"]
    })
    Puppets.entity("perlinCircle", {
        components : [
            "position",
            "renderCircle",
            "radius",
            "perlinMovement"
        ]
    });
    return {};
});