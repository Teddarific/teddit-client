import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { signUpUser, validateField } from '../actions';


class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      email: '',
      password: '',
    };

    this.submitSignUp = this.submitSignUp.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.renderValidField = this.renderValidField.bind(this);
    this.validateFields = this.validateFields.bind(this);
  }

  handleChange(e) {
    this.props.validateField(e.target.name, e.target.value);
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  submitSignUp(e) {
    if (this.validateFields()) {
      const user = {
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
      };
      this.props.signUpUser(user, this.props.history);
    }
  }

  validateFields() {
    if (this.state.username === '' ||
         this.state.email === '' ||
         this.state.password === '' ||
         !this.props.auth.validUsername ||
         !this.props.auth.validEmail) {
      alert('Please address errors before continuing');
      return false;
    }
    return true;
  }

  renderValidField(field) {
    const validFieldTitle = `valid${field}`;
    if (this.state[field.toLowerCase()] === '') {
      return (
        <div className="signup-invalid"> {field} must be populated </div>
      );
    } else if (this.props.auth[validFieldTitle] === false) {
      return (
        <div className="signup-invalid"> {field} is unavailable </div>
      );
    } else {
      return (
        <div />
      );
    }
  }

  render() {
    return (
      <div className="editor-container">
        <div className="field-title"> Username: <span className="required-star"> * </span></div>
        <input onChange={this.handleChange} type="text" name="username" value={this.state.username} />
        {this.renderValidField('Username')}
        <br />
        <div className="field-title"> Email: <span className="required-star"> * </span></div>
        <input onChange={this.handleChange} type="text" name="email" value={this.state.email} />
        {this.renderValidField('Email')}
        <br />
        <div className="field-title"> Password: <span className="required-star"> * </span></div>
        <input onChange={this.handleChange} type="password" name="password" value={this.state.password} />
        {this.renderValidField('Password')}
        <br />
        <br />
        <button tabIndex="0" onClick={this.submitSignUp}> Sign Up </button>
        <br />
        <br />
        <div className="field-helper"> <span className="required-star"> * </span> indicates a required field </div>
      </div>

    );
  }
}

const mapStateToProps = state => (
  {
    posts: state.posts,
    auth: state.auth,
  }
);

export default withRouter(connect(mapStateToProps, {
  signUpUser, validateField,
})(SignUp));
