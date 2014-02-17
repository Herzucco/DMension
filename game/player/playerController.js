define(["../../loader/libraries/puppets", "../game", "./config"], function(Puppets, Game, config){
    Puppets.entity("player", {
        components : [
            {b2polygon : {
                dynamic : true,
                friction : 0
            }},
            "size",
            "position",
            "rotation",
            "draw",
            "colorColliderBox",
            "collisionReaction",
            "gaugeComponent",
            "parentEntity"
        ]}
    );
    var PlayerController = function(config){
        this.config = config;
    };

    PlayerController.prototype.init = function(){
        var self = this;
        var image = new Image();
        image.src = config().image;
        image.onload = function(){
            var data = config().data;
            data.draw.image = image;
            var entity = Puppets.createEntity("player", data, config().collection);
            var child = self.createPlayerChild(entity);

            var player = Puppets.getComponents(entity)[0];

            player.parentEntity.child = Puppets.getComponents(child)[0];
            player.parentEntity.childEntity = child;

            self.player = {
                entity : entity,
                components : Puppets.getComponents(entity)[0]
            };
            self.setEvents(self.player);

            Game.cameraController.components.target.position = self.player.components.position;
        }
    }

    PlayerController.prototype.setEvents = function(player){
        Game.observer.on("pressSpace", function(){
            var _self = Puppets.getComponents(this)[0];
            var body = _self.b2polygon.body;
            if(_self.b2polygon.stopped){
                body.SetType(2);
                if(_self.b2polygon.force){
                    _self.b2polygon.force = body.SetLinearVelocity(_self.b2polygon.force);
                }
                _self.b2polygon.stopped = false;
            }
            else{
                _self.b2polygon.force = body.GetLinearVelocity();
                _self.b2polygon.force = { x : _self.b2polygon.force.x , y : _self.b2polygon.force.y}
                body.SetType(0);
                _self.b2polygon.stopped = true;
            }
        }, player.entity);
    }

    PlayerController.prototype.createPlayerChild = function(entity){
        var child = Puppets.createEntity("empty", {}, "UI")
        Puppets.addComponent(child, "childEntity", {
            parentEntity : entity,
            parent : Puppets.getComponents(entity)[0],
        });
        Puppets.addComponent(child, "position", {});
        Puppets.addComponent(child, "size", {});
        Puppets.addComponent(child, "rotation", {});
        Puppets.addComponent(child, "phase", {
            currentPhase : "mainCanvas",
            defaultPhase : "mainCanvas"
        });
        Puppets.addComponent(child, "colorColliderBox", {
            tag : "playerChild",
            colorAccuracy : 5, 
            onColorCollisionEnter : function(colors){
                this.components.phase.currentPhase = Game.canvasController.otherDimension.components.phase.currentPhase;
            },
            onColorCollisionExit : function(colors){
                this.components.phase.currentPhase = this.components.phase.defaultPhase;
            },
            testWidth : Game.constants.WIDTH,
            data : Game.constants.DIMENSION_PIXELS
        });
        Puppets.addComponent(child, "renderBox", {
            cameraPosition : Game.cameraController.components.position,
            color : "blue",
            //context :  Game.canvasController.mainCanvas.components.canvasContext.context,
        });

        return child;
    }

    return new PlayerController(config);
});