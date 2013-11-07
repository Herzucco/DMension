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
				minRelativeY : this.config.minRelativeY,
				minX : this.config.minX,
				minY : this.config.minY,
				maxX : this.config.maxX,
				maxY : this.config.maxY
			},
			size : {
				width : 600,
				height : HEIGHT
			}
		});
		this.entity = camera;
		this.components = Puppets.getComponents(camera)[0];

		Game.observer.on("pressY", function(){
			this.components.position.x += 20;
		}, this)
	};

	return new CameraController(config);
});