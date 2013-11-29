define(["../game/game", "../game/canvas/canvasController", "../game/UI/UIController",
		 "../game/mouse/mouseController", "../game/camera/cameraController",
		 "../game/world/worldController", "../game/level/levelController", "../game/keyboard/keyboardController"], 
function(Game, canvasController, UIController, mouseController, cameraController, worldController, levelController, keyboardController){
	Game.canvasController = canvasController;
    Game.UIController = UIController;
	Game.mouseController = mouseController;
	Game.cameraController = cameraController;
	Game.worldController = worldController;
	Game.levelController = levelController;
	Game.keyboardController = keyboardController;
	return Game;
});