require.config({
		urlArgs: "bust=" +  Date.now(),

	 paths: {
			"box2d": "../libraries/box2d.min",
			"puppets" : "../libraries/puppets",
			"stats"   : "../libraries/stats.min",
			"Vectors" : "../libraries/Vectors",
			"keypress" : "../libraries/keypress",
			"requestAnimationFrame" : "../libraries/requestAnimationFrame",
		}

	, shim: {
			"box2d": {exports: "box2d"},
			"keypress": {exports: "keypress"},
			"puppets": {exports: "puppets"}
		}
});

(function(){
	require(["../main"]);
})();