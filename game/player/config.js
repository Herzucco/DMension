define(["../game"], function(Game){
    var constants = Game.constants;

    console.log(Game.levelController)
    return function(){
        return {
            data : {
                b2polygon : {
                    world : Game.worldController.world,
                    x : Game.levelController.levelList[Game.levelController.currentLevel].playerStart.x,
                    y : Game.levelController.levelList[Game.levelController.currentLevel].playerStart.y,
                    dynamic : true,
                    width : 50/constants.SCALE,
                    height : 50/constants.SCALE
                },
                draw : {
                    context : Game.canvasController.mainCanvas.components.canvasContext.context,
                    cameraPosition : Game.cameraController.components.position,
                    scale : Game.cameraController.components.focus.scale
                },
                colorColliderBox : {
                    tag : "player",
                    colorAccuracy : 5, 
                    onColorCollisionEnter : function(colors){
                        if(colors.r === 255 && colors.g === 0 && colors.b === 0){
                            Puppets.addComponent(this.id, "b2accelerate", { speed : -200});
                            Puppets.addComponent(this.id, "b2reverseGravity", { speed : -10 });
                        }
                        else if(colors.g ===255 && colors.r === 0){
                            Puppets.addComponent(this.id, "b2reverseGravity", { speed : -30 });
                        }
                        else if(colors.g ===0 && colors.b === 255 && colors.r === 0){
                            Puppets.addComponent(this.id, "b2accelerate", {speed : 200});
                            Puppets.addComponent(this.id, "b2reverseGravity", { speed : -10 });
                        }   
                        else if(colors.r === 255 && colors.g === 0 && colors.b === 255){
                            Puppets.addComponent(this.id, "b2reverseGravity", { speed : 30});
                        }
                    },
                    onColorCollisionExit : function(colors){
                        Puppets.removeComponent(this.id, "b2reverseGravity");
                        Puppets.removeComponent(this.id, "b2accelerate");   
                    },
                        testWidth : constants.WIDTH,
                        data : constants.COLORS_PIXELS
                },
                gaugeComponent : {
                    valueMax : constants.playerMaxLife,
                    onEmpty : function(){
                        Puppets.addComponent(this.entity, "BODYTODESTROY", {});
                        console.log(this.components.particleEmitter);
                        for(var i in this.components){
                            if(i !== "BODYTODESTROY" && i !== "b2polygon" && i !== "particleEmitter"  && i !== "position")
                                this.components[i].enabled = false;
                        };
                        var _self = this;
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
                                                                    context : _self.components.draw.context,
                                                                }
                                                            }, "UI");
                        Puppets.addComponent(fade, "fadeInFadeOut", {
                            onAnimationMiddle : function(){
                                for(var i in _self.components){
                                    _self.components[i].enabled = true;
                                };
                                _self.components.gaugeComponent.currentValue = _self.components.gaugeComponent.valueMax;

                                if(_self.components.position.lastPosition !== undefined)
                                    var newPosition = { x : _self.components.position.lastPosition.x/SCALE, y : _self.components.position.lastPosition.y/SCALE};
                                else
                                    var newPosition = {x : 3, y : 80};

                                Puppets.addComponent(_self.entity, "b2polygon", {
                                    world : Game.worldController.world,
                                    x :newPosition.x,
                                    y :newPosition.y,
                                    width : 50/SCALE,
                                    dynamic : true,
                                    friction : 0,
                                    height : 50/SCALE
                                });
                                Puppets.removeComponent(_self.entity, 'particleEmitter')
                            },
                            time : 2,
                            onAnimationEnd : function(){
                                Puppets.removeEntity(this.entity);
                            }
                        });
                    }
                },
                collisionReaction : {
                    tag : "player",
                    onPreSolve : function(){
                    }
                },
            },
            collection : "dynamics",
            image : 'character.png'
        };
    };
});