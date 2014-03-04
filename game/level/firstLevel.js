define(["../../loader/libraries/puppets", "../game"], function(Puppets, Game){
    var canvasController,mainCanvas,vfirstColorCanvas, world, WIDTH, HEIGHT,
         camera, cameraPosition, PIXELS_ARRAY;
    
    return {
        name : 'firstLevel',
        parseConfig : {
           size : {width : 3200, height : 3200},
           tolerance : 250,
           accuracy : 1,
           position : {x : 0, y : 0},
        },
        init : function(){
            canvasController = Game.canvasController;
            mainCanvas = canvasController.mainCanvas.components;

            firstColorCanvas = canvasController.firstColor.components;

            world = Game.worldController.world;

            WIDTH = Game.constants.WIDTH;
            HEIGHT = Game.constants.HEIGHT;

            camera = Game.cameraController.components;
            cameraPosition = camera.position;

            PIXELS_ARRAY = Game.constants.PIXELS_ARRAY;

            this.parseConfig.image = Game.imagesController.images.level1Builder;
        },
        dialogs : function(){
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
        },
        decor : function(){
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
        },
        backgrounds : function(){
            var c = document.createElement('canvas');
            c.width = 3200;
            c.height = 3200;

            c.getContext('2d').drawImage(Game.imagesController.images.level1, 0, 0, c.width, c.height);

            var level = Puppets.createEntity("draw", {
                size : {width : 3200, height : 3200},
                draw : {
                    image : c,
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
                numberY : 13,
                numberX : 13
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
            
            var x = document.createElement('canvas');
            x.width = 3200;
            x.height = 3200;

            x.getContext('2d').drawImage(Game.imagesController.images.level1BG, 0, 0, c.width, c.height);

            var bg = Puppets.createEntity("draw", {
                size : {width : 3200, height : 3200},
                draw : {
                    image : x,
                    context : mainCanvas.canvasContext.context,
                    cameraPosition : cameraPosition,
                    scale : camera.focus.scale,
                }
            }, "backgrounds");
            Puppets.addComponent(bg, "cameraReplacer", {
                multiply : true,
                numberY : 0.3,
                numberX : 0.3
            });
        }
    };
});