define(["../../loader/libraries/puppets"], function(Puppets){
	var CanvasCreator = function(config){
		if(typeof config !== "object")
			config = {};

		if(!config.hasOwnProperty("canvas"))
			config.canvas = document.createElement("canvas");

		if(config.hasOwnProperty("size")){
			config.canvas.width = config.size.width;
			config.canvas.height = config.size.height;
		};

		var canvasEntity = Puppets.createEntity("canvas", {
			DOMElement : {
				element : config.canvas,
				listeners : config.eventObject || {}
			},
			canvasContext : {
				canvas : config.canvas,
				globaleCompositeOperation : config.globaleCompositeOperation
			}
		}, config.collection);

		return {
			entity : canvasEntity,
			components : Puppets.getComponents(canvasEntity)[0]
		};
	}
	return CanvasCreator;
});