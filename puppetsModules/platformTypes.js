define(["../loader/libraries/box2d", "../loader/libraries/puppets"], function(Box2D, Puppets){
	Puppets.component("deathBox", function(data, entity, undefined){
		return {};
	});
	Puppets.component("crossableBox", function(data, entity, undefined){
		return {};
	});
	Puppets.component("collisionReaction", function(data, entity, undefined){
		return {
			tag : data.tag || "untagged",
			onCollision : data.onCollision || function(){},
			onPreSolve : data.onPreSolve || function(){}
		};
	})
});


