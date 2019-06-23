import React, { PureComponent } from 'react'

import Pong from './scenes/Pong'
import HeadSoccer from './scenes/HeadSoccer'
import HangMan from './scenes/HangMan'
import ChooseGame from './scenes/ChooseGame'

import Phaser from 'phaser'

export default class Game extends PureComponent {
    componentDidMount() {

        const config = {
            width: 800,
            height: 300,
            parent: "phaser-container",
            physics: {
                default: "arcade"
            },
            scene: [
              ChooseGame,Pong,HeadSoccer,HangMan
            ]
        }
        this.game = new Phaser.Game(config);
    }
    
    create(){

    }

    update(){

    }
    

  render() {
    return (
      <div className="phaserContainer" id="phaser-container">
			</div>
    )
  }

  componentWillUnmount(){
    this.game.destroy(true,false); //el primero elimina el canvas, el 2do lo descarga en memoria
    }
}
