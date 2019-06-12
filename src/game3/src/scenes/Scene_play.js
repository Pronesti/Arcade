import Phaser from 'phaser';
import createStore from 'pure-store';
import Player from '../gameObjects/Player';

const store = createStore({ });

export default class Scene_Play extends Phaser.Scene {
  constructor() {
    super({ key: 'Scene_Play' });
    this.wordList = ["elefante", "autopista", "zapallo", "iglu", "papaya", "zocalo", "xilofon", "mercaderia", "jupiter", "diego", "koala"];
    this.randomWord = this.chooseRandomWord(this.wordList);
  }

  preload() {
  }

  create() {
    console.log(this.randomWord);
    let secretWord = (this.createSecretWord(this.randomWord));
    this.add.text(100,100, secretWord, {fontSize: 40, fontColor: 'white'});
  }

  update() {
  }

  chooseRandomWord(wordList){
    let number = Math.round((Math.random() * 10) + 1);
    let word = wordList[number];
    return (word);
  }

  createSecretWord(randomWord){
    let letterStart = randomWord.charAt(0);
    let letterFinish = randomWord.charAt(randomWord.length-1);
    let spaces = randomWord.length - 2;

    let obj = {
      secretWordStart: letterStart,
      secretWordFinish: letterFinish,
      secretSpaces: spaces
    };
    console.log(obj);
    let result = letterStart;
    for (let i=0; i< spaces; i++){
      result = result + "-";
    }
     result = result + letterFinish;
     console.log(result);
    return(result);
  }


  rightController() {
    //Controller Right
    if (this.cursor.down.isDown) {
      this.playerRight.body.setVelocityY(300);
    } else if (this.cursor.up.isDown) {
      this.playerRight.body.setVelocityY(-300);
    } else if (this.cursor.left.isDown) {
      this.playerRight.body.setVelocityX(-300);
    } else if (this.cursor.right.isDown) {
      this.playerRight.body.setVelocityX(300);
    } else {
      this.playerRight.body.setVelocityY(0);
      this.playerRight.body.setVelocityX(0);
    }
  }

  leftController() {
    //Controller left
    if (this.cursor_S.isDown) {
      this.playerLeft.body.setVelocityY(300);
    } else if (this.cursor_W.isDown) {
      this.playerLeft.body.setVelocityY(-300);
    } else if (this.cursor_A.isDown) {
      this.playerLeft.body.setVelocityX(-300);
    } else if (this.cursor_D.isDown) {
      this.playerLeft.body.setVelocityX(300);
    } else {
      this.playerLeft.body.setVelocityY(0);
      this.playerLeft.body.setVelocityX(0);
    }
  }
}
