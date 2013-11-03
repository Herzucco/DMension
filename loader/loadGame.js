define(["../game/game", "../game/canvas/canvasController",
		 "../game/mouse/mouseController", "../game/camera/cameraController",
		 "../game/world/worldController", "../game/level/levelController", "../game/keyboard/keyboardController"], 
function(Game, canvasController, mouseController, cameraController, worldController, levelController, keyboardController){
	Game.canvasController = canvasController;
	Game.mouseController = mouseController;
	Game.cameraController = cameraController;
	Game.worldController = worldController;
	Game.levelController = levelController;
	Game.keyboardController = keyboardController;
	return Game;
});