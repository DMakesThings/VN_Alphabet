"using strict"

class Sprite {
  constructor(srcs) {
    // this.image = new Image();
		// this.image.src = src;
    this.sprite = [];

    for ( let i = 0; i < srcs.length; i++ ) {
      this.addImage(srcs[i]);
    }
    this.x_offset;
    this.y_offset;
    this.image_index = 0;
    this.image_speed = 0;
    this.image_scale = 1;
  }

  getWidth() {
    return this.sprite[Math.floor(this.image_index)].width;
    console.log(this.sprite[Math.floor(this.image_index)].width);
  }
  getHeight() {
    return this.sprite[Math.floor(this.image_index)].height;
    console.log(this.sprite[Math.floor(this.image_index)]);
  }

  draw(x,y) {
    this.image_index += this.image_speed;
    if ( this.image_index >= this.sprite.length) {
      this.image_index -= this.sprite.length;
    }
    // console.log(Math.floor(this.image_index));
    // context.drawImage(this.sprite[Math.floor(this.image_index)],0,0,300,300,
		// 				x,y,60,60);
    context.drawImage(this.sprite[Math.floor(this.image_index)],0,0,this.sprite[Math.floor(this.image_index)].width,this.sprite[Math.floor(this.image_index)].height,
						x,y,this.sprite[Math.floor(this.image_index)].width*(this.image_scale),this.sprite[Math.floor(this.image_index)].height*this.image_scale);
  }

  drawImageIndex(x,y,imageIndex) {
    context.drawImage(this.sprite[Math.floor(imageIndex)],0,0,this.sprite[Math.floor(imageIndex)].width,this.sprite[Math.floor(imageIndex)].height,
            x,y,this.sprite[Math.floor(imageIndex)].width*(this.image_scale),this.sprite[Math.floor(imageIndex)].height*this.image_scale);
  }
  addImage(src) {
    let img = new Image();
    img.src = src;
    this.sprite.push(img);
  }
  setImageSpeed(imgSpd) {
    this.image_speed = imgSpd;
  }
  setImageScale(imgScale){
    this.image_scale = imgScale;
  }
}
