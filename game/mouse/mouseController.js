define(["../../loader/libraries/puppets", "../game", "./config"], function(Puppets, Game, config){
	var MouseController = function(config){
		this.config = config;
	};

	MouseController.prototype.init = function(){
		/* define some aliases */
		var _self = this;

		var mainCanvas = Game.canvasController.mainCanvas.components.canvasContext.canvas;
		var drawPaint = Game.canvasController.firstColor.drawPaint.components.canvasContext.context;
		var mouse = Puppets.createEntity("mouse", {
			radius : {
				radius : _self.config.radius, 
				circumference : _self.config.circumference
			},
			mouse : {
				onMouseDown : _self.config.onMouseDown,
				onMouseUp : _self.config.onMouseUp
			}
		});
		Puppets.addComponent(mouse, "renderCircle", {	canvas : canvas,
														context : drawPaint, color : _self.config.color,
														cameraPosition : Game.cameraController.components.position,
														PIXELS_ARRAY : Game.constants.PIXELS_ARRAY, isLittleEndian : Game.constants.isLittleEndian
													},  false);

		_self.entity = mouse;
		_self.components = Puppets.getComponents(mouse)[0];

		_self.setEvents();
	}

	MouseController.prototype.setEvents = function(){
		var _self = this;

		Game.observer.on("pressShift", function(){
			var _self = this;

			_self.components.renderCircle.clip = !_self.components.renderCircle.clip;
            if(_self.components.renderCircle.clip === true)
                Game.observer.trigger("colorChanged", ["rgba(255,255,255,0.5)"]);
            else
                Game.observer.trigger("colorChanged", [_self.components.renderCircle.color])
		}, _self);

		Game.observer.on("pressA", function(){
			var _self = this;

			_self.components.renderCircle.color = "rgba(255,0,0,0.5)";
            if(!_self.components.renderCircle.clip)
                Game.observer.trigger("colorChanged", ["rgba(255,0,0,0.5)"]);
		}, _self);

		Game.observer.on("pressZ", function(){
			var _self = this;

			_self.components.renderCircle.color = "rgba(0,255,0,0.5)";
            if(!_self.components.renderCircle.clip)
                Game.observer.trigger("colorChanged", ["rgba(0,255,0,0.5)"]);
		}, _self);

		Game.observer.on("pressE", function(){
			var _self = this;

			_self.components.renderCircle.color = "rgba(0,0,255,0.5)";
            if(!_self.components.renderCircle.clip)
                Game.observer.trigger("colorChanged", ["rgba(0,0,255,0.5)"]);
		}, _self);

		Game.observer.on("pressR", function(){
			var _self = this;

			_self.components.renderCircle.color = "rgba(255,0,255,0.5)";
            if(!_self.components.renderCircle.clip)
                Game.observer.trigger("colorChanged", ["rgba(255,0,255,0.5)"]);
		}, _self);
	}

	return new MouseController(config);
});