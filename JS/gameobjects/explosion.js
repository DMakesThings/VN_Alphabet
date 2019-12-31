"using strict"
class Explosion extends GameObject{
  constructor(x,y) {
    super();
    this.x = x-64;
    this.y = y-32;
    this.image_index = 0;
    this.image_speed = 0.5;
    Explosion.instance_count++;
    Explosion.instance_list.push(this);
    this.depth = 5;
  }

  step() {

    this.image_index += this.image_speed;

    if ( this.image_index >= explosionSprite.sprite.length) {
      this.destroy();
      //Explosion.hello();
    }
  } //end step

  draw() {
    explosionSprite.drawImageIndex(this.x, this.y, this.image_index);
  } //end draw

  destroy() {
    super.destroy();
    Explosion.instance_list = Explosion.instance_list.filter(item => item !== this);
    Explosion.instance_count--;
  }//end destroy
}
//static class variables
Explosion.instance_count = 0;
Explosion.instance_list = [];
