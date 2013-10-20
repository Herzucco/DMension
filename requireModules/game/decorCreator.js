define(["../puppets/puppets"], function(Puppets){
	var DecorCreator = function(config){
		Puppets.createEntity("box", {
			position : {
				x : 0,
				y : 0
			},
			size : {
				width : canvas.width,
				height : canvas.height
			},
			renderBox : {
				color : "black",
				context : config.context
			}
		});
		Puppets.createEntity("simpleBox2dBox", {
			renderBox : {
				color : "blue",
				context : contextFirstDimension
			},
			b2polygon : {
				world : world,
				width : 100/SCALE/2,
				dynamic : false,
				x : (canvas.width/2)/SCALE+(100/SCALE/2),
				y : (canvas.height/2+100)/SCALE+(100/SCALE/2),
				height : 100/SCALE/2
			}
		});
		// Puppets.addComponent(3, "clickable", {mouse : Puppets.getComponents(mouse)[0], onMouseDown : function(mouse){
		// 	this.components.renderBox.color = "red";
		// 	Puppets.addComponent(this.id, "draged", {mouse : mouse,
		// 		relativeX : -(mouse.position.x - this.components.position.x),
		// 		relativeY : -(mouse.position.y - this.components.position.y)
		// 	});
		// },onMouseUp : function(mouse){
		// 	this.components.renderBox.color = "blue";
		// 	Puppets.removeComponent(this.id, "draged");
		// }});
		var box = Puppets.createEntity("simpleBox2dBox", {b2polygon : {world : world,
										x :canvas.width/2/SCALE,
										y :canvas.height/2/SCALE,
										width : 10/SCALE,
										dynamic : true,
										height : 10/SCALE},
										renderBox : {
											color : "red",
											context : ctx
										}});
		Puppets.addComponent(box, "colorColliderBox", {tag : "redBox",
			onColorCollisionEnter : function(colorInformations){
			this.components.renderBox.color = "yellow";
		},
		onColorCollisionExit : function(){
			this.components.renderBox.color = "red";
		}, colorAccuracy : 5});
		Puppets.addComponent(box, "b2listener", {
			world : world,
			preSolve : function(contact, manifold){
				var t = new Box2D.Collision.b2WorldManifold();
				contact.GetWorldManifold(t)
				
				var entities = [ contact.GetFixtureA().GetBody().GetUserData().entity, contact.GetFixtureB().GetBody().GetUserData().entity ];
				var componentsA = Puppets.getComponents(entities[0])[0];
				var componentsB = Puppets.getComponents(entities[1])[0];
				if(!componentsA.hasOwnProperty("canvasContext") && !componentsB.hasOwnProperty("canvasContext"))
					return;
				else{
					if(componentsA.hasOwnProperty("canvasContext")){
						var player = componentsA;
						var other = componentsB;
						var position = {x : t.m_points[1].x*SCALE >> 0, y : t.m_points[1].y*SCALE >> 0};
					}
					else{
						var player = componentsB;
						var other = componentsA;
						var position = {x : t.m_points[0].x*SCALE >>0, y : t.m_points[0].y*SCALE >> 0};
					}

					var color = getColorAt(position, canvas.width, dataBuffer.colorData);
					if(!player.colorColliderBox.colorColliding || (color === null || (!color.r && !color.g && !color.b)))
						contact.SetEnabled( false );
				}
			}
		});
		Puppets.addComponent(box, "canvasContext", Puppets.getComponents(buffer)[0].canvasContext);
		
		// Puppets.addComponent(6, "clickable", {mouse : Puppets.getComponents(mouse)[0], onMouseDown : function(mouse){
		// 	this.components.renderBox.color = "green";
		// }});
		// Puppets.createEntity("simpleBox2dBox", {b2polygon : {world : world,
		// 									x : 200/SCALE,
		// 									y : canvas.height/2/SCALE-10,
		// 									width : 100/SCALE,
		// 									dynamic : true,
		// 									height : 10/SCALE},
		// 									renderBox : {
		// 										color : "red",
		// 										context : ctx
		// 									}});
		// Puppets.addComponent(7, "colliderBox", {tag : "redBox",
		// 	onColorCollisionEnter : function(colorInformations){
		// 	this.components.renderBox.color = "yellow";
		// },
		// onColorCollisionExit : function(){
		// 	this.components.renderBox.color = "red";
		// }, colorAccuracy : 5});
		// Puppets.addComponent(7, "b2listener", {
		// 	world : world,
		// 	preSolve : function(contact){
		// 		var entities = [ contact.GetFixtureA().GetBody().GetUserData().entity, contact.GetFixtureB().GetBody().GetUserData().entity ];
		// 		var componentsA = Puppets.getComponents(entities[0])[0];
		// 		var componentsB = Puppets.getComponents(entities[1])[0];
		// 		if(!componentsA.hasOwnProperty("canvasContext") && !componentsB.hasOwnProperty("canvasContext"))
		// 			return;
		// 		else{
		// 			if(componentsA.hasOwnProperty("canvasContext")){
		// 				var player = componentsA;
		// 				var other = componentsB;
		// 			}
		// 			else{
		// 				var player = componentsB;
		// 				var other = componentsA;
		// 			}
		// 			if(!player.colliderBox.colorColliding)
		// 				contact.SetEnabled( false );
		// 		}
		// 	}
		// });
		// Puppets.addComponent(7, "canvasContext", Puppets.getComponents(buffer)[0].canvasContext);
		Puppets.createEntity("simpleBox2dBox", {b2polygon : {world : world,
											x : 0,
											y : (canvas.height/SCALE)-1,
											width : canvas.width/SCALE,
											restitution : 1,
											height : 10/SCALE},
											renderBox : {
												color : "red",
												context : contextFirstDimension
											}});

	}
});