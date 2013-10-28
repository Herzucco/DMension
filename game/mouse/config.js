define([], function(constants){
	return {
		radius : 20, 
		circumference : 2,
		color : "rgba(50,155,0,1)",
		onMouseDown : function(){
			this.components.renderCircle.enabled = true;
		},
		onMouseUp : function(){
			this.components.renderCircle.enabled = false;
		}
	}
});