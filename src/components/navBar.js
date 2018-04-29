import React from 'react';
import { NavLink } from 'react-router-dom';


const NavBar = (props) => {
  return (
    <nav>
      <ul>
        <li><NavLink exact to="/">My Super Awesome Blog</NavLink></li>
        <li><NavLink to="/posts/new">New Post</NavLink></li>
      </ul>
    </nav>
  );
};

export default NavBar;
