import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { fetchPost, updatePost } from '../actions';

import Editor from '../components/editor';

class EditPost extends Component {
  constructor(props) {
    super(props);

    this.submitCallback = this.submitCallback.bind(this);
  }

  componentDidMount() {
    this.props.fetchPost(this.props.match.params.postID);
  }

  submitCallback(post) {
    this.props.updatePost(this.props.posts.selected._id, post);
    this.props.history.push(`/posts/${this.props.posts.selected._id}`);
  }

  render() {
    if (!this.props.posts.selected) {
      return (
        <div> Loading editor... </div>
      );
    }
    return (
      <Editor
        loadedPost={this.props.posts.selected}
        buttonText="Save"
        submitCallback={this.submitCallback}
      />
    );
  }
}

const mapStateToProps = state => (
  {
    posts: state.posts,
  }
);

export default withRouter(connect(mapStateToProps, { fetchPost, updatePost })(EditPost));
