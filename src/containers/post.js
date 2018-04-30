import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import marked from 'marked';

import { fetchPost, updatePost, deletePost } from '../actions';

class Post extends Component {
  constructor(props) {
    super(props);

    this.submitChange = this.submitChange.bind(this);
    this.editPost = this.editPost.bind(this);
    this.deletePost = this.deletePost.bind(this);
  }

  componentDidMount() {
    this.props.fetchPost(this.props.match.params.postID);
  }

  submitChange(post) {
    this.props.updatePost(this.props.posts.selected._id, post);
  }

  editPost() {
    this.props.history.push(`/posts/${this.props.posts.selected._id}/edit`);
  }

  deletePost() {
    this.props.deletePost(this.props.posts.selected._id, this.props.history);
  }

  render() {
    if (!this.props.posts.selected) {
      return (
        <div> Loading post... </div>
      );
    }
    return (
      <div className="post-container">
        <button onClick={this.editPost}> To edit </button>
        <button onClick={this.deletePost}> To delete </button>
        <img alt="" src={this.props.posts.selected.cover_url} />
        <div className="post-title">
          {this.props.posts.selected.title}
        </div>
        <div className="post-content" dangerouslySetInnerHTML={{ __html: marked(this.props.posts.selected.content || '') }} />
        <div className="post-tags">
          {this.props.posts.selected.tags}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    posts: state.posts,
  }
);

export default withRouter(connect(mapStateToProps, { fetchPost, updatePost, deletePost })(Post));
