import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { fetchPost } from '../actions';


class Post extends Component {
  componentDidMount() {
    console.log(this.props);
    this.fetchPost();
  }

  fetchPost() {
    this.props.fetchPost(this.props.match.params.postID);
  }


  render() {
    console.log(this.props.posts.selected);
    if (!this.props.posts.selected) {
      return (
        <div> Undefined </div>
      );
    }
    return (
      <div>
        {this.props.posts.selected.title}
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    posts: state.posts,
  }
);

export default withRouter(connect(mapStateToProps, { fetchPost })(Post));
