define(["../../loader/libraries/puppets", "../game"], function(Puppets, Game){
    var MenuController = function(config){
        //this.config = config;
    };

    MenuController.prototype.init = function(){
        var _self = Game;
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
                context : _self.canvasController.mainCanvas.components.canvasContext.context,
                cameraPosition : _self.cameraController.components.position,
            }
        }, "backgrounds");
        Puppets.createEntity("box", {
            position : {
                x : 0,
                y : 0
            },
            size : {
                width : 1600,
                height : 1600
            },
            renderBox : {
                color : "black",
                context : _self.canvasController.otherDimension.components.canvasContext.context,
                cameraPosition : _self.cameraController.components.position,
            }
        }, "backgrounds");
        var button, button2, button3, title;
        title = Puppets.createEntity("button", {
            renderBox : {
                strokeColor : "white",
                color : "rgba(0,0,0,0)",
            },
            clickable : {
                mouse : _self.mouseController.components,
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
                context : _self.canvasController.mainCanvas.components.canvasContext.context,
                relativePosition : {
                    x : 50,
                    y : 20
                },
                font : "normal 30px Verdana",
            },
            hover : {
                mouse : _self.mouseController.components,
            }
        });
        button = Puppets.createEntity("button", {
            renderBox : {
                strokeColor : "white",
                color : "rgba(0,0,0,0)",
                context : _self.canvasController.mainCanvas.components.canvasContext.context,
            },
            clickable : {
                mouse : _self.mouseController.components,
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
                        _self.playerController.init();
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
                context : _self.canvasController.mainCanvas.components.canvasContext.context,
                relativePosition : {
                    x : 50,
                    y : 20
                },
                font : "normal 15px Verdana",
            },
            hover : {
                mouse : _self.mouseController.components,
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
                context : _self.canvasController.mainCanvas.components.canvasContext.context,
            },
            clickable : {
                mouse : _self.mouseController.components,
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
                context : _self.canvasController.mainCanvas.components.canvasContext.context,
                relativePosition : {
                    x : 50,
                    y : 20
                },
                font : "normal 15px Verdana",
            },
            hover : {
                mouse : _self.mouseController.components,
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
                context : _self.canvasController.mainCanvas.components.canvasContext.context,
            },
            clickable : {
                mouse : _self.mouseController.components,
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
                context : _self.canvasController.mainCanvas.components.canvasContext.context,
                relativePosition : {
                    x : 50,
                    y : 20
                },
                font : "normal 15px Verdana",
            },
            hover : {
                mouse : _self.mouseController.components,
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
    }

    MenuController.prototype.setEvents = function(){
        
    }

    return new MenuController();
});