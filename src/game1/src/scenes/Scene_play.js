import Phaser from 'phaser';
import Palletes from '../gameObjects/Palletes';
import createStore from 'pure-store';

const store = createStore({ left: 0, right: 0 });

export default class Scene_Play extends Phaser.Scene {
  constructor() {
    super({ key: 'Scene_Play' });
  }

  preload() {
    this.load.image('ball', 'assets/pong/ball.png');
    this.load.image('left', 'assets/pong/left_pallete.png');
    this.load.image('right', 'assets/pong/right_pallete.png');
    this.load.image('separator', 'assets/pong/separator.png');
    this.load.audio('hit1', 'assets/pong/hit1.ogg');
    this.load.audio('hit2', 'assets/pong/hit2.ogg');
    this.load.audio('point', 'assets/pong/point.ogg');
  }
  create() {
    let width = this.sys.game.config.width;
    let height = this.sys.game.config.height;
    let center_width = width / 2;
    let center_heigth = height / 2;

    this.left = new Palletes(this, 20, center_heigth, 'left');
    this.right = new Palletes(this, 620, center_heigth, 'right');
    this.separator = this.add.image(center_width, center_heigth, 'separator');
    this.ball = this.physics.add.image(center_width, center_heigth, 'ball');

    this.hit1 = this.sound.add('hit1', { loop: false });
    this.hit2 = this.sound.add('hit2', { loop: false });
    this.point = this.sound.add('point', { loop: false });

    if (Phaser.Math.Between(-100, 100) > 0) {
      this.ball.setVelocityX(180);
    } else {
      this.ball.setVelocityX(-180);
    }

    //Physics
    this.ball.setBounce(1);
    this.ball.setCollideWorldBounds(true);
    this.physics.world.setBoundsCollision(false, false, true, true);
    this.physics.add.collider(
      this.ball,
      this.left,
      this.hitLeftPallete,
      null,
      this
    );
    this.physics.add.collider(
      this.ball,
      this.right,
      this.hitRightPallete,
      null,
      this
    );

    //LeftPallete
    this.cursor_W = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.W
    );
    this.cursor_S = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.S
    );

    // RightPallete
    this.cursor = this.input.keyboard.createCursorKeys();

    this.drawScoreboard();
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

  update() {
    this.scoreboard();
    this.rightController();
    this.leftController();
  }

  playHitSound(which) {
    if (which === 1) {
      this.hit1.play();
    } else {
      this.hit2.play();
    }
  }

  scoreboard() {
    if (store.getState().left > 10 || store.getState().right > 10) {
      this.gameOver();
    } else {
      if (this.ball.x < 0) {
        console.log('punto para la derecha!!');
        store.update(s => s.right++);
        this.point.play();
        this.drawScoreboard();
        this.resetBall('left');
      }
      if (this.ball.x > this.sys.game.config.width) {
        console.log('punto para la izquierda!!');
        store.update(s => s.left++);
        this.point.play();
        this.drawScoreboard();
        this.resetBall('right');
      }
    }
  }

  gameOver() {
    this.add.text(50, this.sys.game.config.height / 2, 'Game Over', {
      fontSize: 100
    });
    this.left.setVisible(false);
    this.right.setVisible(false);
    this.separator.setVisible(false);
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
    this.right.setPosition(620, this.sys.game.config.height / 2);
    this.left.setPosition(20, this.sys.game.config.height / 2);
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
      this.right.body.setVelocityY(300);
    } else if (this.cursor.up.isDown) {
      this.right.body.setVelocityY(-300);
    } else {
      this.right.body.setVelocityY(0);
    }
  }

  leftController() {
    //Controller left
    if (this.cursor_S.isDown) {
      this.left.body.setVelocityY(300);
    } else if (this.cursor_W.isDown) {
      this.left.body.setVelocityY(-300);
    } else {
      this.left.body.setVelocityY(0);
    }
  }

  hitLeftPallete() {
    this.playHitSound(1);
    if (this.ball.y > this.left.body.y) {
      this.ball.setVelocityY(Phaser.Math.Between(0, 100));
    } else {
      this.ball.setVelocityY(Phaser.Math.Between(-100, 0));
    }

    this.ball.body.setBounceX(this.ball.body.bounce.x + 0.02);
  }

  hitRightPallete() {
    this.playHitSound(2);
    if (this.ball.y > this.right.body.y) {
      this.ball.setVelocityY(Phaser.Math.Between(0, 100));
    } else {
      this.ball.setVelocityY(Phaser.Math.Between(-100, 0));
    }

    this.ball.body.setBounceX(this.ball.body.bounce.x + 0.02);
  }
}