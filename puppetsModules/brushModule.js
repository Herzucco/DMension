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
		var lastCameraPosition = contextStencil.lastCameraPosition;
		contextCanvas.context.translate(lastCameraPosition.x - cameraPosition.x, lastCameraPosition.y - cameraPosition.y);

		contextCanvas.context.globalCompositeOperation = 'destination-in';
		contextCanvas.context.drawImage(contextStencil.buffer, -cameraPosition.x, -cameraPosition.y, contextStencil.buffer.width, contextStencil.buffer.height);
		contextStencil.stencil.drawImage(contextCanvas.canvas, -cameraPosition.x, -cameraPosition.y, contextStencil.buffer.width, contextStencil.buffer.height);

		lastCameraPosition.x = cameraPosition.x;
		lastCameraPosition.y = cameraPosition.y;
	}, {components : ["canvasContext", "contextStencil"]})
});