import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import NavBar from './navBar';
import Posts from '../containers/posts';
import CreatePost from '../containers/createPost';
import Post from '../containers/post';
import EditPost from '../containers/editPost';

const App = (props) => {
  return (
    <Router>
      <div>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Posts} />
          <Route exact path="/posts/new" component={CreatePost} />
          <Route exact path="/posts/:postID" component={Post} />
          <Route exact path="/posts/:postID/edit" component={EditPost} />
          <Route render={() => (<div>No posts found </div>)} />
        </Switch>
      </div>
    </Router>
  );
};

// <Route path="/posts/new" component={NewPost} />
// <Route path="/posts/:postID" component={Post} />
export default App;
