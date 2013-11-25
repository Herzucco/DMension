
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