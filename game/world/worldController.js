define(["../../loader/libraries/puppets", "../game", "./config"], function(Puppets, Game, config){
    var getColorAt = function(position, width, data){
            var index = ((position.x | 0) + (position.y | 0) * width);

            if (data === null || index < 0 || index >= data.length)
                return null;


            return {index:index, r:data[index] >> 24 & 0xff,g:data[index] >> 16 & 0xff,b:data[index] >> 8 & 0xff,a:data[index] & 0xff};
        };
	var WorldController  = function(config){
		this.config = config;
	}

	WorldController.prototype.init = function(){
		var mainCanvas = Game.canvasController.mainCanvas.components;

		this.config.context = mainCanvas.canvasContext.context;
		var worldEntity = Puppets.createEntity("b2World", {world : this.config});
		var world = Puppets.getComponents(worldEntity)[0].world.world;

        Puppets.createEntity("b2listener", {
            b2listener : {
                world : world,
                preSolve : function(contact, manifold){
                    var t = new Box2D.Collision.b2WorldManifold();
                    contact.GetWorldManifold(t)
                            
                    var entities = [ contact.GetFixtureA().GetBody().GetUserData().entity, contact.GetFixtureB().GetBody().GetUserData().entity ];
                    var componentsA = { components : Puppets.getComponents(entities[0])[0], entity : entities[0]};
                    var componentsB = { components : Puppets.getComponents(entities[1])[0], entity : entities[1]};
                    if(componentsA.components.hasOwnProperty("colorColliderBox") && componentsB.components.hasOwnProperty("colorColliderBox")){
                        var player, other;
                        if(componentsA.components.hasOwnProperty("parentEntity")){
                            player = componentsA;
                            other = componentsB;
                        }
                        else if(componentsB.components.hasOwnProperty("parentEntity")){
                            player = componentsB;
                            other = componentsA;
                        }
                        if(player){
                            if(other.components.phase.currentPhase !== other.components.phase.defaultPhase &&
                                player.components.parentEntity.child.phase.currentPhase === other.components.phase.currentPhase){
                                contact.SetEnabled( false );
                                if(other.components.hasOwnProperty("collisionReaction")){
                                    other.components.collisionReaction.flag = true;
                                }
                                return;
                            }
                        }
                        else{
                            if(componentsA.components.colorColliderBox.currentColor === componentsB.components.colorColliderBox.currentColor){
                                contact.SetEnabled( false );
                                return;
                            }
                        }
                    }
                    if(componentsA.components.hasOwnProperty("collisionReaction")){
                        componentsA.components.collisionReaction.onPreSolve.call(componentsA, componentsB, contact);
                    }
                    if(componentsB.components.hasOwnProperty("collisionReaction")){
                        componentsB.components.collisionReaction.onPreSolve.call(componentsB, componentsA, contact);
                    }
                },
                beginContact : function(contact, manifold){
                    var entities = [ contact.GetFixtureA().GetBody().GetUserData().entity, contact.GetFixtureB().GetBody().GetUserData().entity ];
                    var componentsA = { components : Puppets.getComponents(entities[0])[0], entity : entities[0]};
                    var componentsB = { components : Puppets.getComponents(entities[1])[0], entity : entities[1]};
                    if(componentsA.components.hasOwnProperty("collisionReaction")){
                        if(!componentsA.components.collisionReaction.flag){
                            componentsA.components.collisionReaction.onBeginContact.call(componentsA, componentsB, contact);
                        }
                        componentsA.components.collisionReaction.flag = false;
                    }
                    if(componentsB.components.hasOwnProperty("collisionReaction")){
                        if(!componentsB.components.collisionReaction.flag){
                            componentsB.components.collisionReaction.onBeginContact.call(componentsB, componentsA, contact);
                        }
                        componentsB.components.collisionReaction.flag = false;
                    }
                }
            }
        });

		this.world = world;
		this.entity = worldEntity;
	}

	return new WorldController(config);
});