import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { FaChevronCircleUp, FaChevronCircleDown } from 'react-icons/lib/fa';
import marked from 'marked';

import { fetchPost, updatePost, deletePost, votePost } from '../actions';

class Post extends Component {
  constructor(props) {
    super(props);

    this.submitChange = this.submitChange.bind(this);
    this.editPost = this.editPost.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.upVote = this.upVote.bind(this);
    this.downVote = this.downVote.bind(this);
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

  upVote(e) {
    e.stopPropagation();
    this.props.votePost(e.currentTarget.id, { vote: 'upvote' }, null, false);
  }

  downVote(e) {
    e.stopPropagation();
    this.props.votePost(e.currentTarget.id, { vote: 'downvote' }, null, false);
  }

  renderImg() {
    if (this.props.posts.selected.cover_url != 'https://cdn4.iconfinder.com/data/icons/devine_icons/Black/PNG/File%20Types/Defult%20Text.png' &&
         this.props.posts.selected.cover_url != 'https://png.icons8.com/metro/1600/link.png') {
      return (
        <img alt="cover" src={this.props.posts.selected.cover_url} />
      );
    }
    return (
      <div />
    );
  }

  renderToolPanel() {
    if (this.props.auth.username == this.props.posts.selected.creator.username) {
      return (
        <div className="post-actions">
          <div role="button" tabIndex={0} onClick={this.editPost}> edit </div>
          <div role="button" tabIndex={0} onClick={this.deletePost}> delete </div>
        </div>
      );
    }
    return (<div />);
  }

  render() {
    if (!this.props.posts.selected) {
      return (
        <div> Loading post... </div>
      );
    }
    return (
      <div className="post-container">
        <div role="menuitem" tabIndex={0} className="post-vote-container" onClick={e => e.stopPropagation()}>
          <FaChevronCircleUp id={this.props.posts.selected._id} size={30} onClick={this.upVote} />
          <div className="prepost-vote-count"> {this.props.posts.selected.upvotes - this.props.posts.selected.downvotes} </div>
          <FaChevronCircleDown id={this.props.posts.selected._id} size={30} onClick={this.downVote} />
        </div>
        <div className="post-all-container">
          <div className="post-title">
            {this.props.posts.selected.title}
          </div>
          {this.renderImg()}
          <div className="post-content" dangerouslySetInnerHTML={{ __html: marked(this.props.posts.selected.content || '') }} />
          <div className="post-tags">
            {this.props.posts.selected.tags}
          </div>
          <br />
          <div className="post-creator">
            Created by {this.props.posts.selected.creator.username}
          </div>
          {this.renderToolPanel()}
        </div>
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
  fetchPost, updatePost, deletePost, votePost,
})(Post));
