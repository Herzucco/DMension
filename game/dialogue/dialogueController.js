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
        }, this);
        Game.observer.on("dialogueTwo", function(){
            this.dialogueTwo();
        }, this);
        Game.observer.on("dialogueThree", function(){
            this.dialogueThree();
        }, this);
        Game.observer.on("dialogueFour", function(){
            this.dialogueFour();
        }, this);
        Game.observer.on("dialogueFive", function(){
            this.dialogueFive();
        }, this)
        Game.observer.on("dialogueSix", function(){
            this.dialogueSix();
        }, this)
        Game.observer.on("dialogueSeven", function(){
            this.dialogueSeven();
        }, this)
        Game.observer.on("dialogueEight", function(){
            this.dialogueEight();
        }, this)
    }

    DialogueController.prototype.dialogueOne = function(){
    var speaker = Puppets.createEntity("box",{position : {x :300, y :100}}, 'canvas');
        Puppets.addComponent(speaker, "dialogueRole", {
            context : Game.canvasController.mainCanvas.components.canvasContext.context,
            cameraPosition : {x : 0, y : 0},
            relativePosition : {
                x : 0,
                y : 0
            },
            font : "normal 20px Verdana",
        });

        Puppets.addComponent(this.dialogueScene.entity, "dialogueScene", {
            roles : {
                speaker : Puppets.getComponents(speaker)[0],
            },
            text : config.dialogueOne.text,
            delay : config.dialogueOne.delay,
            didascalies : config.dialogueOne.didascalies
        });
    }

    DialogueController.prototype.dialogueTwo = function(){
    var speaker = Puppets.createEntity("box",{position : {x :300, y :100}}, 'canvas');
        Puppets.addComponent(speaker, "dialogueRole", {
            context : Game.canvasController.mainCanvas.components.canvasContext.context,
            cameraPosition : {x : 0, y : 0},
            relativePosition : {
                x : 0,
                y : 0
            },
            font : "normal 20px Verdana",
        });

        Puppets.addComponent(this.dialogueScene.entity, "dialogueScene", {
            roles : {
                speaker : Puppets.getComponents(speaker)[0],
            },
            text : config.dialogueTwo.text,
            delay : config.dialogueTwo.delay,
            didascalies : config.dialogueTwo.didascalies
        });
    }

    DialogueController.prototype.dialogueThree = function(){
    var speaker = Puppets.createEntity("box",{position : {x :300, y :100}}, 'canvas');
        Puppets.addComponent(speaker, "dialogueRole", {
            context : Game.canvasController.mainCanvas.components.canvasContext.context,
            cameraPosition : {x : 0, y : 0},
            relativePosition : {
                x : 0,
                y : 0
            },
            font : "normal 20px Verdana",
        });

        Puppets.addComponent(this.dialogueScene.entity, "dialogueScene", {
            roles : {
                speaker : Puppets.getComponents(speaker)[0],
            },
            text : config.dialogueThree.text,
            delay : config.dialogueThree.delay,
            didascalies : config.dialogueThree.didascalies
        });
    }

    DialogueController.prototype.dialogueFour = function(){
    var speaker = Puppets.createEntity("box",{position : {x :300, y :100}}, 'canvas');
        Puppets.addComponent(speaker, "dialogueRole", {
            context : Game.canvasController.mainCanvas.components.canvasContext.context,
            cameraPosition : {x : 0, y : 0},
            relativePosition : {
                x : 0,
                y : 0
            },
            font : "normal 20px Verdana",
        });

        Puppets.addComponent(this.dialogueScene.entity, "dialogueScene", {
            roles : {
                speaker : Puppets.getComponents(speaker)[0],
            },
            text : config.dialogueFour.text,
            delay : config.dialogueFour.delay,
            didascalies : config.dialogueFour.didascalies
        });
    }

    DialogueController.prototype.dialogueFive = function(){
    var speaker = Puppets.createEntity("box",{position : {x :300, y :100}}, 'canvas');
        Puppets.addComponent(speaker, "dialogueRole", {
            context : Game.canvasController.mainCanvas.components.canvasContext.context,
            cameraPosition : {x : 0, y : 0},
            relativePosition : {
                x : 0,
                y : 0
            },
            font : "normal 20px Verdana",
        });

        Puppets.addComponent(this.dialogueScene.entity, "dialogueScene", {
            roles : {
                speaker : Puppets.getComponents(speaker)[0],
            },
            text : config.dialogueFive.text,
            delay : config.dialogueFive.delay,
            didascalies : config.dialogueFive.didascalies
        });
    }

    DialogueController.prototype.dialogueSix = function(){
    var speaker = Puppets.createEntity("box",{position : {x :300, y :100}}, 'canvas');
        Puppets.addComponent(speaker, "dialogueRole", {
            context : Game.canvasController.mainCanvas.components.canvasContext.context,
            cameraPosition : {x : 0, y : 0},
            relativePosition : {
                x : 0,
                y : 0
            },
            font : "normal 20px Verdana",
        });

        Puppets.addComponent(this.dialogueScene.entity, "dialogueScene", {
            roles : {
                speaker : Puppets.getComponents(speaker)[0],
            },
            text : config.dialogueSix.text,
            delay : config.dialogueSix.delay,
            didascalies : config.dialogueSix.didascalies
        });
    }

    DialogueController.prototype.dialogueSeven = function(){
    var speaker = Puppets.createEntity("box",{position : {x :300, y :100}}, 'canvas');
        Puppets.addComponent(speaker, "dialogueRole", {
            context : Game.canvasController.mainCanvas.components.canvasContext.context,
            cameraPosition : {x : 0, y : 0},
            relativePosition : {
                x : 0,
                y : 0
            },
            font : "normal 20px Verdana",
        });

        Puppets.addComponent(this.dialogueScene.entity, "dialogueScene", {
            roles : {
                speaker : Puppets.getComponents(speaker)[0],
            },
            text : config.dialogueSeven.text,
            delay : config.dialogueSeven.delay,
            didascalies : config.dialogueSeven.didascalies
        });
    }

    DialogueController.prototype.dialogueEight = function(){
    var speaker = Puppets.createEntity("box",{position : {x :300, y :50}}, 'canvas');
        Puppets.addComponent(speaker, "dialogueRole", {
            context : Game.canvasController.mainCanvas.components.canvasContext.context,
            cameraPosition : {x : 0, y : 0},
            relativePosition : {
                x : 0,
                y : 0
            },
            font : "normal 20px Verdana",
        });

        Puppets.addComponent(this.dialogueScene.entity, "dialogueScene", {
            roles : {
                speaker : Puppets.getComponents(speaker)[0],
            },
            text : config.dialogueEight.text,
            delay : config.dialogueEight.delay,
            didascalies : config.dialogueEight.didascalies
        });
    }

    return new DialogueController(config);
});
