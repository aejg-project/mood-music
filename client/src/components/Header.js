import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ currentBook }) => {
  return (
    <header className="bg-light mb-4 py-2 flex-row align-center">
      <div className="mmlogo container flex-row justify-center align-center">
        
        <Link to="/">
          <img src="./mm-logo.png"/>
        </Link>

        

      </div>
    </header>
  );
};

export default Header;
