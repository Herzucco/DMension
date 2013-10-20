require.config({
		urlArgs: "bust=" +  Date.now(),

	 paths: {
			"box2d": "box2d.min",
			"puppets" : "puppets",
			"stats"   : "stats.min",
			"Vectors" : "Vectors",
			"requestAnimationFrame" : "requestAnimationFrame",
		}

	, shim: {
			"box2d": {exports: "Box2D"},
			"puppets": {exports: "Puppets"}
		}
});


require(["../main"]);