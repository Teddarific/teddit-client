import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import NavBar from './navBar';
import Posts from '../containers/posts';
import CreatePost from '../containers/createPost';

const App = (props) => {
  return (
    <Router>
      <div>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Posts} />
          <Route exact path="/posts/new" component={CreatePost} />
          <Route render={() => (<div>No posts found </div>)} />
        </Switch>
      </div>
    </Router>
  );
};

// <Route path="/posts/new" component={NewPost} />
// <Route path="/posts/:postID" component={Post} />
export default App;
