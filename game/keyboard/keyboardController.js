define(["../../loader/libraries/puppets", "../game", "keypress"], function(Puppets, Game, Keypress){
	Keypress.combo("shift", function() {
    	Game.observer.trigger("pressShift");
	});
	Keypress.combo("a", function() {
    	Game.observer.trigger("pressA");
	});
	Keypress.combo("q", function() {
    	Game.observer.trigger("pressA");
	});
	Keypress.combo("z", function() {
    	Game.observer.trigger("pressZ");
	});
	Keypress.combo("e", function() {
    	Game.observer.trigger("pressE");
	});
	Keypress.combo("x", function() {
    	Game.observer.trigger("pressX");
	});
	Keypress.combo("space", function() {
    	Game.observer.trigger("pressSpace");
	});

	return Keypress;
});