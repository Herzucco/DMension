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

		var firstDrawPaint = CanvasCreator({
			collection : "canvas",
			canvas : document.getElementById("buffer1")
		});

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

		this.mainCanvas = mainCanvas;
		this.firstColor = firstColor;

		Game.observer.on("pixelsChanged", function(index, erase){
			var indexArray = Game.constants.maxPixelsArray.indexOf(index)
			if(!erase && indexArray < 0)
				Game.constants.maxPixelsArray.push(index);
			else if(erase && indexArray > -1)
				Game.constants.maxPixelsArray.splice(indexArray, 1);
		});

	};

	return new CanvasController(configMainCanvas, configFirstDimension);
});