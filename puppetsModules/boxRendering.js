define(["../loader/libraries/puppets", "./baseComponents"], function(Puppets){
	Puppets.entity("box", {components : [
			"size",
			"position",
			"renderBox"
		]});
    Puppets.entity("draw", {components : [
            "size",
            "position",
            "draw"
        ]});

	Puppets.component("renderBox", function(data, entity, undefined){
		return {context : data.context || null, color : data.color || "black", strokeColor : data.strokeColor || "black", clearBeforeRender : data.clearBeforeRender || false,
		 globalCompositeOperation : data.globalCompositeOperation || 'source-over', cameraPosition : data.cameraPosition || { x : 0, y :0}}
	});

    Puppets.component("cameraReplacer", function(data, entity){
        return{
            multiply : data.multiply || false,
            numberX : data.numberX || 1,
            numberY : data.numberY || 1,
            reference : {}
        };
    });

    Puppets.component("draw", function(data, entity){
        return {context : data.context || null, image : data.image, clearBeforeRender : data.clearBeforeRender || false,
         globalCompositeOperation : data.globalCompositeOperation || 'source-over', cameraPosition : data.cameraPosition || { x : 0, y :0},
        frameSize : data.frameSize, animationPosition : data.animationPosition || {x : 0, y : 0}}
    });

    Puppets.system("cameraReplacer", function(cameraReplacer, draw){
        if(cameraReplacer.reference.x === undefined){
            cameraReplacer.reference = draw.cameraPosition;
        }

        if(cameraReplacer.multiply){
            draw.cameraPosition = {
                x : cameraReplacer.reference.x * cameraReplacer.numberX,
                y : cameraReplacer.reference.y * cameraReplacer.numberY
            }
        }else{
            draw.cameraPosition = {
                x : cameraReplacer.reference.x + cameraReplacer.numberX,
                y : cameraReplacer.reference.y + cameraReplacer.numberY
            }
        }
    }, {components : ["cameraReplacer", "draw"]});
    Puppets.system("Draw", function(size, position, draw, entity){
        if(draw.context !== null && draw.image !== null)
        {
            var context = draw.context;
            var clearBeforeRender = draw.clearBeforeRender;
            var cameraPosition = draw.cameraPosition;
            var rotation = Puppets.getComponents(entity)[0].rotation;

            context.save();
            context.globalCompositeOperation = draw.globalCompositeOperation;
            if(rotation !== undefined)
            {
                context.translate(rotation.x - cameraPosition.x,rotation.y - cameraPosition.y);
                context.rotate(rotation.angle);
                context.drawImage(draw.image, -size.width/2, -size.height/2, size.width, size.height);   
            }
            else{
                if(clearBeforeRender)
                    context.clearRect(position.x - cameraPosition.x, position.y - cameraPosition.y, size.width, size.height);

                if(draw.frameSize !== undefined)
                    context.drawImage(draw.image, draw.animationPosition.x, draw.animationPosition.y, draw.frameSize.width, draw.frameSize.height, position.x - cameraPosition.x, position.y - cameraPosition.y, size.width, size.height);
                else
                    context.drawImage(draw.image, position.x - cameraPosition.x, position.y - cameraPosition.y, size.width, size.height);
            }
            context.restore();
        }
    },{components : ["size", "position", "draw"]});

	Puppets.system("RenderBox", function(size, position, renderBox, entity){
		if(renderBox.context !== null)
		{
			var context = renderBox.context;
			var color = renderBox.color;
            var clearBeforeRender = renderBox.clearBeforeRender;
            var strokeColor = renderBox.strokeColor;
			var cameraPosition = renderBox.cameraPosition;
			var rotation = Puppets.getComponents(entity)[0].rotation;

			context.save();
			context.globalCompositeOperation = renderBox.globalCompositeOperation;
			context.fillStyle = color;
            context.strokeStyle = strokeColor;
			if(rotation !== undefined)
			{
				context.translate(rotation.x - cameraPosition.x,rotation.y - cameraPosition.y);
				context.rotate(rotation.angle);
				context.fillRect(-size.width/2, -size.height/2, size.width, size.height);	
			}
			else{
                if(clearBeforeRender)
				    context.clearRect(position.x - cameraPosition.x, position.y - cameraPosition.y, size.width, size.height);

				context.fillRect(position.x - cameraPosition.x, position.y - cameraPosition.y, size.width, size.height);
                context.strokeRect(position.x - cameraPosition.x, position.y - cameraPosition.y, size.width, size.height);
			}
			context.restore();
		}
	},{components : ["size", "position", "renderBox"]});
});