define(["../loader/libraries/puppets", "../game/level/PNGParser", "../game/level/parsingFunction"], function(Puppets, PNGParser, parse){
    Puppets.entity("memory", {components : [
            "position",
            "size",
            "memoryData",
            "memoryScenery",
            "hover"
        ]});
    Puppets.component("memoryScenery", function(data, entity){
        var image = new Image();
        image.src = data.src;
        var parser;
        image.onload = function(){
            parser = new PNGParser({
                           size : {width : data.width, height : data.height},
                           image : image,
                           tolerance : 250,
                           accuracy : 1,
                        });
            parser.compile();
            Puppets.getComponents(entity)[0].memoryScenery.parser = parser;
        }

        return {parser : parser};
    });
    Puppets.component("memoryData", function(data, entity){
        return {world : data.world, context : data.context, phase : data.phase, cameraPosition : data.cameraPosition};
    });
    Puppets.system("memoryScenery", function(position, memoryData, memoryScenery){
        if(memoryScenery.parser !== undefined){
            memoryScenery.enabled = false;
            parse(memoryScenery.parser, position, memoryData.context, memoryData.cameraPosition, memoryData.world, memoryData.phase);
        } 
    }, {components : ["position", "memoryData", "memoryScenery"]});
    Puppets.system("adaptPosition", function(position, memoryData){
        if(!position.base){
            position.base = {};
            position.base.x = position.x;
            position.base.y = position.y;
        }
        position.x = position.base.x - memoryData.cameraPosition.x;
        position.y = position.base.y - memoryData.cameraPosition.y;
    }, {components : ["position", "memoryData"]});
});