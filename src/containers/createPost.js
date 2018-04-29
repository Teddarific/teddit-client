import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { createPost } from '../actions';


class CreatePost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: 'Test',
      content: 'This is some content',
      tags: '#firstpost',
      cover_url: 'teddyni.com',
    };

    this.submitPost = this.submitPost.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  submitPost() {
    const post = {
      title: this.state.title,
      content: this.state.content,
      tags: this.state.tags,
      cover_url: this.state.cover_url,
    };
    this.props.createPost(post, this.props.history);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  render() {
    return (
      <div>
        <div> Title: </div>
        <input onChange={this.handleChange} type="text" name="title" />
        <br />
        <div> Content: </div>
        <input onChange={this.handleChange} type="text" name="content" />
        <br />
        <div> Tags: </div>
        <input onChange={this.handleChange} type="text" name="tags" />
        <br />
        <div> Cover URL: </div>
        <input onChange={this.handleChange} type="text" name="cover_url" />
        <br />
        <button onClick={this.submitPost}> Create </button>
      </div>
    );
  }
}

export default withRouter(connect(null, { createPost })(CreatePost));
