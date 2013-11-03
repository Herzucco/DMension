define(["../loader/libraries/puppets", "./baseComponents"], function(Puppets){
	Puppets.component("target", function(data, entity){
		console.log(data);
		return {
			position : data.position || {
				x : 0,
				y : 0
			},
			maxRelativeX : data.maxRelativeX || 0,
			maxRelativeY : data.maxRelativeY || 0,
			minRelativeX : data.minRelativeX || 0,
			minRelativeY : data.minRelativeY || 0,
			minX : data.minX,
			minY : data.minY,
			maxX : data.maxX,
			maxY : data.maxY
		}
	});

	Puppets.component("focus", function(data, entity){
		return {
			zoom : data.zoom || 1,
		}
	});

	Puppets.entity("camera", {components : [
			"size",
			"position",
			"target",
			"focus"
	]});

	Puppets.system("updateCameraPosition", function(position, target, size){
		var center = {
			x : position.x + (size.width/2),
			y : position.y + (size.height/2)
		};
		var offset = {
			x : target.position.x - center.x,
			y : target.position.y - center.y
		};

		if(offset.x < 0 && offset.x <= target.minRelativeX)
			position.x += offset.x - target.minRelativeX;
		else if(offset.x > 0 && offset.x >= target.maxRelativeX)
			position.x += offset.x - target.maxRelativeX;

		if(offset.y < 0 && offset.y <= target.minRelativeY)
			position.y += offset.y - target.minRelativeY;
		else if(offset.y > 0 && offset.y >= target.maxRelativeY)
			position.y += offset.y - target.maxRelativeY;
			
		if(target.minX !== undefined && target.minX > position.x)
			position.x = target.minX;
		else if(target.maxX !== undefined && target.maxX < position.x)
			position.x = target.maxX;

		if(target.minY !== undefined && target.minY > position.y)
			position.y = target.minY;
		else if(target.maxY !== undefined && target.maxY < position.y)
			position.y = target.maxY;

	}, {components : ["position", "target", "size"]});
});