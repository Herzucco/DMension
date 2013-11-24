define(["../../loader/libraries/puppets", "../game"], function(Puppets, Game){
	var getColorAt = function(position, width, data){
	var index = ((position.x | 0) + (position.y | 0) * width);

    	if (data === null || index < 0 || index >= data.length)
        	return null;


    	return {index:index, r:data[index] >> 24 ,g:data[index] >> 16,b:data[index] >> 8,a:data[index]};
	};
	var Level = function(config){
		
	}

	Level.prototype.init = function(){
		var canvasController = Game.canvasController;
		var mainCanvas = canvasController.mainCanvas.components;
		var firstDimensionCanvas = canvasController.firstDimension.components;
		var firstBufferCanvas = canvasController.firstDimension.drawPaint.components.canvasContext;

		var firstColorCanvas = canvasController.firstColor.components;
		var secondColorCanvas = canvasController.secondColor.components;
		var thirdColorCanvas = canvasController.thirdColor.components;
		var fourthColorCanvas = canvasController.fourthColor.components;
		

		var world = Game.worldController.world;

		var WIDTH = Game.constants.WIDTH;
		var HEIGHT = Game.constants.HEIGHT;

		var camera = Game.cameraController.components;
		var cameraPosition = camera.position;

		var PIXELS_ARRAY = Game.constants.PIXELS_ARRAY;
		var div = Puppets.createEntity("DOMElement", {
			DOMElement : {
				element : document.getElementById("pixelCounter")
			},
		});
		Game.observer.on("pixelsChanged", function(){
			
		}, Puppets.getComponents(div)[0]);

		Puppets.createEntity("box", {
			position : {
				x : 0,
				y : 0
			},
			size : {
				width : WIDTH,
				height : HEIGHT*2
			},
			renderBox : {
				color : "black",
				context : mainCanvas.canvasContext.context,
				cameraPosition : cameraPosition
			}
		}, "backgrounds");
		Puppets.createEntity("box", {
			position : {
				x : 0,
				y : 0
			},
			size : {
				width : WIDTH,
				height : HEIGHT*2
			},
			renderBox : {
				color : "rgba(255,0,0,0.5)",
				context : firstColorCanvas.canvasContext.context,
				cameraPosition : cameraPosition
			}
		}, "backgrounds");
		Puppets.createEntity("box", {
			position : {
				x : 0,
				y : 0
			},
			size : {
				width : WIDTH,
				height : HEIGHT*2
			},
			renderBox : {
				color : "rgba(0,255,0,0.5)",
				context : secondColorCanvas.canvasContext.context,
				cameraPosition : cameraPosition
			}
		}, "backgrounds");
		Puppets.createEntity("box", {
			position : {
				x : 0,
				y : 0
			},
			size : {
				width : WIDTH,
				height : HEIGHT*2
			},
			renderBox : {
				color : "rgba(0,0,255,0.5)",
				context : thirdColorCanvas.canvasContext.context,
				cameraPosition : cameraPosition
			}
		}, "backgrounds");
		Puppets.createEntity("box", {
			position : {
				x : 0,
				y : 0
			},
			size : {
				width : WIDTH,
				height : HEIGHT*2
			},
			renderBox : {
				color : "rgba(255,0,255,0.5)",
				context : fourthColorCanvas.canvasContext.context,
				cameraPosition : cameraPosition
			}
		}, "backgrounds");
		Puppets.createEntity("box", {
			position : {
				x : 0,
				y : 0
			},
			size : {
				width : WIDTH,
				height : HEIGHT*2
			},
			renderBox : {
				color : "white",
				context : firstDimensionCanvas.canvasContext.context,
				cameraPosition : cameraPosition
			}
		}, "backgrounds");
		var spikes = Puppets.createEntity("simpleBox2dBox", {b2polygon : {world : world,
											x : 0,
											y : (HEIGHT/SCALE)-1,
											width : 5,
											restitution : 0.2,
											friction : 0,
											height : 10/SCALE},
											renderBox : {
												color : "red",
												context : mainCanvas.canvasContext.context,
												cameraPosition : cameraPosition
											}});
		Puppets.addComponent(spikes, "crossableBox", {});
		Puppets.addComponent(spikes, "collisionReaction", {
			tag : "platform",
			onCollision : function(other){
				other
			}
		})
		Puppets.createEntity("simpleBox2dBox", {
			renderBox : {
				color : "blue",
				context : mainCanvas.canvasContext.context,
				cameraPosition : cameraPosition
			},
			b2polygon : {
				world : world,
				width : 100/SCALE/2,
				dynamic : false,
				x : 5,
				y : (HEIGHT/2+100)/SCALE+(100/SCALE/2),
				height : 100/SCALE/2
			}
		});
		Puppets.createEntity("simpleBox2dBox", {
			renderBox : {
				color : "blue",
				context : mainCanvas.canvasContext.context,
				cameraPosition : cameraPosition
			},
			b2polygon : {
				world : world,
				width : 100/SCALE/2,
				dynamic : false,
				x : 10,
				y : (HEIGHT/2+100)/SCALE+(100/SCALE/2),
				height : 100/SCALE/2
			}
		});
		Puppets.createEntity("simpleBox2dBox", {
			renderBox : {
				color : "blue",
				context : mainCanvas.canvasContext.context,
				cameraPosition : cameraPosition
			},
			b2polygon : {
				world : world,
				width : 100/SCALE/2,
				dynamic : false,
				x : 17,
				y : (HEIGHT/2+100)/SCALE+(100/SCALE/2),
				height : 100/SCALE/2
			}
		});
		var box = Puppets.createEntity("simpleBox2dBox", {b2polygon : {world : world,
										x :1,
										y :1,
										width : 10/SCALE,
										dynamic : true,
										friction : 0,
										fixedRotate : true,
										height : 10/SCALE},
										renderBox : {
											color : "red",
											context : mainCanvas.canvasContext.context,
											cameraPosition : cameraPosition
										}}, "dynamics");
		Puppets.addComponent(box, "colorColliderBox", {tag : "redBox", colorAccuracy : 5, onColorCollisionEnter : function(colors){
			if(colors.r === 255 && colors.g === 0 && colors.b === 0){
				Puppets.addComponent(this.id, "b2accelerate", { speed : -5});
			}
			else if(colors.g ===255 && colors.r === 0){
				Puppets.addComponent(this.id, "b2reverseGravity", { speed : -30 });
			}
			else if(colors.g ===0 && colors.b === 255 && colors.r === 0){
				Puppets.addComponent(this.id, "b2accelerate", {speed : 5});
			}	
			else if(colors.r === 255 && colors.g === 0 && colors.b === 255){
				Puppets.addComponent(this.id, "b2reverseGravity", { speed : 30});
			}
		},
		onColorCollisionExit : function(colors){
			Puppets.removeComponent(this.id, "b2reverseGravity");
			Puppets.removeComponent(this.id, "b2accelerate");	
		},
		testWidth : WIDTH,
		data : PIXELS_ARRAY
		});
		Puppets.addComponent(box, "collisionReaction", {
			tag : "player",
			onCollision : function(){console.log("playa")}
		})

		Game.observer.on("pressSpace", function(){
			var body = this.b2polygon.body;

			if(this.b2polygon.stopped){
				body.SetType(2);
				if(this.b2polygon.force){
					this.b2polygon.force = body.SetLinearVelocity(this.b2polygon.force);
				}
				this.b2polygon.stopped = false;
			}
			else{
				this.b2polygon.force = body.GetLinearVelocity();
				this.b2polygon.force = { x : this.b2polygon.force.x , y : this.b2polygon.force.y}
				body.SetType(0);
				this.b2polygon.stopped = true;
			}
		}, Puppets.getComponents(box)[0]);

		Puppets.addComponent(box, "b2listener", {
			world : world,
			preSolve : function(contact, manifold){
				var t = new Box2D.Collision.b2WorldManifold();
				contact.GetWorldManifold(t)
						
				var entities = [ contact.GetFixtureA().GetBody().GetUserData().entity, contact.GetFixtureB().GetBody().GetUserData().entity ];
				var componentsA = Puppets.getComponents(entities[0])[0];
				var componentsB = Puppets.getComponents(entities[1])[0];
				if(componentsA.hasOwnProperty("collisionReaction") && componentsB.hasOwnProperty("collisionReaction")){
					if((componentsA.collisionReaction.tag == "player" || componentsA.collisionReaction.tag == "collectible") && componentsB.collisionReaction.tag == "platform"){
						var player = componentsA;
						var platform = componentsB;
						var position = {x : t.m_points[1].x*SCALE >> 0, y : t.m_points[1].y*SCALE >> 0};
					}
					else if((componentsB.collisionReaction.tag == "player" || componentsB.collisionReaction.tag == "collectible") && componentsA.collisionReaction.tag == "platform"){
						var player = componentsB;
						var platform = componentsA;
						var position = {x : t.m_points[0].x*SCALE >>0, y : t.m_points[0].y*SCALE >> 0};
					}

					player.collisionReaction.onCollision(platform);
					platform.collisionReaction.onCollision(player);
		 		}
		 	}
		})

		// Puppets.addComponent(box, "b2listener", {
		// 	world : world,
		// 	preSolve : function(contact, manifold){
		// 		var t = new Box2D.Collision.b2WorldManifold();
		// 		contact.GetWorldManifold(t)
				
		// 		var entities = [ contact.GetFixtureA().GetBody().GetUserData().entity, contact.GetFixtureB().GetBody().GetUserData().entity ];
		// 		var componentsA = Puppets.getComponents(entities[0])[0];
		// 		var componentsB = Puppets.getComponents(entities[1])[0];
		// 		if(!componentsA.hasOwnProperty("colorColliderBox") && !componentsB.hasOwnProperty("colorColliderBox"))
		// 			return;
		// 		else{
		// 			if(componentsA.hasOwnProperty("colorColliderBox")){
		// 				var player = componentsA;
		// 				var other = componentsB;
		// 				var position = {x : t.m_points[1].x*SCALE >> 0, y : t.m_points[1].y*SCALE >> 0};
		// 			}
		// 			else{
		// 				var player = componentsB;
		// 				var other = componentsA;
		// 				var position = {x : t.m_points[0].x*SCALE >>0, y : t.m_points[0].y*SCALE >> 0};
		// 			}

		// 			var color = getColorAt(position, WIDTH, Game.constants.PIXELS_ARRAY);
		// 			if(player.colorColliderBox.colorColliding && (color !== null && (color.r || color.b || color.g)))
		// 				contact.SetEnabled( true );
		// 			else
		// 				contact.SetEnabled( false );
		// 		}
		// 	}
		// });
		// function createJoint(b2One, b2Two)
		// {
	 //         var joint = new Box2D.Dynamics.Joints.b2RevoluteJointDef();
	 //         joint.bodyA = b2One;
	 //         joint.bodyB = b2Two;
	 //         joint.Initialize(b2One, b2Two, b2One.GetWorldCenter());
	 //         joint.enableMotor = true;
	 //         world.CreateJoint(joint);
  //    	}

		Game.observer.on("kick", function(kick){
			Puppets.createEntity("simpleBox2dBox", {
				renderBox : {
					color : "blue",
					context : mainCanvas.canvasContext.context,
					cameraPosition : cameraPosition
				},
				b2polygon : {
					world : world,
					width : kick*50/SCALE/2,
					dynamic : false,
					x :  (Math.random() * ((cameraPosition.x+600) - (cameraPosition.x+300)) + (cameraPosition.x+300))/SCALE >> 0,
					y : (Math.random() * ((cameraPosition.y+400) - cameraPosition.y) + cameraPosition.y)/SCALE >> 0,
					height : kick*50/SCALE/2
				}
			});
		});

		camera.target.position = Puppets.getComponents(box)[0].position;
	}

	return new Level();
});