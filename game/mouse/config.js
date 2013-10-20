define([], function(constants){
	return {
		radius : 20, 
		circumference : 2,
		color : "blue",
		onMouseDown : function(){
			this.components.renderCircle.enabled = true;
		},
		onMouseUp : function(){
			this.components.renderCircle.enabled = false;
		}
	}
});