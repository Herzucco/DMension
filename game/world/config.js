define(["../game"],
 function(Game){
	return {
		context : null, //we define it in the init method of the worldController
		alpha : 0.3,
		scale : Game.constants.SCALE,
		gravityY : 2
	}
});