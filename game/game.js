define(["./constants", "../loader/libraries/puppets"], function(constants, Puppets){
	var Game = function(){
		this.cameraController   = {};
		this.canvasController   = {};
		this.keyboardController = {};
		this.levelController    = {};
		this.mouseController    = {};
		this.playerController   = {};
		this.stateMachine       = {};
		this.worldController    = {};
		this.constants          = constants;
	};

	Game.prototype.init = function(){
		Puppets.collection(["backgrounds", "world", "canvas", "dynamics"]);

		this.cameraController.init();
		this.canvasController.init();
		this.worldController.init();
		this.mouseController.init();
		this.levelController.init();
	}

	return new Game;
});