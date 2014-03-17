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

            this.parseConfig.image = Game.imagesController.images.level2Builder;
        },
        dialogs : function(){
            
        },
        decor : function(){
            
        },
        backgrounds : function(){
            // var c = document.createElement('canvas');
            // c.width = 3200;
            // c.height = 3200;

            // c.getContext('2d').drawImage(Game.imagesController.images.level2, 0, 0, c.width, c.height);

            var level = Puppets.createEntity("specialdraw", {
                position : {
                    x : 0,
                    y : 0
                },
                size : {width : 3200, height : 3200},
                draw : {
                    image : Game.imagesController.images.level2,
                    context : mainCanvas.canvasContext.context,
                    cameraPosition : cameraPosition,
                    scale : camera.focus.scale,
                    frameSize : {
                        width : 3200,
                        height : 3200
                    }
                }
            }, "world");
            Puppets.addComponent(level, "cameraReplacer", {
                multiply : false,
                numberY : 10
            });
            Puppets.addComponent(level, "animation", {
                animations : {
                    main : {
                        run : "horizontal",
                        numberOfFrames : 8,
                        size : {
                            width : 3200,
                            height : 3200
                        },
                        start : {
                            x : 0,
                            y : 0
                        },
                        fps : 5
                    }
                },
                currentAnimation : "main"
            });

            var x = document.createElement('canvas');
            x.width = 3200;
            x.height = 3200;

            x.getContext('2d').drawImage(Game.imagesController.images.level2BG, 0, 0, x.width, x.height);

            var bg = Puppets.createEntity("draw", {
                position : {
                    x : 0,
                    y : 0
                },
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