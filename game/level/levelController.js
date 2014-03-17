define(["../../loader/libraries/puppets", "../game", "./PNGParser", "./parsingFunction",
            "./firstLevel", "./secondLevel"], 
function(Puppets, Game, PNGParser, parse, firstLevel, secondLevel){
	var Level = function(config){
		this.levelList = config;
        this.beginEntities = -1;
        this.endEntities = -1;
	}

    var canvasController,mainCanvas,vfirstColorCanvas, world, WIDTH, HEIGHT,
         camera, cameraPosition, PIXELS_ARRAY;

	Level.prototype.init = function(){
        canvasController = Game.canvasController;
        mainCanvas = canvasController.mainCanvas.components;

        firstColorCanvas = canvasController.firstColor.components;

        world = Game.worldController.world;

        WIDTH = Game.constants.WIDTH;
        HEIGHT = Game.constants.HEIGHT;

        camera = Game.cameraController.components;
        cameraPosition = camera.position;

        for(var i in this.levelList){
            var level = this.levelList[i];

            level.init();
            window.parser = new PNGParser(level.parseConfig);
            parser.compile();
            level.toParse = [parser, level.parseConfig.position, mainCanvas.canvasContext.context, cameraPosition, world, "mainCanvas"];
        }

        this.openLevel('firstLevel');
        //this.openLevel('secondLevel');
	}

    Level.prototype.openLevel = function(name){
        var level = this.levelList[name];

        closeAll(this.beginEntities, this.endEntities);

        this.beginEntities = Puppets.Entities.length;
        level.dialogs();
        level.decor();
        level.backgrounds();

        parse.apply(null, level.toParse);

        this.endEntities = Puppets.Entities.length;
        return level;
    }

    function closeAll(begin, end){
        for(var i = begin; i < end; i++){
            if(i >= 0){
                Puppets.addComponent(i, 'BODYTODESTROY', {});
            }
        }
        Puppets.run();
        for(var i = begin; i < end; i++){
            Puppets.removeEntity(i);
        }
    }
	return new Level({
        firstLevel : firstLevel,
        secondLevel : secondLevel
    });
});