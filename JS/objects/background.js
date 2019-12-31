"using strict"

class Background {
  constructor(src) {
    this.image = new Image();
		this.image.src = src;
    this.x = 0;
    this.xSpeed = -1;
  }

  setXspeed(speed) {
    this.xSpeed = speed;
  }
  draw_background(x,y,x2,y2) {
    this.x += this.xSpeed;

    if (this.x < -canvas.width) {
      this.x += canvas.width;
    }
    context.drawImage(this.image,0,0,this.image.width,this.image.height,
						x+this.x,y,x2,y2);
    context.drawImage(this.image,0,0,this.image.width,this.image.height,
						(x+canvas.width) + this.x,y,x2,y2);
  }
}
