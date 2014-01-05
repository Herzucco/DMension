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
    Puppets.component("childEntity", function(data){
        return {
            parent : data.parent,
            parentEntity : data.parentEntity
        }
    });
    Puppets.component("parentEntity", function(data){
        return {
            child : data.child,
            childEntity : data.childEntity
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
    Puppets.system("updatePositionParent", function(childEntity, position){
        position.x = childEntity.parent.position.x;
        position.y = childEntity.parent.position.y;
    }, {components : ["childEntity", "position"]});
    Puppets.system("updateSizeParent", function(childEntity, size){
        size.width = childEntity.parent.size.width;
        size.height = childEntity.parent.size.height;
    }, {components : ["childEntity", "size"]});
    Puppets.system("updateRotationParent", function(childEntity, rotation){
        rotation.x = childEntity.parent.rotation.x;
        rotation.y = childEntity.parent.rotation.y;
        rotation.angle = childEntity.parent.rotation.angle;
    }, {components : ["childEntity", "rotation"]});
});