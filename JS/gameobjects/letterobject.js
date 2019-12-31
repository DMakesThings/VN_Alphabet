"using strict"
class LetterObject extends GameObject {
  constructor(character) {
    super();
    this.clicked = false;
    this.clickedAway = false;
    this.clickedWrong = false;
    this.character = character;
    this.x = 15;
    this.y = 15;
    this.startY = this.y;
    this.size = 48;
    this.xSpeed = -4;//(Math.random()*-3)-5;

    this.ySpeed = Math.random()*2;
    this.vGravity = 0;
    if ( Math.random() > 0.5) {
      this.ySpeed = -this.ySpeed;
      this.vGravity = 0.1;
    } else {
      this.vGravity = -0.1;
    }

    this.depth = 0;
    //static variables
    LetterObject.instance_count++;
    LetterObject.instance_list.push(this);
  }

  setXY(x, y) {
    this.x = x;
    this.y = y;
    this.startY = this.y;
  }

  step() {

    this.x += this.xSpeed;
    this.y += this.ySpeed;

    let maxVspeed = 0.5 ;
    if ( this.clicked==true) {
      maxVspeed = 5;
      this.vGravity = -0.5;
    }

    this.ySpeed =  Math.max(Math.min(maxVspeed,this.ySpeed + this.vGravity),-maxVspeed);
    if ( this.y > this.startY && this.vGravity > 0) {
      this.vGravity = -this.vGravity;
    } else
    if (this.y < this.startY && this.vGravity < 0 ) {
      this.vGravity = -this.vGravity;
    }

    if (this.x+this.size < 0 ) {
      if ( vietnameseAlphabetList.includes(this.character)) {
        if ( this.clicked !== true) {
          vietnameseAlphabet.push(this.character);
        }
        //console.log("Alphabet: " + vietnameseAlphabet.toString());
      }
      this.destroy();
    }
  }

  draw() {
    //context.fillStyle="#000";
    //context.fillRect(this.x,this.y,this.size,this.size);
    if ( this.clickedAway == true ) {
      crateSprite.draw(this.x, this.y);
    } else
    if ( this.clicked == false) {
      crateSprite.draw(this.x, this.y);
    }
    planeSprite.draw(this.x-45,this.y-65);
    if ( this.clicked == false || this.clickedAway == true) {
      context.fillStyle = "white";
      context.font="35px Roboto";
      context.textAlign="center";
      context.textBaseline = 'middle';
      context.fillText(this.character, this.x + (this.size/2),this.y + (this.size/2));
    }

    if ( this.clickedAway == true)  {
      context.font="65px Roboto";
      context.textAlign="center";
      context.textBaseline = 'middle';
      if ( this.clickedWrong == true ) {
        context.fillStyle = "black";
        context.fillText('X', this.x + (this.size/2),this.y - (this.size/2));
        context.fillStyle = "red";
        context.font="60px Roboto";
        context.fillText('X', this.x + (this.size/2),this.y - (this.size/2));
      } else {
        context.fillStyle = "black";
        context.fillText('✓', this.x + (this.size/2),this.y - (this.size/2));
        context.fillStyle = "lime";
        context.font="60px Roboto";
        context.fillText('✓', this.x + (this.size/2),this.y - (this.size/2));
      }
    }
  }

  // static drawAll() {
  //   for ( let i = 0; i < LetterObject.instance_list.length; i++ ) {
  //     LetterObject.instance_list[i].draw();
  //   }
  // }
  mousePressed(event) {
    if (GameLoop.isPaused()) {
      return;
    }

    let rect = canvas.getBoundingClientRect();
    let mouseX = event.clientX - rect.left;
    let mouseY = event.clientY - rect.top;
    this.checkClicked(mouseX,mouseY);
  }

  checkClicked(mouseX, mouseY) {
    if ( mouseX > this.x && mouseX < this.x+this.size
							&& mouseY > this.y && mouseY<this.y+this.size
              && this.clicked == false) {
						//clicked!
            this.clicked = true;

            if (vietnameseAlphabetList.includes(this.character)) {
              let i = vietnameseAlphabetList.indexOf(this.character);
              snd_vn_alphabet[i].play();
              gameLogic.addScore();
              gameLogic.currentRoom.HUDObject_inst.lastCharacter = this.character;
              //create box of goodies being dropped.
            } else {
              //create DEAD plane object.
              this.createDeadPlane();
            }

						console.log("clicked: " + this.character);
						return true;
          }
          else //Check if clicking the letter away.
        if ( mouseX > this.x-15 && mouseX < this.x+this.size-15
            && mouseY > this.y-90 && mouseY<this.y+this.size-70
            && this.clicked == false){
              this.clicked = true;
              this.clickedAway = true;
              if (vietnameseAlphabetList.includes(this.character)) {
                this.clickedWrong = true;
                snd_Explosion.play();
              } else {
                snd_Star.play();
              }
              console.log('clicking head');
          }
  } //end of Mouse Clicked event

  createDeadPlane() {
    snd_Explosion.play();
    let deadPlane = new DeadPlane(this.x,this.y,this.xSpeed,this.ySpeed);
    let explosion = new Explosion(this.x, this.y);
    //gameLogic.resetScore();
    gameLogic.loseLife();

    this.destroy();
  }

  static setClickedTrueForAll() {
    for (let i = 0; i < LetterObject.length; i++ ) {
        LetterObject.instance_list[i].clicked = true;
    }

  }

  destroy() {
    super.destroy();
    LetterObject.instance_list = LetterObject.instance_list.filter(item => item !== this);
    LetterObject.instance_count--;
  }//end destroy
} //end of LetterObject class

//static class variables
LetterObject.instance_count = 0;
LetterObject.instance_list = [];
