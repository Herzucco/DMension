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
			maxY : data.maxY,
			center : { x : 0, y : 0},
			offset : { x : 0, y : 0}
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
		target.center.x = position.x + (size.width/2);
		target.center.y = position.y + (size.height/2);
		target.offset.x = target.position.x - target.center.x;
		target.offset.y = target.position.y - target.center.y;

		if(target.offset.x < 0 && target.offset.x <= target.minRelativeX)
			position.x += (target.offset.x - target.minRelativeX) >> 0;
		else if(target.offset.x > 0 && target.offset.x >= target.maxRelativeX)
			position.x += (target.offset.x - target.maxRelativeX) >> 0;

		if(target.offset.y < 0 && target.offset.y <= target.minRelativeY)
			position.y += (target.offset.y - target.minRelativeY) >> 0;
		else if(target.offset.y > 0 && target.offset.y >= target.maxRelativeY)
			position.y += (target.offset.y - target.maxRelativeY) >> 0;
			
		if(target.minX !== undefined && target.minX > position.x)
			position.x = target.minX >> 0;
		else if(target.maxX !== undefined && target.maxX < position.x)
			position.x = target.maxX >> 0;

		if(target.minY !== undefined && target.minY > position.y)
			position.y = target.minY >> 0;
		else if(target.maxY !== undefined && target.maxY < position.y)
			position.y = target.maxY >> 0;

	}, {components : ["position", "target", "size"]});
});