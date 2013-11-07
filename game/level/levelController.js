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

		Puppets.createEntity("simpleBox2dBox", {b2polygon : {world : world,
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