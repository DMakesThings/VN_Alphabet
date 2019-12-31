"using strict"

class GameObject {
  constructor() {
    /**
      depth: Depends the order that game objects have their step functions executed,
             and also, their draw functions.

             lower depths are drawn first.
    */
    this.depth = 0;
    //static variables
    GameObject.instance_count++;
    GameObject.instance_list.push(this);
    this.click = false;
  }

  step() {
    //empty. this is just for inheritance.
  }
  draw() {
    //empty.. this is just for inheritance. This is an abstract object, or is meant to be.
  }

  mousePressed(event) {
    //empty.. for inheritance
  }

  static stepAll() {
    //sort instance_list in order of depth.
    GameObject.instance_list.sort( (a,b) => a.depth == b.depth ? 0 : +(a.depth < b.depth) || -1 );

    for ( let i = 0; i < GameObject.instance_list.length; i++ ) {
      GameObject.instance_list[i].step();
    }
  }

  static drawAll() {
    for ( let i = 0; i < GameObject.instance_list.length; i++ ) {
      GameObject.instance_list[i].draw();
    }
    //console.log(GameObject.instance_list.length);
  }

  static mousePressedAll(event) {
    for ( let i = 0; i < GameObject.instance_list.length; i++ ) {
      GameObject.instance_list[i].mousePressed(event);
    }
  }

  //children objects have to call super.destroy()
  destroy() {
    GameObject.instance_list = GameObject.instance_list.filter(item => item !== this);
    GameObject.instance_count--;
  }//end destroy
}

//static class variables
GameObject.instance_count = 0;
GameObject.instance_list = [];
