"using strict"

/**
  add key events.
*/
document.addEventListener("mousedown",GameLoop.mousePressed);
// document.addEventListener('keydown', GameLoop.keyPressed); //move this to HUD pause button clicked.

/**
  game variables
*/
let vietnameseAlphabet = ['A','Ă','Â','B','C','D','Đ','E','Ê','G','H','I','K','L','M','N','O','Ô','Ơ','P','Q','R','S',
                          'T','U','Ư','V','X','Y'];

const vietnameseAlphabetList = ['A','Ă','Â','B','C','D','Đ','E','Ê','G','H','I','K','L','M','N','O','Ô','Ơ','P','Q','R','S',
                          'T','U','Ư','V','X','Y'];
const nonVietnameseAlphabet = ['F','J','W','Z','Ĉ','Ĝ','Ĥ','Ĵ','Ŵ','Ŷ','Ǒ','Ď'];
//const totalLetters = [].concat(vietnameseAlphabet,nonVietnameseAlphabet);

/**
  Load Backgrounds
*/
const winterBG = new Background("./resources/images/backgrounds/winterBG.png");

/**
  Load Sprites
*/
let planeSpriteArray = [];
planeSpriteArray.push("./resources/images/sprites/plane/Fly_01.png");
planeSpriteArray.push("./resources/images/sprites/plane/Fly_02.png");
const planeSprite = new Sprite(planeSpriteArray);
planeSprite.setImageScale(0.7);
planeSprite.setImageSpeed(0.1);

let explosionSpriteArray = [];
for ( let i = 1; i <=6; i++ ) {
  explosionSpriteArray.push("./resources/images/sprites/explosion/explosion_0" + i + ".png");
}
const explosionSprite = new Sprite(explosionSpriteArray);


let crateSpriteArray = [];
crateSpriteArray.push("./resources/images/sprites/Crate_48.png");
const crateSprite = new Sprite(crateSpriteArray);
crateSprite.setImageSpeed(0);

let deadPlaneArray = [];
deadPlaneArray.push("./resources/images/sprites/plane/Dead_01.png");
const deadPlaneSprite = new Sprite(deadPlaneArray);
deadPlaneSprite.setImageScale(0.7);
deadPlaneSprite.setImageSpeed(0);

let HudSpriteArray = [];
HudSpriteArray.push("./resources/images/sprites/HUD.png");
const HUDSprite = new Sprite(HudSpriteArray);
crateSprite.setImageSpeed(0);

let hudButtonArray = [];
hudButtonArray.push("./resources/images/sprites/pauseButton.png");
hudButtonArray.push("./resources/images/sprites/playButton.png");
hudButtonArray.push("./resources/images/sprites/playSoundButton.png");
const hudButtonSprite = new Sprite(hudButtonArray);
hudButtonSprite.setImageSpeed(0);

let starSpriteArray = [];
starSpriteArray.push("./resources/images/sprites/star.png");
const starSprite = new Sprite(starSpriteArray);
starSprite.setImageSpeed(0);

let smallStarSpriteArray = [];
smallStarSpriteArray.push("./resources/images/sprites/smallstar.png");
const smallStarSprite = new Sprite(smallStarSpriteArray);
smallStarSprite.setImageSpeed(0);

let heartSpriteArray = []
heartSpriteArray.push("./resources/images/sprites/heart.png");
const heartSprite = new Sprite(heartSpriteArray);
heartSprite.setImageSpeed(0);

/**
  load sounds
*/
const snd_A = new Sound('./resources/sounds/A.wav');
const snd_B = new Sound('./resources/sounds/B.wav');
const snd_Star = new Sound('./resources/sounds/get_star_snd.wav');
const snd_win = new Sound('./resources/sounds/crowdapplause2.wav');
const snd_Explosion = new Sound('./resources/sounds/Explosion_5.wav');

const snd_vn_alphabet = [];
for ( let i = 1; i <=29; i++ ) {
  let snd = new Sound('./resources/sounds/VN_Alphabet/' + i + '.wav');
  snd_vn_alphabet.push(snd);
}

/**
  The Main, Alphabet game Logic. ()
  The main loop (30fps) of the game.

  We'll try to have game logic stored in the step() method of the game objects,
  and have the draw() method do all the drawing after.
*/

class AlphabetGameLogic {
  constructor() {
    this.timer = 0;

    this.rooms = [];
    this.currentRoom = new StartMenuRoom();


    this.stars = this.loadStars();
    this.saveStars();
    // if (this.stars == null) {
    //   this.stars = 0;
    //   this.saveStars();
    // }
  }
  resetScore() {
    this.currentRoom.resetScore();

    //vietnameseAlphabet.concat(foundLetters);
    //foundLetters.splice(0,foundLetters.length);
  }

  loseLife() {
    this.currentRoom.loseLife();
  }


  addScore() {
    this.currentRoom.addScore();
  }

  saveStars() {
    //if ( this.stars > localStorage.getItem('Stars')) {
      localStorage.setItem('Stars', this.stars);
    //}
  }

  loadStars() {
    this.stars = localStorage.getItem('Stars');
    return this.stars;
  }

  step() {
    if ( this.roomExists() ) {
      this.currentRoom.step();
    }
  }

  setRoom(room) {
    this.currentRoom = room;
  }

  draw() {
    //regardless of what happens.. draw the background color.
    context.fillStyle = '#7da494';
    context.fillRect(0,0,canvas.width,canvas.height);
    //now.. draw the room.
    if ( this.roomExists() ) {
      this.currentRoom.draw();
    }
  }
  roomExists() {
    if (this.currentRoom == 0 ) {
      return false;
    }
    else {
        return true;
      }
  }
  newGame() {
    //location.reload();
    gameLogic.currentRoom.HUDObject_inst.destroy();
    gameLogic.currentRoom = new StartMenuRoom();

  }
}

/**
  create game objects and start game.
*/
let gameLogic = new AlphabetGameLogic();
let gameLoop = new GameLoop(gameLogic);
gameLoop.start();
loadStarElements();


//general helper function
function removeStarElements() {
  // Removes an element from the document
  for (let i = 0; i < 5; i++) {
    var element = document.getElementById("star"+i);
    if ( element != null)
      document.getElementById("stars").removeChild(element);
  }
}

function resetStarElements(){
  removeStarElements();
  loadStarElements();
}
function loadStarElements() {
  let _numStars = localStorage.getItem('Stars');
  for ( let i = 0; i < 5; i++) { //localStorage.getItem('Stars')

    let img = new Image(32,32); // width, height values are optional params
    if ( i < _numStars) {
      img.src = './resources/images/sprites/star.png';
    } else {
      img.src = './resources/images/sprites/star_empty.png';
    }
    img.setAttribute('id', "star" + i);
    document.getElementById("stars").appendChild(img);
  }
}
function clearStarScore() {
  localStorage.setItem('Stars', 0);
  resetStarElements();
}
