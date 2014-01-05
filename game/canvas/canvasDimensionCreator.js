define(["../../loader/libraries/puppets", "./canvasCreator"], function(Puppets, CanvasCreator){
	var CanvasDimensionCreator = function(config, type){
		if(typeof config !== "object")
			config = {};

		var canvasObject = CanvasCreator(config);

		if(!config.hasOwnProperty("buffer"))
			config.buffer = CanvasCreator(config);

		if(!config.hasOwnProperty("stencil"))
			config.stencil = CanvasCreator(config);

        Puppets.addComponent(canvasObject.entity, "contextStencil", {
            buffer : config.buffer,
            stencil : config.stencil,
            cameraPosition : config.cameraPosition,
            type : config.type
        });
        Puppets.addComponent(canvasObject.entity, "phase", {
            currentPhase : "otherCanvas",
            defaultPhase : "otherCanvas"
        });
		return {
			entity : canvasObject.entity,
			components : Puppets.getComponents(canvasObject.entity)[0]
		};
	};
	return CanvasDimensionCreator;
	
});