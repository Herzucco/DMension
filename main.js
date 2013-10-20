define(["./requireModules/puppets/puppets",
		"requestAnimationFrame",
		"stats",
		"./requireModules/box2d",
		"./requireModules/loadModules",
		"./requireModules/loadGame"], function(Puppets, requestAnimationFrame, stats, Box2D, Modules, Game){

	var stats = new Stats();
	stats.setMode(0);
	
	//align right 
	stats.domElement.className = "fps";
	document.body.appendChild( stats.domElement );
	var init = function(){
		console.log(Game.Level());
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