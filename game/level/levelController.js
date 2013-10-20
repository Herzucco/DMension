define(["../../loader/libraries/puppets", "../game"], function(Puppets, Game){
	var getColorAt = function(position, width, data){
		var index = (width * 4 * position.y ) + (position.x * 4);

    	if (data === null || index < 0 || index >= data.length)
        	return null;


    	return {index:index, r:data[index],g:data[index+1],b:data[index+2],a:data[index+3]};
	};
	var Level = function(config){
		
	}

	Level.prototype.init = function(){
		var canvasController = Game.canvasController;
		var mainCanvas = canvasController.mainCanvas.components;
		var firstDimensionCanvas = canvasController.firstDimension.components;
		var firstBufferCanvas = canvasController.firstDimension.drawPaint.components.canvasContext;

		var world = Game.worldController.world;

		var WIDTH = Game.constants.WIDTH;
		var HEIGHT = Game.constants.HEIGHT;

		var camera = Game.cameraController.components;
		var cameraPosition = camera.position;

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
				color : "white",
				context : firstDimensionCanvas.canvasContext.context,
				cameraPosition : cameraPosition
			}
		}, "backgrounds");
		Puppets.createEntity("simpleBox2dBox", {
			renderBox : {
				color : "blue",
				context : firstDimensionCanvas.canvasContext.context,
				cameraPosition : cameraPosition
			},
			b2polygon : {
				world : world,
				width : 100/SCALE/2,
				dynamic : false,
				x : (WIDTH/2)/SCALE+(100/SCALE/2),
				y : (HEIGHT/2+100)/SCALE+(100/SCALE/2),
				height : 100/SCALE/2
			}
		});
		var box = Puppets.createEntity("simpleBox2dBox", {b2polygon : {world : world,
										x :WIDTH/2/SCALE,
										y :HEIGHT/2/SCALE,
										width : 10/SCALE,
										dynamic : true,
										height : 10/SCALE},
										renderBox : {
											color : "red",
											context : mainCanvas.canvasContext.context,
											cameraPosition : cameraPosition
										}}, "dynamics");
		Puppets.addComponent(box, "colorColliderBox", {tag : "redBox", colorAccuracy : 5});
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

					// var color = getColorAt(position, WIDTH, firstBufferCanvas.data.colorData);
					if(!player.colorColliderBox.colorColliding)
						contact.SetEnabled( false );
				}
			}
		});
		Puppets.addComponent(box, "canvasContext", firstBufferCanvas);
		Puppets.createEntity("simpleBox2dBox", {b2polygon : {world : world,
											x : 0,
											y : (HEIGHT/SCALE)-1,
											width : WIDTH/SCALE,
											restitution : 1,
											height : 10/SCALE},
											renderBox : {
												color : "red",
												context : firstDimensionCanvas.canvasContext.context,
												cameraPosition : cameraPosition
											}});


		camera.target.position = Puppets.getComponents(box)[0].position;
	}

	return new Level();
});