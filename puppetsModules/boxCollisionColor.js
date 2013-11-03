define(["../loader/libraries/puppets", "./DOMmodule"], function(Puppets){
	Puppets.component("colorColliderBox", function(data, entity){
		var component =  {
			tag : data.tag || "",
			layers : data.layers || [],
			currentColor : {},
			onColorCollisionEnter: data.onColorCollisionEnter || function(colorInformations){

			},
			onColorCollisionExit: data.onColorCollisionExit || function(){

			},
			colorColliding : data.colorColliding || false,
			x : data.x || 0,
			y : data.y || 0,
			relativeX : data.relativeX || 0,
			relativeY : data.relativeY || 0,
			width : data.width || 0,
			height : data.height || 0,
			relativeWidth : data.relativeWidth || 0,
			relativeHeight : data.relativeHeight || 0,
			colorAccuracy : data.colorAccuracy || 1,
			center : {},
			testWidth : data.testWidth || 0,
			data : data.data || []
		}
		component.center.x = component.x +component.width/2;
		component.center.y = component.y +component.height/2;
		return component;
	});

	Puppets.system("updateColorColliderBox", function(position, size, colorColliderBox){
		colorColliderBox.x = colorColliderBox.relativeX + position.x;
		colorColliderBox.y = colorColliderBox.relativeY + position.y;

		colorColliderBox.width = colorColliderBox.relativeWidth + size.width;
		colorColliderBox.height = colorColliderBox.relativeHeight + size.height;
	}, {components : ["position", "size", "colorColliderBox"]});

	Puppets.system("checkColorCollision", function(colorColliderBox, entity){
		var components = Puppets.getComponents(entity)[0];
		var cameraPosition = components.renderBox.cameraPosition || {x : 0, y : 0};
		var testWidth = colorColliderBox.testWidth;
		var data = colorColliderBox.data;
		var i, o, iWidth, iHeight;

		iWidth = colorColliderBox.x+ colorColliderBox.width;
		iHeight = colorColliderBox.y + colorColliderBox.height;
		for(i = colorColliderBox.x >> 0; i < iWidth; i+=colorColliderBox.colorAccuracy){
			for(o = colorColliderBox.y >> 0; o < iHeight; o+=colorColliderBox.colorAccuracy){
				var color = this.getColorAt({x : i , y : o}, testWidth, data);
				if(color !== null && (color.r || color.g || color.b)){
					if(color.r !== colorColliderBox.currentColor.r || 
						color.g !== colorColliderBox.currentColor.g || 
						color.b !== colorColliderBox.currentColor.b){
						colorColliderBox.onColorCollisionExit.apply({ components : Puppets.getComponents(entity)[0], id : entity}, [colorColliderBox.currentColor]);
						colorColliderBox.colorColliding = false;
					}
					colorColliderBox.currentColor = color;

					if(!colorColliderBox.colorColliding)
						colorColliderBox.onColorCollisionEnter.apply({ components : components, id : entity}, [color]);

					colorColliderBox.colorColliding = true;
					return;
				}
			}
		};
		if(colorColliderBox.colorColliding){
			colorColliderBox.colorColliding = false;
			colorColliderBox.onColorCollisionExit.apply({ components : Puppets.getComponents(entity)[0], id : entity}, [colorColliderBox.currentColor]);
		}
	}, {
		components : ["colorColliderBox"], 
		getColorAt : function(position, width, data){
			var index = ((position.x | 0) + (position.y | 0) * width);

	    	if (data === null || index < 0 || index >= data.length)
	        	return null;


	    	return {index:index, r:data[index] >> 24 & 0xff,g:data[index] >> 16 & 0xff,b:data[index] >> 8 & 0xff,a:data[index] & 0xff};
		},
		delay : 2
	}
	);
});