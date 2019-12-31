"using strict"

class DeadPlane extends GameObject {
  constructor(x,y,xSpeed,ySpeed) {
    super();
    this.x = x;
    this.y = y;
    this.xSpeed = Math.min(xSpeed,-4);
    this.ySpeed = 3;
    this.vGravity = 0.05;
    this.depth = 10;

    //static variables
    DeadPlane.instance_count++;
    DeadPlane.instance_list.push(this);
  }

  step() {
    this.y += this.ySpeed;
    this.x += this.xSpeed;

    this.ySpeed += this.vGravity;
    let maxVspeed = 12 ;
    this.ySpeed = Math.max(Math.min(maxVspeed,this.ySpeed + this.vGravity),-maxVspeed);
    if ( this.y > canvas.height ) {
      this.destroy();
    }
  }

  draw() {
    deadPlaneSprite.draw(this.x-45,this.y-65);
  }

  static drawAll() {
    for ( let i = 0; i < DeadPlane.instance_list.length; i++ ) {
      DeadPlane.instance_list[i].draw();
    }
  }

  destroy() {
    super.destroy();
    DeadPlane.instance_list = DeadPlane.instance_list.filter(item => item !== this);
    DeadPlane.instance_count--;
  }//end destroy
}
//static class variables
DeadPlane.instance_count = 0;
DeadPlane.instance_list = [];
