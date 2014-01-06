define([], function(constants){
	return {
		radius : 20, 
		circumference : 2,
		color : "rgba(255,0,0,1)",
		onMouseDown : function(){
            if(this.components.TOACTIVE === true || this.components.TOACTIVE === undefined)
			this.components.renderCircle.enabled = true;
		},
		onMouseUp : function(){
			this.components.renderCircle.enabled = false;
		}
	}
});