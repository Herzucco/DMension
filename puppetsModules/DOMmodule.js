define(["../loader/libraries/puppets"], function(Puppets){
	Puppets.component("DOMElement", function(data, entity){
		var component = {
			element : data.element || null,
			listeners : data.listeners || null
		};
		if(typeof data.listeners === "object"){
			for(var i in data.listeners){
				component.element.addEventListener(i, data.listeners[i], false);
			}
		}
		return component;
	});
	Puppets.component("canvasContext", function(data, entity){
		var component = {
			data : data.data || { colorData : null},
			context : data.context || null,
			canvas : data.canvas || null
		};
		if(data.hasOwnProperty("canvas") && !data.hasOwnProperty("context"))
			component.context = data.canvas.getContext('2d');

		return component;
	});

	Puppets.entity("DOMElement", {
		components : [
			"DOMElement"
		]
	});
	Puppets.entity("canvas", {
		components : [
			"DOMElement",
			"canvasContext"
		]
	})
});