define(["../puppets/puppets", "./canvas/canvasDimensionCreator", "./canvas/canvasCreator", "./mouseInitializer"], function(Puppets, CanvasDimensionCreator, CanvasCreator, Mouse){
	var Mouse = function(canvas, context){
		mouse = Puppets.createEntity("mouse", {
			radius : {
				radius : 20, 
				circumference : 2
			},
			mouse : {
				onMouseDown : function(){
					this.components.renderCircle.enabled = true;
				},
				onMouseUp : function(){
					this.components.renderCircle.enabled = false;
				}
			}
		});
		Puppets.addComponent(mouse, "renderCircle", {canvas : canvas, context : context, color : "blue"}, false)
					// else
					// 	Puppets.addComponent(this.id, "renderCircle", {canvas : mainCanvas, context : contextBuffer, clip : true})

					// this.components.mouse.passed = true;

		return {
			entity : mouse,
			components : Puppets.getComponents(mouse)[0]
		}
	}

	return Mouse;
});