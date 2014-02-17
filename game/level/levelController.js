define(["../../loader/libraries/puppets", "../game", "./PNGParser", "./parsingFunction"], function(Puppets, Game, PNGParser, parse){
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

        Puppets.createEntity("dialogTrigger", {b2polygon : {world : world,
                                            x : 5,
                                            y : 43,
                                            width : 10/SCALE,
                                            restitution : 0.2,
                                            friction : 100,
                                            height : 10/SCALE,
                                            used : false,
                                            dialog : "dialogueOne"},
                                            renderBox : {
                                                cameraPosition : cameraPosition
                                        }});
        Puppets.createEntity("dialogTrigger", {b2polygon : {world : world,
                                            x : 30,
                                            y : 38,
                                            width : 10/SCALE,
                                            restitution : 0.2,
                                            friction : 100,
                                            height : 8,
                                            used : false,
                                            dialog : "dialogueTwo"},
                                            renderBox : {
                                                cameraPosition : cameraPosition
                                        }});
        Puppets.createEntity("dialogTrigger", {b2polygon : {world : world,
                                            x : 23.5,
                                            y : 24,
                                            width : 10/SCALE,
                                            restitution : 0.2,
                                            friction : 100,
                                            height : 4,
                                            used : false,
                                            dialog : "dialogueThree"},
                                            renderBox : {
                                                cameraPosition : cameraPosition
                                        }});
        Puppets.createEntity("dialogTrigger", {b2polygon : {world : world,
                                            x : 8,
                                            y : 28.5,
                                            width : 2,
                                            restitution : 0.2,
                                            friction : 100,
                                            height : 10/SCALE,
                                            used : false,
                                            dialog : "dialogueFour"},
                                            renderBox : {
                                                cameraPosition : cameraPosition
                                        }});
        Puppets.createEntity("dialogTrigger", {b2polygon : {world : world,
                                            x : 12,
                                            y : 17,
                                            width : 10/SCALE,
                                            restitution : 0.2,
                                            friction : 100,
                                            height : 2,
                                            used : false,
                                            dialog : "dialogueFive"},
                                            renderBox : {
                                                cameraPosition : cameraPosition
                                        }});
        Puppets.createEntity("dialogTrigger", {b2polygon : {world : world,
                                            x : 18.3,
                                            y : 16.5,
                                            width : 10/SCALE,
                                            restitution : 0.2,
                                            friction : 100,
                                            height : 10/SCALE,
                                            used : false,
                                            dialog : "dialogueSix"},
                                            renderBox : {
                                                cameraPosition : cameraPosition
                                        }});
        Puppets.createEntity("dialogTrigger", {b2polygon : {world : world,
                                            x : 26,
                                            y : 17,
                                            width : 10/SCALE,
                                            restitution : 0.2,
                                            friction : 100,
                                            height : 2,
                                            used : false,
                                            dialog : "dialogueSeven"},
                                            renderBox : {
                                                cameraPosition : cameraPosition
                                        }});
        Puppets.createEntity("dialogTrigger", {b2polygon : {world : world,
                                            x : 25,
                                            y : 2,
                                            width : 10/SCALE,
                                            restitution : 0.2,
                                            friction : 100,
                                            height : 2,
                                            used : false,
                                            dialog : "dialogueEight"},
                                            renderBox : {
                                                cameraPosition : cameraPosition
                                        }});
		box = Puppets.createEntity("alreadyMovingBox", {b2polygon : {world : world,
											x : 43,
											y : 48.5,
											width : 2.9,
											restitution : 0.2,
											friction : 100,
											height : 10/SCALE,},
											renderBox : {
												cameraPosition : cameraPosition,
                                                color : 'purple',
                                                context : mainCanvas.canvasContext.context
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
		Puppets.addComponent(box, "phase", {
            currentPhase : "mainCanvas",
            defaultPhase : "mainCanvas"
        });

        var level = Puppets.createEntity("draw", {
            size : {width : 1600, height : 1600},
            draw : {
                image : Game.imagesController.images.level1,
                context : mainCanvas.canvasContext.context,
                cameraPosition : cameraPosition,
                scale : camera.focus.scale,
                // frameSize : {
                //     width : 1600,
                //     height : 1600
                // }
            }
        }, "world");
        Puppets.addComponent(level, "cameraReplacer", {
            multiply : false,
            numberY : 9,
            numberX : 9
        });
        // Puppets.addComponent(level, "animation", {
        //     animations : {
        //         main : {
        //             run : "horizontal",
        //             numberOfFrames : 10,
        //             size : {
        //                 width : 1600,
        //                 height : 1600
        //             },
        //             start : {
        //                 x : 0,
        //                 y : 0
        //             },
        //             fps : 60
        //         }
        //     },
        //     currentAnimation : "main"
        // });
        var bg = Puppets.createEntity("draw", {
            size : {width : 1600, height : 1600},
            draw : {
                image : Game.imagesController.images.level1BG,
                context : mainCanvas.canvasContext.context,
                cameraPosition : cameraPosition
            }
        }, "backgrounds");
        Puppets.addComponent(bg, "cameraReplacer", {
            multiply : true,
            numberY : 0.3,
            numberX : 0.3
        });

        window.parser = new PNGParser({
                       size : {width : 1600, height : 1600},
                       image : Game.imagesController.images.level1Builder,
                       tolerance : 250,
                       accuracy : 1,
                    });
        parser.compile();
        parse(parser, {x : 0, y : 0}, mainCanvas.canvasContext.context, cameraPosition, world, "mainCanvas");

        var memory = Puppets.createEntity("memory", {
            memoryScenery : {
                src : "blanc.png",
                width : 1*SCALE*2,
                height : 2*SCALE*2
            },
            size : {
                width : 1*SCALE*2,
                height : 2*SCALE
            },
            position : {
                x : 25.8*SCALE-25,
                y : 17*SCALE-50
            },
            memoryData : {
                context : mainCanvas.canvasContext.context,
                cameraPosition : cameraPosition,
                world : world,
                phase : "mainCanvas"
            },
            hover : {
                mouse : Game.mouseController.components,
                onHovering : function(mouse){
                    if(mouse.renderCircle.color === "rgba(100,100,100,0.5)"){
                        if(mouse.mouse.clicked){
                            mouse.renderCircle.enabled = true;
                            mouse.TOACTIVE = true;
                        } 
                    }
                },
                onLeave : function(mouse){
                    if(mouse.renderCircle.color === "rgba(100,100,100,0.5)"){
                        mouse.renderCircle.enabled = false;
                        mouse.TOACTIVE = false;
                    }
                },
            }
        });
	}

    
	return new Level();
});