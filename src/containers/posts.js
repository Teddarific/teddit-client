import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { fetchPosts } from '../actions';


class Posts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: 'Cool',
    };
  }

  componentDidMount() {
    this.props.fetchPosts();
  }

  fetchPosts() {
    this.props.fetchPosts();
  }

  render() {
    console.log(this.props.posts);
    return (
      <div> Some posts.. </div>
    );
  }
}

const mapStateToProps = state => (
  {
    all: state.posts,
  }
);

export default withRouter(connect(mapStateToProps, { fetchPosts })(Posts));
