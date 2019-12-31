"using strict"

class StartMenuRoom {
  constructor() {
    this.controller = new MenuObject();
    //empty

    this.blink = 0;
    this.blinkOn = true;
    this.blinkTimer = 10;
  }

  step() {
    //empty..
    this.blink++;
    if ( this.blink > this.blinkTimer) {
      this.blinkOn = !this.blinkOn;
      this.blink -= this.blinkTimer;
    }
  }

  draw() {
    context.fillStyle = '#7da494';
    context.fillRect(0,0,canvas.width,canvas.height);

    winterBG.draw_background(0,0,canvas.width,canvas.height);

    GameObject.drawAll();

    context.font="72px Tangerine";
    context.textAlign="center";
    context.textBaseline = "middle";
    context.fillStyle = "black";
    context.fillText("Vietnamese Alphabet", canvas.width/2+1,canvas.height/2.5+1);
    context.fillStyle = "white";
    context.fillText("Vietnamese Alphabet", canvas.width/2,canvas.height/2.5);

    context.font="22px Roboto";
    context.fillStyle = "white";
    if ( this.blinkOn === true ) {
      context.fillText("Tap screen to start game", canvas.width/2,canvas.height-128);
    }

    context.font="20px Roboto";
    context.fillText("Last Achievement:", canvas.width/2,canvas.height-48);
    if ( gameLogic.stars > 0) {
      for ( let i = 0; i < gameLogic.stars; i++ ) {
        //context.fillText("Wow", canvas.width/2,canvas.height-32 );
        smallStarSprite.draw(canvas.width/2 - ((gameLogic.stars/2)*smallStarSprite.getWidth()) + i*smallStarSprite.getWidth(),canvas.height-32);
      }
    } else {
      context.fillStyle = "black";
      context.fillText("<None>", canvas.width/2,canvas.height-26);
    }
  }
}
