define(["../loader/libraries/puppets", "./baseComponents"], function(Puppets){
	Puppets.entity("circle", {components : [
			"radius",
			"position",
			"renderCircle"
		]});

	Puppets.component("radius", function(data, entity){
		return {radius : data.radius || 0, circumference : 2};
	});
	Puppets.component("renderCircle", function(data, entity, undefined){
		return {canvas : data.canvas || document.createElement("canvas"), cameraPosition : data.cameraPosition || {x : 0, y : 0},
		context : data.context || null, color : data.color || "black", clip : data.clip || false, PIXELS_ARRAY : data.PIXELS_ARRAY || null,
		isLittleEndian : data.isLittleEndian || false}
	});


	Puppets.system("RenderCircle", function renderCircle(radius, position, renderCircle, entity){
		if(renderCircle.context !== null)
		{
			var context = renderCircle.context;
			var color = renderCircle.color;
			var cameraPosition = renderCircle.cameraPosition;
			var rotation = Puppets.getComponents(entity)[0].rotation;

			context.save();
			context.beginPath();
			

			if(rotation !== undefined)
			{
				context.translate(rotation.x,rotation.y);
				context.rotate(rotation.angle);
				context.arc(0, 0, radius.radius, 0, radius.circumference * Math.PI, false);	
			}
			else
				context.arc(position.x+ cameraPosition.x, position.y+ cameraPosition.y, radius.radius, 0, radius.circumference * Math.PI, false);

			if(renderCircle.clip){
				context.clip();
				context.clearRect(cameraPosition.x, cameraPosition.y, renderCircle.canvas.width, renderCircle.canvas.height);
				if(renderCircle.PIXELS_ARRAY !== null)
				{
					var colors = this.getColors('rgba(0,0,0,0)');
                    if(Math.random()*2>1){
                        this.circle(position.x+ cameraPosition.x, position.y+ cameraPosition.y,
                        colors[0], colors[1], colors[2], colors[3], 
                        3200, renderCircle.PIXELS_ARRAY,  radius.radius, renderCircle.isLittleEndian, true);
                    }
				}
			}
			else if(!renderCircle.canNotPaint){
				context.fillStyle = color;
				context.fill();
				if(renderCircle.PIXELS_ARRAY !== null)
				{
					var colors = this.getColors(color);
                    if(Math.random()*4>3){
                        this.circle(position.x+ cameraPosition.x, position.y+ cameraPosition.y,
                        colors[0], colors[1], colors[2], colors[3],
                        3200, renderCircle.PIXELS_ARRAY, radius.radius, renderCircle.isLittleEndian, false);
                    }
				}
			}
			context.restore();
		}
	},{
		components : ["radius", "position", "renderCircle"],
		plot8 : function(x0, y0, x, y, red, green, blue, alpha, width, data, littleEndian, erase) {
		    this.line(x0 - x, x0 + x, y0 + y, red, green, blue, alpha, width, data, littleEndian, erase);
		    this.line(x0 - x, x0 + x, y0 - y, red, green, blue, alpha, width, data, littleEndian, erase);
		    this.line(x0 - y, x0 + x, y0 + x, red, green, blue, alpha, width, data, littleEndian, erase);
		    this.line(x0 - y, x0 + y, y0 - x, red, green, blue, alpha, width, data, littleEndian, erase);
		},
		line : function(x0, x1, y, red, green, blue, alpha, width, data, littleEndian, erase) {
		    var dx = x1 - x0;
		    for (var x = x0; x < x1; x += dx * 0.01) {
		      this.setPixel(x, y, red, green, blue, alpha, width, data, littleEndian, erase);
			}
		},

		setPixel : function(x, y, red, green, blue, alpha, width, data, littleEndian, erase) {
			data[((x | 0) + (y | 0) * width)] = red << 24 | green << 16 | blue << 8 | alpha;
            Game.observer.trigger("pixelsChanged", [((x | 0) + (y | 0) * width), erase])
		},

		circle : function(x0, y0, red, green, blue,  alpha, width, data, radius, littleEndian, erase) {
			var rs2 = radius * radius * 4,
			ys2m1 = rs2 - 2 * radius + 1,
			x = 0, y = radius, xs2 = 0, ysc2;

			this.plot8(x0, y0, x, y, red, green, blue, alpha, width, data, littleEndian, erase);
			while (x <= y) {
				xs2 += 8 * x + 4;
				x += 1;

				ycs2 = rs2 - xs2;
				if (ycs2 < ys2m1) {
					ys2m1 = ys2m1 -= 8 * y + 4;
					y -= 1;
				}

				this.plot8(x0, y0, x, y, red, green, blue, alpha, width, data, littleEndian, erase);
			}
		},

		getColors : function(colorString){
			return colorString.substring(5, colorString.length-1).replace(/ /g, '').split(',');
		},
	});
});