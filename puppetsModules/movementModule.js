define(["../loader/libraries/box2d", "../loader/libraries/puppets"], function(Box2D, Puppets){
	Puppets.system("applyVelocity", function(velocity, position, entity){
		position.x += velocity.x;
		position.y += velocity.y;
	}, {components : ['velocity', "position"]})
})