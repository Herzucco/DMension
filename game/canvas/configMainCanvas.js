define(["../game", "../constants"],
 function(Game, constants){

    function leapToScene( leapPosition, leapScalar ) {
      var canvasPos = [ 0, 0 ];
      canvasPos[0] = 1268/2 + (leapPosition[0]*2);
      canvasPos[1] = 768*1.3  - (leapPosition[1]*2);
      return canvasPos;
    };

    var controller = new Leap.Controller();

    controller.on('connect', function() {
      console.log("Successfully connected.");
    });

    controller.on('deviceConnected', function() {
      console.log("A Leap device has been connected.");
    });

    controller.on('deviceDisconnected', function() {
      console.log("A Leap device has been disconnected.");
    });

    controller.connect();

    controller.on( 'frame', function( frame ) {
        var mouse = Game.mouseController.components;
        var mouseComponent = mouse.mouse;
        if(frame.pointables.length > 0){
            var finger = frame.pointables[0];
            var leapPosition = leapToScene( finger.tipPosition );
            var position = mouse.position;
            position.x = leapPosition[0];
            position.y = leapPosition[1];
        }
        if(frame.pointables.length > 3) {
            mouseComponent.onMouseDown.call({components : mouse, id : Game.mouseController.entity});
            mouseComponent.clicked = true;
        }
        else{
            mouseComponent.onMouseUp.call({components : mouse, id : Game.mouseController.entity});
            mouseComponent.clicked = false;
        }
    });

	var moveOnCanvas = function(e){
		var mouse = Game.mouseController.components;
    	var position = mouse.position;

		if(e.offsetX){
			position.x = e.offsetX;
			position.y = e.offsetY;
		}
		else if(e.layerX){
			position.x = e.layerX;
			position.y = e.layerY;
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