
        // Puppets.addComponent(box, "b2listener", {
        //  world : world,
        //  preSolve : function(contact, manifold){
        //      var t = new Box2D.Collision.b2WorldManifold();
        //      contact.GetWorldManifold(t)
                
        //      var entities = [ contact.GetFixtureA().GetBody().GetUserData().entity, contact.GetFixtureB().GetBody().GetUserData().entity ];
        //      var componentsA = Puppets.getComponents(entities[0])[0];
        //      var componentsB = Puppets.getComponents(entities[1])[0];
        //      if(!componentsA.hasOwnProperty("colorColliderBox") && !componentsB.hasOwnProperty("colorColliderBox"))
        //          return;
        //      else{
        //          if(componentsA.hasOwnProperty("colorColliderBox")){
        //              var player = componentsA;
        //              var other = componentsB;
        //              var position = {x : t.m_points[1].x*SCALE >> 0, y : t.m_points[1].y*SCALE >> 0};
        //          }
        //          else{
        //              var player = componentsB;
        //              var other = componentsA;
        //              var position = {x : t.m_points[0].x*SCALE >>0, y : t.m_points[0].y*SCALE >> 0};
        //          }

        //          var color = getColorAt(position, WIDTH, Game.constants.PIXELS_ARRAY);
        //          if(player.colorColliderBox.colorColliding && (color !== null && (color.r || color.b || color.g)))
        //              contact.SetEnabled( true );
        //          else
        //              contact.SetEnabled( false );
        //      }
        //  }
        // });
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