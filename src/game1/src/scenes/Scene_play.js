import Phaser from 'phaser'
import Palletes from '../gameObjects/Palletes';

export default class Scene_Play extends Phaser.Scene{
    constructor() {
        super({key: "Scene_Play"});
    }
    preload(){
      this.load.image("ball", "assets/ball.png");
      this.load.image("left", "assets/left_pallete.png");
      this.load.image("right", "assets/right_pallete.png");
      this.load.image("separator", "assets/separator.png");
        console.log("escena play se ha cargado");
    }
    create(){
        let width = this.sys.game.config.width;
        let height = this.sys.game.config.height;
        let center_width = width / 2; 
        let center_heigth = height / 2;


      this.left = new Palletes(this, 100, center_heigth, "left");
      this.right = new Palletes(this, 620, center_heigth, "right");

      this.ball = this.physics.add.image(center_width, center_heigth, "ball");
      this.separator =this.add.image(center_width, center_heigth, "separator");

      this.ball.setVelocityX(-180);
      this.ball.setBounce(1);
      this.ball.setCollideWorldBounds(true);

      //Physics
      this.physics.world.setBoundsCollision(false, false, true, true);
      this.physics.add.collider(this.ball, this.left, this.hitPallete, null, this);
      this.physics.add.collider(this.ball, this.right, this.hitPallete, null, this);


      //Controller

      //LeftPallete
      this.cursor_W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
      this.cursor_S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);


      this.cursor = this.input.keyboard.createCursorKeys(); // RightPallete
    
    }

    update(){
        if(this.ball.x < 0) {
            console.log("punto para la derecha!!");
            this.ball.setPosition(this.sys.game.config.width/2,this.sys.game.config.height/2);   
        }
        if(this.ball.x > this.sys.game.config.width){
            console.log("punto para la izquierda!!"); 
            this.ball.setPosition(this.sys.game.config.width/2,this.sys.game.config.height/2);  
        }


        //Controller Right
        if (this.cursor.down.isDown){
            this.right.body.setVelocityY(300);
        }else if(this.cursor.up.isDown){
            this.right.body.setVelocityY(-300);
        } else {
            this.right.body.setVelocityY(0);
        }

        //Controller left
        if (this.cursor_S.isDown){
            this.left.body.setVelocityY(300);
        }else if(this.cursor_W.isDown){
            this.left.body.setVelocityY(-300);
        } else {
            this.left.body.setVelocityY(0);
        }


    }

    hitPallete(){
        this.ball.setVelocityY(Phaser.Math.Between(-100,100));
       }


}