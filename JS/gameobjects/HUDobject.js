"using strict"

class HUDobject extends GameObject {
  constructor() {
    super();
    this.clicked = false;
    this.depth = -10;
    //static variables
    HUDobject.instance_count++;
    HUDobject.instance_list.push(this);

    this.pauseButton = new Square(36,257,78,300);
    this.playSoundButton = new Square(240,257,240+42,257+42);

    this.lastCharacter = " ";
  }

  setXY(x, y) {
    this.x = x;
    this.y = y;
  }

  step() {

  }

  draw() {
    HUDSprite.draw(0,canvas.height - 142);

    if ( gameLogic.stars < 5 ) {
      if (GameLoop.isPaused()) {
        hudButtonSprite.image_index = 1;
      } else {
        hudButtonSprite.image_index = 0;
      }
      hudButtonSprite.draw(30,canvas.height-66);
      hudButtonSprite.image_index = 2;
      hudButtonSprite.draw(234,canvas.height-66)

      context.fillStyle = "white";
      context.font="35px Roboto";
      context.textAlign="left";
      context.textBaseline = 'top';
      context.fillText(this.lastCharacter, 195,canvas.height-58);
    }
  }

  mousePressed() {
    let rect = canvas.getBoundingClientRect();
    let mouseX = event.clientX - rect.left;
    let mouseY = event.clientY - rect.top;

    if ( this.pauseButton.isPointInside(mouseX,mouseY) ) {
      GameLoop.pauseGame();
    } else
    if (this.playSoundButton.isPointInside(mouseX,mouseY)){
      console.log('last char: ',this.lastCharacter);
      console.log('VietnameseAlphabet: ', vietnameseAlphabet);
      let i = vietnameseAlphabetList.indexOf(this.lastCharacter);
      console.log('i', i );
      if ( i >= 0) {
        snd_vn_alphabet[i].play();
        console.log('snd', snd_vn_alphabet[i] );
      }
    }
  }

  destroy() {
    super.destroy();
    HUDobject.instance_list = HUDobject.instance_list.filter(item => item !== this);
    HUDobject.instance_count--;
  }//end destroy
} //end of LetterObject class

//static class variables
HUDobject.instance_count = 0;
HUDobject.instance_list = [];
