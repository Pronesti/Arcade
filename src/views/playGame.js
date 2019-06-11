import React, { Component } from 'react';
import Game1 from '../game1/src';
import Game2 from '../game2/src';

export default class PlayGame extends Component {

  render() {
    console.log(this.props.store.getState())
    let game = this.props.store.getState().Game;
    switch(game){
      case 1:
        return (<Game1 />);
        break;
      case 2:
        return (<Game2 />);
        break;
      default:
        return (<p>404</p>);
        break;
    }
  }
}
