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
            {renderBox : {
                color : "red",

            }},
            "colorColliderBox",
            "collisionReaction",
            "gaugeComponent"
        ]}
    );
    var PlayerController = function(config){
        this.config = config;
    };

    PlayerController.prototype.init = function(){
        var entity = Puppets.createEntity("player", config().data, config().collection);
        this.player = {
            entity : entity,
            components : Puppets.getComponents(entity)[0]
        };
        this.setEvents(this.player);

        Game.cameraController.components.target.position = this.player.components.position;
    }

    PlayerController.prototype.setEvents = function(player){
        Game.observer.on("pressSpace", function(){
            var body = this.b2polygon.body;

            if(this.b2polygon.stopped){
                body.SetType(2);
                if(this.b2polygon.force){
                    this.b2polygon.force = body.SetLinearVelocity(this.b2polygon.force);
                }
                this.b2polygon.stopped = false;
            }
            else{
                this.b2polygon.force = body.GetLinearVelocity();
                this.b2polygon.force = { x : this.b2polygon.force.x , y : this.b2polygon.force.y}
                body.SetType(0);
                this.b2polygon.stopped = true;
            }
        }, player.components);
    }

    return new PlayerController(config);
});