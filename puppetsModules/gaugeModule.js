define(["../loader/libraries/puppets"], function(Puppets){
    Puppets.entity("gauge", {components : [
            "size",
            "position",
            "gaugeComponent",
            "clickable"
        ]})
    Puppets.component("gaugeComponent", function(data, entity){
        var component = {
            color : data.color || "green",
            context : data.context,
            strokeColor : data.strokeColor || "black",
            currentValue : data.currentValue || data.valueMax || 0,
            valueMax : data.valueMax || data.currentValue || 0,
            valueMin : data.valueMin || data.currentValue || 0,
            onEmpty : data.onEmpty || function(){},
            onFull : data.onFull || function(){},
            onFullToStable : data.onFullToStable || function(){},
            onEmptyToStable : data.onEmptyToStable || function(){}
        }
        return component;
    });

    Puppets.system("drawGauge", function(position, size, gaugeComponent, entity){
       var context = gaugeComponent.context;
       if(context !== undefined){
            var strokeColor = gaugeComponent.strokeColor;

            context.strokeStyle = strokeColor;
            context.strokeRect(position.x, position.y, size.width, size.height);

            var color = gaugeComponent.color;
            var height = gaugeComponent.currentValue/gaugeComponent.valueMax*size.height;
            var positionY = position.y + (size.height - height);

            context.fillStyle = color;
            context.fillRect(position.x, positionY, size.width, height);
       }
    }, {components : ["position", "size", "gaugeComponent"]})
    Puppets.system("checkGauge", function(gaugeComponent, entity){
        var contextToApply = {
            entity : entity,
            components : Puppets.getComponents(entity)[0]
        }
       if(gaugeComponent.currentValue >= gaugeComponent.valueMax){
            gaugeComponent.full = true;
            gaugeComponent.onFull.call(contextToApply);
       }
       else if(gaugeComponent.currentValue <= gaugeComponent.valueMin){
            gaugeComponent.empty = true;
            gaugeComponent.onEmpty.call(contextToApply);
       }
       else{
            if(gaugeComponent.full){
                gaugeComponent.full = false;
                gaugeComponent.onFullToStable.call(contextToApply);
            }
            else if(gaugeComponent.empty){
                gaugeComponent.empty = false;
                gaugeComponent.onEmptyToStable.call(contextToApply);
            }
       }
    }, {components : ["gaugeComponent"]})
});