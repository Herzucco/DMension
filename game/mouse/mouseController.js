define(["../../loader/libraries/puppets", "../game", "./config"], function(Puppets, Game, config){
	var MouseController = function(config){
		this.config = config;
	};

	MouseController.prototype.init = function(){
		/* define some aliases */
		var mainCanvas = Game.canvasController.mainCanvas.components.canvasContext.canvas;
		var drawPaint = Game.canvasController.firstDimension.drawPaint.components.canvasContext.context;
		var mouse = Puppets.createEntity("mouse", {
			radius : {
				radius : this.config.radius, 
				circumference : this.config.circumference
			},
			mouse : {
				onMouseDown : this.config.onMouseDown,
				onMouseUp : this.config.onMouseUp
			}
		});
		Puppets.addComponent(mouse, "renderCircle", {	canvas : canvas,
														context : drawPaint, color : this.config.color,
														cameraPosition : Game.cameraController.components.position,
														PIXELS_ARRAY : Game.constants.PIXELS_ARRAY, isLittleEndian : Game.constants.isLittleEndian
													},  false);
		// else
					// 	Puppets.addComponent(this.id, "renderCircle", {canvas : mainCanvas, context : contextBuffer, clip : true})

					// this.components.mouse.passed = true;

		this.entity = mouse;
		this.components = Puppets.getComponents(mouse)[0];
	}

	return new MouseController(config);
});