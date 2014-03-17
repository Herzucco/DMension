define(["../../loader/libraries/puppets", "../game"], function(Puppets, Game){
    var canvasController,mainCanvas,vfirstColorCanvas, world, WIDTH, HEIGHT,
         camera, cameraPosition, PIXELS_ARRAY;
    
    return {
        name : 'thirdLevel',
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

            this.parseConfig.image = Game.imagesController.images.level3Builder;
        },
        dialogs : function(){
            
        },
        decor : function(){
            Puppets.createEntity("levelEnd", {
                b2polygon : {world : world,
                    x : 20,
                    y : 1,
                    width : 6,
                    restitution : 0.2,
                    friction : 100,
                    height : 10/SCALE},
                /*renderBox : {
                    context : Game.canvasController.mainCanvas.components.canvasContext.context,
                    cameraPosition : Game.cameraController.components.position,
                    color : "red"
                },*/
                levelEnd : {nextLevel : "thirdLevel",
                            xSpawn : 1600,
                            cacahuete : 2800}
            }, "UI")
        },
        backgrounds : function(){
            // var c = document.createElement('canvas');
            // c.width = 3200;
            // c.height = 3200;

            // c.getContext('2d').drawImage(Game.imagesController.images.level2, 0, 0, c.width, c.height);

            var level = Puppets.createEntity("draw", {
                position : {
                    x : 0,
                    y : 0
                },
                size : {width : 3200, height : 3200},
                draw : {
                    image : Game.imagesController.images.level3,
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
        },
        playerStart : {x:10,y:50}
    };
});