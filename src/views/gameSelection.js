import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class gameSelection extends Component {
  selectGame(){
    console.log(this.props)
  }

  render() {
    console.log(this.props.store.getState())
    const games = [
      {
       title: 'Pong',
       poster: 'https://www.lifewire.com/thmb/YNqMWZqoYXBI8B8_1TypDRO_TZ8=/1500x1500/smart/filters:no_upscale()/Pong.svg-58ae72833df78c345ba1e34e.png',
       id: 1
      },
      {
        title: 'Head Soccer',
        poster: 'https://is3-ssl.mzstatic.com/image/thumb/Purple114/v4/c8/e4/80/c8e48039-aec9-03e9-f74b-e2c33eccc5c3/source/256x256bb.jpg',
        id: 2
      },
      {
        title: 'Hang Man',
        poster: 'https://is1-ssl.mzstatic.com/image/thumb/Purple118/v4/ec/04/80/ec0480af-efed-b9f0-0b4b-55adb3a2e608/AppIcon-1x_U007emarketing-85-220-0-4.png/246x0w.jpg',
        id: 3
      }
    ];
    return (
      <div className='Screen'>
      <p>Elegi uno pibe</p>
      
      <Link to="/playgame">
      {games.map(game => {
        return <div key={game.index} className="gameDiv" onClick={()=> this.props.store.update(s=> s.Game = game.id)}><img key={game.index} className="poster" src={game.poster} alt={game.title} /></div>
      })}
      </Link>
    </div>
    )
  }
}