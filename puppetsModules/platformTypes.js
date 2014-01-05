define(["../game/game", "../loader/libraries/box2d", "../loader/libraries/puppets"], function(Game, Box2D, Puppets){
	Puppets.component("crossableBox", function(data, entity, undefined){
		return {};
	});
	Puppets.component("collisionReaction", function(data, entity, undefined){
		return {
			tag : data.tag || "untagged",
			onBeginContact : data.onBeginContact || function(){},
			onPreSolve : data.onPreSolve || function(){}
		};
	});
	Puppets.component("delayer", function(data, entity, undefined){
		return {
			delay : data.delay || 0,
			count : 0
		}
	});
	Puppets.component("movingBox", function(data, entity, undefined){
		return {
			steps : data.steps || [{x : 0, y : 0, delay : 0, pause : 0}],
			initStep : data.initStep || [{x : 0, y : 0, delay : 0, pause : 0}],
			precision : data.precision || 1,
			currentStep : 0,
			state : "notYetStarted",
			timeWaited : 0,
			originX : 0,
			originY : 0,
			lastX : 0,
			lastY : 0
		}
	});
	Puppets.component("rotatingBox", function(data, entity, undefined){
		return {
			direction : data.direction || "clockwise",
			speed : data.speed || 1,
			currentAngle : 0,
			position : 0
		}
	});
	Puppets.system("delaying", function(delayer, b2polygon, entity){
		delayer.count++;
		if(delayer.count/60 >= delayer.delay){
			b2polygon.body.SetType(2);
			b2polygon.body.falling = true;
			Puppets.removeComponent(entity, "delayer");
		}
	}, {components : ["delayer", "b2polygon"]});
	Puppets.system("boxMove", function(movingBox, b2polygon, entity){
		if(movingBox.state === "notYetStarted"){
			movingBox.steps.push(movingBox.initStep);
			movingBox.originX = movingBox.lastX = b2polygon.body.GetPosition().x*SCALE;
			movingBox.originY = movingBox.lastY = b2polygon.body.GetPosition().y*SCALE;
			movingBox.state = "waiting";
		}
		else if(movingBox.state === "waiting"){
			
			movingBox.timeWaited++;
			if(movingBox.timeWaited/60 >= movingBox.steps[movingBox.currentStep].pause){
				movingBox.timeWaited = 0;
				movingBox.state = "moving";
				b2polygon.body.SetLinearVelocity({	x : movingBox.steps[movingBox.currentStep].x / (movingBox.steps[movingBox.currentStep].delay *60), 
													y : movingBox.steps[movingBox.currentStep].y / (movingBox.steps[movingBox.currentStep].delay *60)});
			}
		}
		else if (movingBox.state === "moving"){
			if((movingBox.steps[movingBox.currentStep].x + movingBox.lastX + movingBox.precision >= b2polygon.body.GetPosition().x*SCALE&&
				movingBox.steps[movingBox.currentStep].x + movingBox.lastX - movingBox.precision <= b2polygon.body.GetPosition().x*SCALE) &&
				(movingBox.steps[movingBox.currentStep].y + movingBox.lastY + movingBox.precision >= b2polygon.body.GetPosition().y*SCALE &&
				movingBox.steps[movingBox.currentStep].y + movingBox.lastY - movingBox.precision <= b2polygon.body.GetPosition().y*SCALE)){
					movingBox.lastX = b2polygon.body.GetPosition().x*SCALE;
					movingBox.lastY = b2polygon.body.GetPosition().y*SCALE;
					movingBox.currentStep++;
					if(movingBox.currentStep >= movingBox.steps.length)
						movingBox.currentStep = 0;
					b2polygon.body.SetLinearVelocity({x : 0, y : 0});
					movingBox.state = "waiting";
				}
		}
	}, {components : ["movingBox", "b2polygon"]});
	Puppets.system("boxRotate", function(rotatingBox, b2polygon, entity){
		rotatingBox.position = b2polygon.body.GetPosition();
		if (rotatingBox.direction === "counterClockwise")
			rotatingBox.currentAngle -= (2*Math.PI)/(60*rotatingBox.speed);
		else
			rotatingBox.currentAngle += (2*Math.PI)/(60*rotatingBox.speed);
		b2polygon.body.SetAngle(rotatingBox.currentAngle);
	}, {components : ["rotatingBox", "b2polygon"]});


	Puppets.entity("crossableBox", {
		components : [
			"b2polygon",
			"size",
			"position",
			"rotation",
			"renderBox",
			{"collisionReaction" : {
				tag : "platform",
				onPreSolve : function(other, contact){
					if(other.components.collisionReaction.tag !== undefined && other.components.collisionReaction.tag !== "platform") {
						if(other.components.b2polygon.body.GetLinearVelocity().y < -1){
							contact.SetEnabled(false);
						}
						else if(other.components.collisionReaction.tag === "player"){
							var currentColor = other.components.colorColliderBox.currentColor;
							if(currentColor.r === 255 && currentColor.g === 0 && currentColor.b === 255){
								contact.SetEnabled(false);
							}
						}
					}
				}
			}}
		]
	});
	Puppets.entity("fallingBox", {
		components : [
			"b2polygon",
			"size",
			"position",
			"rotation",
			"renderBox",
			{"collisionReaction" : {
				tag : "platform",
				onPreSolve : function(other, contact){
					if(!this.components.b2polygon.body.falling){
						if(other.components.collisionReaction.tag === "player"){
							if(!this.components.b2polygon.body.started){
								this.components.b2polygon.body.started = true;
								Puppets.addComponent(this.entity, "delayer", {
									delay : 1
								})
							}
						}
					}
					else if (other.components.collisionReaction === undefined || other.components.collisionReaction.tag !== "player"){
						contact.SetEnabled(false);
					}
				}
			}}
		]
	});
	Puppets.entity("alreadyMovingBox", {
		components : [
			"b2polygon",
			"size",
			"position",
			"rotation",
			"renderBox",
			"movingBox"
		]
	});
	Puppets.entity("waitingMovingBox", {
		components : [
			"b2polygon",
			"size",
			"position",
			"rotation",
			"renderBox",
			{"collisionReaction" : {
				tag : "platform",
				onPreSolve : function(other, contact){
					if(!this.components.b2polygon.body.started){
						this.components.b2polygon.body.started = true;
						this.components.movingBox.enabled = true;
					}
				}
			}},
			{"movingBox" : {
				enabled : false
			}}
		]
	});

    Puppets.entity("deathPlatform", {
        components : [
            "b2polygon",
            "size",
            "position",
            "rotation",
            "renderBox",
            {"collisionReaction" : {
                tag : "deathPlatform",
                onBeginContact : function(other, contact){
                    if(other.components.collisionReaction.enabled && other.components.collisionReaction.tag === "player"){
                        other.components.gaugeComponent.currentValue = 0;
                    }
                }
            }}
        ]
    });

    Puppets.entity("checkPoint", {
        components : [
            "b2polygon",
            "size",
            "position",
            "rotation",
            "renderBox",
            {"collisionReaction" : {
                tag : "checkPoint",
                onPreSolve : function(other, contact){
                    if(other.components.collisionReaction.enabled && other.components.collisionReaction.tag === "player"){
                        other.components.position.lastPosition = this.components.position;
                        contact.SetEnabled(false);
                    }
                }
            }}
        ]
    });
	Puppets.entity("rotatingBox", {
		components : [
			"b2polygon",
			"size",
			"position",
			"rotation",
			"renderBox",
			"rotatingBox"
		]
	});
})


