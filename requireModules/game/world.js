define(["../puppets/puppets"], function(Puppets){
	var World = function(config){
		var worldEntity = Puppets.createEntity("b2World", {world : config});
		var world = Puppets.getComponents(worldEntity)[0].world.world;
		return {
			entity : worldEntity,
			world : world
		};
	}

	return World;
});