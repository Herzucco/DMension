define(["../../loader/libraries/puppets", "../game", "./PNGParser"], function(Puppets, Game, PNGParser){
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

		var firstColorCanvas = canvasController.firstColor.components;

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

		Puppets.createEntity("deathPlatform", {b2polygon : {world : world,
											x : 5,
											y : 5,
											width : 5,
											restitution : 0.2,
											friction : 0,
											height : 10/SCALE},
											renderBox : {
												color : "green",
												context : mainCanvas.canvasContext.context,
												cameraPosition : cameraPosition
											}});
		var box = Puppets.createEntity("simpleBox2dBox", {b2polygon : {world : world,
										x :1,
										y :1,
										width : 10/SCALE,
										dynamic : true,
										friction : 0,
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
			onPreSolve : function(){
            }
		});
        Puppets.addComponent(box, "gaugeComponent", {
            color : "rgba(0,0,0,0)",
            strokeColor : "rgba(0,0,0,0)",
            valueMax : Game.constants.playerMaxLife,
            onEmpty : function(){
                Puppets.addComponent(this.entity, "BODYTODESTROY", {});
                for(var i in this.components){
                    this.components[i].enabled = false;
                };
                Puppets.addComponent(this.entity, "delay", {
                    delay : 3,
                    onEnd : function(){
                        for(var i in this.components){
                            this.components[i].enabled = true;
                        };
                        this.components.gaugeComponent.currentValue = this.components.gaugeComponent.valueMax;
                        Puppets.addComponent(this.entity, "b2polygon", {
                            world : world,
                            x :1,
                            y :-10,
                            width : 10/SCALE,
                            dynamic : true,
                            friction : 0,
                            height : 10/SCALE
                        })
                    }
                });
            }
        });
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

		Puppets.createEntity("b2listener", {
            b2listener : {
                world : world,
                preSolve : function(contact, manifold){
                    var t = new Box2D.Collision.b2WorldManifold();
                    contact.GetWorldManifold(t)
                            
                    var entities = [ contact.GetFixtureA().GetBody().GetUserData().entity, contact.GetFixtureB().GetBody().GetUserData().entity ];
                    var componentsA = { components : Puppets.getComponents(entities[0])[0], entity : entities[0]};
                    var componentsB = { components : Puppets.getComponents(entities[1])[0], entity : entities[1]};
                    if(componentsA.components.hasOwnProperty("collisionReaction")){
                        componentsA.components.collisionReaction.onPreSolve.call(componentsA, componentsB, contact);
                    }
                    if(componentsB.components.hasOwnProperty("collisionReaction")){
                        componentsB.components.collisionReaction.onPreSolve.call(componentsB, componentsA, contact);
                    }
                },
                beginContact : function(contact, manifold){
                    var t = new Box2D.Collision.b2WorldManifold();
                    contact.GetWorldManifold(t)
                            
                    var entities = [ contact.GetFixtureA().GetBody().GetUserData().entity, contact.GetFixtureB().GetBody().GetUserData().entity ];
                    var componentsA = { components : Puppets.getComponents(entities[0])[0], entity : entities[0]};
                    var componentsB = { components : Puppets.getComponents(entities[1])[0], entity : entities[1]};
                    if(componentsA.components.hasOwnProperty("collisionReaction")){
                        componentsA.components.collisionReaction.onBeginContact.call(componentsA, componentsB, contact);
                    }
                    if(componentsB.components.hasOwnProperty("collisionReaction")){
                        componentsB.components.collisionReaction.onBeginContact.call(componentsB, componentsA, contact);
                    }
                }
            }
		})
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

        var image = new Image();
        image.src = "ko.png";
        image.onload = function(){
            window.parser = new PNGParser({
                           size : {width : 2000, height : 400},
                           image : image,
                        });
            parser.compile();
            for(var i in parser.shapes){
                var shape = parser.shapes[i];
                if(shape.lowerLeft.y > shape.upperLeft.y && shape.upperRight.x > shape.upperLeft.x){
                    Puppets.createEntity("simpleBox2dBox", {
                        renderBox : {
                            color : "rgba("+shape.color.red+","+shape.color.green+","+shape.color.blue+","+shape.color.alpha+")",
                            context : mainCanvas.canvasContext.context,
                            cameraPosition : cameraPosition
                        },
                        b2polygon : {
                            world : world,
                            width : (shape.upperRight.x - shape.upperLeft.x)/SCALE/2,
                            height : (shape.lowerLeft.y - shape.upperLeft.y)/SCALE/2,
                            dynamic : false,
                            x : (shape.upperLeft.x+((shape.upperRight.x-shape.upperLeft.x)/2))/SCALE,
                            y : (shape.upperLeft.y+((shape.lowerLeft.y-shape.upperLeft.y)/2))/SCALE,
                        }
                    });
                }
            }
        }
	}

	return new Level();
});