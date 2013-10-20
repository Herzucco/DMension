(function(undefined){
	Puppets.load("libs/Vectors.js");
	Puppets.component("colliderBox", function(data, entity){
		var component =  {
			tag : data.tag || "",
			layers : data.layers || [],
			onCollision : data.onCollision || function(other){
			},
			colliding : data.colorColliding || false,
			x : data.x || 0,
			y : data.y || 0,
			relativeX : data.relativeX || 0,
			relativeY : data.relativeY || 0,
			width : data.width || 0,
			height : data.height || 0,
			relativeWidth : data.relativeWidth || 0,
			relativeHeight : data.relativeHeight || 0,
			center : {}
		}
		component.center.x = component.x +component.width/2;
		component.center.y = component.y +component.height/2;
		return component;
	});


	Puppets.system("updateColliderBox", function(position, size, colliderBox){
		colliderBox.x = colliderBox.relativeX + position.x;
		colliderBox.y = colliderBox.relativeY + position.y;

		colliderBox.width = colliderBox.relativeWidth + size.width;
		colliderBox.height = colliderBox.relativeHeight + size.height;

		colliderBox.center.x = colliderBox.x +colliderBox.width/2;
		colliderBox.center.y = colliderBox.y +colliderBox.height/2;
	}, {components : ["position", "size", "colliderBox"]});

	Puppets.system("checkCollidersBox", function(colliderBox, entity){
		var entityWithCollider = Puppets.find("colliderBox");
		var length = entityWithCollider.length;
		var i = 0;
		for(i = 0; i < length; i++){
			if(entityWithCollider[i] == entity)
				continue;

			var components = Puppets.getComponents(entityWithCollider[i])[0];
			var otherColliderBox = components.colliderBox;

			if(colliderBox.layers.indexOf(otherColliderBox.tag) > 0)
				continue;
			var distance = {
				x : Math.abs(colliderBox.center.x - otherColliderBox.center.x),
				y : Math.abs(colliderBox.center.y - otherColliderBox.center.y)
			};
			var somme    = {
				x : colliderBox.width / 2 + otherColliderBox.width / 2,
				y : colliderBox.height / 2 + otherColliderBox.height / 2
			}
			var overlap = Vectors.sub(somme, distance);
			if(overlap.x > 0 && overlap.y > 0)
			{
				colliderBox.colliding = true;
				colliderBox.onCollision.apply({ components : Puppets.getComponents(entity)[0], id : entity},
											[{ components : components, id : entityWithCollider[i]}]);
			}
			else
				colliderBox.colliding = true;
		}
	}, {components : ["colliderBox"]});
})();