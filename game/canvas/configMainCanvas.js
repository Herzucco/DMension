define(["../game"],
 function(Game){

	var moveOnCanvas = function(e){
		var mouse = Game.mouseController.components;
		var mouseComponent = mouse.mouse;
    	var position = mouse.position;
    	var firstDimension = Game.canvasController.firstDimension;
    	var camera = Game.cameraController.components;

		if(e.offsetX){
			position.x = e.offsetX;
			position.y = e.offsetY;
		}
		else if(e.layerX){
			position.x = e.layerX;
			position.y = e.layerY;
		}
    };
	var clickOnCanvas = function(e){
		var mouse = Game.mouseController.components;
		var mouseComponent = mouse.mouse;

		mouseComponent.onMouseDown.apply({components : mouse, id : Game.mouseController.entity});
		mouseComponent.clicked = true;
	}
	var unClickOnCanvas = function(e){
		var mouse = Game.mouseController.components;
		var mouseComponent = mouse.mouse;
		var position = mouse.position;
		var firstDimension = Game.canvasController.firstDimension;
    	var camera = Game.cameraController.components;

		mouseComponent.onMouseUp.apply({components : mouse, id : Game.mouseController.entity});
		mouseComponent.clicked = false;
	}

	return {
		mouseup : unClickOnCanvas,
		mousedown : clickOnCanvas,
		mousemove : moveOnCanvas,
		canvas : document.getElementById("canvas"),
	}
});