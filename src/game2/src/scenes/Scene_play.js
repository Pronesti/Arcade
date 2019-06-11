import Phaser from 'phaser';
import createStore from 'pure-store';
import Player from '../gameObjects/Player';

const store = createStore({ left: 4, right: 0 });

export default class Scene_Play extends Phaser.Scene {
  constructor() {
    super({ key: 'Scene_Play' });
  }

  preload() {
    this.load.image('playerLeft', 'assets/soccer/jugador1izq.png');
    this.load.image('playerRight', 'assets/soccer/jugador1der.png');
    this.load.image('ball', 'assets/soccer/ball.png');
    this.load.image('background', 'assets/soccer/background.jpg');
    this.load.audio('goal','assets/soccer/goal.mp3');
    this.load.audio('endgame','assets/soccer/endgame.wav');
  }

  create() {

    this.goal = this.sound.add('goal', {loop: false});
    this.endgame = this.sound.add('endgame', {loop: false});
    this.background = this.add.image(0,0,'background');
    this.background.displayHeight = 600;
    this.background.displayWidth = 1600;
    this.playerLeft = new Player(this, 750, 300, 'playerLeft');
    this.playerRight =new Player(this, 50, 300, 'playerRight');
    this.ball = this.physics.add.image( 200, 100, 'ball');


        //Physics
        this.ball.setBounce(0.5);
        this.ball.setCollideWorldBounds(true);
        this.physics.world.setBoundsCollision(false, false, true, true);
        this.physics.add.collider(
          this.ball,
          this.playerLeft,
          this.hitLeftPlayer,
          null,
          this
        );
        this.physics.add.collider(
          this.ball,
          this.playerRight,
          this.hitRightPlayer,
          null,
          this
        );
        this.physics.add.collider(
          this.playerLeft,
          this.playerRight,
          this.hitTwoPlayer,
          null,
          this
        );
        this.ball.setGravityY(100);
        this.playerLeft.body.setGravityY(300);
        this.playerRight.body.setGravityY(300);

       //LeftPlayer
       this.cursor_W = this.input.keyboard.addKey(
        Phaser.Input.Keyboard.KeyCodes.W
      );
      this.cursor_S = this.input.keyboard.addKey(
        Phaser.Input.Keyboard.KeyCodes.S
      );
      this.cursor_A = this.input.keyboard.addKey(
        Phaser.Input.Keyboard.KeyCodes.A
      );
      this.cursor_D = this.input.keyboard.addKey(
        Phaser.Input.Keyboard.KeyCodes.D
      );
  
      // RightPlayer
      this.cursor = this.input.keyboard.createCursorKeys();

      
  
  }

  update() {
    this.scoreboard();
    this.rightController();
    this.leftController();
  }

  drawScoreboard() {
    const { left, right } = store.state;
    let width = this.sys.game.config.width;
    let center_width = width / 2;
    this.add.text(center_width - 60, 0, `${left} - ${right}`, {
      color: '#00ff00',
      backgroundColor: '#000000',
      fontSize: 40
    });
  }

  scoreboard() {
    if (store.getState().left > 4 || store.getState().right > 4) {
      this.gameOver();
    } else {
      if (this.ball.x < 0) {
        console.log('punto para la derecha!!');
        store.update(s => s.right++);
        this.goal.play();
        this.drawScoreboard();
        this.resetBall('left');
      }
      if (this.ball.x > this.sys.game.config.width) {
        console.log('punto para la izquierda!!');
        store.update(s => s.left++);
        this.goal.play();
        this.drawScoreboard();
        this.resetBall('right');
      }
    }
  }

  gameOver() {
    this.add.text(150, 100, 'Game Over', {
      fontSize: 100
    });
    this.endgame.play();
    this.playerLeft.setVisible(false);
    this.playerRight.setVisible(false);
    this.ball.setVisible(false);
    store.update(s => {
      s.left = 0;
      s.right = 0;
    });
  }

  resetBall(direction) {
    this.ball.setPosition(
      this.sys.game.config.width / 2,
      this.sys.game.config.height / 2
    );
    this.playerLeft.setPosition(750, 300);
    this.playerRight.setPosition(20, 300);
    this.ball.body.setBounceX(1);
    this.ball.body.setVelocityX(200);
    if (direction !== 'left') {
      //this.ball.setVelocityX(Phaser.Math.Between(50,100));
      this.ball.setVelocityY(1);
    } else {
      //this.ball.setVelocityX(Phaser.Math.Between(-50,-100));
      this.ball.setVelocityY(1);
    }
  }

  rightController() {
    //Controller Right
    if (this.cursor.down.isDown) {
      this.playerRight.body.setVelocityY(300);
    } else if (this.cursor.up.isDown) {
      this.playerRight.body.setVelocityY(-300);
    } else if(this.cursor.left.isDown){
      this.playerRight.body.setVelocityX(-300);
    }else if(this.cursor.right.isDown){
      this.playerRight.body.setVelocityX(300);
    }else{
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
    } else if(this.cursor_A.isDown){
      this.playerLeft.body.setVelocityX(-300);
    }else if(this.cursor_D.isDown){
      this.playerLeft.body.setVelocityX(300);
    }else{
      this.playerLeft.body.setVelocityY(0);
      this.playerLeft.body.setVelocityX(0);
    }
  }

  hitRightPlayer(){
    this.ball.setVelocityY(300);
    this.ball.setVelocityX(120);
  }
  hitLeftPlayer(){
    this.ball.setVelocityY(300);
    this.ball.setVelocityX(-120);
  }
}