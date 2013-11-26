define(["../loader/libraries/box2d", "../loader/libraries/puppets"], function(Box2D, Puppets){
	Puppets.entity("polygon", {components : [
			"b2polygon"
		]});
	Puppets.entity("b2World", {components : [
			"world"
		]});
    Puppets.entity("b2listener", {
        components : [
            "b2listener"
        ]
    });
	Puppets.component("world", function(data, entity, undefined){
		window.SCALE = data.scale || 30;
		var world = new Box2D.Dynamics.b2World(new Box2D.Common.Math.b2Vec2(data.gravityX || 0, data.gravityY || 1), false);
		var debugDraw = new Box2D.Dynamics.b2DebugDraw();

        debugDraw.SetSprite(data.context);
        debugDraw.SetDrawScale(window.SCALE);
        debugDraw.SetFillAlpha(data.alpha || 1);
        debugDraw.SetLineThickness(data.lineThickness || 1.0);
        debugDraw.SetFlags(Box2D.Dynamics.b2DebugDraw.e_shapeBit | Box2D.Dynamics.b2DebugDraw.e_jointBit);
        world.SetDebugDraw(debugDraw);
        return {world : world};
	});
	
	Puppets.component("b2polygon", function(data, entity, undefined){
		var component = {	fixtureDef : new Box2D.Dynamics.b2FixtureDef(), 
							bodyDef : new Box2D.Dynamics.b2BodyDef(),
							polygonShape : new Box2D.Collision.Shapes.b2PolygonShape(),
							priorityOnPosition : true,
							fixedRotate : data.fixedRotate || false,
							world : data.world || null
						};
		if(data.priorityOnPosition === false)
			component.priorityOnPosition = false;

		component.bodyDef.position.Set(data.x || 0, data.y || 0);
		if(data.dynamic)
			component.bodyDef.type = Box2D.Dynamics.b2Body.b2_dynamicBody;
		else
			component.bodyDef.type = Box2D.Dynamics.b2Body.b2_staticBody;

		component.fixtureDef.shape = component.polygonShape;
		component.fixtureDef.density = data.density || 1.0;
        component.fixtureDef.friction = data.friction || 0.5;
        component.fixtureDef.restitution = data.restitution || 0.2;
		component.fixtureDef.shape.SetAsBox(data.width || 0,data.height || 0);
		component.body = data.world.CreateBody( component.bodyDef );
		component.body.CreateFixture( component.fixtureDef );

		if(component.fixedRotate)
			component.body.SetFixedRotation(true);

		component.body.SetUserData({width : data.width || 0,
									height : data.height || 0,
									entity : entity});

		return component;
	});

	Puppets.component("b2circle", function(data, entity, undefined){
		var component = {	fixtureDef : new Box2D.Dynamics.b2FixtureDef(), 
							bodyDef : new Box2D.Dynamics.b2BodyDef(),
							polygonShape : new Box2D.Collision.Shapes.b2CircleShape(
								data.radius || 0),
							priorityOnPosition : true,
							world : data.world || null
						};
		if(data.priorityOnPosition === false)
			component.priorityOnPosition = false;

		component.bodyDef.position.Set(data.x || 0, data.y || 0);
		if(data.dynamic)
			component.bodyDef.type = Box2D.Dynamics.b2Body.b2_dynamicBody;
		else
			component.bodyDef.type = Box2D.Dynamics.b2Body.b2_staticBody;

		component.fixtureDef.shape = component.polygonShape;
		component.fixtureDef.density = data.density || 1.0;
        component.fixtureDef.friction = data.friction || 0.5;
        component.fixtureDef.restitution = data.restitution || 0.2;
		component.body = data.world.CreateBody( component.bodyDef );
		component.body.CreateFixture( component.fixtureDef );
		component.body.SetUserData({radius : data.radius || 0,
									entity : entity});
		return component;
	});
	Puppets.component("b2listener", function(data, entity){
		var component = {
			beginContact : data.beginContact || function(){},
			preSolve : data.preSolve || function(){},
			world : data.world || null
		}
		component.listener = new Box2D.Dynamics.b2ContactListener;
		component.listener.BeginContact = component.beginContact;
		component.listener.PreSolve     = component.preSolve;
		
		if(component.world !== null)
			component.world.SetContactListener( component.listener );

		return component;
	});

	Puppets.system("RenderWorldDebug", function(world){
		world = world.world;
		world.Step(
             1 / 60   //frame-rate
          ,  1       //velocity iterations
          ,  1       //position iterations
      	);
        //world.DrawDebugData();
        world.ClearForces();
	}, {components : ["world"]});
});