import React from 'react';
import { NavLink } from 'react-router-dom';

import { FaHome, FaPencil } from 'react-icons/lib/fa';

const NavBar = (props) => {
  return (
    <nav>
      <NavLink exact to="/"><img id="logo" alt="logo" src="../img/teddit.png" /></NavLink>
      <div className="link-container">
        <NavLink exact to="/"><div className="icon-container"> <FaHome size={40} /> <div> Home </div> </div></NavLink>
        <NavLink exact to="/posts/new"><div className="icon-container"> <FaPencil size={40} /> <div> Create New </div> </div></NavLink>
      </div>
    </nav>
  );
};

export default NavBar;
