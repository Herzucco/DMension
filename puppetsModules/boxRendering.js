define(["../loader/libraries/puppets", "./baseComponents"], function(Puppets){
	Puppets.entity("box", {components : [
			"size",
			"position",
			"renderBox"
		]});

	Puppets.component("renderBox", function(data, entity, undefined){
		return {context : data.context || null, color : data.color || "black", strokeColor : data.strokeColor || "black", clearBeforeRender : data.clearBeforeRender || false,
		 globalCompositeOperation : data.globalCompositeOperation || 'source-over', cameraPosition : data.cameraPosition || { x : 0, y :0}}
	});

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