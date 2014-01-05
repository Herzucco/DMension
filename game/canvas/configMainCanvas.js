define(["../game", "../constants"],
 function(Game, constants){

	var moveOnCanvas = function(e){
		var mouse = Game.mouseController.components;
    	var position = mouse.position;

		if(e.offsetX){
			position.x = e.offsetX// >> 1;
			position.y = e.offsetY// >> 1;
		}
		else if(e.layerX){
			position.x = e.layerX// >> 1;
			position.y = e.layerY// >> 1;
		}

        e.preventDefault();
    };
	var clickOnCanvas = function(e){
		var mouse = Game.mouseController.components;
		var mouseComponent = mouse.mouse;

		mouseComponent.onMouseDown.call({components : mouse, id : Game.mouseController.entity});
		mouseComponent.clicked = true;

        e.preventDefault();
	}
	var unClickOnCanvas = function(e){
		var mouse = Game.mouseController.components;
		var mouseComponent = mouse.mouse;

		mouseComponent.onMouseUp.call({components : mouse, id : Game.mouseController.entity});
		mouseComponent.clicked = false;

        e.preventDefault();
	}

    var canvas = document.getElementById("canvas");
    canvas.width = constants.PAINTWIDTH;
    canvas.height = constants.PAINTHEIGHT;

	return {
		mouseup : unClickOnCanvas,
		mousedown : clickOnCanvas,
		mousemove : moveOnCanvas,
		canvas : canvas,
	}
});