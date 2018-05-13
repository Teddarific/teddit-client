import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { FaChevronCircleUp, FaChevronCircleDown } from 'react-icons/lib/fa';

import { fetchPosts, fetchPost, votePost } from '../actions';


class Posts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sortMethod: 'hot',
    };

    this.navigateToPost = this.navigateToPost.bind(this);
    this.upVote = this.upVote.bind(this);
    this.downVote = this.downVote.bind(this);
    this.sortMethodChange = this.sortMethodChange.bind(this);
  }

  componentDidMount() {
    this.props.fetchPosts(this.state.sortMethod);
  }

  navigateToPost(e) {
    this.props.history.push(`/posts/${e.currentTarget.id}`);
  }

  upVote(e) {
    e.stopPropagation();
    this.props.votePost(e.currentTarget.id, { vote: 'upvote' }, this.state.sortMethod);
  }

  downVote(e) {
    e.stopPropagation();
    this.props.votePost(e.currentTarget.id, { vote: 'downvote' }, this.state.sortMethod);
  }

  sortMethodChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
    this.props.fetchPosts(e.target.value);
  }

  render() {
    const formatDate = (date) => {
      const dateObj = new Date(Date.parse(date));
      let minute = `${dateObj.getMinutes()}`;
      minute = minute.length == 1 ? `0${minute}` : minute;
      let hour = dateObj.getHours();
      hour = hour.length == 1 ? `0${hour}` : hour;

      const month = dateObj.getMonth();
      const day = dateObj.getDate();
      const year = dateObj.getYear() + 1900;

      return `${hour}:${minute} , ${month}/${day}/${year}`;
    };

    if (!this.props.posts.all) {
      return (
        <div> Loading posts... </div>
      );
    }
    return (
      <div>
        <div className="sort-container">
          Sort by
          <select onChange={this.sortMethodChange} name="sortMethod" className="sort-select">
            <option value="hot">Hot</option>
            <option value="new">New</option>
            <option value="top">Top</option>
          </select>
        </div>
        {this.props.posts.all.map(post => (
          <div key={post._id} id={post._id} onClick={this.navigateToPost} className="prepost" role="menuitem" tabIndex="0">
            <div role="menuitem" tabIndex={0} className="prepost-vote-container" onClick={e => e.stopPropagation()}>
              <FaChevronCircleUp id={post._id} size={30} onClick={this.upVote} />
              <div className="prepost-vote-count"> {post.upvotes - post.downvotes} </div>
              <FaChevronCircleDown id={post._id} size={30} onClick={this.downVote} />
            </div>
            <div className="prepost-contentbar-container">
              <div className="prepost-right-container">
                <img className="prepost-cover_url" alt="preview" src={post.cover_url} />
                <div className="prepost-content-container">
                  <div className="prepost-title"> {post.title} </div>
                  <div className="prepost-tags"> {post.tags} </div>
                </div>
              </div>
              <div className="prepost-info-bar">
                <div className="prepost-date"> Created at {formatDate(post.dateCreated)} by {post.creator.username}</div>
              </div>
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
    auth: state.auth,
  }
);

export default withRouter(connect(mapStateToProps, { fetchPosts, fetchPost, votePost })(Posts));
