define(["../loader/libraries/puppets"], function(Puppets){
	Puppets.component("contextStencil", function(data, entity){
		var component = {
			buffer : data.buffer || document.createElement("canvas"),
			stencil : data.stencil || null,
			cameraPosition : data.cameraPosition || {x : 0, y : 0},
			lastCameraPosition : {x : 0, y : 0}
		}

		return component;
	});

	Puppets.system("drawOnStencil", function(contextCanvas, contextStencil){
		var cameraPosition = contextStencil.cameraPosition;
		var WIDTH = contextStencil.buffer.width;
		var HEIGHT = contextStencil.buffer.height;

		contextCanvas.context.globalCompositeOperation = 'destination-in';
		contextCanvas.context.drawImage(contextStencil.buffer, cameraPosition.x, cameraPosition.y,
										 WIDTH, HEIGHT,
										 0, 0, WIDTH, HEIGHT);

		contextStencil.stencil.drawImage(contextCanvas.canvas, 0, 0,
										 WIDTH, HEIGHT);

	}, {components : ["canvasContext", "contextStencil"]})
});