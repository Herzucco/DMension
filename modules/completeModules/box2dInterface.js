;(function(undefined){
	Puppets.load("modules/completeModules/box2dPuppet.js");
	Puppets.load("modules/completeModules/boxRendering.js");
	Puppets.entity("simpleBox2dBox", {components : [
			"b2polygon",
			"size",
			"position",
			"rotation",
			"renderBox"
		]});
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
})();