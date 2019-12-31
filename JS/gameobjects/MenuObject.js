"using strict"
class MenuObject extends GameObject{
  constructor(x,y) {
    super();
    this.x = x;
    this.y = y;
    this.image_index = 0;
    this.image_speed = 0;

    MenuObject.instance_count++;
    MenuObject.instance_list.push(this);
    this.depth = -10;
    this.created = false;
  }

  step() {
    if ( this.created == false) {
      this.created = true;
    }
    //nothing todo here..
  } //end step

  draw() {
    //controller object only.. no drawing needed.
  } //end draw

  mousePressed(event) {
    if ( this.created === false) {
      return;
    }
    //console.log("Menu object click" + mouseX + "/" + mouseY);
    let rect = canvas.getBoundingClientRect();
    let mouseX = event.clientX - rect.left;
    let mouseY = event.clientY - rect.top;
    
    if ( mouseX>0 && mouseX < canvas.width && mouseY>0 && mouseY < canvas.height) {
      gameLogic.setRoom(new GameRoom());
      this.destroy();
    }
  }

  destroy() {
    super.destroy();
    MenuObject.instance_list = MenuObject.instance_list.filter(item => item !== this);
    MenuObject.instance_count--;
  }//end destroy
}
//static class variables
MenuObject.instance_count = 0;
MenuObject.instance_list = [];
