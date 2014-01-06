
        // function createJoint(b2One, b2Two)
        // {
     //         var joint = new Box2D.Dynamics.Joints.b2RevoluteJointDef();
     //         joint.bodyA = b2One;
     //         joint.bodyB = b2Two;
     //         joint.Initialize(b2One, b2Two, b2One.GetWorldCenter());
     //         joint.enableMotor = true;
     //         world.CreateJoint(joint);
  //        }

  // for(var i = 0; i < myArray.length; i+=4){
            //     var component = {   fixtureDef : new Box2D.Dynamics.b2FixtureDef(),
            //                     bodyDef : new Box2D.Dynamics.b2BodyDef(),
            //                     polygonShape : new Box2D.Collision.Shapes.b2PolygonShape(),
            //                 };
            //     component.bodyDef.type = Box2D.Dynamics.b2Body.b2_staticBody;
            //     component.fixtureDef.shape = component.polygonShape;
            //     var vertices = [myArray[i], myArray[i+1], myArray[i+2], myArray[i+3]];
            //     console.log(vertices);

            //     for(var x = 0; x < vertices.length; x++){
            //         vertices[x].x = vertices[x].x/SCALE;
            //         vertices[x].y = vertices[x].y/SCALE;
            //     }
            //     component.fixtureDef.shape.SetAsArray(vertices, 4);
            //     component.body = world.CreateBody( component.bodyDef );
            //     component.body.CreateFixture( component.fixtureDef );
            //     console.log(component);
            //     console.log(world);
            // }



        //    Puppets.addComponent(box, "dialogueRole", {
        //     context : mainCanvas.canvasContext.context,
        //     cameraPosition : cameraPosition,
        //     relativePosition : {
        //         x : 0,
        //         y : -20
        //     },
        //     font : "normal 20px Verdana",
        // });
        // Puppets.addComponent(crb, "dialogueRole", {
        //     context : mainCanvas.canvasContext.context,
        //     cameraPosition : cameraPosition,
        //     relativePosition : {
        //         x : 200,
        //         y : -20
        //     },
        //     font : "normal 20px Verdana",
        // });
        // Puppets.createEntity("dialogueScene", {
        //      dialogueScene : {
        //         roles : {
        //             box : Puppets.getComponents(box)[0],
        //             tuto : Puppets.getComponents(crb)[0]
        //         },
        //         delay : 3,
        //         text : [
        //                 "tuto | Bonjour toi :)  | box | olala $1",
        //                 "box | Walala, kesispass, comment tu parles ?//textColor :red, font : normal 30px Helvetica =>1 $1",
        //                 "tuto | Haha, tout est possible ici :) $1",
        //                 "box | M'ok. Tu veux quoi ? $1",
        //                 "tuto | Je voudrais que tu comprennes ma fonction. $1",
        //                 "tuto | Comme tu le vois je suis une plate-forme mouvante. $1",
        //                 "box | M'ouep j'ai senti. $1",
        //                 "box | Tu vas vite d'ailleurs $1",
        //                 "tuto | J'aime la vitesse. $1",
        //                 "box | Ah ouais not bad. $1"
        //             ],
        //         didascalies : [
        //             function(){},
        //             function(previousSpeakers, speakers, roles){
        //                 speakers.box.renderBox.color = "blue";
        //             },
        //         ]
        //         }
        // })

// for(var i = 0; i < 100; i++){
//             Puppets.createEntity("perlinCircle", {
//             radius : {
//                 radius : 2
//             },
//             renderCircle : {
//                 color : "rgba(0,0,255, 1)",
//                 context : mainCanvas.canvasContext.context,
//             },
//             perlinMovement : {
//                 seeds : [1, Math.random()*1000, 100000],
//                 increments : [0.001, 0.001, 0.001],
//                 widthMap : [0, 600],
//                 heightMap : [0, 400]
//             },
//             position : {
//                 x : 90,
//                 y : 320
//             },
//         }, "dynamics");
//         }
        
//         function rand(min, max) {
//             return parseInt(Math.random() * (max-min+1), 10) + min;
//         }

//         function get_random_color() {
//             var h = rand(1, 360);
//             var s = rand(0, 100);
//             var l = rand(0, 100);
//             return 'hsl(' + h + ',' + s + '%,' + l + '%)';
//         }