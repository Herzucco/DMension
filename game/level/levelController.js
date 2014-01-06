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

		var box = Puppets.createEntity("waitingMovingBox", {b2polygon : {world : world,
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
        Puppets.addComponent(box, "colorColliderBox", {
                            tag : "someBox",
                            colorAccuracy : 5, 
                            onColorCollisionEnter : function(colors){
                                this.components.phase.currentPhase = Game.canvasController.otherDimension.components.phase.currentPhase;
                                console.log(this.components.phase.currentPhase)
                            },
                            onColorCollisionExit : function(colors){
                                this.components.phase.currentPhase = this.components.phase.defaultPhase;
                            },
                            testWidth : Game.constants.WIDTH,
                            data : Game.constants.DIMENSION_PIXELS
                        });
        Puppets.addComponent(box, "phase", {
                            currentPhase : "mainCanvas",
                            defaultPhase : "mainCanvas"
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
        Puppets.addComponent(box, "colorColliderBox", {
                            tag : "someBox",
                            colorAccuracy : 5, 
                            onColorCollisionEnter : function(colors){
                                this.components.phase.currentPhase = Game.canvasController.otherDimension.components.phase.currentPhase;
                                console.log(this.components.phase.currentPhase)
                            },
                            onColorCollisionExit : function(colors){
                                this.components.phase.currentPhase = this.components.phase.defaultPhase;
                            },
                            testWidth : Game.constants.WIDTH,
                            data : Game.constants.DIMENSION_PIXELS
                        });

        Puppets.addComponent(box, "colorColliderBox", {
            tag : "someBox",
            colorAccuracy : 5, 
            onColorCollisionEnter : function(colors){
                this.components.phase.currentPhase = Game.canvasController.otherDimension.components.phase.currentPhase;
                console.log(this.components)
            },
            onColorCollisionExit : function(colors){
                this.components.phase.currentPhase = this.components.phase.defaultPhase;
            },
            testWidth : Game.constants.WIDTH,
            data : Game.constants.DIMENSION_PIXELS
        });
		Puppets.addComponent(box, "phase", {
            currentPhase : "mainCanvas",
            defaultPhase : "mainCanvas"
        });

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
            parse(parser, {x : 0, y : 0}, mainCanvas.canvasContext.context, cameraPosition, world, "mainCanvas");
        }

        var memory = Puppets.createEntity("memory", {
            memoryScenery : {
                src : "blanc.png",
                width : 100,
                height : 100
            },
            size : {
                width : 100,
                height : 100
            },
            position : {
                x : 100,
                y : 1200
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