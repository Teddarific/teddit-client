import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { createPost } from '../actions';

import Editor from '../components/editor';

class CreatePost extends Component {
  constructor(props) {
    super(props);

    this.submitCallback = this.submitCallback.bind(this);
  }

  submitCallback(post) {
    this.props.createPost(post, this.props.history);
  }

  render() {
    return (
      <Editor
        buttonText="Create"
        submitCallback={this.submitCallback}
      />
    );
  }
}

export default withRouter(connect(null, { createPost })(CreatePost));
