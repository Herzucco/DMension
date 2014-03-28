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
        this.observer.on('imagesLoaded', function(){
            this.worldController.init();
            this.dialogueController.init();
            this.menuController.init();
            var cursor = Puppets.createEntity('cursor', {
                draged : {
                    mouse : this.mouseController.components
                },
                size : {
                    width : 10,
                    height : 10
                },
                renderBox : {
                    color : 'red',
                    context : this.canvasController.mainCanvas.components.canvasContext.context
                }
            }, 'UI');
        }, this);

        this.cameraController.init();
        this.canvasController.init();
        this.mouseController.init();
        
        var maxImages;
        this.observer.on('imageInit', function(counter){
            maxImages = counter;
        })

        var count = 0;
        this.observer.on('imageLoaded', function(){
            count++;
            var percentage = count/maxImages*550;
            var context = this.canvasController.mainCanvas.components.canvasContext.context;
            context.fillStyle = 'black';
            context.fillRect(0, 0, 1600, 1600);
            context.strokeStyle = 'grey';
            context.lineWidth = 12;
            context.strokeRect(300, 350, 550, 50);
            context.fillStyle = 'black';
            context.fillRect(300, 350, 550, 50);
            context.fillStyle = 'green';
            context.fillRect(300, 350, percentage, 50);
            context.lineWidth = 1;
        }, this)

        this.imagesController.init();

        var maxTiles;
        var tilesCount = 0;
        this.observer.on('tileInit', function(counter){
            maxTiles = counter;
            tilesCount = 0;
        })

        
        this.observer.on('tileLoaded', function(){
            tilesCount++;
            var percentage = tilesCount/maxTiles*550;
            var context = this.canvasController.mainCanvas.components.canvasContext.context;
            context.fillStyle = 'black';
            context.fillRect(0, 0, 1600, 1600);
            context.strokeStyle = 'grey';
            context.lineWidth = 12;
            context.strokeRect(300, 350, 550, 50);
            context.fillStyle = 'black';
            context.fillRect(300, 350, 550, 50);
            context.fillStyle = 'green';
            context.fillRect(300, 350, percentage, 50);
            context.lineWidth = 1;
        }, this)
	}
	return new Game;
});