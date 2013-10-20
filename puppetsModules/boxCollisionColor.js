define(["../loader/libraries/puppets", "./DOMmodule"], function(Puppets){
	Puppets.component("colorColliderBox", function(data, entity){
		var component =  {
			tag : data.tag || "",
			layers : data.layers || [],
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
			center : {}
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

	Puppets.system("checkColorCollision", function(colorColliderBox, canvasContext, entity){
		var components = Puppets.getComponents(entity)[0];
		var cameraPosition = components.renderBox.cameraPosition || {x : 0, y : 0};
		var i, o, iWidth, iHeight;
		var renderPositionX = colorColliderBox.x - cameraPosition.x; 
		var renderPositionY = colorColliderBox.y - cameraPosition.y; 
		iWidth = renderPositionX+ colorColliderBox.width;
		iHeight = renderPositionY + colorColliderBox.height;
		for(i = renderPositionX >> 0; i < iWidth; i+=colorColliderBox.colorAccuracy){
			for(o = renderPositionY >> 0; o < iHeight; o+=colorColliderBox.colorAccuracy){
				var color = this.getColorAt({x : i, y : o}, canvasContext.canvas.width, canvasContext.data.colorData);
				if(color !== null && (color.r || color.g || color.b)){
					colorColliderBox.colorColliding = true;
					colorColliderBox.onColorCollisionEnter.apply({ components : components, id : entity}, [color]);
					return;
				}
			}
		};
		if(colorColliderBox.colorColliding){
			colorColliderBox.colorColliding = false;
			colorColliderBox.onColorCollisionExit.apply({ components : Puppets.getComponents(entity)[0], id : entity});
		}
	}, {
		components : ["colorColliderBox", "canvasContext"], 
		getColorAt : function(position, width, data){
			var index = (width * 4 * position.y ) + (position.x * 4);

	    	if (data === null || index < 0 || index >= data.length)
	        	return null;


	    	return {index:index, r:data[index],g:data[index+1],b:data[index+2],a:data[index+3]};
		},
		delay : 2
	}
	);
});