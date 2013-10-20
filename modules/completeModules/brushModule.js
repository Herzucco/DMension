;(function(undefined){
	Puppets.component("contextStencil", function(data, entity){
		var component = {
			buffer : data.buffer || document.createElement("canvas"),
			stencil : data.stencil || null,
			data : data.data || {
				colorData : null
			},
			accuracy : data.accuracy || 1
		}
		component.bufferContext = component.buffer.getContext("2d");
		return component;
	});

	// Puppets.system("getDrawOnStencil", function(contextCanvas, contextStencil){
	// 	var i, o, length, emptyData;
	// 	emptyData = contextStencil.bufferContext.createImageData(contextStencil.buffer.width, contextStencil.buffer.height);
	// 	if(contextStencil.data.colorData !== null){
	// 		length = contextStencil.data.colorData.length;
	// 		for(i = 0; i < length; i+= contextStencil.accuracy*4){
	// 			if(contextStencil.data.colorData[i] || contextStencil.data.colorData[i+1] || contextStencil.data.colorData[i+2])
	// 			{
	// 				for(o = 0; o <= (contextStencil.accuracy-1)*4; o += 4 ){
	// 					emptyData.data[i+o] = contextCanvas.data.colorData[i+o];
	// 					emptyData.data[i+o+1] = contextCanvas.data.colorData[i+o+1];
	// 					emptyData.data[i+o+2] = contextCanvas.data.colorData[i+o+2];
	// 					emptyData.data[i+o+3] = contextCanvas.data.colorData[i+o+3];
	// 				}
	// 			};
	// 		};
	// 		contextStencil.bufferContext.putImageData(emptyData, 0, 0);
	// 	}
	// }, {components : ["canvasContext", "contextStencil"],
	// 	delay : 3});

	Puppets.system("drawOnStencil", function(contextCanvas, contextStencil){
		contextCanvas.context.globalCompositeOperation = 'destination-in';
		contextCanvas.context.drawImage(contextStencil.buffer, 0, 0, contextStencil.buffer.width, contextStencil.buffer.height);
		contextStencil.stencil.drawImage(contextCanvas.canvas, 0, 0, contextStencil.buffer.width, contextStencil.buffer.height);
	}, {components : ["canvasContext", "contextStencil"]})
})();