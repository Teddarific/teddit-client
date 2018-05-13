import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import NavBar from '../containers/navBar';
import Posts from '../containers/posts';
import CreatePost from '../containers/createPost';
import Post from '../containers/post';
import EditPost from '../containers/editPost';
import SignIn from '../containers/signIn';
import SignUp from '../containers/signUp';
import SignOut from '../containers/signOut';


import requireAuth from '../containers/requireAuth';

const App = (props) => {
  return (
    <Router>
      <div>
        <NavBar />
        <hr />
        <Switch>
          <Route exact path="/" component={Posts} />
          <Route exact path="/posts/new" component={requireAuth(CreatePost)} />
          <Route exact path="/posts/:postID" component={Post} />
          <Route exact path="/posts/:postID/edit" component={EditPost} />
          <Route exact path="/user/signin" component={SignIn} />
          <Route exact path="/user/signup" component={SignUp} />
          <Route exact path="/user/signout" component={SignOut} />
          <Route render={() => (<div>No posts found </div>)} />
        </Switch>
      </div>
    </Router>

  );
};

// <Route path="/posts/new" component={NewPost} />
// <Route path="/posts/:postID" component={Post} />
export default App;
