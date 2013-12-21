define(["../../loader/libraries/puppets", "../game", "./config"], function(Puppets, Game, config){
    var DialogueController = function(config){
        this.config = config;
    };

    DialogueController.prototype.init = function(){
        var _self = this;

        var entity = Puppets.createEntity("empty", {});

        this.dialogueScene = {
            entity : entity,
            components : Puppets.getComponents(entity)[0]
        }

        this.setEvents();
    }

    DialogueController.prototype.setEvents = function(){
        var _self = this;

        Game.observer.on("dialogueOne", function(){
            this.dialogueOne();
        }, this)
    }

    DialogueController.prototype.dialogueOne = function(){
        Puppets.addComponent(Game.playerController.player.entity, "dialogueRole", {
            context : Game.canvasController.mainCanvas.components.canvasContext.context,
            cameraPosition : Game.cameraController.components.position,
            relativePosition : {
                x : 0,
                y : -20
            },
            font : "normal 20px Verdana",
        });

        Game.playerController.player.components = Puppets.getComponents(Game.playerController.player.entity)[0];
        
        Puppets.addComponent(this.dialogueScene.entity, "dialogueScene", {
            roles : {
                player : Game.playerController.player.components,
            },
            text : config.dialogueOne.text,
            delay : config.dialogueOne.delay,
            didascalies : config.dialogueOne.didascalies
        });
    }

    return new DialogueController(config);
});
