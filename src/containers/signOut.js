import React from 'react';
import { withRouter } from 'react-router-dom';

import { connect } from 'react-redux';

import { signOutUser } from '../actions';


const SignOut = (props) => {
  props.signOutUser(props.history);

  return (
    <div className="signing-out">
        Signing out...
    </div>
  );
};

export default withRouter(connect(null, { signOutUser })(SignOut));
