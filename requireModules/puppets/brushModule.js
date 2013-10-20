define(["./puppets"], function(Puppets){
	Puppets.component("contextStencil", function(data, entity){
		var component = {
			buffer : data.buffer || document.createElement("canvas"),
			stencil : data.stencil || null,
		}

		return component;
	});

	Puppets.system("drawOnStencil", function(contextCanvas, contextStencil){
		contextCanvas.context.globalCompositeOperation = 'destination-in';
		contextCanvas.context.drawImage(contextStencil.buffer, 0, 0, contextStencil.buffer.width, contextStencil.buffer.height);
		contextStencil.stencil.drawImage(contextCanvas.canvas, 0, 0, contextStencil.buffer.width, contextStencil.buffer.height);
	}, {components : ["canvasContext", "contextStencil"]})
});