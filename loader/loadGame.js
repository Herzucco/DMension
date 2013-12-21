define(["../game/game", "../game/canvas/canvasController", "../game/UI/UIController",
		"../game/mouse/mouseController", "../game/camera/cameraController",
		"../game/world/worldController", "../game/level/levelController",
        "../game/keyboard/keyboardController", "../game/player/playerController",
        "../game/dialogue/dialogueController", "../game/menus/menuController"], 
function(Game, canvasController, UIController, mouseController, cameraController,
         worldController, levelController, keyboardController, playerController,
         dialogueController, menuController){
	Game.canvasController = canvasController;
    Game.UIController = UIController;
	Game.mouseController = mouseController;
	Game.cameraController = cameraController;
	Game.worldController = worldController;
	Game.levelController = levelController;
	Game.keyboardController = keyboardController;
    Game.playerController = playerController;
    Game.dialogueController = dialogueController;
    Game.menuController = menuController;
	return Game;
});