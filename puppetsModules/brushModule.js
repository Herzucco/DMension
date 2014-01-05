define(["../loader/libraries/puppets"], function(Puppets){
	Puppets.component("contextStencil", function(data, entity){
		var component = {
			buffer : data.buffer || document.createElement("canvas"),
			stencil : data.stencil || null,
			cameraPosition : data.cameraPosition || {x : 0, y : 0},
			lastCameraPosition : {x : 0, y : 0},
            type : data.type || "color"
		}

		return component;
	});

    Puppets.component("phase", function(data, entity){
        var component = {
            defaultPhase : data.defaultPhase || "phase",
            currentPhase : data.currentPhase || data.defaultPhase || "phase"
        }

        return component;
    });

	Puppets.system("drawStencil", function(canvasContext, contextStencil){
		var cameraPosition = contextStencil.cameraPosition;
		var WIDTH = canvasContext.canvas.width;
		var HEIGHT = canvasContext.canvas.height;

        if(contextStencil.type === "color"){
            contextStencil.stencil.globalAlpha = 0.5;
            contextStencil.stencil.drawImage(contextStencil.buffer, cameraPosition.x, cameraPosition.y,
                                            WIDTH, HEIGHT,
                                            0, 0, WIDTH, HEIGHT);
            contextStencil.stencil.globalAlpha = 1;
        }
        else if(contextStencil.type === "dimension"){
            canvasContext.context.globalCompositeOperation = 'destination-in';
            canvasContext.context.drawImage(contextStencil.buffer, cameraPosition.x, cameraPosition.y,
                                            WIDTH, HEIGHT,
                                            0, 0, WIDTH, HEIGHT);
            contextStencil.stencil.drawImage(canvasContext.canvas, 0, 0,
                                            WIDTH, HEIGHT,
                                            0, 0, WIDTH, HEIGHT);
        }
	}, {components : ["canvasContext", "contextStencil"]})
});