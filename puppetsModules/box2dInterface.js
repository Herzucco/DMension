define(["../loader/libraries/puppets", "./box2dPuppet", "./boxRendering"], function(Puppets){
	Puppets.entity("simpleBox2dBox", {components : [
			"b2polygon",
			"size",
			"position",
			"rotation"
		]});
	Puppets.entity("simpleBox2dImageCircle", {components : [
			"b2circle",
			"size",
			"position",
			"rotation",
			"renderImage"
		]});
	Puppets.entity("simpleBox2dCircle", {components : [
			"b2circle",
			"radius",
			"position",
			"rotation",
			"renderCircle"
		]});
	Puppets.component("b2reverseGravity", function(data, entity){
		return {
			speed : data.speed || 0,
		};
	});
	Puppets.component("b2accelerate", function(data, entity){
		return {
			speed : data.speed || 0
		};
	});
    Puppets.component("BODYTODESTROY", function(data, entity){
        return {
            entity : entity
        };
    });
    Puppets.system("destroyBody", function(b2polygon, BODYTODESTROY, entity){
        var body = b2polygon.body;
        var world = b2polygon.world;

        world.DestroyBody(body);
        Puppets.removeComponent(entity, "BODYTODESTROY");
        Puppets.removeComponent(entity, "b2polygon");
    }, {components : ["b2polygon", "BODYTODESTROY"]});

	Puppets.system("reverseGravity", function(b2reverseGravity,b2polygon){
		var body = b2polygon.body;

		var antiGravity = {x : 0.0, y : b2reverseGravity.speed*body.GetMass()};
        body.ApplyForce(antiGravity,body.GetWorldCenter());
	}, {components : ["b2reverseGravity", "b2polygon"]});


	Puppets.system("accelerateBody", function(b2accelerate,b2polygon){
		var body = b2polygon.body;
		var velocity = body.GetLinearVelocity();

		var boost = {x : b2accelerate.speed, y : 0.0};
        body.ApplyForce(boost,body.GetWorldCenter());
	}, {components : ["b2accelerate", "b2polygon"]});
	Puppets.system("adaptBox", function(size, position, rotation, b2polygon){
		var body = b2polygon.body;
		var b2position = body.GetPosition();
		var b2size = body.GetUserData();
		var b2angle = body.GetAngle();

		size.width = b2size.width*SCALE*2;
		size.height= b2size.height*SCALE*2;

		rotation.x = b2position.x*SCALE;	
		rotation.y = b2position.y*SCALE;
		rotation.angle = b2angle;

		if(b2polygon.priorityOnPosition)
		{
			position.x = rotation.x - b2size.width*SCALE;
			position.y = rotation.y - b2size.height*SCALE;
		}
		else{
			body.SetPosition({x : position.x/SCALE+(size.width/SCALE/2), y : position.y/SCALE+(size.height/SCALE/2)});
		}
	}, {components : ["size", "position", "rotation", "b2polygon"]});
});