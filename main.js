define(["./loader/libraries/puppets",
		"requestAnimationFrame",
		"stats",
		"box2d",
		"./loader/loadModules",
		"./loader/loadGame"], function(Puppets, requestAnimationFrame, stats, Box2D, Modules, Game){

	var stats = new Stats();
	stats.setMode(0);
	document.body.appendChild( stats.domElement );

	var init = function(){
		Game.init();
	};
	var update = function()
    {
    	stats.begin();
        Puppets.run();
        requestAnimFrame(update);
        stats.end();
    };
    init();
    requestAnimFrame(update);
});