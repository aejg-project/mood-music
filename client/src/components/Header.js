import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ currentBook }) => {
  return (
    <header className="bg-light mb-4 py-2 flex-row align-center">
      <div className="container flex-row justify-space-between-lg justify-center align-center">
        
        <Link to="/">
          <img src="./mm-logo.png" className="justify-content-md-center"/>
        </Link>

      </div>
    </header>
  );
};

export default Header;
