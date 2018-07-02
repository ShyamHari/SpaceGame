function Stars() { //creates stars
       //spawns stars at random x and ys on screen
       this.starX = random(width);
       this.starY = random(height);
       this.speedOfStarsY = 10;
       //speed of stars
       this.speedOfStars = random(1, 3);
       //size of stars
       this.starSize = random(1, 4)
              //color of stars is determined based on an rng function
       this.colorOfStars = random(1, 30);

       this.move = function() { //movement of stars
              this.starX -= this.speedOfStars;
              if (this.starX < 0) {
                     this.starX = random(width, width + 40); //if the stars goes beyond left of screen it is reset to width/screenlength 
                     this.starY = random(height); //random height as it resets 
              }
              if (endGameScreen === true) {//if the end game screen is true, then the stars will fall 
                     this.starY += this.speedOfStarsY;
                     this.speedOfStars = 0;

              }
       }
       this.show = function() {
              //determines star color based on rng value of colorOfStars
              noStroke();
              if (this.colorOfStars >= 1 && this.colorOfStars <= 2) {
                     //bluish
                     fill(0, 100, 255);
              } else if (this.colorOfStars >= 3 && this.colorOfStars <= 4) {
                     //reddish
                     fill(200, 30, 30);
              } else if (this.colorOfStars >= 5) {
                     //"titanium HWITE" - Bob Ross
                     fill(255);
              }

              //creates ellipse/stars
              ellipse(this.starX, this.starY, this.starSize, this.starSize);
       }

}