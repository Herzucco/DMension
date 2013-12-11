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
        //console.log(renderBox);
        if(fadeInFadeOut.fading === "in"){
            fadeInFadeOut.currentAlpha += 1/(fadeInFadeOut.time*60);
            if(fadeInFadeOut.currentAlpha > 1){
            	fadeInFadeOut.currentAlpha = 1;
                fadeInFadeOut.fading = "out";
                if(!fadeInFadeOut.loop)
                    fadeInFadeOut.onAnimationMiddle();
            }
        }
        else if (fadeInFadeOut.fading === "out"){
            fadeInFadeOut.currentAlpha -= 1/(fadeInFadeOut.time*60);
            if(fadeInFadeOut.currentAlpha < 0){
                fadeInFadeOut.currentAlpha = 0;
                if(fadeInFadeOut.loop)
                    fadeInFadeOut.fading = "in";
                else
                    fadeInFadeOut.onAnimationEnd();
            }
        }
        renderBox.color = "rgba("+fadeInFadeOut.red+","+fadeInFadeOut.green+","+fadeInFadeOut.blue+","+fadeInFadeOut.currentAlpha+")";
    }, {components : ["fadeInFadeOut", "renderBox"]});
})