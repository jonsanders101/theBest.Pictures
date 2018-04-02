import React from 'react';
import {Link} from 'react-router';


export default function Header(props) {
  return (
    <div className="header">
      <Link to="/" className="home-header-link">TheBest.Pictures</Link>
      <Link to="/about" className="about-header-link">About</Link>
    </div>
  );
}