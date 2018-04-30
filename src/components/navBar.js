import React from 'react';
import { NavLink } from 'react-router-dom';


const NavBar = (props) => {
  return (
    <nav>
      <div id="logo" />
      <ul>
        <li><NavLink exact to="/">Home</NavLink></li>
        <li><NavLink to="/posts/new">Create New Post</NavLink></li>
      </ul>
    </nav>
  );
};

export default NavBar;
