Game.observer.on("kick", function(kick){
            Puppets.createEntity("simpleBox2dBox", {
                renderBox : {
                    color : "blue",
                    context : mainCanvas.canvasContext.context,
                    cameraPosition : cameraPosition
                },
                b2polygon : {
                    world : world,
                    width : kick*50/SCALE/2,
                    dynamic : false,
                    x :  (Math.random() * ((cameraPosition.x+600) - (cameraPosition.x+300)) + (cameraPosition.x+300))/SCALE >> 0,
                    y : (Math.random() * ((cameraPosition.y+400) - cameraPosition.y) + cameraPosition.y)/SCALE >> 0,
                    height : kick*50/SCALE/2
                }
            });
        });