define(["../loader/libraries/puppets"], function(Puppets){
    Puppets.entity("empty", {components : []});
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
    Puppets.component("delay", function(data){
        return {
            delay : data.delay || 0,
            count : 0,
            onEnd : data.onEnd || function(){}
        }
    });
    Puppets.system("delayCount", function(delay, entity){
        delay.count++;
        if(delay.count/60 >= delay.delay){
            var onEnd = delay.onEnd;
            Puppets.removeComponent(entity, "delay");
            onEnd.call({
                entity : entity,
                components : Puppets.getComponents(entity)[0]
            });
        }
    }, {components : ["delay"]});
});