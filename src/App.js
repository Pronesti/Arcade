import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './index.css';

import Header from './components/Header';
import Footer from './components/Footer';

import Home from './views/home.js';
import GameSelection from './views/gameSelection.js';
import PlayGame from './views/playGame.js';

function App() {
  return (
    <div className='App'>
      <div className='Screen'>
        <Router>
          <div>
            <Header />
            <Route exact path='/' component={Home} />
            <Route path='/games' component={GameSelection} />
            <Route path='/playgame' component={PlayGame} />
            <Footer />
          </div>
        </Router>
      </div>
    </div>
  );
}

export default App;
