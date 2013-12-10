define(["../loader/libraries/puppets"], function(Puppets){
    Puppets.entity("dialogueScene", {components :[
            "dialogueScene"
        ]})
    Puppets.component("dialogueRole", function(data, entity){
        var component = {
            relativePosition : data.relativePosition || {
                x : 0,
                y : 0
            },
            textColor : data.textColor || "white",
            role : data.role || "",
            talking : data.talking || false,
            text : data.text || false, 
            context : data.context,
            cameraPosition : data.cameraPosition || {
                x : 0,
                y : 0
            },
            font : data.font || "normal 10px Arial",
            baseline : data.baseline || "top",
            textAlign : data.textAlign || "center",
            entity : entity,
        }

        return component;
    });

    Puppets.component("dialogueScene", function(data, entity){
        var _self = this.data;
        var component = {
            text : data.text || [],
            delay : data.delay || 0,
            roles : data.roles || {},
            didascalies : data.didascalies || [],
            currentStep : 0
        }

        var textSteps = _self.computeText(component.text);
        component.textSteps = textSteps;
        return component;
    }, {computeText : function(text){
        var steps = [];
        for(var i = 0; i < text.length; i++){
            var explode = text[i].split('|');
            var step = {
                roles : {},
                didascalies : [],
            };
            var didascalies = [];
            for(var x = 0; x < explode.length; x+=2){
                var textAndStyle = (explode[x+1].replace(/^\s+/g,'').replace(/\s+$/g,'')).split("//");
                var txt = textAndStyle.shift();
                var delay = undefined;
                if(txt.split("=>").length > 1){
                    var didascaly = parseInt(txt.split("=>")[1]);
                    if(txt.split("=>")[1].split("$").length > 1){
                        delay = parseInt(txt.split("=>")[1].split("$")[1]);
                    }
                    txt = txt.split("=>")[0];
                    didascalies.push(didascaly);
                }
                else if(textAndStyle.length > 0 && textAndStyle[0].split("=>").length > 1){
                    var didascaly = parseInt(textAndStyle[0].split("=>")[1]);
                    if(textAndStyle[0].split("=>")[1].split("$").length > 1){
                        delay = parseInt(textAndStyle[0].split("=>")[1].split("$")[1]);
                    };
                    textAndStyle[0] = textAndStyle[0].split("=>")[0];
                    didascalies.push(didascaly);
                }
                else if(txt.split("$").length > 1){
                    delay = parseInt(txt.split("$")[1]);
                    txt = txt.split("$")[0];
                }
                else if(textAndStyle.length > 0 && textAndStyle[0].split("$").length > 1){
                    delay = parseInt(textAndStyle[0].split("$")[1]);
                    textAndStyle[0] = textAndStyle[0].split("$")[0];
                }
                var styles = {};
                for(var u = 0; u < textAndStyle.length; u++){
                    var styleProperties = textAndStyle[u].split(",");
                    for(var y = 0; y < styleProperties.length; y++){
                        var styleProperty = styleProperties[y].split(":");
                        var property = styleProperty[0].replace(/ /g,'');
                        var style = styleProperty[1];
                        styles[property] = style;
                    }
                }
                step.roles[explode[x].replace(/ /g,'')] = {
                    text : txt.replace(/^\s+/g,'').replace(/\s+$/g,''),
                    style : styles,
                    delay : delay,
                };
            }
            step.didascalies = didascalies;
            step.delay = delay;
            steps.push(step);
        }
        return steps;
    }});

    Puppets.system("dialogue", function(dialogueScene, entity){
        if(dialogueScene.currentStep === 0){
            var step = dialogueScene.textSteps[dialogueScene.currentStep];
            var roles = {};
            var lastRoles = {};
            for(var i in step.roles){
                roles[i] = dialogueScene.roles[i];
                dialogueScene.roles[i].dialogueRole.text = step.roles[i];
            }
            for(var i = 0; i < step.didascalies.length; i++){
                dialogueScene.didascalies[step.didascalies[i]](lastRoles, roles, dialogueScene.roles)
            }
        }
        if(!Puppets.getComponents(entity)[0].delay && dialogueScene.delay){
            Puppets.addComponent(entity, "delay", {
                delay : dialogueScene.textSteps[dialogueScene.currentStep].delay || dialogueScene.delay,
                onEnd : function(){
                    var dialogueScene = this.components.dialogueScene;
                    dialogueScene.currentStep++;

                    var step = dialogueScene.textSteps[dialogueScene.currentStep];
                    var roles = {};
                    var lastRoles = {};
                    if(dialogueScene.currentStep >= dialogueScene.textSteps.length){
                        for(var i in dialogueScene.roles){
                            var components = dialogueScene.roles[i];
                            var entity = components.dialogueRole.entity;
                            Puppets.removeComponent(entity, "dialogueRole");
                        }
                        Puppets.removeEntity(this.entity);
                        return;
                    }

                    for(var i in dialogueScene.roles){
                        if(dialogueScene.roles[i].dialogueRole.text)
                            lastRoles[i] = dialogueScene.roles[i];

                        dialogueScene.roles[i].dialogueRole.text = false;
                    }
                    for(var i in step.roles){
                        roles[i] = dialogueScene.roles[i];
                        dialogueScene.roles[i].dialogueRole.text = step.roles[i];
                    }

                    for(var i = 0; i < step.didascalies.length; i++){
                        dialogueScene.didascalies[step.didascalies[i]](lastRoles, roles, dialogueScene.roles)
                    }
                }
            })
        }
    }, {components : ["dialogueScene"]})

    Puppets.system("drawRole", function(dialogueRole, position){
        if(dialogueRole.text){
            var drawPosition = {
                x : (position.x + dialogueRole.relativePosition.x)-dialogueRole.cameraPosition.x,
                y : (position.y + dialogueRole.relativePosition.y)-dialogueRole.cameraPosition.y,
            }

            var context = dialogueRole.context;
            var style = dialogueRole.text.style;
            var text = dialogueRole.text.text;

            context.fillStyle = style.textColor || dialogueRole.textColor;
            context.font      = style.font || dialogueRole.font;
            context.baseline = style.baseline || dialogueRole.baseline;
            context.textAlign = style.textAlign || dialogueRole.textAlign;
            var length = context.measureText(dialogueRole.text);

            context.fillText(text, drawPosition.x, drawPosition.y);
        }
    }, {components : ["dialogueRole", "position"]})
});