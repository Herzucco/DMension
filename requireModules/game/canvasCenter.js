define(["../puppets/puppets", "./canvas/canvasDimensionCreator", "./canvas/canvasCreator", "./mouseInitializer"], function(Puppets, CanvasDimensionCreator, CanvasCreator, Mouse){
	var mainCanvas, firstDimension;
	// function plot8(x0, y0, x, y, alpha, width, data) {
	// 	line(x0 - x, x0 + x, y0 + y, alpha, width, data);
	// 	line(x0 - x, x0 + x, y0 - y, alpha, width, data);
	// 	line(x0 - y, x0 + x, y0 + x, alpha, width, data);
	// 	line(x0 - y, x0 + y, y0 - x, alpha, width, data);
	// }

	// function line(x0, x1, y, alpha, width, data) {
	// 	var dx = x1 - x0;
	// 	for (var x = x0; x < x1; x += dx * 0.01) {
	// 		setPixel(x, y, alpha, width, data);
	// 	}
	// }

	// function setPixel(x, y, alpha, width, data) {
	// 	data[3 + ((x | 0) + (y | 0) * canvas.width) * 4 | 0] = alpha;
	// }

	// function circle(x0, y0, alpha, width, data, radius) {
	// 	var rs2 = radius * radius * 4,
	// 		ys2m1 = rs2 - 2 * radius + 1,
	// 		x = 0, y = radius, xs2 = 0, ysc2;

	// 	plot8(x0, y0, x, y, alpha, width, data);

	// 	while (x <= y) {
	// 		xs2 += 8 * x + 4;
	// 		x += 1;

	// 		ysc2 = rs2 - xs2;
	// 		if (ysc2 < ys2m1) {
	// 			ys2m1 = ys2m1 -= 8 * y + 4;
	// 			y -= 1;
	// 		}

	// 		plot8(x0, y0, x, y, alpha, width, data);
	// 	}
	// }
	var moveOnCanvas = function(e){
    	var position = Mouse.components.position;
		if(e.offsetX){
			position.x = e.offsetX;
			position.y = e.offsetY;
		}
		else if(e.layerX){
			position.x = e.layerX;
			position.y = e.layerY;
		}
		if( Mouse.components.mouse.clicked){
			var bufferCanvas = firstDimension.firstBuffer.components.canvasContext;
			bufferCanvas.data.colorData = bufferCanvas.context.getImageData(0, 0, bufferCanvas.canvas.width, bufferCanvas.canvas.height).data;
		}
    };
    var clickOnCanvas = function(e){
    	Mouse.components.mouse.onMouseDown.apply({components : Mouse.components, id : Mouse.entity});
    	Mouse.components.mouse.clicked = true;
    }
    var unClickOnCanvas = function(e){
    	Mouse.components.mouse.onMouseUp.apply({components : Mouse.components, id : Mouse.entity});
    	Mouse.components.mouse.clicked = false;

    	var bufferCanvas = firstDimension.firstBuffer.components.canvasContext;
		bufferCanvas.data.colorData = bufferCanvas.context.getImageData(0, 0, bufferCanvas.canvas.width, bufferCanvas.canvas.height).data;
    }
	var CanvasCenter = function(){
		mainCanvas = CanvasCreator({
			collection : "canvas",
			canvas : document.getElementById("canvas"),
			eventObject : {
				"mouseup" : unClickOnCanvas,
				"mousedown" : clickOnCanvas,
				"mousemove" : moveOnCanvas
			}
		});

		var firstBuffer = CanvasCreator({
			collection : "canvas",
			canvas : document.getElementById("buffer")
		});
		firstDimension = CanvasDimensionCreator({
			collection : "canvas",
			size : {
				width : mainCanvas.components.canvasContext.canvas.width,
				height : mainCanvas.components.canvasContext.canvas.height,
			},
			buffer : firstBuffer.components.canvasContext,
			stencil : mainCanvas.components.canvasContext
		});
		firstDimension.firstBuffer = firstBuffer;

		Mouse = Mouse(mainCanvas.components.canvasContext.canvas, firstDimension.firstBuffer.components.canvasContext.context);
		return {
			mainCanvas : mainCanvas,
			firstDimension : firstDimension,
			mouse : Mouse
		}
	};

	return CanvasCenter;
});