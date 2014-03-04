require.config({
		urlArgs: "bust=" +  Date.now(),

	 paths: {
			"box2d": "../libraries/box2d.min",
			"puppets" : "../libraries/puppets",
			"dancer" : "../libraries/dancer",
			"stats"   : "../libraries/stats.min",
			"Vectors" : "../libraries/Vectors",
			"keypress" : "../libraries/keypress",
			"requestAnimationFrame" : "../libraries/requestAnimationFrame",
			"howler"   : "../libraries/howler.min",
		}

	, shim: {
			"box2d": {exports: "box2d"},
			"keypress": {exports: "keypress"},
			"puppets": {exports: "puppets"},
			"howler": {exports: "howler"},
			"dancer" : {exports: "dancer"}
		}
});

(function(){
	require(["../main"]);
})();