define(["./constants", "../loader/libraries/puppets", "./event"], function(constants, Puppets, EventController){
	var Game = function(){
		this.cameraController   = {};
		this.canvasController   = {};
		this.keyboardController = {};
		this.levelController    = {};
		this.mouseController    = {};
		this.playerController   = {};
		this.stateMachine       = {};
		this.worldController    = {};
		this.constants          = constants;
	};

	Game.prototype.init = function(){
		Puppets.collection(["backgrounds", "world", "canvas", "dynamics", "UI"]);
       /* Puppets.systemList(["drawOnStencil", "drawGauge", "checkGauge", "dialogue",
          "updateColliderBox", "checkCollidersBox",
          "updateColorColliderBox", "checkColorCollision", "delayCount",
           "updateTravelling", "updateCameraPosition", "RenderBox", "RenderCircle",
            "detectMouseDownOnBox", "detectMouseHoverOnBox", "detectMouseUpOnBox",
             "onDragging", "delaying", "boxMove", "boxRotate", "RenderWorldDebug",
              "reverseGravity", "accelerateBody", "adaptBox", "drawRole"]);*/

		this.observer = new EventController();
		this.cameraController.init();
		this.canvasController.init();
		this.worldController.init();
		this.mouseController.init();
        //this.UIController.init();

        var _self = this;
        var button, button2, button3, title;
        title = Puppets.createEntity("button", {
            renderBox : {
                strokeColor : "white",
                color : "rgba(0,0,0,0)",
            },
            clickable : {
                mouse : this.mouseController.components,
            },
            position : {
                x : 250,
                y : 30,
            },
            size : {
                width : 300,
                height : 50
            },
            dialogueRole : {
                text : {
                    style : {},
                    text : "Cloud Soul"
                },
                talking : true,
                context : this.canvasController.mainCanvas.components.canvasContext.context,
                relativePosition : {
                    x : 50,
                    y : 20
                },
                font : "normal 30px Verdana",
            },
            hover : {
                mouse : this.mouseController.components,
            }
        });
        button = Puppets.createEntity("button", {
            renderBox : {
                strokeColor : "white",
                color : "rgba(0,0,0,0)",
                context : this.canvasController.mainCanvas.components.canvasContext.context,
            },
            clickable : {
                mouse : this.mouseController.components,
                onMouseDown : function(){
                    
                },
                onMouseUp : function(){
                    var fade = Puppets.createEntity("box", {
                                                        position : {
                                                            x : 0,
                                                            y : 0
                                                        },
                                                        size : {
                                                            width : 16000,
                                                            height : 16000
                                                        },
                                                        renderBox : {
                                                            color : "rgba(0,0,0,0)",
                                                            context : _self.canvasController.mainCanvas.components.canvasContext.context,
                                                            cameraPosition : _self.cameraController.components.position,
                                                        }
                                                    }, "UI");
                    Puppets.addComponent(fade, "fadeInFadeOut", {onAnimationMiddle : function(){
                        _self.mouseController.components.renderCircle.clip = false;
                        _self.mouseController.setEvents();
                        _self.UIController.init();
                        _self.levelController.init();
                        Puppets.removeEntity(title);
                        Puppets.removeEntity(button);
                        Puppets.removeEntity(button2);
                        Puppets.removeEntity(button3);
                    }});
                }
            },
            position : {
                x : 250,
                y : 85,
            },
            size : {
                width : 100,
                height : 30
            },
            dialogueRole : {
                text : {
                    style : {},
                    text : "Adventure"
                },
                talking : true,
                context : this.canvasController.mainCanvas.components.canvasContext.context,
                relativePosition : {
                    x : 50,
                    y : 20
                },
                font : "normal 15px Verdana",
            },
            hover : {
                mouse : this.mouseController.components,
                onHover : function(mouse){
                    this.components.renderBox.color = "rgba(250,250,250,50)";
                    this.components.dialogueRole.textColor = "rgb(30,30,30)";
                },
                onLeave : function(mouse){
                    this.components.renderBox.color = "rgba(0,0,0,0)";
                    this.components.dialogueRole.textColor = "white";
                }

            }
        });

    button2 = Puppets.createEntity("button", {
            renderBox : {
                strokeColor : "white",
                color : "rgba(0,0,0,0)",
                context : this.canvasController.mainCanvas.components.canvasContext.context,
            },
            clickable : {
                mouse : this.mouseController.components,
            },
            position : {
                x : 250,
                y : 185,
            },
            size : {
                width : 100,
                height : 30
            },
            dialogueRole : {
                text : {
                    style : {},
                    text : "Music Run"
                },
                talking : true,
                context : this.canvasController.mainCanvas.components.canvasContext.context,
                relativePosition : {
                    x : 50,
                    y : 20
                },
                font : "normal 15px Verdana",
            },
            hover : {
                mouse : this.mouseController.components,
                onHover : function(mouse){
                    this.components.renderBox.color = "rgba(250,250,250,50)";
                    this.components.dialogueRole.textColor = "rgb(30,30,30)";
                },
                onLeave : function(mouse){
                    this.components.renderBox.color = "rgba(0,0,0,0)";
                    this.components.dialogueRole.textColor = "white";
                }

            }
        });

button3 = Puppets.createEntity("button", {
            renderBox : {
                strokeColor : "white",
                color : "rgba(0,0,0,0)",
                context : this.canvasController.mainCanvas.components.canvasContext.context,
            },
            clickable : {
                mouse : this.mouseController.components,
            },
            position : {
                x : 250,
                y : 285,
            },
            size : {
                width : 100,
                height : 30
            },
            dialogueRole : {
                text : {
                    style : {},
                    text : "Settings"
                },
                talking : true,
                context : this.canvasController.mainCanvas.components.canvasContext.context,
                relativePosition : {
                    x : 50,
                    y : 20
                },
                font : "normal 15px Verdana",
            },
            hover : {
                mouse : this.mouseController.components,
                onHover : function(mouse){
                    this.components.renderBox.color = "rgba(250,250,250,50)";
                    this.components.dialogueRole.textColor = "rgb(30,30,30)";
                },
                onLeave : function(mouse){
                    this.components.renderBox.color = "rgba(0,0,0,0)";
                    this.components.dialogueRole.textColor = "white";
                }

            }
        });

        Puppets.createEntity("box", {
            position : {
                x : 0,
                y : 0
            },
            size : {
                width : 16000,
                height : 16000
            },
            renderBox : {
                color : "black",
                context : this.canvasController.mainCanvas.components.canvasContext.context,
                cameraPosition : this.cameraController.components.position,
            }
        }, "backgrounds");
		//this.levelController.init();
	}
	return new Game;
});