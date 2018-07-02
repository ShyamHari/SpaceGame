function Laser() {
       push();
       //sets the colormode for lasers 
       colorMode(HSB, 255, 255, 255);
       //makes the lasers viewable, false when they hit an alien and moved to another part of the unseen screen 
       this.laserView = true;
       //makes the lasers start at the position of the spaceShip 
       this.laserloc = createVector(spaceShipPos.x, spaceShipPos.y);
       //gives the lasers a speed of 4 
       this.laserSpeed = createVector(4, 0);
       //laser color that randomizes the hue 
       this.laserColor = color(random(255), 255, 255);

       this.Lasermove = function() {
       	//movement of laser is simply a vector add function 
              this.laserloc.add(this.laserSpeed);
       }
       this.showLaser = function() {
       	//summon the alienLoop array to call upon the position of the alien 
              for (p = 0; p < alienLoop.length; p++) {
              	//if the distance between lasers and aliens  is less than 1/3 the size of the aliens then make the lasers and aliens unviewable 
                     if (dist(this.laserloc.x, this.laserloc.y, alienLoop[p].alienPos.x, alienLoop[p].alienPos.y) < alienLoop[p].alienSize/3) {
                            alienLoop[p].viewAlien = false; 
                            this.laserView = false;
                     }
              }
			//if the laser goes beyond the width make its viewability false moving it to another part of the map 
              if (this.laserloc.x > width) {
                     this.laserView = false;
              }
              //if the lasersView boolean is true then this is what the lasers will look like. 
              if (this.laserView === true) {
                     fill(this.laserColor);
                     stroke(this.laserColor);
                     line(this.laserloc.x, this.laserloc.y, this.laserloc.x + 30, this.laserloc.y);
              }
              if (endGameScreen) {
              	//if the game ends dont make any laser viewable 
                     this.laserView = false;
              }
              if (this.laserView === false) {
              	//if the laser goes beyond the width make its viewability false moving it to another part of the map or if it hits an alien 
                     this.laserSpeed.x = 0;
                     this.laserloc.y = height + 2000;

              }
       }
       pop();
}