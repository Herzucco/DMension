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

		Puppets.createEntity("b2listener", {
            b2listener : {
                world : world,
                preSolve : function(contact, manifold){
                    var t = new Box2D.Collision.b2WorldManifold();
                    contact.GetWorldManifold(t)
                            
                    var entities = [ contact.GetFixtureA().GetBody().GetUserData().entity, contact.GetFixtureB().GetBody().GetUserData().entity ];
                    var componentsA = Puppets.getComponents(entities[0])[0];
                    var componentsB = Puppets.getComponents(entities[1])[0];
                    if(componentsA.hasOwnProperty("collisionReaction")){
                        componentsA.collisionReaction.onPreSolve.apply(componentsA, componentsB);
                    }
                    if(componentsB.hasOwnProperty("collisionReaction")){
                        componentsB.collisionReaction.onPreSolve.apply(componentsB, componentsA);
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
        image.src = 'ko.png';
        var myArray = [];
        image.onload = function(){
            var canvas = document.createElement("canvas");
            canvas.width = 2000;
            canvas.height = 400;
            var ctx = canvas.getContext('2d');
            var context = mainCanvas.canvasContext.context;
            ctx.drawImage(image, 0, 0, 2000, 400);
            var data = ctx.getImageData(0, 0, 2000, 400);
            var buffer = new Uint32Array(2000*400);
            var m = 0;
            for(var i = 0; i < data.data.length; i+=4){
                buffer[m] = data.data[i] << 24 | data.data[i+1] << 16 | data.data[i+2] << 8| data.data[i+3];
                ++m;
            }
            var g = 0;
            for(var i = 0; i < buffer.length; i+=8){
                var color = {red : buffer[i] >> 24 & 0xff, green : buffer[i] >> 16 & 0xff, blue : buffer[i] >> 8 & 0xff, alpha : buffer[i] & 0xff};
                var vecX, vecY, vecX1, vecY1;
                if((color.red <= 0 && color.green <= 0 && color.blue <= 0) ||
                    (color.red >= 255 && color.green >= 255 && color.blue >= 255 ))
                {

                }
                else{
                    vecX = {x : i % 2000, y : (i - (i%2000))/2000};
                    for(var x = i; x < buffer.length; x+= 2000){
                        color = buffer[x+2000];
                        if(((color >> 24 & 0xff) <= 10 && (color >> 16 & 0xff) <= 10 && (color >> 8 & 0xff) <= 10) ||
                            ((color >> 24 & 0xff) === 255 && (color >> 16 & 0xff) === 255 && (color >> 8 & 0xff) === 255)){
                            vecY = {x : x % 2000, y : (x - (x%2000))/2000};
                            break;
                        }
                    };
                    for(var x1 = i; x1 < buffer.length; x1+=1){
                        color = buffer[x1+1];
                        if(((color >> 24 & 0xff) <= 10 && (color >> 16 & 0xff) <= 10 && (color >> 8 & 0xff) <= 10) ||
                            ((color >> 24 & 0xff) === 255 && (color >> 16 & 0xff) === 255 && (color >> 8 & 0xff) === 255)){
                            vecX1 = {x : x1 % 2000, y : vecX.y};
                            break;
                        }
                    };
                    for(var x2 = x; x2 < buffer.length; x2+=1){
                        color = buffer[x2+1];
                        if(((color >> 24 & 0xff) <= 10 && (color >> 16 & 0xff) <= 10 && (color >> 8 & 0xff) <= 10) ||
                            ((color >> 24 & 0xff) === 255 && (color >> 16 & 0xff) === 255 && (color >> 8 & 0xff) === 255)){
                            vecY1 = {x : x2 % 2000, y : vecY.y};
                            break;
                        }
                    };
                    if(vecX1.x - vecX.x <= vecY1.x - vecY.x){
                        var vecX2 = vecX1;
                        if(vecY.y > vecX.y && vecX2.x > vecX.x)
                            myArray.push(vecX, vecX2, {x : vecX2.x, y : vecY.y}, vecY);
                    }
                    else{
                        var vecX2 = vecY1;
                        if(vecY.y > vecX.y && vecX2.x > vecX.x)
                            myArray.push(vecX, {x : vecX2.x, y : vecX.y}, vecX2, vecY);
                    }
                    for(var u = vecX.x; u < vecX2.x; u++){
                        for(var t = vecX.y; t < vecY.y; t++){
                            buffer[u + t * 2000] = 0;
                        }
                    }
                    function get_random_color() {
                        var letters = '0123456789ABCDEF'.split('');
                        var color = '#';
                        for (var i = 0; i < 6; i++ ) {
                            color += letters[Math.round(Math.random() * 15)];
                        }
                        return color;
                    }
                    if(vecY.y > vecX.y && vecX2.x > vecX.x){
                        Puppets.createEntity("simpleBox2dBox", {
                            renderBox : {
                                color : get_random_color(),
                                context : mainCanvas.canvasContext.context,
                                cameraPosition : cameraPosition
                            },
                            b2polygon : {
                                world : world,
                                width : (vecX2.x - vecX.x+8)/SCALE/2,
                                height : (vecY.y - vecX.y)/SCALE/2,
                                dynamic : false,
                                x : (vecX.x+((vecX2.x-vecX.x)/2))/SCALE,
                                y : (vecX.y+((vecY.y-vecX.y)/2))/SCALE,
                            }
                        });
                    }
                }
            }
            // for(var i = 0; i < myArray.length; i+=4){
            //     var component = {   fixtureDef : new Box2D.Dynamics.b2FixtureDef(),
            //                     bodyDef : new Box2D.Dynamics.b2BodyDef(),
            //                     polygonShape : new Box2D.Collision.Shapes.b2PolygonShape(),
            //                 };
            //     component.bodyDef.type = Box2D.Dynamics.b2Body.b2_staticBody;
            //     component.fixtureDef.shape = component.polygonShape;
            //     var vertices = [myArray[i], myArray[i+1], myArray[i+2], myArray[i+3]];
            //     console.log(vertices);

            //     for(var x = 0; x < vertices.length; x++){
            //         vertices[x].x = vertices[x].x/SCALE;
            //         vertices[x].y = vertices[x].y/SCALE;
            //     }
            //     component.fixtureDef.shape.SetAsArray(vertices, 4);
            //     component.body = world.CreateBody( component.bodyDef );
            //     component.body.CreateFixture( component.fixtureDef );
            //     console.log(component);
            //     console.log(world);
            // }
        }
	}

	return new Level();
});