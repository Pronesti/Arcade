import React, { Component } from 'react'

import Scene_play from './scenes/Scene_play'
import Phaser from 'phaser'

export default class Game3 extends Component {
    componentDidMount() {

        const config = {
            width: 800,
            height: 300,
            parent: "phaser-container",
            physics: {
                default: "arcade"
            },
            scene: [
              Scene_play
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
}
