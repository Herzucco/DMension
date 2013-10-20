define(["../../puppets/puppets", "./canvasCreator"], function(Puppets, CanvasCreator){
	var CanvasDimensionCreator = function(config){
		if(typeof config !== "object")
			config = {};

		var canvasObject = CanvasCreator(config);

		if(!config.hasOwnProperty("buffer"))
			config.buffer = CanvasCreator(config);

		if(!config.hasOwnProperty("stencil"))
			config.stencil = CanvasCreator(config);

		Puppets.addComponent(canvasObject.entity, "contextStencil", {
			buffer : config.buffer.canvas,
			stencil : config.stencil.context
		});

		return {
			entity : canvasObject.entity,
			components : Puppets.getComponents(canvasObject.entity)[0]
		};
	};
	return CanvasDimensionCreator;
	
});