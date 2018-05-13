import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';

import { signInUser } from '../actions';

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    };

    this.submitSignIn = this.submitSignIn.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  submitSignIn(e) {
    if (this.state.username == '' || this.state.password == '') {
      toast.error('Please fill in all fields');
      return;
    }
    this.props.signInUser({ username: this.state.username, password: this.state.password }, this.props.history);
    this.setState({
      password: '',
    });
  }

  render() {
    return (
      <div>
        <div className="editor-container">
          <div className="field-title"> Username: </div>
          <input onChange={this.handleChange} type="text" name="username" value={this.state.username} />
          <div className="field-title"> Password: </div>
          <input onChange={this.handleChange} type="password" name="password" value={this.state.password} />
          <br />
          <button onClick={this.submitSignIn}> Sign In </button>
        </div>
      </div>

    );
  }
}

export default withRouter(connect(null, {
  signInUser,
})(SignIn));
