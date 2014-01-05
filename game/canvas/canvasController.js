define(["../../loader/libraries/puppets", "../game", "./canvasDimensionCreator",
		 "./canvasCreator", "../mouse/mouseController",
		 "./configMainCanvas", "./configFirstDimension", "../constants"],
function(Puppets, Game, CanvasDimensionCreator, CanvasCreator, mouseController, configMainCanvas, configFirstDimension, constants){
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

		this.mainCanvas = mainCanvas;
        this.buildDimensionBuffer(mainCanvas);
        this.buildColorBuffer(mainCanvas);
	};

    CanvasController.prototype.buildColorBuffer = function(mainCanvas){
        var canvas = document.getElementById("colorBuffer");
        canvas.width = constants.WIDTH;
        canvas.height = constants.HEIGHT;

        var drawPaint = CanvasCreator({
            collection : "canvas",
            canvas : canvas
        });

        var firstColor = CanvasDimensionCreator({
            collection : "canvas",
            size : {
                width : Game.constants.PAINTWIDTH,
                height : Game.constants.PAINTHEIGHT,
            },
            buffer : document.getElementById("colorBuffer"),
            stencil : mainCanvas.components.canvasContext.context,
            cameraPosition : Game.cameraController.components.position,
            type : "color"
        });

        firstColor.drawPaint = drawPaint;

        this.firstColor = firstColor;
    }

    CanvasController.prototype.buildDimensionBuffer = function(mainCanvas){
        var canvas = document.getElementById("dimension");
        canvas.width = constants.WIDTH;
        canvas.height = constants.HEIGHT;

        var drawPaint = CanvasCreator({
            collection : "canvas",
            canvas : canvas
        });

        var dimension = CanvasDimensionCreator({
            collection : "canvas",
            size : {
                width : Game.constants.PAINTWIDTH,
                height : Game.constants.PAINTHEIGHT,
            },
            canvas : document.createElement("canvas"),
            buffer : document.getElementById("dimension"),
            stencil : mainCanvas.components.canvasContext.context,
            cameraPosition : Game.cameraController.components.position,
            type : "dimension"
        });
        
        dimension.drawPaint = drawPaint;

        this.otherDimension = dimension;
    }

    CanvasController.prototype.changePhase = function(phase){
        this.otherDimension.components.phase.currentPhase = phase;
    }

	return new CanvasController(configMainCanvas, configFirstDimension);
});