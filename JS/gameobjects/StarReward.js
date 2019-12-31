"using strict"
class StarReward extends GameObject {
  constructor(starNum) {
    super();
    this.x = canvas.width/2;
    this.y = canvas.height/2;
    if  (starNum > 4) {
      this.y = 70;
    }
    this.image_index = 0;
    this.image_speed = 0;
    this.depth = -20;

    this.timer = 60;
    this.starNum = starNum;

    this.drawContinue = false;
    this.continue = false;
    this.continueTimer = 10;
    if ( starNum < 5 ) {
      snd_Star.play();
    } else {
      snd_win.play();
    }
    this.gameOver = false;
    StarReward.instance_count++;
    StarReward.instance_list.push(this);
  }

  setGameOver() {
    this.gameOver = true;
    this.y = 70; //sets the position for drawing the stars.
  }

  mousePressed(event) {
    if (GameLoop.isPaused()) {
      return;
    }

    let rect = canvas.getBoundingClientRect();
    let mouseX = event.clientX - rect.left;
    let mouseY = event.clientY - rect.top;

    if ( mouseX>0 && mouseX < canvas.width && mouseY>0 && mouseY < canvas.height) {
      if ( this.starNum > 4 || this.gameOver ) {
        if ( this.continue ) {
          //location.reload();
          // gameLogic.currentRoom.destroy();
          gameLogic.newGame();
          this.destroy();
        }
      }
    }
  } //mousePressed end

  step() {
    if ( this.starNum < 5 && !this.gameOver) {
      this.timer -= 1;
      this.y -= 2;
      if ( this.timer < 0 ) {
        this.destroy();
      }
    } else {
        this.timer -= 1;
        if ( this.timer < 0 ) {
          this.continue = true;
          this.drawContinue = !this.drawContinue;
          this.timer = this.continueTimer;
        }
    }
  } //end step

  draw() {
    context.font="36px Roboto";
    context.textAlign="center";
    context.textBaseline = "middle";
    if ( this.starNum < 5 && !this.gameOver ) {
      context.fillStyle = "black";
      context.fillText(this.starNum + " out of 5 Stars earned!", this.x+2,this.y-30);
      context.fillStyle = "white";
      context.fillText(this.starNum + " out of 5 Stars earned!", this.x,this.y-32);
    } else {
      if ( this.gameOver) {
        context.fillStyle = "black";
        context.fillText("Game Over!", this.x+2,this.y-26);
        context.fillStyle = "white";
        context.fillText("Game Over!", this.x,this.y-28);

        context.font="22px Roboto";
        context.fillStyle = "white";
        context.fillText("Keep practising", canvas.width/2,canvas.height-136);
        context.fillText("Play again to try learn all the letters.", canvas.width/2,canvas.height-114);
        //context.fillText("Keep practising, and good luck!", canvas.width/2,canvas.height-92);
      }
      else {
        context.fillStyle = "black";
        context.fillText("Congratulations!", this.x+2,this.y-26);
        context.fillStyle = "white";
        context.fillText("Congratulations!", this.x,this.y-28);

        context.font="22px Roboto";
        context.fillStyle = "white";
        context.fillText("Great job!", canvas.width/2,canvas.height-136);
        context.fillText("Your on your way to mastering Vietnamese!", canvas.width/2,canvas.height-114);
        context.fillText("Keep practising, and good luck!", canvas.width/2,canvas.height-92);
      }
    }
    let x2 = this.x-(starSprite.getWidth()) - ((this.starNum/2)*starSprite.getWidth());
    let y2 =  this.y;
    for ( let i = 0; i < this.starNum; i++ ) {
      x2 += starSprite.getWidth();
      starSprite.drawImageIndex(x2, y2, this.image_index);
    }

    if ( this.starNum > 4 || this.gameOver ) {
      if ( this.drawContinue) {
        context.font="22px Roboto";
        context.fillStyle = "white";
        context.fillText("Tap screen to play again", canvas.width/2,canvas.height-64);
      }
    }
  } //end draw

  destroy() {
    super.destroy();
    StarReward.instance_list = StarReward.instance_list.filter(item => item !== this);
    StarReward.instance_count--;
    snd_win.stop();
  }//end destroy
}
//static class variables
StarReward.instance_count = 0;
StarReward.instance_list = [];
