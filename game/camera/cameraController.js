define(["../../loader/libraries/puppets", "../game", "./config"], function(Puppets, Game, config){

	/* define some aliases */
	var WIDTH = Game.constants.WIDTH;
	var HEIGHT = Game.constants.HEIGHT;

	/* define the camera controller object */
	var CameraController = function(config){
		this.config = config;
	}

	CameraController.prototype.init = function(){
		var camera = Puppets.createEntity("camera", { 
			target : {
				maxRelativeX : this.config.maxRelativeX,
				maxRelativeY : this.config.maxRelativeY,
				minRelativeX : this.config.minRelativeX,
				minRelativeY : this.config.minRelativeY
			},
			size : {
				width : WIDTH,
				height : HEIGHT
			}
		});
		this.entity = camera;
		this.components = Puppets.getComponents(camera)[0];
	};

	return new CameraController(config);
});