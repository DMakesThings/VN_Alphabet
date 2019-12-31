"using strict"


class GameRoom {
  constructor() {
    this.goal = 29;
    this.currentScore = 0;
    this.timer = 0;
    this.timerAction = 40;
    this.number = 1;
    this.HUDObject_inst = new HUDobject();

    gameLogic.stars = 0;

    this.life = 3;
    this.maxlife = 3;
    this.resetAlphabetArray();
  }

  step() {
    this.timer += 1;

    if ( (this.timer % this.timerAction) == 0) {
      if ( this.getScore() < this.goal && this.life > 0)
      this.createLetterObject(this.number);
    }
  }

  addScore() {
    this.currentScore +=1;
    if ( this.currentScore == 5 ) {
      if (gameLogic.stars < 1 ) {
        gameLogic.stars = 1;
        gameLogic.saveStars();
        new StarReward(gameLogic.stars);
        resetStarElements();
      }
    }
    //2 Stars
    if ( this.currentScore == 10 ) {
      if (gameLogic.stars < 2 ) {
        gameLogic.stars = 2;
        gameLogic.saveStars();
        new StarReward(gameLogic.stars);
        resetStarElements();
      }
    }
    //3 Stars
    if ( this.currentScore == 15 ) {
      if (gameLogic.stars < 3 ) {
        gameLogic.stars = 3;
        gameLogic.saveStars();
        new StarReward(gameLogic.stars);
        resetStarElements();
      }
    }
    //4 Stars
    if ( this.currentScore == 20 ) {
      if (gameLogic.stars < 4 ) {
        gameLogic.stars = 4;
        gameLogic.saveStars();
        new StarReward(gameLogic.stars);
        resetStarElements();
      }
    }
    //5 Stars
    if ( this.currentScore == 29 ) {
      if (gameLogic.stars < 5 ) {
        gameLogic.stars = 5;
        gameLogic.saveStars();
        let s = new StarReward(gameLogic.stars);
        resetStarElements();
        LetterObject.setClickedTrueForAll();
        //Do some kind of victory win condition.
      }
    }
  }

  resetScore() {
    this.currentScore = 0;
  }

  loseLife() {
      this.life -= 1;
      if ( this.life === 0 ) {
        //life is now zero. GameOver! :)
        gameLogic.saveStars();
        let s = new StarReward(gameLogic.stars);
        s.setGameOver();
        resetStarElements();
        LetterObject.setClickedTrueForAll();
        //go to gameover room.
      }
  }

  getScore() {
    return this.currentScore;
  }

  resetAlphabetArray() {
    vietnameseAlphabet = [];
    for (var i = 0; i < vietnameseAlphabetList.length; i++ ) {
      vietnameseAlphabet.push(vietnameseAlphabetList[i]);
      shuffle(vietnameseAlphabet);
    }
  }

  createLetterObject(number) {
    shuffle(vietnameseAlphabet);
    shuffle(nonVietnameseAlphabet);
    if (Math.random() < 0.8 && vietnameseAlphabet.length>0) { //create VN letter.
      let letter = new LetterObject(vietnameseAlphabet[0]);
      letter.setXY(canvas.width, 128);
      vietnameseAlphabet.splice( 0, 1 );
      console.log("Vietnamese Alphabet: " + vietnameseAlphabet.toString());
    } else { //create non VN letter.
      let letter = new LetterObject(nonVietnameseAlphabet[0]);
      letter.setXY(canvas.width, 128);
    }
  }

  draw() {
    context.fillStyle = '#7da494';
    context.fillRect(0,0,canvas.width,canvas.height);

    winterBG.draw_background(0,0,canvas.width,canvas.height);

    GameObject.drawAll();

    context.fillStyle = "white";
    context.font="22px Roboto";
    context.textAlign="left";
    context.textBaseline = "top";
    context.fillText("Goal: " + this.currentScore + "/" + this.goal, 7,7);

    for ( let i = 0; i < this.life; i++ ) {
      heartSprite.draw(canvas.width - (heartSprite.getWidth() * (i+1)), 2);
    }
    //temporary.. don't draw HUD sprite here.
    //HUDSprite.draw(0,canvas.height-140);
  }
}
