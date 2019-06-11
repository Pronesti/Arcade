import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class gameSelection extends Component {
  selectGame(){
    console.log(this.props)
  }
  render() {
    console.log(this.props.store.getState())
    return (
      <div className='Screen'>
      <p>Elegi uno pibe</p>
      
      <Link to="/playgame">
      <div onClick={() => {this.props.store.update(s => s.Game=1)}}>Pong</div>
      <div onClick={() => {this.props.store.update(s => s.Game=2)}}>Soccer</div>
      </Link>
    </div>
    )
  }
}