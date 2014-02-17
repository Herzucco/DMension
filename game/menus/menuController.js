define(["../../loader/libraries/puppets", "../game"], function(Puppets, Game){
    var MenuController = function(config){
        //this.config = config;
    };

    MenuController.prototype.init = function(){
        var _self = Game;
        Puppets.createEntity("draw", {
            position : {
                x : 0,
                y : 0
            },
            size : {
                width : 600,
                height : 400
            },
            draw : {
                image : Game.imagesController.images.menuBG,
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
        var button, button2, button3;
        console.log(Game.imagesController.images);
        button = Puppets.createEntity("button", {
            draw : {
                image : Game.imagesController.images.simpleAventure,
                context : _self.canvasController.mainCanvas.components.canvasContext.context,
                cameraPosition : _self.cameraController.components.position,
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
                                                            width : 1600,
                                                            height : 1600
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
                        Puppets.removeEntity(button);
                        Puppets.removeEntity(button2);
                        Puppets.removeEntity(button3);
                    }});
                }
            },
            position : {
                x : 110,
                y : 120,
            },
            size : {
                width : 421.5,
                height : 112
            },
            dialogueRole : {
                text : {
                    style : {},
                    text : ""
                },
                talking : false,
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
                    this.components.draw.image = Game.imagesController.images.hoverAventure;
                },
                onLeave : function(mouse){
                    this.components.draw.image = Game.imagesController.images.simpleAventure;
                }

            }
        });

    button2 = Puppets.createEntity("button", {
            draw : {
                image : Game.imagesController.images.simpleMusic,
                context : _self.canvasController.mainCanvas.components.canvasContext.context,
                cameraPosition : _self.cameraController.components.position,
            },
            clickable : {
                mouse : _self.mouseController.components,
            },
            position : {
                x : -50,
                y : 220,
            },
            size : {
                width : 421.5,
                height : 112
            },
            dialogueRole : {
                text : {
                    style : {},
                    text : ""
                },
                talking : false,
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
                    this.components.draw.image = Game.imagesController.images.hoverMusic;
                },
                onLeave : function(mouse){
                    this.components.draw.image = Game.imagesController.images.simpleMusic;
                }

            }
        });

button3 = Puppets.createEntity("button", {
            draw : {
                image : Game.imagesController.images.simpleSettings,
                context : _self.canvasController.mainCanvas.components.canvasContext.context,
                cameraPosition : _self.cameraController.components.position,
            },
            clickable : {
                mouse : _self.mouseController.components,
            },
            position : {
                x : 240,
                y : 300,
            },
            size : {
                width : 421.5,
                height : 112
            },
            dialogueRole : {
                text : {
                    style : {},
                    text : ""
                },
                talking : false,
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
                    this.components.draw.image = Game.imagesController.images.hoverSettings;
                },
                onLeave : function(mouse){
                    this.components.draw.image = Game.imagesController.images.simpleSettings;
                }

            }
        });
    }

    MenuController.prototype.setEvents = function(){
        
    }

    return new MenuController();
});