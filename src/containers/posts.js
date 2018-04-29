import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { fetchPosts, fetchPost } from '../actions';


class Posts extends Component {
  constructor(props) {
    super(props);

    this.navigateToPost = this.navigateToPost.bind(this);
  }
  componentDidMount() {
    this.fetchPosts();
  }

  fetchPosts() {
    this.props.fetchPosts();
  }

  navigateToPost(e) {
    this.props.history.push(`/posts/${e.currentTarget.id}`);
  }

  render() {
    console.log(this.props.posts.all);
    if (!this.props.posts.all) {
      return (
        <div> Undefined </div>
      );
    }
    return (
      <div>
        {this.props.posts.all.map(post => (
          <div key={post.id} id={post.id} onClick={this.navigateToPost} className="prepost" role="menuitem" tabIndex="0">
            <div className="prepost-cover_url"> {post.cover_url} </div>
            <div className="prepost-content-container">
              <div className="prepost-title"> {post.title} </div>
              <div className="prepost-content"> {post.content} </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    posts: state.posts,
  }
);

export default withRouter(connect(mapStateToProps, { fetchPosts, fetchPost })(Posts));
