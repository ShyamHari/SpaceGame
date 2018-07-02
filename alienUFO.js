function AlienUFO() {
	//initializing variables for alien spacecrafts
	//position of aliens 
       this.alienPos = createVector(random(width / 1.5, width / 1.2), random(height / 15, 14 * height / 15));
       //only goes left and not up and down 
       this.alienSpeed = createVector(-2, 0);
       //sets the viewing of alien to true, will become false if laser hits it 
       this.viewAlien = true;
       //size of the alien will vary to make people more accurate 
       this.alienSize = random(30, 100); 

       this.moveAlien = function() {//moves the alien with the add function of vectors 
              this.alienPos.add(this.alienSpeed);
              //if the aliens go -1, then reset their position to somewhere beyond width, but change their y value to add variety 
              if (this.alienPos.x < 0) {
                     this.alienPos.x = width + 80;
                     this.alienPos.y = random(0 + height / 15, height - height / 15);
                     //if the go beyond this then subtract 1 life 
                     alienPassed -= 1;
              }
       }
       this.showAlien = function() {
       	//if the alien is beyond width, then make it viewable 
              if (this.alienPos.x > width) {
                     this.viewAlien = true;
              }
              //if the viewing is true, show the image 
              if (this.viewAlien) {
                     image(alien, this.alienPos.x, this.alienPos.y, this.alienSize, this.alienSize);
              }
              //if it is false then respawn at a location beyond the width and change height 
              if (this.viewAlien === false) {
                     this.alienPos.x = width + (random(100, 200));
                     this.alienPos.y = random(height / 15, 14 * height / 15);
              }
       }
      
}