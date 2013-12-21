define(["../../loader/libraries/puppets", "../game", "./PNGParser"], function(Puppets, Game, PNGParser){
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
		var crb = Puppets.createEntity("waitingMovingBox", {b2polygon : {world : world,
											x : 6.37,
											y : 29.85,
											width : 2.9,
											restitution : 0.2,
											friction : 100,
											height : 10/SCALE},
											renderBox : {
												color : "green",
												context : mainCanvas.canvasContext.context,
												cameraPosition : cameraPosition
											},
											movingBox : {
												steps : [{
													x : 0,
													y : -150,
													delay : 1,
													pause : 2
												},{
													x : 0,
													y : -142,
													delay : 1,
													pause : 2
												},{
													x : 0,
													y : -142,
													delay : 1,
													pause : 2
												},{
													x : 0,
													y : -300,
													delay : 2,
													pause : 6
												},{
													x : 750,
													y : 0,
													delay : 6,
													pause : 1
												},{
													x : 0,
													y : 150,
													delay : 1,
													pause : 1
												},{
													x : -750,
													y : 0,
													delay : 1,
													pause : 1
												}],
												initStep : {
													x : 0,
													y : 584,
													delay : 1,
													pause : 3
												},
												precision : 1
											}});
		Puppets.createEntity("alreadyMovingBox", {b2polygon : {world : world,
											x : 43,
											y : 48.5,
											width : 2.9,
											restitution : 0.2,
											friction : 100,
											height : 10/SCALE},
											renderBox : {
												color : "green",
												context : mainCanvas.canvasContext.context,
												cameraPosition : cameraPosition
											},
											movingBox : {
												steps : [{
													x : -380,
													y : 0,
													delay : 1,
													pause : 3
												}],
												initStep : {
													x : 380,
													y : 0,
													delay : 1,
													pause : 3
												},
												precision : 1
											}});
        Puppets.createEntity("checkPoint", {b2polygon : {world : world,
                                            x : 11,
                                            y : 28,
                                            width : 10/SCALE,
                                            restitution : 0.2,
                                            friction : 0,
                                            height : 80/SCALE},
                                            renderBox : {
                                                cameraPosition : cameraPosition
                                            }});
		Puppets.createEntity("rotatingBox", {b2polygon : {world : world,
											x : 18.2,
											y : 0,
											width : 5,
											restitution : 0.2,
											friction : 0,
											height : 10/SCALE},
											renderBox : {
												color : "red",
												context : mainCanvas.canvasContext.context,
												cameraPosition : cameraPosition
											},
											rotatingBox : {
												direction : "clockwise",
												speed : 18
											}});
		Puppets.createEntity("rotatingBox", {b2polygon : {world : world,
											x : 25,
											y : 8.4,
											width : 5,
											restitution : 0.2,
											friction : 0,
											height : 10/SCALE},
											renderBox : {
												color : "red",
												context : mainCanvas.canvasContext.context,
												cameraPosition : cameraPosition
											},
											rotatingBox : {
												direction : "counterClockwise",
												speed : 18
											}});
        var crb = Puppets.createEntity("waitingMovingBox", {b2polygon : {world : world,
                                            x : 6.37,
                                            y : 29.85,
                                            width : 2.9,
                                            restitution : 0.2,
                                            friction : 100,
                                            height : 10/SCALE},
                                            renderBox : {
                                                color : "green",
                                                context : mainCanvas.canvasContext.context,
                                                cameraPosition : cameraPosition
                                            },
                                            movingBox : {
                                                steps : [{
                                                    x : 0,
                                                    y : -150,
                                                    delay : 1,
                                                    pause : 2
                                                },{
                                                    x : 0,
                                                    y : -142,
                                                    delay : 1,
                                                    pause : 2
                                                },{
                                                    x : 0,
                                                    y : -142,
                                                    delay : 1,
                                                    pause : 2
                                                },{
                                                    x : 0,
                                                    y : -300,
                                                    delay : 2,
                                                    pause : 6
                                                },{
                                                    x : 750,
                                                    y : 0,
                                                    delay : 6,
                                                    pause : 1
                                                },{
                                                    x : 0,
                                                    y : 150,
                                                    delay : 1,
                                                    pause : 1
                                                },{
                                                    x : -750,
                                                    y : 0,
                                                    delay : 1,
                                                    pause : 1
                                                }],
                                                initStep : {
                                                    x : 0,
                                                    y : 584,
                                                    delay : 1,
                                                    pause : 3
                                                },
                                                precision : 1
                                            }});
        Puppets.createEntity("alreadyMovingBox", {b2polygon : {world : world,
                                            x : 43,
                                            y : 48.5,
                                            width : 2.9,
                                            restitution : 0.2,
                                            friction : 100,
                                            height : 10/SCALE},
                                            renderBox : {
                                                color : "green",
                                                context : mainCanvas.canvasContext.context,
                                                cameraPosition : cameraPosition
                                            },
                                            movingBox : {
                                                steps : [{
                                                    x : -380,
                                                    y : 0,
                                                    delay : 1,
                                                    pause : 3
                                                }],
                                                initStep : {
                                                    x : 380,
                                                    y : 0,
                                                    delay : 1,
                                                    pause : 3
                                                },
                                                precision : 1
                                            }});
		

        var image = new Image();
        image.src = "LD.png";
        image.onload = function(){
            window.parser = new PNGParser({
                           size : {width : 1600, height : 1600},
                           image : image,
                           tolerance : 250,
                           accuracy : 1,
                        });
            parser.compile();
            for(var i in parser.shapes){
                var shape = parser.shapes[i];
                if(shape.lowerLeft.y > shape.upperLeft.y && shape.upperRight.x > shape.upperLeft.x){
                	if (shape.color.red === 255 && shape.color.green === 0 && shape.color.blue === 0){
    	                Puppets.createEntity("simpleBox2dBox", {
    	                    renderBox : {
    	                        color : "rgba("+shape.color.red+","+shape.color.green+","+shape.color.blue+","+shape.color.alpha+")",
    	                        context : mainCanvas.canvasContext.context,
    	                        cameraPosition : cameraPosition
    	                    },
    	                    b2polygon : {
    	                        world : world,
    	                        width : (shape.upperRight.x - shape.upperLeft.x +16)/SCALE/2,
    	                        height : (shape.lowerLeft.y - shape.upperLeft.y +16)/SCALE/2,
    	                        dynamic : false,
    	                        x : (shape.upperLeft.x+((shape.upperRight.x-shape.upperLeft.x)/2))/SCALE,
    	                        y : (shape.upperLeft.y+((shape.lowerLeft.y-shape.upperLeft.y)/2))/SCALE,
    	                    }
    	                });
                    }
                    else if (shape.color.red === 0 && shape.color.green === 255 && shape.color.blue === 0){
                        Puppets.createEntity("crossableBox", {
    	                    renderBox : {
    	                        color : "rgba("+shape.color.red+","+shape.color.green+","+shape.color.blue+","+shape.color.alpha+")",
    	                        context : mainCanvas.canvasContext.context,
    	                        cameraPosition : cameraPosition
    	                    },
    	                    b2polygon : {
    	                        world : world,
    	                        width : (shape.upperRight.x - shape.upperLeft.x +16)/SCALE/2,
    	                        height : (shape.lowerLeft.y - shape.upperLeft.y +16)/SCALE/2,
    	                        dynamic : false,
    	                        x : (shape.upperLeft.x+((shape.upperRight.x-shape.upperLeft.x)/2))/SCALE,
    	                        y : (shape.upperLeft.y+((shape.lowerLeft.y-shape.upperLeft.y)/2))/SCALE,
    	                    }
    	                });
                    }
                    else if (shape.color.red === 0 && shape.color.green === 0 && shape.color.blue === 255){
                        Puppets.createEntity("fallingBox", {
    	                    renderBox : {
    	                        color : "rgba("+shape.color.red+","+shape.color.green+","+shape.color.blue+","+shape.color.alpha+")",
    	                        context : mainCanvas.canvasContext.context,
    	                        cameraPosition : cameraPosition
    	                    },
    	                    b2polygon : {
    	                        world : world,
    	                        width : (shape.upperRight.x - shape.upperLeft.x +16)/SCALE/2,
    	                        height : (shape.lowerLeft.y - shape.upperLeft.y +16)/SCALE/2,
    	                        dynamic : false,
    	                        x : (shape.upperLeft.x+((shape.upperRight.x-shape.upperLeft.x)/2))/SCALE,
    	                        y : (shape.upperLeft.y+((shape.lowerLeft.y-shape.upperLeft.y)/2))/SCALE,
    	                    }
    	                });
                    }
                    else if (shape.color.red === 0 && shape.color.green === 255 && shape.color.blue === 255){
                        Puppets.createEntity("deathPlatform", {
    	                    renderBox : {
    	                        color : "rgba("+shape.color.red+","+shape.color.green+","+shape.color.blue+","+shape.color.alpha+")",
    	                        context : mainCanvas.canvasContext.context,
    	                        cameraPosition : cameraPosition
    	                    },
    	                    b2polygon : {
    	                        world : world,
    	                        width : (shape.upperRight.x - shape.upperLeft.x +16)/SCALE/2,
    	                        height : (shape.lowerLeft.y - shape.upperLeft.y +16)/SCALE/2,
    	                        dynamic : false,
    	                        x : (shape.upperLeft.x+((shape.upperRight.x-shape.upperLeft.x)/2))/SCALE,
    	                        y : (shape.upperLeft.y+((shape.lowerLeft.y-shape.upperLeft.y)/2))/SCALE,
    	                    }
    	                });
                    }
                }
            }
        }
	}

	return new Level();
});