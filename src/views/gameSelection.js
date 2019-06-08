import React from 'react';
import {Link} from 'react-router-dom';

export default () => {
  return (
    <div className='Screen'>
      <p>Elegi uno pibe</p>
      <Link to="/playgame">
        <div>Pong</div>
      </Link>
    </div>
  );
};
