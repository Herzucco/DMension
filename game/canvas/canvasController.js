define(["../../loader/libraries/puppets", "../game", "./canvasDimensionCreator",
		 "./canvasCreator", "../mouse/mouseController",
		 "./configMainCanvas", "./configFirstDimension"],
function(Puppets, Game, CanvasDimensionCreator, CanvasCreator, mouseController, configMainCanvas, configFirstDimension){
	var CanvasController = function(configMainCanvas, configFirstDimension){
		this.configMainCanvas = configMainCanvas;
		this.configFirstDimension = configFirstDimension;
	};
	
	CanvasController.prototype.init = function(){
		var mainCanvas = CanvasCreator({
			collection : "canvas",
			canvas : this.configMainCanvas.canvas,
			eventObject : {
				"mouseup" : this.configMainCanvas.mouseup,
				"mousedown" : this.configMainCanvas.mousedown,
				"mousemove" : this.configMainCanvas.mousemove
			}
		});

		var firstDrawDimension = CanvasCreator({
			collection : "canvas",
			canvas : this.configFirstDimension.canvas
		});
		var firstDrawPaint = CanvasCreator({
			collection : "canvas",
			canvas : document.getElementById("buffer1")
		});

		var secondDrawPaint = CanvasCreator({
			collection : "canvas",
			canvas : document.getElementById("buffer1")
		});

		var thirdDrawPaint = CanvasCreator({
			collection : "canvas",
			canvas : document.getElementById("buffer1")
		});

		var fourthDrawPaint = CanvasCreator({
			collection : "canvas",
			canvas : document.getElementById("buffer1")
		});

		firstDimension = CanvasDimensionCreator({
			collection : "canvas",
			size : {
				width : Game.constants.WIDTH,
				height : Game.constants.HEIGHT,
			},
			buffer : firstDrawDimension.components.canvasContext,
			stencil : mainCanvas.components.canvasContext,
			cameraPosition : Game.cameraController.components.position,
		});
		firstDimension.drawPaint = firstDrawDimension;

		firstColor = CanvasDimensionCreator({
			collection : "canvas",
			size : {
				width : Game.constants.WIDTH,
				height : Game.constants.HEIGHT,
			},
			buffer : firstDrawPaint.components.canvasContext,
			stencil : mainCanvas.components.canvasContext,
			cameraPosition : Game.cameraController.components.position,
		});
		firstColor.drawPaint = firstDrawPaint;

		secondColor = CanvasDimensionCreator({
			collection : "canvas",
			size : {
				width : Game.constants.WIDTH,
				height : Game.constants.HEIGHT,
			},
			buffer : secondDrawPaint.components.canvasContext,
			stencil : mainCanvas.components.canvasContext,
			cameraPosition : Game.cameraController.components.position,
		});
		secondColor.drawPaint = secondDrawPaint;

		thirdColor = CanvasDimensionCreator({
			collection : "canvas",
			size : {
				width : Game.constants.WIDTH,
				height : Game.constants.HEIGHT,
			},
			buffer : thirdDrawPaint.components.canvasContext,
			stencil : mainCanvas.components.canvasContext,
			cameraPosition : Game.cameraController.components.position,
		});
		thirdColor.drawPaint = thirdDrawPaint;

		fourthColor = CanvasDimensionCreator({
			collection : "canvas",
			size : {
				width : Game.constants.WIDTH,
				height : Game.constants.HEIGHT,
			},
			buffer : fourthDrawPaint.components.canvasContext,
			stencil : mainCanvas.components.canvasContext,
			cameraPosition : Game.cameraController.components.position,
		});
		fourthColor.drawPaint = fourthDrawPaint;

		this.mainCanvas = mainCanvas;
		this.firstDimension = firstDimension;
		this.firstColor = firstColor;
		this.secondColor = secondColor;
		this.thirdColor = thirdColor;
		this.fourthColor = fourthColor;

	};

	return new CanvasController(configMainCanvas, configFirstDimension);
});