define(["../loader/libraries/puppets"], function(Puppets){
	Puppets.component("size", function(data, entity, undefined){
		return {width : data.width || 0, height : data.height || 0};
	});
	Puppets.component("position", function(data, entity, undefined){
		return {x : data.x || 0, y : data.y || 0};
	});
	Puppets.component("rotation", function(data, entity, undefined){
		return {angle : data.angle || 0, x : data.x || 0, y : data.y || 0}
	});
    Puppets.component("velocity", function(data, entity, undefined){
        return {x : data.x || 0, y : data.y || 0}
    });
});