define(["../../loader/libraries/puppets", "../game", "keypress", "dancer"], function(Puppets, Game, Keypress){
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
	Keypress.combo("r", function() {
    	Game.observer.trigger("pressR");
	});
	Keypress.combo("x", function() {
    	Game.observer.trigger("pressX");
	});
	Keypress.combo("space", function() {
    	Game.observer.trigger("pressSpace");
	});
	Keypress.combo("y", function() {
    	Game.observer.trigger("pressY");
	});
	Keypress.combo("p", function(){
		window.music = new Dancer();
		music.load({src : "assets/480253_Colloseum.mp3"});
		window.kick = music.createKick({frequency : [-100, 300], onKick : function(kick){
			Game.observer.trigger("kick", [kick]);
		}});
		kick.on();
		music.play();
		music.setVolume(0.2)
	});
	Keypress.combo("m", function(){
		music.pause();
	});

	

	return Keypress;
});