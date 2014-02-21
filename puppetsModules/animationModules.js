define(["../loader/libraries/box2d", "../loader/libraries/puppets"], function(Box2D, Puppets){
    Puppets.component("fadeInFadeOut", function(data, entity, undefined){
        return{
            time : data.time || 1,
            loop : data.loop || false,
            red : data.red || 0,
            green : data.green || 0,
            blue : data.blue || 0,
            onAnimationMiddle : data.onAnimationMiddle || function(){},
            onAnimationEnd : data.onAnimationEnd || function(){},
            currentAlpha : 0,
            fading : "in"
       };
    });
    Puppets.system("fadeInFadeOut", function(fadeInFadeOut, renderBox, entity){
        var contextToApply = {
            entity : entity,
            components : Puppets.getComponents(entity)[0]
        }
        if(fadeInFadeOut.fading === "in"){
            fadeInFadeOut.currentAlpha += 1/(fadeInFadeOut.time*60);
            if(fadeInFadeOut.currentAlpha > 1){
                fadeInFadeOut.currentAlpha = 1;
                fadeInFadeOut.fading = "out";
                if(!fadeInFadeOut.loop)
                    fadeInFadeOut.onAnimationMiddle.call(contextToApply);
            }
        }
        else if (fadeInFadeOut.fading === "out"){
            fadeInFadeOut.currentAlpha -= 1/(fadeInFadeOut.time*60);
            fadeInFadeOut.currentAlpha = Math.floor(fadeInFadeOut.currentAlpha*1000)/1000;
            if(fadeInFadeOut.currentAlpha < 0){
                fadeInFadeOut.currentAlpha = 0.01;
                if(fadeInFadeOut.loop)
                    fadeInFadeOut.fading = "in";
                else
                    fadeInFadeOut.onAnimationEnd.call(contextToApply);
            }
        }
        renderBox.color = "rgba("+fadeInFadeOut.red+","+fadeInFadeOut.green+","+fadeInFadeOut.blue+","+fadeInFadeOut.currentAlpha+")";
    }, {components : ["fadeInFadeOut", "renderBox"]});

    Puppets.component("particleEmitter", function(data, entity, undefined){
        return{
            context : data.context,
            cameraPosition : data.cameraPosition,
            count : data.count || 10,
            colors : data.colors || [{r : 0, rRandomize : 0, g : 0, gRandomize : 0, b : 0, bRandomize : 0, a : 1, aRandomize : 0}],
            size : data.size || {size : 1, randomize : 0.5},
            lifetime : data.lifetime || 2,
            speed : data.speed || {xSpeed : 1, xRandomize : 0.5, ySpeed : 1, yRandomize : 0.5 }
        }
    })
    Puppets.system("particleEmitting", function(particleEmitter, position, entity){
        if(!particleEmitter.activated){
            for(var j = 0; j < particleEmitter.count; j++){
                particleEmitter.size.size = particleEmitter.size.size + (Math.random()*particleEmitter.size.randomize*2)-particleEmitter.size.randomize;
                var randomizedColorsTab = [];
                for(var i = 0; i < particleEmitter.colors.length; i++){
                    var randomizedRed = Math.floor(particleEmitter.colors[i].r + (Math.random()*particleEmitter.colors[i].rRandomize*2)-particleEmitter.colors[i].rRandomize);
                    if(randomizedRed > 255)
                        randomizedRed = 255;
                    else if (randomizedRed < 0)
                        randomizedRed = 0;
                    var randomizedGreen = Math.floor(particleEmitter.colors[i].g + (Math.random()*particleEmitter.colors[i].gRandomize*2)-particleEmitter.colors[i].gRandomize);
                    if(randomizedGreen > 255)
                        randomizedGreen = 255;
                    else if (randomizedGreen < 0)
                        randomizedGreen = 0;
                    var randomizedBlue = Math.floor(particleEmitter.colors[i].b + (Math.random()*particleEmitter.colors[i].bRandomize*2)-particleEmitter.colors[i].bRandomize);
                    if(randomizedBlue > 255)
                        randomizedBlue = 255;
                    else if (randomizedBlue < 0)
                        randomizedBlue = 0;
                    var randomizedAlpha = particleEmitter.colors[i].a + (Math.random()*particleEmitter.colors[i].aRandomize*2)-particleEmitter.colors[i].aRandomize;
                    if(randomizedAlpha > 1)
                        randomizedAlpha = 1;
                    else if (randomizedAlpha < 0)
                        randomizedAlpha = 0;
                    var randomizedColor = "rgba("+randomizedRed+","+randomizedGreen+","+randomizedBlue+","+randomizedAlpha+")";
                    randomizedColorsTab.push(randomizedColor);
                }
                var finallyChosenColor = randomizedColorsTab[Math.floor(Math.random()*randomizedColorsTab.length)];
                var particle = Puppets.createEntity("box",   {      size : {width : particleEmitter.size.size, height : particleEmitter.size.size},
                                                                    position : position,
                                                                    renderBox : {
                                                                        context : particleEmitter.context,
                                                                        color : finallyChosenColor,
                                                                        strokeColor : finallyChosenColor,
                                                                        cameraPosition : particleEmitter.cameraPosition
                                                                    }
                }, "UI");
                Puppets.addComponent(particle, "delay", {   delay : particleEmitter.lifetime,
                                                            onEnd : function(){Puppets.removeEntity(this.entity)}
                });
                Puppets.addComponent(particle, "velocity", {x : particleEmitter.speed.xSpeed + (Math.random()*particleEmitter.speed.xRandomize*2)-particleEmitter.speed.xRandomize,
                                                            y : particleEmitter.speed.ySpeed + (Math.random()*particleEmitter.speed.yRandomize*2)-particleEmitter.speed.yRandomize
                })
            }
        }
        particleEmitter.activated = true;
        //Puppets.removeComponent(entity, "particleEmitter");
    }, {components : ["particleEmitter", "position"]})
})