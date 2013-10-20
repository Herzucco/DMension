define(["../loader/libraries/puppets", "./circleRendering"], function(Puppets){
	
	Puppets.component("mouse", function(data, entity, undefined){
		return {
			clicked : data.clicked || false,
			onMouseDown : data.onMouseDown || function(){},
			onMouseUp : data.onMouseUp || function(){},
			entity : entity
		};
	});
	Puppets.component("clickable", function(data, entity, undefined){
		return {
			mouse : data.mouse || null,
			onMouseDown : data.onMouseDown || function(mouse){

			},
			onMouseUp : data.onMouseUp || function(mouse){

			},
			clicked : false
		}
	});
	Puppets.component("draged", function(data, entity, undefined){
		return {
			mouse : data.mouse || null,
			relativeX : data.relativeX || 0,
			relativeY : data.relativeY || 0
		}
	});

	Puppets.entity("mouse", {
		components : [
			"position",
			"radius",
			"mouse"
		]
	});

	Puppets.system("detectMouseDownOnBox", function(position, size, clickable, entity){
		var mouse = clickable.mouse;
		if (!clickable.clicked && mouse.mouse.clicked && position.x < mouse.position.x && position.x + size.width > mouse.position.x &&
			position.y < mouse.position.y && position.y + size.height > mouse.position.y)
		{
			clickable.clicked = true;
			clickable.onMouseDown.apply({components : Puppets.getComponents(entity)[0], id : entity}, [mouse]);
		}
	}, {components : ["position", "size", "clickable"]});
	Puppets.system("detectMouseUpOnBox", function(position, size, clickable, entity){
		var mouse = clickable.mouse;
		if (clickable.clicked && !mouse.mouse.clicked)
		{
			clickable.clicked = false;
			clickable.onMouseUp.apply({components : Puppets.getComponents(entity)[0], id : entity}, [mouse]);
		}
	}, {components : ["position", "size", "clickable"]});
	Puppets.system("onDragging", function(position, draged){
		position.x = draged.relativeX + draged.mouse.position.x;
		position.y = draged.relativeY + draged.mouse.position.y;
	}, {components : ["position", "draged"]});
});