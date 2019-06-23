import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './index.css';
import createStore from 'pure-store';

import Header from './components/Header';
import Footer from './components/Footer';

import Home from './views/home.js';
import PlayGame from './views/playGame.js';

const globalStore = createStore({ Game: 0 });

function App() {
  return (
    <div className='App'>
      <div className='Screen'>
        <Router>
          <div>
            <Header />
            <Route exact path='/' component={Home} />
            <Route
              exact
              path='/games/'
              render={props => <PlayGame {...props} store={globalStore} />}
            />
            <Footer />
          </div>
        </Router>
      </div>
    </div>
  );
}

export default App;
