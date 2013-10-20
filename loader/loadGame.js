define(["../game/game", "../game/canvas/canvasController",
		 "../game/mouse/mouseController", "../game/camera/cameraController",
		 "../game/world/worldController", "../game/level/levelController"], 
function(Game, canvasController, mouseController, cameraController, worldController, levelController){
	Game.canvasController = canvasController;
	Game.mouseController = mouseController;
	Game.cameraController = cameraController;
	Game.worldController = worldController;
	Game.levelController = levelController;
	return Game;
});