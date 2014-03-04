define(["../../loader/libraries/puppets", "../game", "./PNGParser", "./parsingFunction",
            "./firstLevel"], function(Puppets, Game, PNGParser, parse, firstLevel){
	var Level = function(config){
		this.levelList = config;
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

        for(var i in this.levelList){
            var level = this.levelList[i];

            level.init();
            window.parser = new PNGParser(level.parseConfig);
            parser.compile();
            level.toParse = [parser, level.parseConfig.position, mainCanvas.canvasContext.context, cameraPosition, world, "mainCanvas"];
        }

        this.openLevel('firstLevel');
	}

    Level.prototype.openLevel = function(name){
        var level = this.levelList[name];

        level.dialogs();
        level.decor();
        level.backgrounds();

        parse.apply(null, level.toParse);

        return level;
    }
	return new Level({
        firstLevel : firstLevel
    });
});