;(function(undefined){
	Puppets.load("modules/components/baseComponents.js");
	Puppets.entity("circle", {components : [
			"radius",
			"position",
			"renderCircle"
		]});

	Puppets.component("radius", function(data, entity){
		return {radius : data.radius || 0, circumference : 2};
	});
	Puppets.component("renderCircle", function(data, entity, undefined){
		return {canvas : data.canvas || document.createElement("canvas"), 
		context : data.context || null, color : data.color || "black", clip : data.clip || false}
	});


	Puppets.system("RenderCircle", function(radius, position, renderCircle, entity){
		if(renderCircle.context !== null)
		{
			var context = renderCircle.context;
			var color = renderCircle.color;
			var rotation = Puppets.getComponents(entity)[0].rotation;

			context.save();
			context.beginPath();
			
			if(rotation !== undefined)
			{
				context.translate(rotation.x,rotation.y);
				context.rotate(rotation.angle);
				context.arc(0, 0, radius.radius, 0, radius.circumference * Math.PI, false);	
			}
			else
				context.arc(position.x, position.y, radius.radius, 0, radius.circumference * Math.PI, false);

			if(renderCircle.clip){
				context.clip();
				context.clearRect(0, 0, renderCircle.canvas.width, renderCircle.canvas.height);
			}
			else{
				context.fillStyle = color;
				context.fill();
			}
			context.restore();
		}
	},{components : ["radius", "position", "renderCircle"]});
})();