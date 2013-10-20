define(["../../loader/libraries/puppets", "../game", "./config"], function(Puppets, Game, config){
	var WorldController  = function(config){
		this.config = config;
	}

	WorldController.prototype.init = function(){
		var mainCanvas = Game.canvasController.mainCanvas.components;

		this.config.context = mainCanvas.canvasContext.context;
		var worldEntity = Puppets.createEntity("b2World", {world : this.config});
		var world = Puppets.getComponents(worldEntity)[0].world.world;
		
		this.world = world;
		this.entity = worldEntity;
	}

	return new WorldController(config);
});