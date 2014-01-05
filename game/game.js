define(["./constants", "../loader/libraries/puppets", "./event"], function(constants, Puppets, EventController){
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
		Puppets.collection(["backgrounds", "world", "canvas", "dynamics", "UI"]);

		this.observer = new EventController();
		this.cameraController.init();
		this.canvasController.init();
		this.worldController.init();
		this.mouseController.init();
        this.dialogueController.init();
        this.menuController.init();
	}
	return new Game;
});