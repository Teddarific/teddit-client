import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaHome, FaPencil, FaUserPlus, FaSignIn, FaSignOut } from 'react-icons/lib/fa';

const NavBar = (props) => {
  const renderAuth = () => {
    if (!props.auth.authenticated) {
      return (
        <React.Fragment>
          <NavLink exact to="/user/signup"><div className="icon-container"> <FaUserPlus size={40} /> <div> Sign up </div> </div></NavLink>
          <NavLink exact to="/user/signin"><div className="icon-container"> <FaSignIn size={40} /> <div> Login </div> </div></NavLink>
        </React.Fragment>
      );
    }
    return (
      <NavLink exact to="/user/signout"><div className="icon-container"> <FaSignOut size={40} /> <div> Sign out </div> </div></NavLink>
    );
  };

  const renderLoggedIn = () => {
    if (props.auth.authenticated) {
      return (
        <div className="nav-logged-in">
          Logged in as {props.auth.username}
        </div>
      );
    }
    return (
      <div />
    );
  };

  return (
    <nav>
      <NavLink exact to="/"><img id="logo" alt="logo" src="../img/teddit.png" /></NavLink>
      <div className="link-all-container">
        <div className="link-container">
          <NavLink exact to="/"><div className="icon-container"> <FaHome size={40} /> <div> Home </div> </div></NavLink>
          <NavLink exact to="/posts/new"><div className="icon-container"> <FaPencil size={40} /> <div> Create New </div> </div></NavLink>
          {renderAuth()}
        </div>
        {renderLoggedIn()}
      </div>
      <ToastContainer
        position="top-right"
        pauseOnHover={false}
      />
    </nav>

  );
};

const mapStateToProps = state => (
  {
    auth: state.auth,
  }
);

export default withRouter(connect(mapStateToProps, null)(NavBar));
