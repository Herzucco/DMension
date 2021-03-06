define(["../../loader/libraries/puppets", "../game"], function(Puppets, Game){
    function parse(parser, relativePosition, context, cameraPosition, world, phase){
        var length = Object.keys(parser.shapes).length;
        Game.observer.trigger('tileInit', [length])
        for(var i in parser.shapes){
            var shape = parser.shapes[i];
            if(shape.lowerLeft.y > shape.upperLeft.y && shape.upperRight.x > shape.upperLeft.x){
                var box;
                if (shape.color.red === 255 && shape.color.green === 0 && shape.color.blue === 0){
                    box = Puppets.createEntity("simpleBox2dBox", {
                        renderBox : {
                            color : "rgba("+shape.color.red+","+shape.color.green+","+shape.color.blue+","+shape.color.alpha+")",
                            context : context,
                            cameraPosition : cameraPosition
                        },
                        b2polygon : {
                            world : world,
                            width : (shape.upperRight.x - shape.upperLeft.x +16)/SCALE/2,
                            height : (shape.lowerLeft.y - shape.upperLeft.y +16)/SCALE/2,
                            dynamic : false,
                            x : ((shape.upperLeft.x+((shape.upperRight.x-shape.upperLeft.x)/2))+relativePosition.x)/SCALE,
                            y : ((shape.upperLeft.y+((shape.lowerLeft.y-shape.upperLeft.y)/2))+relativePosition.y)/SCALE,
                        }
                    });
                }
                else if (shape.color.red === 0 && shape.color.green === 255 && shape.color.blue === 0){
                    box = Puppets.createEntity("crossableBox", {
                        renderBox : {
                            color : "rgba("+shape.color.red+","+shape.color.green+","+shape.color.blue+","+shape.color.alpha+")",
                            context : context,
                            cameraPosition : cameraPosition
                        },
                        b2polygon : {
                            world : world,
                            width : (shape.upperRight.x - shape.upperLeft.x +16)/SCALE/2,
                            height : (shape.lowerLeft.y - shape.upperLeft.y +16)/SCALE/2,
                            dynamic : false,
                            x : ((shape.upperLeft.x+((shape.upperRight.x-shape.upperLeft.x)/2))+relativePosition.x)/SCALE,
                            y : ((shape.upperLeft.y+((shape.lowerLeft.y-shape.upperLeft.y)/2))+relativePosition.y)/SCALE,
                        }
                    });
                }
                else if (shape.color.red === 0 && shape.color.green === 0 && shape.color.blue === 255){
                    box = Puppets.createEntity("fallingBox", {
                        renderBox : {
                            color : "rgba("+shape.color.red+","+shape.color.green+","+shape.color.blue+","+shape.color.alpha+")",
                            context : context,
                            cameraPosition : cameraPosition
                        },
                        b2polygon : {
                            world : world,
                            width : (shape.upperRight.x - shape.upperLeft.x +16)/SCALE/2,
                            height : (shape.lowerLeft.y - shape.upperLeft.y +16)/SCALE/2,
                            dynamic : false,
                            x : ((shape.upperLeft.x+((shape.upperRight.x-shape.upperLeft.x)/2))+relativePosition.x)/SCALE,
                            y : ((shape.upperLeft.y+((shape.lowerLeft.y-shape.upperLeft.y)/2))+relativePosition.y)/SCALE,
                        }
                    });
                }
                else if (shape.color.red === 0 && shape.color.green === 255 && shape.color.blue === 255){
                    box = Puppets.createEntity("deathPlatform", {
                        renderBox : {
                            color : "rgba("+shape.color.red+","+shape.color.green+","+shape.color.blue+","+shape.color.alpha+")",
                            context : context,
                            cameraPosition : cameraPosition
                        },
                        b2polygon : {
                            world : world,
                            width : (shape.upperRight.x - shape.upperLeft.x +16)/SCALE/2,
                            height : (shape.lowerLeft.y - shape.upperLeft.y +16)/SCALE/2,
                            dynamic : false,
                            x : ((shape.upperLeft.x+((shape.upperRight.x-shape.upperLeft.x)/2))+relativePosition.x)/SCALE,
                            y : ((shape.upperLeft.y+((shape.lowerLeft.y-shape.upperLeft.y)/2))+relativePosition.y)/SCALE,
                        },
                        collisionReaction : {
                            onEndContact : function(other, contact){ 
                                if(other.components.collisionReaction.enabled && other.components.collisionReaction.tag === "player")
                                    Puppets.removeComponent(this.entity, "particleEmitter");
                            },
                        }
                    });
                }
                else if (shape.color.red === 255 && shape.color.green === 0 && shape.color.blue === 255){
                    box = Puppets.createEntity("gaugeCollectible", {
                        draw : {
                            image : Game.imagesController.images.paintPot,
                            context : context,
                            cameraPosition : cameraPosition
                        },
                        b2polygon : {
                            world : world,
                            width : (shape.upperRight.x - shape.upperLeft.x +16)/SCALE,
                            height : (shape.lowerLeft.y - shape.upperLeft.y +16)/SCALE,
                            dynamic : false,
                            x : ((shape.upperLeft.x+((shape.upperRight.x-shape.upperLeft.x)/2))+relativePosition.x)/SCALE,
                            y : ((shape.upperLeft.y+((shape.lowerLeft.y-shape.upperLeft.y)/2))+relativePosition.y)/SCALE,
                        },
                        collisionReaction : {
                            onEndContact : function(other, contact){ 
                                if(other.components.collisionReaction.tag === "player")
                                    Puppets.removeComponent(other.entity, "particleEmitter");
                            },
                        }
                    });
                    Game.observer.on('checkpoint', function(){
                        var components = Puppets.getComponents(this)[0];
                        components.collisionReaction.enabled = true;
                        components.draw.enabled = true;
                    }, box);
                }
                else if (shape.color.red === 255 && shape.color.green === 255 && shape.color.blue === 0){
                    box = Puppets.createEntity("checkPoint", {
                        b2polygon : {
                            world : world,
                            x : (shape.upperLeft.x+((shape.upperRight.x-shape.upperLeft.x)/2))/SCALE,
                            y : (shape.upperLeft.y+((shape.lowerLeft.y-shape.upperLeft.y)/2))/SCALE,
                             width : (shape.upperRight.x - shape.upperLeft.x + 16)/SCALE/2,
                            height : (shape.lowerLeft.y - shape.upperLeft.y + 16)/SCALE/2,
                            restitution : 0.2,
                            friction : 0,
                        },
                        collisionReaction : {
                            onEndContact : function(other, contact){ 
                                if(other.components.collisionReaction.enabled && other.components.collisionReaction.tag === "player")
                                    Puppets.removeComponent(this.entity, "particleEmitter");
                            },
                        }
                    });
                    var display = Puppets.createEntity("specialdraw", {
                        size : {width : 192, height : 192},
                        draw : {
                            image : Game.imagesController.images.totemIdle,
                            context : context,
                            cameraPosition : cameraPosition,
                        },
                        position : {
                            x : (shape.upperLeft.x - 96),
                            y : (shape.lowerLeft.y-140),
                        }
                    }, "world");
                    Puppets.getComponents(box)[0].b2polygon.display = display;
                }
                if(box){
                    Puppets.addComponent(box, "phase", {
                        currentPhase : phase,
                        defaultPhase : phase
                    });
                }
            }
            Game.observer.trigger('tileLoaded');
        }
    }

    return parse;
});